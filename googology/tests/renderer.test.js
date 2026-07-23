'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const core = require('../scale-core.js');
const rendererSource = fs.readFileSync(
    path.join(__dirname, '..', 'scale-renderer.js'),
    'utf8'
);

class FakeClassList {
    constructor() {
        this.names = new Set();
    }

    toggle(name, force) {
        const shouldAdd = force === undefined
            ? !this.names.has(name)
            : Boolean(force);

        if (shouldAdd) {
            this.names.add(name);
        } else {
            this.names.delete(name);
        }

        return shouldAdd;
    }

    contains(name) {
        return this.names.has(name);
    }
}

class FakeNode {
    constructor(ownerDocument, tagName, options = {}) {
        this.ownerDocument = ownerDocument;
        this.tagName = tagName ? String(tagName).toUpperCase() : undefined;
        this.namespaceURI = options.namespaceURI;
        this.isFragment = Boolean(options.isFragment);
        this.children = [];
        this.parentNode = null;
        this.style = {};
        this.classList = new FakeClassList();
        this.className = '';
        this.hidden = false;
        this.textContent = '';
        this.innerHTML = '';
        this.attributes = new Map();
        this.listeners = new Map();
    }

    appendChild(child) {
        if (child.isFragment) {
            child.children.splice(0).forEach((fragmentChild) => {
                this.appendChild(fragmentChild);
            });
            return child;
        }

        child.parentNode = this;
        this.children.push(child);
        return child;
    }

    append(...children) {
        children.forEach((child) => {
            this.appendChild(child);
        });
    }

    addEventListener(type, listener) {
        this.listeners.set(type, listener);
    }

    setAttribute(name, value) {
        this.attributes.set(name, String(value));
    }

    getAttribute(name) {
        return this.attributes.get(name) || null;
    }
}

class FakeDocument {
    constructor() {
        this.elementCreationCount = 0;
        this.fragmentCreationCount = 0;
    }

    createElement(tagName) {
        this.elementCreationCount += 1;
        return new FakeNode(this, tagName);
    }

    createElementNS(namespaceURI, tagName) {
        this.elementCreationCount += 1;
        return new FakeNode(this, tagName, { namespaceURI });
    }

    createDocumentFragment() {
        this.fragmentCreationCount += 1;
        return new FakeNode(this, undefined, { isFragment: true });
    }
}

function loadRenderer(coreApi, mathApi) {
    const context = vm.createContext({
        GoogologyScaleCore: coreApi,
        GoogologyMath: mathApi
    });

    vm.runInContext(rendererSource, context, {
        filename: 'scale-renderer.js'
    });

    return context.GoogologyScaleRenderer;
}

function createFixture(coreApi = core, mathApi) {
    const document = new FakeDocument();
    const element = (tagName = 'div') => new FakeNode(document, tagName);
    const openedDetails = [];
    const elements = {
        root: element(),
        ruler: element(),
        svgLayer: element('svg'),
        itemsContainer: element(),
        ticksContainer: element(),
        zoomDisplay: element()
    };
    const Renderer = loadRenderer(coreApi, mathApi);
    const renderer = new Renderer({
        ...elements,
        items: [
            {
                id: 'item-a',
                value: 1,
                label: 'always visible',
                zoomLevel: 0,
                side: 'top',
                level: 0
            },
            {
                id: 'item-b',
                value: 2,
                label: 'visible from zoom 2',
                zoomLevel: 1,
                side: 'bottom',
                level: 1
            }
        ],
        axisSegments: [
            {
                id: 'axis-a',
                start: 0,
                end: 1,
                text: 'axis',
                bg: '#fff'
            }
        ],
        axisSubSegments: [
            {
                id: 'subaxis-a',
                start: 0,
                end: 0.5,
                text: 'sub-axis',
                bg: '#eee'
            }
        ],
        branchNames: {
            1: { id: 'branch-1', text: 'branch one' },
            2: { id: 'branch-2', text: 'branch two' },
            3: { id: 'branch-3', text: 'branch three' },
            4: { id: 'branch-4', text: 'branch four' }
        },
        onOpenDetail(detail) {
            openedDetails.push(detail);
        }
    });

    return { document, elements, renderer, openedDetails };
}

function cachedNodes(renderer) {
    return [
        ...renderer.itemNodes,
        ...renderer.tickNodes,
        ...renderer.axisSegmentNodes,
        ...renderer.axisSubSegmentNodes,
        ...renderer.branchNodes.flatMap((nodes) => [
            nodes.axis,
            nodes.arrow,
            nodes.forkCurve,
            nodes.mergeCurve
        ].filter(Boolean)),
        ...renderer.ellipsisNodes,
        renderer.finalArrowNode
    ];
}

function containerChildren(elements) {
    return [
        ...elements.root.children,
        ...elements.ruler.children,
        ...elements.svgLayer.children,
        ...elements.itemsContainer.children,
        ...elements.ticksContainer.children
    ];
}

function assertSameReferences(actual, expected) {
    assert.equal(actual.length, expected.length);
    actual.forEach((node, index) => {
        assert.equal(node, expected[index], `node ${index} was replaced`);
    });
}

test('constructor creates and caches the complete renderer DOM once', () => {
    const { document, elements, renderer } = createFixture();

    assert.equal(document.elementCreationCount, 33);
    assert.equal(document.fragmentCreationCount, 2);
    assert.equal(renderer.itemNodes.length, 2);
    assert.equal(renderer.tickNodes.length, 2);
    assert.equal(renderer.axisSegmentNodes.length, 1);
    assert.equal(renderer.axisSubSegmentNodes.length, 1);
    assert.equal(renderer.branchNodes.length, 4);
    assert.equal(renderer.ellipsisNodes.length, 6);
    assert.ok(renderer.finalArrowNode);

    assert.equal(elements.itemsContainer.children.length, 2);
    assert.equal(elements.ticksContainer.children.length, 2);
    assert.equal(elements.ruler.children.length, 8);
    assert.equal(elements.svgLayer.children.length, 4);
    assert.equal(elements.root.children.length, 9);
    assert.equal(new Set(cachedNodes(renderer)).size, cachedNodes(renderer).length);
    assert.equal(
        renderer.branchNodes.every((nodes) => nodes.mergeCurve === null),
        true
    );
});

test('setContent updates localized text and detail handlers in place', () => {
    const {
        document,
        elements,
        renderer,
        openedDetails
    } = createFixture();
    const nodesBefore = cachedNodes(renderer);
    const childrenBefore = containerChildren(elements);
    const creationsBefore = document.elementCreationCount;
    const firstDetail = {
        title: '第一个条目',
        sections: [{
            type: 'html',
            html: '<p>说明</p>'
        }]
    };
    const secondDetail = {
        title: '第二个条目',
        sections: [{
            type: 'code',
            language: 'python',
            source: 'print(2)'
        }]
    };
    const axisDetail = {
        title: '主轴',
        sections: []
    };

    renderer.setContent({
        items: [
            {
                id: 'item-a',
                value: 1,
                label: '始终可见',
                detail: firstDetail,
                zoomLevel: 0,
                side: 'top',
                level: 0
            },
            {
                id: 'item-b',
                value: 2,
                label: '缩放后可见',
                detail: secondDetail,
                zoomLevel: 1,
                side: 'bottom',
                level: 1
            }
        ],
        axisSegments: [{
            id: 'axis-a',
            start: 0,
            end: 1,
            text: '主轴',
            bg: '#123456',
            color: '#ffffff',
            detail: axisDetail
        }],
        axisSubSegments: [{
            id: 'subaxis-a',
            start: 0,
            end: 0.5,
            text: '子轴',
            bg: '#abcdef',
            color: '#111111'
        }],
        branchNames: {
            1: {
                id: 'branch-1',
                text: '分支一',
                detail: firstDetail
            },
            2: { id: 'branch-2', text: '分支二' },
            3: { id: 'branch-3', text: '分支三' },
            4: { id: 'branch-4', text: '分支四' }
        }
    });

    assert.equal(renderer.itemLabelNodes[0].text.innerHTML, '始终可见');
    assert.equal(renderer.itemLabelNodes[0].info.hidden, false);
    assert.equal(renderer.itemLabelNodes[0].code.hidden, true);
    assert.equal(renderer.itemLabelNodes[0].label.getAttribute('tabindex'), '0');
    assert.equal(renderer.itemLabelNodes[1].code.hidden, false);
    assert.equal(renderer.axisSegmentNodes[0].textContent, '主轴');
    assert.equal(
        renderer.axisSegmentNodes[0].style.backgroundColor,
        '#123456'
    );
    assert.equal(
        renderer.axisSegmentNodes[0].getAttribute('role'),
        'button'
    );
    assert.equal(
        renderer.axisSegmentNodes[0].getAttribute('tabindex'),
        '0'
    );
    assert.equal(renderer.axisSubSegmentNodes[0].textContent, '子轴');
    assert.equal(renderer.branchNodes[0].axis.textContent, '分支一');
    assert.equal(
        renderer.branchNodes[0].axis.getAttribute('role'),
        'button'
    );

    renderer.itemLabelNodes[0].label.listeners.get('click')({
        stopPropagation() {},
        preventDefault() {}
    });
    renderer.axisSegmentNodes[0].listeners.get('click')({
        stopPropagation() {},
        preventDefault() {}
    });

    assert.equal(openedDetails[0], firstDetail);
    assert.equal(openedDetails[1], axisDetail);
    assert.equal(openedDetails.length, 2);
    assert.equal(document.elementCreationCount, creationsBefore);
    assertSameReferences(cachedNodes(renderer), nodesBefore);
    assertSameReferences(containerChildren(elements), childrenBefore);
});

test('setContent rejects geometry sequences that cannot reuse cached nodes', () => {
    const { renderer } = createFixture();

    assert.throws(
        () => renderer.setContent({
            items: [],
            axisSegments: renderer.axisSegments,
            axisSubSegments: renderer.axisSubSegments,
            branchNames: renderer.branchNames
        }),
        /Item length changed/
    );
    assert.throws(
        () => renderer.setContent({
            items: renderer.items.map((item, index) => (
                index === 0 ? { ...item, id: 'different-id' } : item
            )),
            axisSegments: renderer.axisSegments,
            axisSubSegments: renderer.axisSubSegments,
            branchNames: renderer.branchNames
        }),
        /Item ID changed at index 0/
    );
});

test('constructor and locale updates typeset every formula-bearing label', () => {
    const renderedNodes = [];
    const math = {
        render(node) {
            renderedNodes.push(node);
            return true;
        }
    };
    const { renderer } = createFixture(core, math);

    assert.equal(renderedNodes.length, 8);
    assert.equal(renderedNodes.includes(renderer.itemLabelNodes[0].text), true);
    assert.equal(renderedNodes.includes(renderer.axisSegmentNodes[0]), true);
    assert.equal(renderedNodes.includes(renderer.axisSubSegmentNodes[0]), true);
    assert.equal(renderedNodes.includes(renderer.branchNodes[0].axis), true);

    renderer.setContent({
        items: renderer.items.map((item, index) => ({
            ...item,
            label: index === 0 ? '\\(10^{10}\\)' : '\\(10^{100}\\)'
        })),
        axisSegments: renderer.axisSegments.map((segment) => ({
            ...segment,
            text: '\\(\\varphi\\)'
        })),
        axisSubSegments: renderer.axisSubSegments.map((segment) => ({
            ...segment,
            text: '\\(\\Psi\\)'
        })),
        branchNames: Object.fromEntries(
            Object.entries(renderer.branchNames).map(([id, branch]) => [
                id,
                {
                    ...branch,
                    text: '\\(q(5)\\)'
                }
            ])
        )
    });

    assert.equal(renderedNodes.length, 16);
    assert.equal(
        renderer.itemLabelNodes[0].text.innerHTML,
        '\\(10^{10}\\)'
    );
    assert.equal(renderer.axisSegmentNodes[0].textContent, '\\(\\varphi\\)');
    assert.equal(renderer.axisSubSegmentNodes[0].textContent, '\\(\\Psi\\)');
    assert.equal(renderer.branchNodes[0].axis.textContent, '\\(q(5)\\)');
});

test('repeated renders preserve node identity and update visibility and ticks', () => {
    const { document, elements, renderer } = createFixture();
    const nodesBefore = cachedNodes(renderer);
    const childrenBefore = containerChildren(elements);
    const creationsBefore = document.elementCreationCount;

    renderer.render(
        core.createState({ zoom: 1, offsetX: 0 }),
        { width: 1000, height: 800 }
    );

    assert.equal(renderer.itemNodes[0].hidden, false);
    assert.equal(renderer.itemNodes[1].hidden, true);
    assert.equal(renderer.tickNodes[0].hidden, false);
    assert.equal(renderer.tickNodes[1].hidden, false);
    assert.equal(renderer.tickNodes[0].classList.contains('tick-short'), false);
    assert.equal(renderer.tickNodes[0].style.height, '35px');
    assert.equal(renderer.tickNodes[1].classList.contains('tick-short'), true);
    assert.equal(renderer.tickNodes[1].style.height, '27px');

    renderer.render(
        core.createState({ zoom: 2, offsetX: -100 }),
        { width: 1200, height: 900 }
    );

    assert.equal(renderer.itemNodes[1].hidden, false);
    assert.equal(renderer.tickNodes[1].classList.contains('tick-short'), false);
    assert.equal(renderer.tickNodes[1].style.height, '100px');
    assert.equal(document.elementCreationCount, creationsBefore);
    assertSameReferences(cachedNodes(renderer), nodesBefore);
    assertSameReferences(containerChildren(elements), childrenBefore);
});

test('merge-curve feature creates four extra cached paths and updates them', () => {
    const enabledCore = {
        ...core,
        CONFIG: {
            ...core.CONFIG,
            FEATURES: {
                ...core.CONFIG.FEATURES,
                SHOW_MERGE_CURVES: true
            }
        }
    };
    const { document, elements, renderer } = createFixture(enabledCore);
    const paths = elements.svgLayer.children;
    const nodesBefore = cachedNodes(renderer);
    const creationsBefore = document.elementCreationCount;

    assert.equal(paths.length, 8);
    assert.equal(paths.every((node) => node.tagName === 'PATH'), true);
    assert.equal(
        renderer.branchNodes.every((nodes) => Boolean(nodes.mergeCurve)),
        true
    );

    renderer.render(
        enabledCore.createState({ zoom: 1, offsetX: 0 }),
        { width: 1000, height: 800 }
    );
    const firstMergePaths = renderer.branchNodes.map((nodes) =>
        nodes.mergeCurve.getAttribute('d')
    );

    assert.equal(firstMergePaths.every(Boolean), true);

    renderer.render(
        enabledCore.createState({ zoom: 2, offsetX: -100 }),
        { width: 1200, height: 900 }
    );
    const secondMergePaths = renderer.branchNodes.map((nodes) =>
        nodes.mergeCurve.getAttribute('d')
    );

    secondMergePaths.forEach((pathValue, index) => {
        assert.notEqual(pathValue, firstMergePaths[index]);
    });
    assert.equal(document.elementCreationCount, creationsBefore);
    assertSameReferences(cachedNodes(renderer), nodesBefore);
});
