'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const i18nSource = fs.readFileSync(
    path.join(__dirname, '..', 'i18n.js'),
    'utf8'
);

function normalize(value) {
    return JSON.parse(JSON.stringify(value));
}

function createHarness(options = {}) {
    const storage = new Map(
        options.savedLocale
            ? [['googology-scale.locale', options.savedLocale]]
            : []
    );
    const documentElement = {
        lang: options.documentLanguage || '',
        dir: ''
    };
    const context = vm.createContext({
        document: { documentElement },
        navigator: {
            language: options.navigatorLanguage || 'zh-CN'
        },
        localStorage: {
            getItem(key) {
                return storage.has(key) ? storage.get(key) : null;
            },
            setItem(key, value) {
                storage.set(key, String(value));
            }
        }
    });

    vm.runInContext(i18nSource, context, { filename: 'i18n.js' });

    return {
        api: context.GoogologyI18n,
        documentElement,
        storage
    };
}

function registerTestLocales(api) {
    api.registerLocale({
        code: 'zh-CN',
        name: '中文',
        direction: 'ltr'
    });
    api.registerLocale({
        code: 'en',
        name: 'English',
        direction: 'ltr'
    });
}

test('locale registration exposes immutable locale metadata', () => {
    const { api } = createHarness();
    registerTestLocales(api);

    assert.equal(api.hasLocale('zh-CN'), true);
    assert.equal(api.hasLocale('en'), true);
    assert.equal(api.hasLocale('fr'), false);
    assert.deepEqual(normalize(api.availableLocales()), [
        { code: 'zh-CN', name: '中文', direction: 'ltr' },
        { code: 'en', name: 'English', direction: 'ltr' }
    ]);
    assert.equal(Object.isFrozen(api.availableLocales()[0]), true);
});

test('separate message chunks merge recursively without erasing siblings', () => {
    const { api } = createHarness();
    registerTestLocales(api);

    api.registerMessages('en', {
        ui: {
            title: 'Scale',
            filter: { all: 'All' }
        },
        items: {
            'item-000': { label: 'one' }
        }
    });
    api.registerMessages('en', {
        ui: {
            filter: { info: 'With details' }
        },
        items: {
            'item-001': { label: 'two' }
        }
    });

    api.initialize({ locale: 'en', fallbackLocale: 'zh-CN' });

    assert.equal(api.t('ui.title'), 'Scale');
    assert.equal(api.t('ui.filter.all'), 'All');
    assert.equal(api.t('ui.filter.info'), 'With details');
    assert.deepEqual(normalize(api.get('items')), {
        'item-000': { label: 'one' },
        'item-001': { label: 'two' }
    });
});

test('initialization resolves exact, base-language, saved, and fallback locales', () => {
    const savedHarness = createHarness({
        savedLocale: 'en',
        documentLanguage: 'zh-CN',
        navigatorLanguage: 'zh-CN'
    });
    registerTestLocales(savedHarness.api);
    assert.equal(
        savedHarness.api.initialize({ fallbackLocale: 'zh-CN' }),
        'en'
    );

    const baseHarness = createHarness({
        documentLanguage: 'en-US',
        navigatorLanguage: 'zh-CN'
    });
    registerTestLocales(baseHarness.api);
    assert.equal(
        baseHarness.api.initialize({ fallbackLocale: 'zh-CN' }),
        'en'
    );

    const fallbackHarness = createHarness({
        documentLanguage: 'fr-FR',
        navigatorLanguage: 'fr-FR'
    });
    registerTestLocales(fallbackHarness.api);
    assert.equal(
        fallbackHarness.api.initialize({ fallbackLocale: 'zh-CN' }),
        'zh-CN'
    );
});

test('setLocale updates document metadata, persists, and notifies subscribers', () => {
    const { api, documentElement, storage } = createHarness();
    registerTestLocales(api);
    api.initialize({ locale: 'zh-CN', fallbackLocale: 'zh-CN' });

    const notifications = [];
    const unsubscribe = api.subscribe((locale) => {
        notifications.push(locale);
    });

    assert.equal(api.setLocale('en-US'), 'en');
    assert.equal(api.getLocale(), 'en');
    assert.equal(documentElement.lang, 'en');
    assert.equal(documentElement.dir, 'ltr');
    assert.equal(storage.get('googology-scale.locale'), 'en');
    assert.deepEqual(notifications, ['en']);

    unsubscribe();
    api.setLocale('zh-CN');
    assert.deepEqual(notifications, ['en']);
});

test('lookups fall back by path and interpolate only provided variables', () => {
    const { api } = createHarness();
    registerTestLocales(api);
    api.registerMessages('zh-CN', {
        ui: {
            greeting: '你好，{name}！',
            fallbackOnly: '后备内容'
        }
    });
    api.registerMessages('en', {
        ui: {
            greeting: 'Hello, {name}! {missing}'
        }
    });
    api.initialize({ locale: 'en', fallbackLocale: 'zh-CN' });

    assert.equal(
        api.t('ui.greeting', { name: 'Ada' }),
        'Hello, Ada! {missing}'
    );
    assert.equal(api.t('ui.fallbackOnly'), '后备内容');
    assert.equal(api.t('ui.unknown'), 'ui.unknown');
});

test('localize helpers join content by stable ID without mutating geometry', () => {
    const { api } = createHarness();
    registerTestLocales(api);
    api.registerMessages('en', {
        items: {
            'item-000': {
                label: 'one',
                detail: {
                    title: 'One',
                    sections: []
                }
            }
        },
        axisSegments: {
            'axis-00': {
                text: 'Finite scale',
                detail: {
                    title: 'Finite scale',
                    sections: []
                }
            }
        },
        branches: {
            'branch-1': {
                text: 'Branch one',
                detail: {
                    title: 'Branch one',
                    sections: []
                }
            }
        }
    });
    api.initialize({ locale: 'en', fallbackLocale: 'zh-CN' });

    const items = [{ id: 'item-000', value: 0 }];
    const segments = [{ id: 'axis-00', start: 0, end: 1 }];
    const branches = { 1: { id: 'branch-1', branch: 1 } };
    const localizedItems = normalize(api.localizeItems(items));
    const localizedSegments = normalize(
        api.localizeAxisSegments(segments, 'axisSegments')
    );
    const localizedBranches = normalize(api.localizeBranches(branches));

    assert.deepEqual(localizedItems, [{
        id: 'item-000',
        value: 0,
        label: 'one',
        detail: {
            title: 'One',
            sections: []
        }
    }]);
    assert.deepEqual(localizedSegments, [{
        id: 'axis-00',
        start: 0,
        end: 1,
        text: 'Finite scale',
        detail: {
            title: 'Finite scale',
            sections: []
        }
    }]);
    assert.deepEqual(localizedBranches, {
        1: {
            id: 'branch-1',
            branch: 1,
            text: 'Branch one',
            detail: {
                title: 'Branch one',
                sections: []
            }
        }
    });
    assert.deepEqual(items, [{ id: 'item-000', value: 0 }]);
    assert.deepEqual(segments, [{ id: 'axis-00', start: 0, end: 1 }]);
    assert.deepEqual(branches, { 1: { id: 'branch-1', branch: 1 } });
});

test('partial locale records inherit missing fields from the fallback locale', () => {
    const { api } = createHarness();
    registerTestLocales(api);
    api.registerMessages('zh-CN', {
        items: {
            'item-000': {
                label: '一',
                detail: {
                    title: '条目一',
                    sections: [{ type: 'html', html: '<p>说明</p>' }]
                }
            }
        },
        axisSegments: {
            'axis-00': {
                text: '主轴',
                detail: {
                    title: '主轴',
                    sections: []
                }
            }
        },
        branches: {
            'branch-1': {
                text: '分支一',
                detail: {
                    title: '分支一',
                    sections: []
                }
            }
        }
    });
    api.registerMessages('en', {
        items: {
            'item-000': { label: 'one' }
        },
        axisSegments: {
            'axis-00': { text: 'Main axis' }
        },
        branches: {
            'branch-1': { text: 'Branch one' }
        }
    });
    api.initialize({ locale: 'en', fallbackLocale: 'zh-CN' });

    const item = normalize(api.localizeItems([
        { id: 'item-000', value: 0 }
    ])[0]);
    const segment = normalize(api.localizeAxisSegments([
        { id: 'axis-00', start: 0, end: 1 }
    ], 'axisSegments')[0]);
    const branch = normalize(api.localizeBranches({
        1: { id: 'branch-1', branch: 1 }
    })[1]);

    assert.equal(item.label, 'one');
    assert.equal(item.detail.title, '条目一');
    assert.equal(segment.text, 'Main axis');
    assert.equal(segment.detail.title, '主轴');
    assert.equal(branch.text, 'Branch one');
    assert.equal(branch.detail.title, '分支一');
});

test('localize helpers reject missing translations instead of hiding gaps', () => {
    const { api } = createHarness();
    registerTestLocales(api);
    api.initialize({ locale: 'en', fallbackLocale: 'zh-CN' });

    assert.throws(
        () => api.localizeItems([{ id: 'item-999' }]),
        /Missing item translation for item-999 in en/
    );
    assert.throws(
        () => api.localizeAxisSegments(
            [{ id: 'axis-99' }],
            'axisSegments'
        ),
        /Missing axis translation for axis-99 in en/
    );
    assert.throws(
        () => api.localizeBranches({
            9: { id: 'branch-9', branch: 9 }
        }),
        /Missing branch translation for branch-9 in en/
    );
});
