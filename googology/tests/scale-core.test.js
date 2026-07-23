'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const core = require('../scale-core.js');

test('scale-core exposes the same API to CommonJS and a classic script', () => {
    assert.equal(typeof core.createItemModel, 'function');
    assert.equal(typeof core.rulerGeometry, 'function');

    const source = fs.readFileSync(
        path.join(__dirname, '..', 'scale-core.js'),
        'utf8'
    );
    const context = vm.createContext(Object.create(null));
    vm.runInContext(source, context, { filename: 'scale-core.js' });

    assert.equal(typeof context.GoogologyScaleCore, 'object');
    assert.equal(
        context.GoogologyScaleCore.CONFIG.VIEW.MIN_BUTTON_ZOOM,
        0.1
    );
    assert.equal(
        context.GoogologyScaleCore.CONFIG.VIEW.MIN_WHEEL_ZOOM,
        0.75
    );
});

test('CONFIG centralizes the ruler, zoom, branch, item, and feature constants', () => {
    assert.deepEqual(core.CONFIG.RULER, {
        START: 0,
        DOUBLE_AXIS_END: 6,
        FORK_X: 6.75,
        BRANCH_START: 7.25,
        BRANCH_END: 8.85,
        MERGE_X: 9,
        UNCOMPUTABLE_START: 9.5,
        END: 12
    });
    assert.deepEqual(core.CONFIG.BRANCH_Y_OFFSETS, {
        1: -225,
        2: -75,
        3: 75,
        4: 225
    });
    assert.deepEqual(core.CONFIG.ZOOM_LEVELS, {
        0: 0,
        1: 2,
        2: 4,
        3: 10
    });
    assert.equal(core.CONFIG.ITEM_LAYOUT.BASE_OFFSET, 35);
    assert.equal(core.CONFIG.ITEM_LAYOUT.LEVEL_GAP, 65);
    assert.equal(core.CONFIG.ELLIPSIS.COUNT, 6);
    assert.equal(core.CONFIG.FEATURES.SHOW_MERGE_CURVES, false);
});

test('item models derive filter, branch, and layout facts without mutation', () => {
    const item = {
        value: 8,
        label: 'example',
        detail: '<h2>Example</h2><pre>code</pre>',
        zoomLevel: 2,
        side: 'bottom',
        level: 3,
        branch: 4
    };
    const before = structuredClone(item);
    const model = core.createItemModel(item, 17);

    assert.deepEqual(item, before);
    assert.equal(model.item, item);
    assert.equal(model.index, 17);
    assert.equal(model.hasInfo, true);
    assert.equal(model.hasCode, true);
    assert.equal(model.branchId, 4);
    assert.equal(model.yOffset, 225);
    assert.equal(model.isBottom, true);
    assert.equal(model.minZoom, 4);
    assert.equal(model.labelOffset, 230);

    assert.equal(
        core.createItemModel({
            value: 0,
            label: '',
            detail: '<CODE>case-sensitive legacy behavior</CODE>',
            zoomLevel: 0,
            side: 'top',
            level: 0,
            branch: 0
        }, 0).hasCode,
        false
    );
});

test('item models recognize structured code sections without scanning HTML', () => {
    const structuredCode = {
        value: 1,
        label: 'structured code',
        detail: {
            title: 'Structured code',
            sections: [
                {
                    type: 'html',
                    html: '<p>An ordinary explanation.</p>'
                },
                {
                    type: 'code',
                    language: 'python',
                    source: 'print(1)'
                }
            ]
        },
        zoomLevel: 0,
        side: 'top',
        level: 0
    };
    const inlineMarkupOnly = {
        ...structuredCode,
        label: 'inline markup only',
        detail: {
            title: 'Inline markup',
            sections: [{
                type: 'html',
                html: '<p><code>inline</code> is prose, not a code sample.</p>'
            }]
        }
    };
    const before = structuredClone(structuredCode);

    assert.equal(core.createItemModel(structuredCode, 0).hasCode, true);
    assert.equal(core.createItemModel(inlineMarkupOnly, 1).hasCode, false);
    assert.deepEqual(structuredCode, before);
});

test('filter predicates preserve all, info, and code semantics', () => {
    const plain = { hasInfo: false, hasCode: false };
    const info = { hasInfo: true, hasCode: false };
    const code = { hasInfo: true, hasCode: true };

    assert.equal(core.passesFilter(plain, 'all'), true);
    assert.equal(core.passesFilter(plain, 'unknown'), true);
    assert.equal(core.passesFilter(plain, 'info'), false);
    assert.equal(core.passesFilter(info, 'info'), true);
    assert.equal(core.passesFilter(info, 'code'), false);
    assert.equal(core.passesFilter(code, 'code'), true);
});

test('automatic zoom thresholds include their exact boundaries', () => {
    for (const [zoomLevel, threshold] of [[1, 2], [2, 4], [3, 10]]) {
        const model = { zoomLevel, minZoom: threshold };
        assert.equal(
            core.passesZoom(model, core.createState({
                zoom: threshold - 1e-9
            })),
            false
        );
        assert.equal(
            core.passesZoom(model, core.createState({ zoom: threshold })),
            true
        );
    }

    const always = { zoomLevel: 0, minZoom: 0 };
    assert.equal(
        core.passesZoom(always, core.createState({ zoom: 0.1 })),
        true
    );
});

test('manual zoom mode compares item levels inclusively', () => {
    const state = core.createState({
        zoom: 0.1,
        zoomFilterEnabled: false,
        manualZoomLevel: '2'
    });

    assert.equal(core.passesZoom({ zoomLevel: 2, minZoom: 4 }, state), true);
    assert.equal(core.passesZoom({ zoomLevel: 3, minZoom: 10 }, state), false);
});

test('label visibility combines filters and zoom while ticks keep zoom hints', () => {
    const model = core.createItemModel({
        value: 1,
        label: 'hidden until zoom 2',
        zoomLevel: 1,
        side: 'top',
        level: 0,
        branch: 0
    }, 0);
    const state = core.createState({
        zoom: 1,
        offsetX: 0,
        filter: 'all'
    });

    assert.equal(core.isLabelVisible(model, state), false);
    assert.deepEqual(core.tickGeometry(model, state, 1000), {
        x: 250,
        left: 250,
        side: 'top',
        isBottom: false,
        branchId: 0,
        axisYOffset: 0,
        isLong: false,
        isShort: true,
        height: 27,
        color: '#666'
    });

    assert.equal(
        core.tickGeometry(model, { ...state, filter: 'info' }, 1000),
        null
    );
});

test('tick culling retains the exact 50px boundary', () => {
    const model = core.createItemModel({
        value: 0,
        label: 'edge',
        zoomLevel: 0,
        side: 'bottom',
        level: 0,
        branch: 0
    }, 0);

    assert.notEqual(
        core.tickGeometry(model, core.createState({ offsetX: -50 }), 100),
        null
    );
    assert.equal(
        core.tickGeometry(
            model,
            core.createState({ offsetX: -50.000001 }),
            100
        ),
        null
    );
    assert.notEqual(
        core.tickGeometry(model, core.createState({ offsetX: 150 }), 100),
        null
    );
    assert.equal(
        core.tickGeometry(
            model,
            core.createState({ offsetX: 150.000001 }),
            100
        ),
        null
    );
});

test('short tick heights preserve the legacy rendered formula', () => {
    assert.deepEqual(
        [0, 1, 2, 3].map(core.shortTickHeight),
        [30, 27, 24, 21]
    );
    assert.equal(core.shortTickHeight(20), 2);
});
