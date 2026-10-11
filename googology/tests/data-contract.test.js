'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const core = require('../scale-core.js');
const SOURCE_ROOT = path.join(__dirname, '..');
const LOCALES = ['zh-CN', 'en'];
const ITEM_IDS = Array.from(
    { length: 130 },
    (_, index) => `item-${String(index).padStart(3, '0')}`
).filter((id) => id !== 'item-110');
const AXIS_IDS = Array.from(
    { length: 9 },
    (_, index) => `axis-${String(index).padStart(2, '0')}`
);
const SUBAXIS_IDS = Array.from(
    { length: 12 },
    (_, index) => `subaxis-${String(index).padStart(2, '0')}`
);
const BRANCH_IDS = ['branch-1', 'branch-2', 'branch-3'];
const LOCALE_FILES = LOCALES.flatMap((locale) => [
    `locales/${locale}/interface.js`,
    `locales/${locale}/items-000-040.js`,
    `locales/${locale}/items-041-081.js`,
    `locales/${locale}/items-082-122.js`,
    `locales/${locale}/items-123-129.js`
]);

function normalize(value) {
    return JSON.parse(JSON.stringify(value));
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
                if (section.display !== undefined) {
                    assert.ok(['inline', 'dialog'].includes(section.display),
                        `${sectionDescription}.display`);
                }
                if (section.display === 'dialog') {
                    for (const key of ['openLabel', 'closeLabel']) {
                        assert.equal(typeof section[key], 'string',
                            `${sectionDescription}.${key}`);
                        assert.notEqual(section[key].trim(), '',
                            `${sectionDescription}.${key}`);
                    }
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

test('items.js contains unique stable geometry records on the main axis and three branches', () => {
    assert.equal(items.length, ITEM_IDS.length);
    assert.deepEqual(items.map(({ id }) => id), ITEM_IDS);
    assert.equal(new Set(items.map(({ id }) => id)).size, items.length);

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
        assert.equal([0, 1, 2, 3].includes(item.branch || 0), true);
        if (item.branch) {
            assert.ok(item.value >= core.CONFIG.RULER.BRANCH_START);
            assert.ok(item.value < core.CONFIG.BRANCH_ENDS[item.branch]);
        }
    });

    assert.deepEqual(items.filter((item) => item.value < 3).map(({ id }) => id),
        ITEM_IDS.slice(0, 57), 'all early-scale entries are retained');
    const positions = Object.fromEntries(items.map((item) => [item.id, item.value]));
    assert.deepEqual(
        ['057', '092', '098', '104', '109', '127', '115', '116', '118', '119', '121', '122']
            .map((id) => positions['item-' + id]),
        [3, 4, 5, 6, 7, 8.5, 9.5, 10.5, 11.5, 12.5, 14.5, 15.5]
    );
    assert.deepEqual(['123', '124', '125', '108', '126'].map((id) => positions['item-' + id]),
        [6.25, 6.375, 6.5, 6.75, 7.5]);
    assert.ok(positions['item-125'] < positions['item-107'] &&
        positions['item-107'] < positions['item-108'],
    'Y(1,4) lies between Y(1,3,4,3) and the Y-sequence limit');
    const ptoGap = core.CONFIG.AXIS_GAPS.find((gap) => gap.id === 'pto-gap');
    assert.equal((ptoGap.start + ptoGap.end) / 2,
        (core.CONFIG.RULER.FORK_X + positions['item-127']) / 2,
        'the short omission is centered between the fork and the KP node');
    assert.deepEqual(['111', '112', '113', '114', '120', '128'].map((id) => positions['item-' + id]),
        [9.5, 10.3, 11.8, 12.5, 12, 9.5]);
    assert.ok(items.filter((item) => ['item-115', 'item-116', 'item-117', 'item-118', 'item-119', 'item-127', 'item-129'].includes(item.id))
        .every((item) => !item.branch), 'PTO, Loader and DQDN belong to the main axis');
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
});

test('filters retain their meaning after entries move between lanes and locales', () => {
    for (const locale of LOCALES) {
        const models = localized[locale].items.map(core.createItemModel);

        for (const zoom of [1, 2, 4, 10]) {
            for (const filter of ['all', 'info', 'code']) {
                const state = core.createState({ zoom, filter });
                const shown = models.filter((model) =>
                    core.isLabelVisible(model, state)
                );
                assert.ok(shown.every((model) => model.minZoom <= zoom));
                assert.ok(shown.every((model) => filter === 'all' ||
                    (filter === 'code' ? model.hasCode : model.hasInfo)));
                const otherLocale = locale === 'en' ? 'zh-CN' : 'en';
                const counterparts = localized[otherLocale].items.map(core.createItemModel)
                    .filter((model) => core.isLabelVisible(model, state));
                assert.deepEqual(shown.map((model) => model.item.id),
                    counterparts.map((model) => model.item.id));
            }
        }
    }
});

test('models preserve every item when several labels share one value', () => {
    for (const locale of LOCALES) {
        const models = localized[locale].items.map(core.createItemModel);
        const uniqueValues = new Set(models.map((model) => model.value));
        const atTwo = models.filter((model) => model.value === 2);

        assert.ok(uniqueValues.size < models.length);
        assert.equal(models.length, items.length);
        assert.deepEqual(
            atTwo.map((model) => model.item.id),
            ['item-017', 'item-018', 'item-019', 'item-020']
        );
        assert.equal(new Set(atTwo.map((model) => model.index)).size, 4);
    }
});

test('axis structures keep their topology and contain no prose', () => {
    const { branchNames, axisSegments, axisSubSegments } = axisData;

    assert.deepEqual(Object.keys(branchNames), ['1', '2', '3']);
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

    assert.equal(axisSegments.length, 9);
    assert.deepEqual(axisSegments.map(({ id }) => id).sort(), AXIS_IDS);
    assert.deepEqual(
        axisSegments.map(({ start, end }) => [start, end]),
        [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [6, 8.025],
            [8.225, 12.8],
            [14.2, 16]
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
    core.CONFIG.AXIS_GAPS.forEach((gap) => {
        assert.ok(axisSegments.every((segment) =>
            segment.end <= gap.start || segment.start >= gap.end),
        `${gap.id} remains visibly disconnected`);
    });
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
            if (entry.detail !== undefined) {
                assertStructuredDetail(
                    entry.detail,
                    `${locale}.${entry.id}.detail`
                );
            }
        });
    }
});
