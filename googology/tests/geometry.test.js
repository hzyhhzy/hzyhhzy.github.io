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
    assert.equal(core.clampOffset(-10000, 1, 1000), -2500);
    assert.equal(core.clampOffset(-1000, 1, 1000), -1000);
});

test('resetView restores zoom 1 and centers the full 0..12 ruler', () => {
    const original = core.createState({
        zoom: 7,
        offsetX: 99,
        filter: 'code',
        manualZoomLevel: 3
    });
    const reset = core.resetView(original, 1000);

    assert.equal(reset.zoom, 1);
    assert.equal(reset.offsetX, -1000);
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
    assert.equal(core.panBy(state, -5000, 1000).offsetX, -2500);
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
        axisYOffset: -225,
        labelOffset: 165,
        centerYOffset: -390,
        transform: 'translate(-50%, -100%)'
    });
    assert.deepEqual(core.itemGeometry(bottom, state), {
        x: 1062.5,
        left: 1062.5,
        side: 'bottom',
        isBottom: true,
        branchId: 3,
        axisYOffset: 75,
        labelOffset: 100,
        centerYOffset: 175,
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

test('rulerGeometry describes endpoints, branches, curves, and ellipsis', () => {
    const state = core.createState({ zoom: 1, offsetX: -1000 });
    const geometry = core.rulerGeometry(state, {
        width: 1000,
        height: 800
    });

    assert.equal(geometry.unitWidth, 250);
    assert.deepEqual(geometry.x, {
        start: -1000,
        doubleAxisEnd: 500,
        fork: 687.5,
        branchStart: 812.5,
        branchEnd: 1212.5,
        merge: 1250,
        uncomputableStart: 1375,
        end: 2000
    });
    assert.deepEqual(geometry.ruler, { left: -1000, width: 3005 });
    assert.deepEqual(
        geometry.branches.map(({ branchId, yOffset, y, left, width }) => ({
            branchId,
            yOffset,
            y,
            left,
            width
        })),
        [
            { branchId: 1, yOffset: -225, y: 175, left: 812.5, width: 400 },
            { branchId: 2, yOffset: -75, y: 325, left: 812.5, width: 400 },
            { branchId: 3, yOffset: 75, y: 475, left: 812.5, width: 400 },
            { branchId: 4, yOffset: 225, y: 625, left: 812.5, width: 400 }
        ]
    );
    assert.deepEqual(geometry.branches[0].forkCurve, {
        start: { x: 686.5, y: 400 },
        control1: { x: 750, y: 400 },
        control2: { x: 750, y: 175 },
        end: { x: 813.5, y: 175 }
    });
    assert.equal(geometry.ellipsis.length, 6);
    assert.deepEqual(geometry.ellipsis[0], {
        index: 0,
        relativeLeft: 2262.5,
        screenX: 1262.5,
        width: 10
    });
    assert.deepEqual(geometry.ellipsis.at(-1), {
        index: 5,
        relativeLeft: 2375,
        screenX: 1375,
        width: 10
    });
    assert.equal(geometry.finalArrowX, 1999);
    assert.equal(geometry.showMergeCurves, false);
});
