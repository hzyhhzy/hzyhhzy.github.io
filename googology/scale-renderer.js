(function (global) {
    'use strict';

    var Core = global.GoogologyScaleCore;
    var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

    if (!Core) {
        throw new Error('GoogologyScaleCore must be loaded before scale-renderer.js.');
    }

    function pixels(value) {
        return String(value) + 'px';
    }

    function curvePath(curve) {
        return [
            'M', curve.start.x, curve.start.y,
            'C', curve.control1.x, curve.control1.y,
            curve.control2.x, curve.control2.y,
            curve.end.x, curve.end.y
        ].join(' ');
    }

    function requireOption(options, name) {
        if (!options[name]) {
            throw new Error('Missing renderer option: ' + name);
        }
        return options[name];
    }

    function addDetailHandler(element, getDetail, onOpenDetail) {
        function openDetail(event) {
            var detail = getDetail();

            if (!detail) {
                return;
            }

            event.stopPropagation();
            event.preventDefault();
            onOpenDetail(detail);
        }

        element.addEventListener('click', openDetail);
        element.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                openDetail(event);
            }
        });
    }

    function configureDetailTrigger(element, hasDetail) {
        element.setAttribute(
            'aria-haspopup',
            hasDetail ? 'dialog' : 'false'
        );
        element.setAttribute(
            'tabindex',
            hasDetail ? '0' : '-1'
        );

        if (hasDetail) {
            element.setAttribute('role', 'button');
        } else if (typeof element.removeAttribute === 'function') {
            element.removeAttribute('role');
        }
    }

    function updateItemLabel(nodes, model) {
        nodes.text.innerHTML = model.label;
        if (global.GoogologyMath) {
            global.GoogologyMath.render(nodes.text);
        }
        nodes.info.hidden = !model.hasInfo;
        nodes.code.hidden = !model.hasCode;
        nodes.label.classList.toggle('has-detail', model.hasInfo);
        configureDetailTrigger(nodes.label, model.hasInfo);
    }

    function createItemNode(
        documentRef,
        model,
        getDetail,
        onOpenDetail
    ) {
        var node = documentRef.createElement('div');
        var label = documentRef.createElement('div');
        var text = documentRef.createElement('span');
        var infoIcon = documentRef.createElement('span');
        var codeIcon = documentRef.createElement('span');

        node.className = [
            'scale-item',
            model.isBottom ? 'side-bottom' : '',
            'zoom-level-' + model.zoomLevel
        ].filter(Boolean).join(' ');

        label.className = 'scale-label';
        text.className = 'scale-label-text';
        infoIcon.className = 'info-icon';
        codeIcon.className = 'code-icon';
        label.append(text, infoIcon, codeIcon);
        updateItemLabel({
            label: label,
            text: text,
            info: infoIcon,
            code: codeIcon
        }, model);

        addDetailHandler(label, getDetail, onOpenDetail);
        node.appendChild(label);
        return {
            node: node,
            label: label,
            text: text,
            info: infoIcon,
            code: codeIcon
        };
    }

    function createTickNode(documentRef) {
        var node = documentRef.createElement('div');
        node.className = 'tick';
        node.style.transform = 'none';
        return node;
    }

    function createSegmentNode(
        documentRef,
        segment,
        className,
        getDetail,
        onOpenDetail
    ) {
        var node = documentRef.createElement('div');
        node.className = className;
        node.textContent = segment.text;
        if (global.GoogologyMath) {
            global.GoogologyMath.render(node);
        }
        node.style.backgroundColor = segment.bg;
        node.style.color = segment.color || '#333';
        configureDetailTrigger(node, Boolean(segment.detail));
        addDetailHandler(node, getDetail, onOpenDetail);
        return node;
    }

    function createBranchNode(
        documentRef,
        branchInfo,
        getDetail,
        onOpenDetail
    ) {
        var node = documentRef.createElement('div');
        node.className = 'branch-axis';
        node.textContent = branchInfo.text || '';
        if (global.GoogologyMath) {
            global.GoogologyMath.render(node);
        }
        configureDetailTrigger(node, Boolean(branchInfo.detail));
        addDetailHandler(node, getDetail, onOpenDetail);
        return node;
    }

    function assertStableSequence(previous, next, name) {
        if (previous.length !== next.length) {
            throw new Error(
                name + ' length changed while updating localized content.'
            );
        }

        previous.forEach(function (entry, index) {
            if (
                entry.id &&
                next[index].id &&
                entry.id !== next[index].id
            ) {
                throw new Error(
                    name + ' ID changed at index ' + String(index) + '.'
                );
            }
        });
    }

    function GoogologyScaleRenderer(options) {
        var settings = options || {};

        this.root = requireOption(settings, 'root');
        this.ruler = requireOption(settings, 'ruler');
        this.svgLayer = requireOption(settings, 'svgLayer');
        this.itemsContainer = requireOption(settings, 'itemsContainer');
        this.ticksContainer = requireOption(settings, 'ticksContainer');
        this.zoomDisplay = requireOption(settings, 'zoomDisplay');

        this.items = settings.items || [];
        this.axisSegments = settings.axisSegments || [];
        this.axisSubSegments = settings.axisSubSegments || [];
        this.branchNames = settings.branchNames || {};
        this.onOpenDetail = typeof settings.onOpenDetail === 'function'
            ? settings.onOpenDetail
            : function () {};

        this.document = this.root.ownerDocument || global.document;
        this.itemModels = this.items.map(function (item, index) {
            return Core.createItemModel(item, index);
        });

        this.itemNodes = [];
        this.itemLabelNodes = [];
        this.tickNodes = [];
        this.axisSegmentNodes = [];
        this.axisSubSegmentNodes = [];
        this.branchNodes = [];
        this.ellipsisNodes = [];
        this.finalArrowNode = null;

        this.createItemAndTickNodes();
        this.createAxisNodes();
        this.createBranchNodes();
        this.createEllipsisNodes();
        this.createFinalArrowNode();
    }

    GoogologyScaleRenderer.prototype.createItemAndTickNodes = function () {
        var itemFragment = this.document.createDocumentFragment();
        var tickFragment = this.document.createDocumentFragment();

        this.itemModels.forEach(function (model, index) {
            var itemNodes = createItemNode(
                this.document,
                model,
                function () {
                    return this.itemModels[index].detail;
                }.bind(this),
                this.onOpenDetail
            );
            var tickNode = createTickNode(this.document);

            this.itemNodes.push(itemNodes.node);
            this.itemLabelNodes.push(itemNodes);
            this.tickNodes.push(tickNode);
            itemFragment.appendChild(itemNodes.node);
            tickFragment.appendChild(tickNode);
        }, this);

        this.itemsContainer.appendChild(itemFragment);
        this.ticksContainer.appendChild(tickFragment);
    };

    GoogologyScaleRenderer.prototype.createAxisNodes = function () {
        var doubleAxisEnd = Core.CONFIG.RULER.DOUBLE_AXIS_END;

        this.axisSegments.forEach(function (segment, index) {
            var placementClass = segment.end <= doubleAxisEnd
                ? 'axis-segment-upper'
                : 'axis-segment-center';
            var node = createSegmentNode(
                this.document,
                segment,
                'axis-segment ' + placementClass,
                function () {
                    return this.axisSegments[index].detail;
                }.bind(this),
                this.onOpenDetail
            );

            this.axisSegmentNodes.push(node);
            this.ruler.appendChild(node);
        }, this);

        this.axisSubSegments.forEach(function (segment, index) {
            var node = createSegmentNode(
                this.document,
                segment,
                'axis-segment axis-segment-sub',
                function () {
                    return this.axisSubSegments[index].detail;
                }.bind(this),
                this.onOpenDetail
            );

            this.axisSubSegmentNodes.push(node);
            this.ruler.appendChild(node);
        }, this);
    };

    GoogologyScaleRenderer.prototype.createBranchNodes = function () {
        Object.keys(Core.CONFIG.BRANCH_Y_OFFSETS).forEach(function (key) {
            var branchId = Number(key);
            var branchInfo = this.branchNames[branchId] || {};
            var axis = createBranchNode(
                this.document,
                branchInfo,
                function () {
                    return (
                        this.branchNames[branchId] ||
                        this.branchNames[String(branchId)] ||
                        {}
                    ).detail;
                }.bind(this),
                this.onOpenDetail
            );
            var arrow = this.document.createElement('div');
            var forkCurve = this.document.createElementNS(
                SVG_NAMESPACE,
                'path'
            );
            var mergeCurve = null;

            arrow.className = 'branch-arrow';
            forkCurve.setAttribute('class', 'fork-curve');

            if (Core.CONFIG.FEATURES.SHOW_MERGE_CURVES) {
                mergeCurve = this.document.createElementNS(
                    SVG_NAMESPACE,
                    'path'
                );
                mergeCurve.setAttribute('class', 'fork-curve');
            }

            this.branchNodes.push({
                branchId: branchId,
                axis: axis,
                arrow: arrow,
                forkCurve: forkCurve,
                mergeCurve: mergeCurve
            });

            this.root.appendChild(axis);
            this.root.appendChild(arrow);
            this.svgLayer.appendChild(forkCurve);
            if (mergeCurve) {
                this.svgLayer.appendChild(mergeCurve);
            }
        }, this);
    };

    GoogologyScaleRenderer.prototype.createEllipsisNodes = function () {
        var count = Core.CONFIG.ELLIPSIS.COUNT;

        for (var index = 0; index < count; index += 1) {
            var node = this.document.createElement('div');
            node.className = 'ellipsis-dot';
            this.ellipsisNodes.push(node);
            this.ruler.appendChild(node);
        }
    };

    GoogologyScaleRenderer.prototype.createFinalArrowNode = function () {
        this.finalArrowNode = this.document.createElement('div');
        this.finalArrowNode.className = 'axis-arrow';
        this.root.appendChild(this.finalArrowNode);
    };

    GoogologyScaleRenderer.prototype.setContent = function (content) {
        var next = content || {};
        var nextItems = next.items || [];
        var nextAxisSegments = next.axisSegments || [];
        var nextAxisSubSegments = next.axisSubSegments || [];
        var nextBranchNames = next.branchNames || {};

        assertStableSequence(this.items, nextItems, 'Item');
        assertStableSequence(
            this.axisSegments,
            nextAxisSegments,
            'Axis segment'
        );
        assertStableSequence(
            this.axisSubSegments,
            nextAxisSubSegments,
            'Axis subsegment'
        );

        this.items = nextItems;
        this.axisSegments = nextAxisSegments;
        this.axisSubSegments = nextAxisSubSegments;
        this.branchNames = nextBranchNames;
        this.itemModels = this.items.map(function (item, index) {
            return Core.createItemModel(item, index);
        });

        this.itemModels.forEach(function (model, index) {
            updateItemLabel(this.itemLabelNodes[index], model);
        }, this);

        this.axisSegments.forEach(function (segment, index) {
            var node = this.axisSegmentNodes[index];
            node.textContent = segment.text;
            if (global.GoogologyMath) {
                global.GoogologyMath.render(node);
            }
            node.style.backgroundColor = segment.bg;
            node.style.color = segment.color || '#333';
            configureDetailTrigger(node, Boolean(segment.detail));
        }, this);

        this.axisSubSegments.forEach(function (segment, index) {
            var node = this.axisSubSegmentNodes[index];
            node.textContent = segment.text;
            if (global.GoogologyMath) {
                global.GoogologyMath.render(node);
            }
            node.style.backgroundColor = segment.bg;
            node.style.color = segment.color || '#333';
            configureDetailTrigger(node, Boolean(segment.detail));
        }, this);

        this.branchNodes.forEach(function (nodes) {
            var branchInfo =
                this.branchNames[nodes.branchId] ||
                this.branchNames[String(nodes.branchId)] ||
                {};
            nodes.axis.textContent = branchInfo.text || '';
            if (global.GoogologyMath) {
                global.GoogologyMath.render(nodes.axis);
            }
            configureDetailTrigger(
                nodes.axis,
                Boolean(branchInfo.detail)
            );
        }, this);
    };

    GoogologyScaleRenderer.prototype.renderItemsAndTicks = function (
        state,
        viewport
    ) {
        var centerY = viewport.height / 2;

        this.itemModels.forEach(function (model, index) {
            var itemNode = this.itemNodes[index];
            var tickNode = this.tickNodes[index];
            var passesFilter = Core.passesFilter(model, state.filter);
            var passesZoom = Core.passesZoom(model, state);
            var labelVisible = Core.isLabelVisible(model, state);
            var itemLayout = Core.itemGeometry(model, state);
            var screenX = Core.worldToScreen(model.value, state);
            var tickLayout = Core.tickGeometry(
                model,
                state,
                viewport.width
            );

            itemNode.hidden = !labelVisible;
            itemNode.style.left = pixels(screenX);
            itemNode.style.top = 'calc(50% + ' +
                String(itemLayout.centerYOffset) + 'px)';
            itemNode.style.transform = itemLayout.transform;

            tickNode.hidden = !passesFilter || tickLayout === null;

            if (tickLayout === null) {
                return;
            }

            tickNode.style.left = pixels(tickLayout.left);
            tickNode.style.height = pixels(tickLayout.height);
            tickNode.classList.toggle(
                'tick-short',
                !passesZoom && tickLayout.isShort
            );

            if (tickLayout.isBottom) {
                tickNode.style.top = pixels(
                    centerY + tickLayout.axisYOffset
                );
            } else {
                tickNode.style.top = pixels(
                    centerY +
                    tickLayout.axisYOffset -
                    tickLayout.height
                );
            }
        }, this);
    };

    GoogologyScaleRenderer.prototype.renderAxisSegments = function (
        state,
        rulerLayout
    ) {
        this.axisSegments.forEach(function (segment, index) {
            var node = this.axisSegmentNodes[index];
            var geometry = Core.axisSegmentGeometry(segment, state);
            var left = Core.worldToScreen(segment.start, state) -
                rulerLayout.x.start;

            node.style.left = pixels(left);
            node.style.width = pixels(geometry.width);
        }, this);

        this.axisSubSegments.forEach(function (segment, index) {
            var node = this.axisSubSegmentNodes[index];
            var geometry = Core.axisSegmentGeometry(segment, state);
            var left = Core.worldToScreen(segment.start, state) -
                rulerLayout.x.start;

            node.style.left = pixels(left);
            node.style.width = pixels(geometry.width);
        }, this);
    };

    GoogologyScaleRenderer.prototype.renderBranches = function (
        rulerLayout
    ) {
        this.branchNodes.forEach(function (nodes, index) {
            var geometry = rulerLayout.branches[index];

            nodes.axis.style.left = pixels(geometry.left);
            nodes.axis.style.top = pixels(geometry.y);
            nodes.axis.style.width = pixels(geometry.width);

            nodes.arrow.style.left = pixels(geometry.arrowX);
            nodes.arrow.style.top = pixels(geometry.y);

            nodes.forkCurve.setAttribute(
                'd',
                curvePath(geometry.forkCurve)
            );

            if (nodes.mergeCurve) {
                nodes.mergeCurve.setAttribute(
                    'd',
                    curvePath(geometry.mergeCurve)
                );
            }
        });
    };

    GoogologyScaleRenderer.prototype.renderEllipsis = function (
        rulerLayout
    ) {
        this.ellipsisNodes.forEach(function (node, index) {
            var geometry = rulerLayout.ellipsis[index];
            node.style.left = pixels(geometry.relativeLeft);
            node.style.width = pixels(geometry.width);
        });
    };

    GoogologyScaleRenderer.prototype.render = function (state, viewport) {
        var rulerLayout = Core.rulerGeometry(state, viewport);

        this.ruler.style.left = pixels(rulerLayout.ruler.left);
        this.ruler.style.width = pixels(rulerLayout.ruler.width);

        this.renderItemsAndTicks(state, viewport);
        this.renderAxisSegments(state, rulerLayout);
        this.renderBranches(rulerLayout);
        this.renderEllipsis(rulerLayout);

        this.finalArrowNode.style.left = pixels(rulerLayout.finalArrowX);
        this.finalArrowNode.style.top = pixels(rulerLayout.centerY);
        this.zoomDisplay.textContent = Number(state.zoom).toFixed(2);
    };

    global.GoogologyScaleRenderer = GoogologyScaleRenderer;
}(globalThis));
