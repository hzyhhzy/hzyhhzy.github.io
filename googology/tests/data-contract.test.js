'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const core = require('../scale-core.js');
const SOURCE_ROOT = path.join(__dirname, '..');
const LOCALES = ['zh-CN', 'en'];
const ITEM_IDS = Array.from(
    { length: 123 },
    (_, index) => `item-${String(index).padStart(3, '0')}`
);
const AXIS_IDS = Array.from(
    { length: 8 },
    (_, index) => `axis-${String(index).padStart(2, '0')}`
);
const SUBAXIS_IDS = Array.from(
    { length: 12 },
    (_, index) => `subaxis-${String(index).padStart(2, '0')}`
);
const BRANCH_IDS = ['branch-1', 'branch-2', 'branch-3', 'branch-4'];
const ITEM_GEOMETRY_SHA256 =
    '77abcda4a6a1e31b8ea86f6c1046fde4191cc42fd9a72067af120615236f19de';
const AXIS_GEOMETRY_SHA256 =
    '641740590846961d95cc500de2d0f62cdc63498d597c555bb3bc4e13728d1f1f';
const LOCALE_FILES = LOCALES.flatMap((locale) => [
    `locales/${locale}/interface.js`,
    `locales/${locale}/items-000-040.js`,
    `locales/${locale}/items-041-081.js`,
    `locales/${locale}/items-082-122.js`
]);

function normalize(value) {
    return JSON.parse(JSON.stringify(value));
}

function sha256(value) {
    return crypto
        .createHash('sha256')
        .update(JSON.stringify(value))
        .digest('hex');
}

function runClassicScript(context, filename) {
    const source = fs.readFileSync(
        path.join(SOURCE_ROOT, filename),
        'utf8'
    );
    vm.runInContext(source, context, { filename });
}

function readClassicScript(filename, expression) {
    const context = vm.createContext(Object.create(null));
    runClassicScript(context, filename);
    vm.runInContext(
        `globalThis.__result = ${expression};`,
        context,
        { filename }
    );
    return normalize(context.__result);
}

function createLocalizedFixture() {
    const storage = new Map();
    const context = vm.createContext({
        document: {
            documentElement: {
                lang: 'zh-CN',
                dir: 'ltr'
            }
        },
        navigator: { language: 'zh-CN' },
        localStorage: {
            getItem(key) {
                return storage.has(key) ? storage.get(key) : null;
            },
            setItem(key, value) {
                storage.set(key, String(value));
            }
        }
    });
    context.window = context;

    runClassicScript(context, 'i18n.js');
    LOCALE_FILES.forEach((filename) => {
        runClassicScript(context, filename);
    });

    const i18n = context.GoogologyI18n;
    i18n.initialize({
        locale: 'zh-CN',
        fallbackLocale: 'zh-CN'
    });

    return { i18n, context };
}

function localize(fixture, locale, structure) {
    const { i18n } = fixture;
    i18n.setLocale(locale, { persist: false, notify: false });

    return normalize({
        messages: {
            items: i18n.get('items', { locale }),
            branches: i18n.get('branches', { locale }),
            axisSegments: i18n.get('axisSegments', { locale }),
            axisSubSegments: i18n.get('axisSubSegments', { locale })
        },
        items: i18n.localizeItems(structure.items),
        branches: i18n.localizeBranches(structure.branchNames),
        axisSegments: i18n.localizeAxisSegments(
            structure.axisSegments,
            'axisSegments'
        ),
        axisSubSegments: i18n.localizeAxisSegments(
            structure.axisSubSegments,
            'axisSubSegments'
        )
    });
}

function assertExactKeys(object, expected, description) {
    assert.deepEqual(
        Object.keys(object).sort(),
        [...expected].sort(),
        description
    );
}

function assertAllowedKeys(object, allowed, description) {
    const unexpected = Object.keys(object).filter(
        (key) => !allowed.has(key)
    );
    assert.deepEqual(unexpected, [], description);
}

function assertListItems(items, description) {
    assert.equal(Array.isArray(items), true, `${description}.items`);

    items.forEach((item, index) => {
        const itemDescription = `${description}.items[${index}]`;
        if (typeof item === 'string') {
            return;
        }

        assert.equal(
            item !== null && typeof item === 'object',
            true,
            itemDescription
        );
        assert.equal(typeof item.html, 'string', `${itemDescription}.html`);
        if (item.ordered !== undefined) {
            assert.equal(
                typeof item.ordered,
                'boolean',
                `${itemDescription}.ordered`
            );
        }
        if (item.children !== undefined) {
            assertListItems(item.children, `${itemDescription}.children`);
        }
    });
}

function assertStructuredDetail(detail, description) {
    assert.equal(
        detail !== null && typeof detail === 'object' &&
            !Array.isArray(detail),
        true,
        description
    );
    assert.equal(
        typeof detail.title,
        'string',
        `${description}.title`
    );
    assert.notEqual(detail.title.trim(), '', `${description}.title`);
    assert.equal(
        Array.isArray(detail.sections),
        true,
        `${description}.sections`
    );

    detail.sections.forEach((section, index) => {
        const sectionDescription = `${description}.sections[${index}]`;
        assert.equal(
            section !== null && typeof section === 'object' &&
                !Array.isArray(section),
            true,
            sectionDescription
        );

        switch (section.type) {
            case 'html':
            case 'paragraph':
            case 'note':
                assert.equal(
                    typeof section.html,
                    'string',
                    `${sectionDescription}.html`
                );
                break;
            case 'heading':
                assert.equal(
                    typeof section.html,
                    'string',
                    `${sectionDescription}.html`
                );
                if (section.level !== undefined) {
                    assert.equal(
                        Number.isInteger(section.level),
                        true,
                        `${sectionDescription}.level`
                    );
                }
                break;
            case 'list':
                assertListItems(section.items, sectionDescription);
                if (section.ordered !== undefined) {
                    assert.equal(
                        typeof section.ordered,
                        'boolean',
                        `${sectionDescription}.ordered`
                    );
                }
                break;
            case 'code':
                assert.equal(
                    typeof section.source,
                    'string',
                    `${sectionDescription}.source`
                );
                assert.equal(
                    typeof section.language,
                    'string',
                    `${sectionDescription}.language`
                );
                if (section.title !== undefined) {
                    assert.equal(
                        typeof section.title,
                        'string',
                        `${sectionDescription}.title`
                    );
                }
                break;
            default:
                assert.fail(
                    `${sectionDescription} has unsupported type ` +
                    String(section.type)
                );
        }
    });
}

const items = readClassicScript('items.js', 'items');
const axisData = readClassicScript(
    'axis_items.js',
    '({ branchNames, axisSegments, axisSubSegments })'
);
const structure = { items, ...axisData };
const localeFixture = createLocalizedFixture();
const localized = Object.fromEntries(
    LOCALES.map((locale) => [
        locale,
        localize(localeFixture, locale, structure)
    ])
);

test('items.js contains only 123 stable, continuous geometry records', () => {
    assert.equal(items.length, 123);
    assert.deepEqual(items.map(({ id }) => id), ITEM_IDS);
    assert.equal(new Set(items.map(({ id }) => id)).size, items.length);
    assert.deepEqual(
        [0, 1, 2, 3].map((zoomLevel) =>
            items.filter((item) => item.zoomLevel === zoomLevel).length
        ),
        [47, 29, 18, 29]
    );
    assert.deepEqual(
        [0, 1, 2, 3, 4].map((branchId) =>
            items.filter((item) => (item.branch || 0) === branchId).length
        ),
        [109, 4, 4, 5, 1]
    );
    assert.deepEqual(
        ['top', 'bottom'].map((side) =>
            items.filter((item) => item.side === side).length
        ),
        [92, 31]
    );

    const allowedKeys = new Set([
        'id',
        'value',
        'zoomLevel',
        'side',
        'level',
        'branch'
    ]);

    items.forEach((item) => {
        assertAllowedKeys(
            item,
            allowedKeys,
            `${item.id} leaked localized content into items.js`
        );
        assert.equal(Number.isFinite(item.value), true);
        assert.equal([0, 1, 2, 3].includes(item.zoomLevel), true);
        assert.equal(['top', 'bottom'].includes(item.side), true);
        assert.equal(Number.isInteger(item.level) && item.level >= 0, true);
        assert.equal([0, 1, 2, 3, 4].includes(item.branch || 0), true);
    });

    assert.deepEqual(
        [items[0].id, items[0].value, items.at(-1).id, items.at(-1).value],
        ['item-000', 0, 'item-122', 11]
    );
    assert.equal(
        sha256(items.map((item) => [
            item.value,
            item.zoomLevel,
            item.side,
            item.level,
            item.branch || 0
        ])),
        ITEM_GEOMETRY_SHA256,
        'the complete item geometry must remain byte-for-byte compatible'
    );
});

test('both locale packs independently cover all item content', () => {
    for (const locale of LOCALES) {
        const content = localized[locale];
        assertExactKeys(
            content.messages.items,
            ITEM_IDS,
            `${locale} item message coverage`
        );
        assert.equal(content.items.length, items.length);

        content.items.forEach((item, index) => {
            assert.equal(item.id, ITEM_IDS[index], `${locale} item order`);
            assert.equal(
                typeof item.label,
                'string',
                `${locale}.${item.id}.label`
            );
            assert.notEqual(
                item.label.trim(),
                '',
                `${locale}.${item.id}.label`
            );

            const message = content.messages.items[item.id];
            assertAllowedKeys(
                message,
                new Set(['label', 'detail']),
                `${locale}.${item.id} contains non-content fields`
            );
            if (item.detail !== undefined) {
                assertStructuredDetail(
                    item.detail,
                    `${locale}.${item.id}.detail`
                );
            }
        });
    }
});

test('Chinese and English item details remain structurally symmetric', () => {
    const chinese = localized['zh-CN'].items;
    const english = localized.en.items;

    chinese.forEach((item, index) => {
        const counterpart = english[index];
        assert.equal(counterpart.id, item.id);
        assert.equal(
            Boolean(counterpart.detail),
            Boolean(item.detail),
            `${item.id} detail presence`
        );

        if (!item.detail) {
            return;
        }

        assert.deepEqual(
            counterpart.detail.sections.map(({ type }) => type),
            item.detail.sections.map(({ type }) => type),
            `${item.id} section types`
        );
    });

    const codeIds = Object.fromEntries(
        LOCALES.map((locale) => [
            locale,
            localized[locale].items
                .filter((item) =>
                    item.detail && item.detail.sections.some(
                        (section) => section.type === 'code'
                    )
                )
                .map(({ id }) => id)
        ])
    );

    assert.deepEqual(codeIds.en, codeIds['zh-CN']);
    assert.equal(codeIds.en.length, 21);
});

test('corrected content facts and explicit TODO markers stay synchronized', () => {
    for (const locale of LOCALES) {
        const content = localized[locale];
        const tenBillion = content.items.find(
            ({ id }) => id === 'item-003'
        );
        const rayo = content.items.find(
            ({ id }) => id === 'item-122'
        );
        const unnamedRange = content.axisSubSegments.find(
            ({ id }) => id === 'subaxis-10'
        );
        const rayoHtml = rayo.detail.sections
            .map(({ html = '' }) => html)
            .join(' ');

        assert.equal(
            tenBillion.detail.title,
            '\\(10^{10}=10{,}000{,}000{,}000\\)'
        );
        assert.equal(
            unnamedRange.text.startsWith('[TODO:'),
            true,
            `${locale} should expose the unfinished range name`
        );
        assert.equal(
            rayoHtml.includes(
                locale === 'zh-CN'
                    ? '一阶集合论'
                    : 'first-order set theory'
            ),
            true,
            `${locale} should identify the object language`
        );
        assert.equal(
            rayoHtml.includes(
                locale === 'zh-CN'
                    ? '二阶集合论'
                    : 'second-order set theory'
            ),
            true,
            `${locale} should identify the metalanguage`
        );
        assert.equal(
            rayoHtml.includes(
                locale === 'zh-CN'
                    ? '并不是使用二阶算术语言'
                    : 'does not use the language of second-order arithmetic'
            ),
            true,
            `${locale} should explicitly correct the former Rayo error`
        );
    }
});

test('localized models preserve the original info/code filter counts', () => {
    const expected = {
        1: { all: 47, info: 44, code: 16 },
        2: { all: 76, info: 68, code: 20 },
        4: { all: 94, info: 81, code: 21 },
        10: { all: 123, info: 90, code: 21 }
    };

    for (const locale of LOCALES) {
        const models = localized[locale].items.map(core.createItemModel);

        for (const zoom of [1, 2, 4, 10]) {
            for (const filter of ['all', 'info', 'code']) {
                const state = core.createState({ zoom, filter });
                const count = models.filter((model) =>
                    core.isLabelVisible(model, state)
                ).length;
                assert.equal(
                    count,
                    expected[zoom][filter],
                    `${locale}: zoom=${zoom}, filter=${filter}`
                );
            }
        }
    }
});

test('models preserve every item when several labels share one value', () => {
    for (const locale of LOCALES) {
        const models = localized[locale].items.map(core.createItemModel);
        const uniqueValues = new Set(models.map((model) => model.value));
        const atTwo = models.filter((model) => model.value === 2);

        assert.equal(uniqueValues.size, 87);
        assert.equal(models.length, 123);
        assert.deepEqual(
            atTwo.map((model) => model.item.id),
            ['item-017', 'item-018', 'item-019', 'item-020']
        );
        assert.equal(new Set(atTwo.map((model) => model.index)).size, 4);
    }
});

test('axis structures keep their topology and contain no prose', () => {
    const { branchNames, axisSegments, axisSubSegments } = axisData;

    assert.deepEqual(Object.keys(branchNames), ['1', '2', '3', '4']);
    assert.deepEqual(
        Object.values(branchNames).map(({ id }) => id),
        BRANCH_IDS
    );
    Object.values(branchNames).forEach((branch) => {
        assertAllowedKeys(
            branch,
            new Set(['id', 'branch']),
            `${branch.id} leaked localized content`
        );
    });

    assert.equal(axisSegments.length, 8);
    assert.deepEqual(axisSegments.map(({ id }) => id), AXIS_IDS);
    assert.deepEqual(
        axisSegments.map(({ start, end }) => [start, end]),
        [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [6, 6.75],
            [9.5, 12]
        ]
    );

    assert.equal(axisSubSegments.length, 12);
    assert.deepEqual(axisSubSegments.map(({ id }) => id), SUBAXIS_IDS);
    assert.deepEqual(
        axisSubSegments.map(({ start, end }) => [start, end]),
        Array.from({ length: 12 }, (_, index) => [
            index / 2,
            (index + 1) / 2
        ])
    );

    const allowedSegmentKeys = new Set([
        'id',
        'start',
        'end',
        'bg',
        'color'
    ]);
    [...axisSegments, ...axisSubSegments].forEach((segment) => {
        assertAllowedKeys(
            segment,
            allowedSegmentKeys,
            `${segment.id} leaked localized content`
        );
    });
    assert.equal(
        sha256({
            branches: Object.keys(branchNames),
            axis: axisSegments.map((segment) => [
                segment.start,
                segment.end,
                segment.bg,
                segment.color
            ]),
            subaxis: axisSubSegments.map((segment) => [
                segment.start,
                segment.end,
                segment.bg,
                segment.color
            ])
        }),
        AXIS_GEOMETRY_SHA256,
        'the complete axis geometry and palette must remain compatible'
    );
});

test('both locale packs cover branch and axis content with valid details', () => {
    for (const locale of LOCALES) {
        const content = localized[locale];
        assertExactKeys(
            content.messages.branches,
            BRANCH_IDS,
            `${locale} branch coverage`
        );
        assertExactKeys(
            content.messages.axisSegments,
            AXIS_IDS,
            `${locale} axis coverage`
        );
        assertExactKeys(
            content.messages.axisSubSegments,
            SUBAXIS_IDS,
            `${locale} subaxis coverage`
        );

        [
            ...Object.values(content.branches),
            ...content.axisSegments,
            ...content.axisSubSegments
        ].forEach((entry) => {
            assert.equal(typeof entry.text, 'string', `${locale}.${entry.id}`);
            assert.notEqual(entry.text.trim(), '', `${locale}.${entry.id}`);
            assertStructuredDetail(
                entry.detail,
                `${locale}.${entry.id}.detail`
            );
        });
    }
});
