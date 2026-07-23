(function (root, factory) {
    'use strict';

    var api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }

    if (root) {
        root.GoogologyScaleCore = api;
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    var RULER = Object.freeze({
        START: 0,
        DOUBLE_AXIS_END: 6,
        FORK_X: 6.75,
        BRANCH_START: 7.25,
        BRANCH_END: 8.85,
        MERGE_X: 9,
        UNCOMPUTABLE_START: 9.5,
        END: 12
    });

    var VIEW = Object.freeze({
        PIXELS_PER_UNIT: 250,
        DEFAULT_ZOOM: 1,
        MIN_BUTTON_ZOOM: 0.1,
        MIN_WHEEL_ZOOM: 0.75,
        MAX_ZOOM: 20,
        BUTTON_ZOOM_IN_FACTOR: 1.2,
        BUTTON_ZOOM_OUT_FACTOR: 0.8,
        WHEEL_FACTOR: 1.1,
        WHEEL_ZOOM_FACTOR: 1.1,
        TICK_CULL_MARGIN: 50,
        SEGMENT_OVERLAP_PX: 5,
        SEGMENT_OVERLAP: 5,
        ARROW_OVERLAP_PX: 1,
        ARROW_OVERLAP: 1
    });

    var BRANCH_Y_OFFSETS = Object.freeze({
        1: -225,
        2: -75,
        3: 75,
        4: 225
    });

    var ZOOM_LEVELS = Object.freeze({
        0: 0,
        1: 2,
        2: 4,
        3: 10
    });

    var ITEM_LAYOUT = Object.freeze({
        BASE_OFFSET: 35,
        LEVEL_GAP: 65,
        SHORT_TICK_BASE_HEIGHT: 30,
        SHORT_TICK_LEVEL_STEP: 3,
        MIN_SHORT_TICK_HEIGHT: 2
    });

    var ELLIPSIS = Object.freeze({
        COUNT: 6,
        DOT_WIDTH_UNITS: 0.04,
        WIDTH_UNITS: 0.04,
        GAP_UNITS: 0.05,
        START_OFFSET_UNITS: 0.05
    });

    var FEATURES = Object.freeze({
        SHOW_MERGE_CURVES: false
    });

    var FILTERS = Object.freeze({
        ALL: 'all',
        INFO: 'info',
        CODE: 'code'
    });

    var CONFIG = Object.freeze({
        RULER: RULER,
        VIEW: VIEW,
        BRANCH_Y_OFFSETS: BRANCH_Y_OFFSETS,
        ZOOM_LEVELS: ZOOM_LEVELS,
        ITEM_LAYOUT: ITEM_LAYOUT,
        ELLIPSIS: ELLIPSIS,
        FEATURES: FEATURES,
        FILTERS: FILTERS
    });

    var DEFAULT_STATE = Object.freeze({
        zoom: VIEW.DEFAULT_ZOOM,
        offsetX: 0,
        filter: FILTERS.ALL,
        zoomFilterEnabled: true,
        manualZoomLevel: 0
    });

    function createState(overrides) {
        return Object.assign({}, DEFAULT_STATE, overrides || {});
    }

    function clamp(value, minimum, maximum) {
        return Math.max(minimum, Math.min(value, maximum));
    }

    function hasCodeDetail(detail) {
        if (!detail) {
            return false;
        }

        if (typeof detail === 'string') {
            return detail.includes('<code') || detail.includes('<pre');
        }

        return Array.isArray(detail.sections) &&
            detail.sections.some(function (section) {
                return section.type === 'code';
            });
    }

    function createItemModel(item, index) {
        var branchId = item.branch || 0;
        var zoomLevel = item.zoomLevel;
        var level = item.level;
        var isBottom = item.side === 'bottom';
        var yOffset = branchId === 0 ? 0 : BRANCH_Y_OFFSETS[branchId];
        var minZoom = ZOOM_LEVELS[zoomLevel] || 0;
        var labelOffset = ITEM_LAYOUT.BASE_OFFSET + (level * ITEM_LAYOUT.LEVEL_GAP);

        return {
            item: item,
            index: index,
            value: item.value,
            label: item.label,
            detail: item.detail,
            zoomLevel: zoomLevel,
            minZoom: minZoom,
            side: item.side,
            isBottom: isBottom,
            level: level,
            branchId: branchId,
            yOffset: yOffset,
            hasInfo: Boolean(item.detail),
            hasCode: hasCodeDetail(item.detail),
            labelOffset: labelOffset
        };
    }

    function passesFilter(model, filter) {
        if (filter === FILTERS.INFO) {
            return model.hasInfo;
        }

        if (filter === FILTERS.CODE) {
            return model.hasCode;
        }

        return true;
    }

    function passesZoom(model, state) {
        var currentState = state || DEFAULT_STATE;

        if (currentState.zoomFilterEnabled !== false) {
            return currentState.zoom >= model.minZoom;
        }

        return model.zoomLevel <= parseInt(currentState.manualZoomLevel, 10);
    }

    function isLabelVisible(model, state) {
        var currentState = state || DEFAULT_STATE;
        return passesFilter(model, currentState.filter) &&
            passesZoom(model, currentState);
    }

    function unitWidth(state) {
        var currentState = state || DEFAULT_STATE;
        return VIEW.PIXELS_PER_UNIT * currentState.zoom;
    }

    function worldToScreen(value, state) {
        var currentState = state || DEFAULT_STATE;
        return currentState.offsetX + (value * unitWidth(currentState));
    }

    function clampOffset(offsetX, zoom, viewportWidth) {
        var currentUnitWidth = VIEW.PIXELS_PER_UNIT * zoom;
        var centerX = viewportWidth / 2;
        var maximumOffset = centerX - (RULER.START * currentUnitWidth);
        var minimumOffset = centerX - (RULER.END * currentUnitWidth);

        return clamp(offsetX, minimumOffset, maximumOffset);
    }

    function resetView(state, viewportWidth) {
        var currentState = state || DEFAULT_STATE;
        var zoom = VIEW.DEFAULT_ZOOM;
        var midpoint = (RULER.START + RULER.END) / 2;
        var offsetX = (viewportWidth / 2) -
            (midpoint * VIEW.PIXELS_PER_UNIT * zoom);

        return Object.assign({}, currentState, {
            zoom: zoom,
            offsetX: clampOffset(offsetX, zoom, viewportWidth)
        });
    }

    function zoomAt(state, options) {
        var currentState = state || DEFAULT_STATE;
        var settings = options || {};
        var oldZoom = currentState.zoom;
        var factor = settings.factor;
        var minimumZoom = typeof settings.minZoom === 'number'
            ? settings.minZoom
            : VIEW.MIN_BUTTON_ZOOM;
        var viewportWidth = settings.viewportWidth;
        var anchorX = typeof settings.anchorX === 'number'
            ? settings.anchorX
            : viewportWidth / 2;
        var zoom = clamp(oldZoom * factor, minimumZoom, VIEW.MAX_ZOOM);
        var offsetX = anchorX -
            ((anchorX - currentState.offsetX) * (zoom / oldZoom));

        return Object.assign({}, currentState, {
            zoom: zoom,
            offsetX: clampOffset(offsetX, zoom, viewportWidth)
        });
    }

    function panBy(state, deltaX, viewportWidth) {
        var currentState = state || DEFAULT_STATE;
        return Object.assign({}, currentState, {
            offsetX: clampOffset(
                currentState.offsetX + deltaX,
                currentState.zoom,
                viewportWidth
            )
        });
    }

    function itemGeometry(model, state) {
        var x = worldToScreen(model.value, state);
        var centerYOffset = model.yOffset +
            (model.isBottom ? model.labelOffset : -model.labelOffset);

        return {
            x: x,
            left: x,
            side: model.side,
            isBottom: model.isBottom,
            branchId: model.branchId,
            axisYOffset: model.yOffset,
            labelOffset: model.labelOffset,
            centerYOffset: centerYOffset,
            transform: model.isBottom
                ? 'translate(-50%, 0)'
                : 'translate(-50%, -100%)'
        };
    }

    function shortTickHeight(zoomLevel) {
        return Math.max(
            ITEM_LAYOUT.MIN_SHORT_TICK_HEIGHT,
            ITEM_LAYOUT.SHORT_TICK_BASE_HEIGHT -
                (zoomLevel * ITEM_LAYOUT.SHORT_TICK_LEVEL_STEP)
        );
    }

    function tickGeometry(model, state, viewportWidth) {
        var currentState = state || DEFAULT_STATE;

        if (!passesFilter(model, currentState.filter)) {
            return null;
        }

        var x = worldToScreen(model.value, currentState);
        var margin = VIEW.TICK_CULL_MARGIN;

        if (Number.isFinite(viewportWidth) &&
            (x < -margin || x > viewportWidth + margin)) {
            return null;
        }

        var isLong = passesZoom(model, currentState);

        return {
            x: x,
            left: x,
            side: model.side,
            isBottom: model.isBottom,
            branchId: model.branchId,
            axisYOffset: model.yOffset,
            isLong: isLong,
            isShort: !isLong,
            height: isLong
                ? model.labelOffset
                : shortTickHeight(model.zoomLevel),
            color: isLong ? null : '#666'
        };
    }

    function axisSegmentGeometry(segment, state) {
        var currentUnitWidth = unitWidth(state);
        return {
            left: (segment.start - RULER.START) * currentUnitWidth,
            width: ((segment.end - segment.start) * currentUnitWidth) +
                VIEW.SEGMENT_OVERLAP,
            isDoubleAxis: segment.end <= RULER.DOUBLE_AXIS_END
        };
    }

    function curveGeometry(startX, endX, centerY, yOffset, reverse) {
        var controlX = startX + ((endX - startX) * 0.5);

        if (reverse) {
            return {
                start: {
                    x: startX - VIEW.ARROW_OVERLAP,
                    y: centerY + yOffset
                },
                control1: {
                    x: controlX,
                    y: centerY + yOffset
                },
                control2: {
                    x: controlX,
                    y: centerY
                },
                end: {
                    x: endX + VIEW.ARROW_OVERLAP,
                    y: centerY
                }
            };
        }

        return {
            start: {
                x: startX - VIEW.ARROW_OVERLAP,
                y: centerY
            },
            control1: {
                x: controlX,
                y: centerY
            },
            control2: {
                x: controlX,
                y: centerY + yOffset
            },
            end: {
                x: endX + VIEW.ARROW_OVERLAP,
                y: centerY + yOffset
            }
        };
    }

    function rulerGeometry(state, viewport) {
        var dimensions = viewport || {};
        var currentUnitWidth = unitWidth(state);
        var centerY = dimensions.height / 2;
        var x = {
            start: worldToScreen(RULER.START, state),
            doubleAxisEnd: worldToScreen(RULER.DOUBLE_AXIS_END, state),
            fork: worldToScreen(RULER.FORK_X, state),
            branchStart: worldToScreen(RULER.BRANCH_START, state),
            branchEnd: worldToScreen(RULER.BRANCH_END, state),
            merge: worldToScreen(RULER.MERGE_X, state),
            uncomputableStart: worldToScreen(
                RULER.UNCOMPUTABLE_START,
                state
            ),
            end: worldToScreen(RULER.END, state)
        };

        var branches = Object.keys(BRANCH_Y_OFFSETS).map(function (key) {
            var branchId = Number(key);
            var yOffset = BRANCH_Y_OFFSETS[key];
            return {
                branchId: branchId,
                yOffset: yOffset,
                y: centerY + yOffset,
                left: x.branchStart,
                width: x.branchEnd - x.branchStart,
                arrowX: x.branchEnd - VIEW.ARROW_OVERLAP,
                forkCurve: curveGeometry(
                    x.fork,
                    x.branchStart,
                    centerY,
                    yOffset,
                    false
                ),
                mergeCurve: curveGeometry(
                    x.branchEnd,
                    x.merge,
                    centerY,
                    yOffset,
                    true
                )
            };
        });

        var ellipsis = [];
        var ellipsisStart = RULER.MERGE_X - RULER.START +
            ELLIPSIS.START_OFFSET_UNITS;

        for (var index = 0; index < ELLIPSIS.COUNT; index += 1) {
            var leftUnits = ellipsisStart +
                (index * (ELLIPSIS.WIDTH_UNITS + ELLIPSIS.GAP_UNITS));
            var relativeLeft = leftUnits * currentUnitWidth;
            ellipsis.push({
                index: index,
                relativeLeft: relativeLeft,
                screenX: x.start + relativeLeft,
                width: ELLIPSIS.WIDTH_UNITS * currentUnitWidth
            });
        }

        return {
            unitWidth: currentUnitWidth,
            centerY: centerY,
            x: x,
            ruler: {
                left: x.start,
                width: (x.end - x.start) + VIEW.SEGMENT_OVERLAP
            },
            branches: branches,
            ellipsis: ellipsis,
            finalArrowX: x.end - VIEW.ARROW_OVERLAP,
            showMergeCurves: FEATURES.SHOW_MERGE_CURVES
        };
    }

    return Object.freeze({
        CONFIG: CONFIG,
        DEFAULT_STATE: DEFAULT_STATE,
        createState: createState,
        clamp: clamp,
        createItemModel: createItemModel,
        passesFilter: passesFilter,
        passesZoom: passesZoom,
        isLabelVisible: isLabelVisible,
        unitWidth: unitWidth,
        worldToScreen: worldToScreen,
        clampOffset: clampOffset,
        resetView: resetView,
        zoomAt: zoomAt,
        panBy: panBy,
        itemGeometry: itemGeometry,
        shortTickHeight: shortTickHeight,
        tickGeometry: tickGeometry,
        axisSegmentGeometry: axisSegmentGeometry,
        rulerGeometry: rulerGeometry
    });
}));
