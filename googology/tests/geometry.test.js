'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const core = require('../scale-core.js');

function approximately(actual, expected, epsilon = 1e-9) {
    assert.ok(
        Math.abs(actual - expected) <= epsilon,
        `${actual} is not within ${epsilon} of ${expected}`
    );
}

test('world coordinates use offset + value * pixels-per-unit * zoom', () => {
    const state = core.createState({ zoom: 2, offsetX: -125 });
    assert.equal(core.unitWidth(state), 500);
    assert.equal(core.worldToScreen(3.5, state), 1625);
});

test('offset clamping keeps START and END from crossing the viewport center', () => {
    assert.equal(core.clampOffset(1000, 1, 1000), 500);
    assert.equal(core.clampOffset(-10000, 1, 1000), -3500);
    assert.equal(core.clampOffset(-1000, 1, 1000), -1000);
});

test('resetView restores zoom 1 and centers the full ruler', () => {
    const original = core.createState({
        zoom: 7,
        offsetX: 99,
        filter: 'code',
        manualZoomLevel: 3
    });
    const reset = core.resetView(original, 1000);

    assert.equal(reset.zoom, 1);
    assert.equal(reset.offsetX, -1500);
    assert.equal(reset.filter, 'code');
    assert.equal(reset.manualZoomLevel, 3);
    assert.notEqual(reset, original);
    assert.equal(original.zoom, 7);
});

test('zoomAt preserves the anchor world coordinate when clamping is inactive', () => {
    const state = core.createState({ zoom: 2, offsetX: -1000 });
    const anchorX = 250;
    const worldBefore = (
        (anchorX - state.offsetX) /
        (core.CONFIG.VIEW.PIXELS_PER_UNIT * state.zoom)
    );
    const zoomed = core.zoomAt(state, {
        factor: 2,
        anchorX,
        minZoom: core.CONFIG.VIEW.MIN_BUTTON_ZOOM,
        viewportWidth: 1000
    });
    const worldAfter = (
        (anchorX - zoomed.offsetX) /
        (core.CONFIG.VIEW.PIXELS_PER_UNIT * zoomed.zoom)
    );

    assert.equal(zoomed.zoom, 4);
    assert.equal(zoomed.offsetX, -2250);
    approximately(worldAfter, worldBefore);
    assert.equal(state.zoom, 2);
    assert.equal(state.offsetX, -1000);
});

test('button and wheel zoom retain their distinct minimum zooms', () => {
    const state = core.createState({ zoom: 1, offsetX: -1000 });
    const button = core.zoomAt(state, {
        factor: 0.001,
        anchorX: 500,
        minZoom: core.CONFIG.VIEW.MIN_BUTTON_ZOOM,
        viewportWidth: 1000
    });
    const wheel = core.zoomAt(state, {
        factor: 0.001,
        anchorX: 500,
        minZoom: core.CONFIG.VIEW.MIN_WHEEL_ZOOM,
        viewportWidth: 1000
    });

    assert.equal(button.zoom, 0.1);
    assert.equal(wheel.zoom, 0.75);
    assert.equal(
        core.CONFIG.VIEW.MIN_BUTTON_ZOOM,
        0.1
    );
    assert.equal(
        core.CONFIG.VIEW.MIN_WHEEL_ZOOM,
        0.75
    );
});

test('panBy applies a delta and then clamps without mutating state', () => {
    const state = core.createState({ zoom: 1, offsetX: -1000 });
    assert.equal(core.panBy(state, 200, 1000).offsetX, -800);
    assert.equal(core.panBy(state, 5000, 1000).offsetX, 500);
    assert.equal(core.panBy(state, -5000, 1000).offsetX, -3500);
    assert.equal(state.offsetX, -1000);
});

test('itemGeometry preserves branch and top/bottom label placement', () => {
    const top = core.createItemModel({
        value: 7.25,
        label: 'top',
        zoomLevel: 0,
        side: 'top',
        level: 2,
        branch: 1
    }, 0);
    const bottom = core.createItemModel({
        value: 8.25,
        label: 'bottom',
        zoomLevel: 0,
        side: 'bottom',
        level: 1,
        branch: 3
    }, 1);
    const state = core.createState({ zoom: 1, offsetX: -1000 });

    assert.deepEqual(core.itemGeometry(top, state), {
        x: 812.5,
        left: 812.5,
        side: 'top',
        isBottom: false,
        branchId: 1,
        axisYOffset: -230,
        labelOffset: 185,
        centerYOffset: -415,
        transform: 'translate(-50%, -100%)'
    });
    assert.deepEqual(core.itemGeometry(bottom, state), {
        x: 1062.5,
        left: 1062.5,
        side: 'bottom',
        isBottom: true,
        branchId: 3,
        axisYOffset: 460,
        labelOffset: 110,
        centerYOffset: 570,
        transform: 'translate(-50%, 0)'
    });
});

test('axis segment geometry includes overlap and double-axis boundary', () => {
    const state = core.createState({ zoom: 2 });
    assert.deepEqual(
        core.axisSegmentGeometry({ start: 5, end: 6 }, state),
        { left: 2500, width: 505, isDoubleAxis: true }
    );
    assert.deepEqual(
        core.axisSegmentGeometry({ start: 6, end: 6.75 }, state),
        { left: 3000, width: 380, isDoubleAxis: false }
    );
});

test('rulerGeometry keeps the main axis straight and describes three independent branches', () => {
    const state = core.createState({ zoom: 1, offsetX: -1000 });
    const geometry = core.rulerGeometry(state, {
        width: 1000,
        height: 800
    });

    assert.equal(geometry.unitWidth, 250);
    assert.deepEqual(geometry.x, {
        start: -1000,
        doubleAxisEnd: 500,
        fork: 937.5,
        branchStart: 1250,
        uncomputableStart: 2550,
        end: 3000
    });
    assert.deepEqual(geometry.ruler, { left: -1000, width: 4005 });
    assert.deepEqual(
        geometry.branches.map(({ branchId, yOffset, y, left, width }) => ({
            branchId,
            yOffset,
            y,
            left,
            width
        })),
        [
            { branchId: 1, yOffset: -230, y: 170, left: 1250, width: 1000 },
            { branchId: 2, yOffset: 230, y: 630, left: 1250, width: 375 },
            { branchId: 3, yOffset: 460, y: 860, left: 1250, width: 1000 }
        ]
    );
    assert.deepEqual(geometry.branches[0].forkCurve, {
        start: { x: 936.5, y: 400 },
        control1: { x: 1093.75, y: 400 },
        control2: { x: 1093.75, y: 170 },
        end: { x: 1251, y: 170 }
    });
    assert.ok(geometry.branches.every((branch) => !('mergeCurve' in branch)));
    assert.equal(geometry.finalArrowX, 2999);
});

test('both main-axis omissions remain within their requested gaps at every zoom', () => {
    for (const zoom of [0.1, 1, 4, 20]) {
        const state = core.createState({ zoom, offsetX: -200 });
        const geometry = core.rulerGeometry(state, { width: 1200, height: 1100 });
        assert.equal(geometry.ellipsis.length, 10);
        core.CONFIG.AXIS_GAPS.forEach((gap) => {
            const dots = geometry.ellipsis.filter((dot) => dot.gapId === gap.id);
            assert.equal(dots.length, gap.count);
            dots.forEach((dot) => {
                assert.ok(dot.screenX > core.worldToScreen(gap.start, state));
                assert.ok(dot.screenX + dot.width < core.worldToScreen(gap.end, state));
                assert.ok(dot.width > 0);
            });
        });
    }
});
