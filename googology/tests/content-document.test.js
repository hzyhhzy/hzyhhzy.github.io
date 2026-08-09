'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '..', 'content-document.js'),
    'utf8'
);

class FakeElement {
    constructor(ownerDocument, tagName, supportsDialogMethods) {
        this.ownerDocument = ownerDocument;
        this.tagName = String(tagName).toUpperCase();
        this.children = [];
        this.className = '';
        this.innerHTML = '';
        this.textContent = '';
        this.attributes = new Map();
        this.listeners = new Map();

        if (this.tagName === 'DIALOG' && supportsDialogMethods) {
            this.showModalCalls = 0;
            this.closeCalls = 0;
            this.showModal = () => {
                this.showModalCalls += 1;
                this.setAttribute('open', '');
            };
            this.close = () => {
                this.closeCalls += 1;
                this.removeAttribute('open');
            };
        }
    }

    appendChild(child) {
        this.children.push(child);
        return child;
    }

    append(...children) {
        children.forEach((child) => this.appendChild(child));
    }

    replaceChildren(...children) {
        this.children = [];
        this.innerHTML = '';
        this.append(...children);
    }

    setAttribute(name, value) {
        this.attributes.set(String(name), String(value));
    }

    getAttribute(name) {
        return this.attributes.has(String(name))
            ? this.attributes.get(String(name))
            : null;
    }

    hasAttribute(name) {
        return this.attributes.has(String(name));
    }

    removeAttribute(name) {
        this.attributes.delete(String(name));
    }

    addEventListener(type, listener) {
        const listeners = this.listeners.get(type) || [];
        listeners.push(listener);
        this.listeners.set(type, listeners);
    }

    dispatchEvent(event) {
        const dispatched = event || {};
        if (!dispatched.target) {
            dispatched.target = this;
        }
        dispatched.currentTarget = this;
        (this.listeners.get(dispatched.type) || []).forEach((listener) => {
            listener.call(this, dispatched);
        });
        return true;
    }

    click() {
        this.dispatchEvent({ type: 'click', target: this });
    }
}

class FakeDocument {
    constructor(options = {}) {
        this.supportsDialogMethods =
            options.supportsDialogMethods !== false;
    }

    createElement(tagName) {
        return new FakeElement(
            this,
            tagName,
            this.supportsDialogMethods
        );
    }
}

function createFixture(options) {
    const calls = [];
    const context = vm.createContext({
        GoogologyMath: {
            render(container) {
                calls.push({
                    container,
                    childCount: container.children.length,
                    html: container.innerHTML
                });
            }
        }
    });
    vm.runInContext(source, context, {
        filename: 'content-document.js'
    });

    const document = new FakeDocument(options);
    return {
        calls,
        container: document.createElement('div'),
        renderer: context.GoogologyContentDocument
    };
}

test('structured content is fully inserted before formulas are typeset', () => {
    const { calls, container, renderer } = createFixture();
    const sourceCode = 'print("\\\\(not_math\\\\)")';
    const detail = {
        title: 'Value \\(10^{10}\\)',
        sections: [
            {
                type: 'paragraph',
                html: 'Let \\(x=1\\).'
            },
            {
                type: 'code',
                language: 'python',
                title: 'Example',
                source: sourceCode
            }
        ]
    };

    renderer.render(container, detail);

    assert.equal(calls.length, 1);
    assert.equal(calls[0].container, container);
    assert.equal(calls[0].childCount, 3);
    assert.equal(container.children[0].innerHTML, detail.title);
    assert.equal(container.children[1].innerHTML, detail.sections[0].html);
    assert.equal(
        container.children[2].children[1].children[0].textContent,
        sourceCode
    );
    assert.equal(renderer.hasCode(detail), true);
});

test('legacy string details are also typeset after insertion', () => {
    const { calls, container, renderer } = createFixture();
    const detail = '<p>\\(x=y\\)</p>';

    renderer.render(container, detail);

    assert.equal(container.innerHTML, detail);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].html, detail);
});

test('dialog code sections open and close with localized controls', () => {
    const { container, renderer } = createFixture();
    const detail = {
        title: 'TREE search',
        sections: [
            {
                type: 'code',
                display: 'dialog',
                language: 'python',
                title: 'tree.py',
                openLabel: 'Open exhaustive search',
                closeLabel: 'Close source code',
                source: 'print("TREE(3)")'
            }
        ]
    };

    renderer.render(container, detail);

    const section = container.children[1];
    const openButton = section.children[0];
    const dialog = section.children[1];
    const panel = dialog.children[0];
    const closeButton = panel.children[0];
    const codeWindow = panel.children[1];

    assert.equal(section.className, 'code-dialog-section');
    assert.equal(openButton.textContent, detail.sections[0].openLabel);
    assert.equal(openButton.getAttribute('aria-haspopup'), 'dialog');
    assert.equal(dialog.tagName, 'DIALOG');
    assert.equal(
        closeButton.getAttribute('aria-label'),
        detail.sections[0].closeLabel
    );
    assert.equal(closeButton.textContent, detail.sections[0].closeLabel);
    assert.equal(
        codeWindow.children[1].children[0].textContent,
        detail.sections[0].source
    );
    assert.equal(renderer.hasCode(detail), true);

    openButton.click();
    assert.equal(dialog.showModalCalls, 1);
    assert.equal(dialog.hasAttribute('open'), true);

    closeButton.click();
    assert.equal(dialog.closeCalls, 1);
    assert.equal(dialog.hasAttribute('open'), false);

    openButton.click();
    dialog.dispatchEvent({ type: 'click', target: panel });
    assert.equal(dialog.closeCalls, 1);
    dialog.dispatchEvent({ type: 'click', target: dialog });
    assert.equal(dialog.closeCalls, 2);
    assert.equal(dialog.hasAttribute('open'), false);

    openButton.click();
    const escape = {
        type: 'keydown',
        key: 'Escape',
        preventDefault() {
            this.defaultPrevented = true;
        },
        stopPropagation() {
            this.propagationStopped = true;
        }
    };
    dialog.dispatchEvent(escape);
    assert.equal(dialog.closeCalls, 3);
    assert.equal(dialog.hasAttribute('open'), false);
    assert.equal(escape.defaultPrevented, true);
    assert.equal(escape.propagationStopped, true);
});

test('dialog code sections fall back to toggling the open attribute', () => {
    const { container, renderer } = createFixture({
        supportsDialogMethods: false
    });
    const detail = {
        sections: [
            {
                type: 'code',
                display: 'dialog',
                language: 'text',
                openLabel: 'Open',
                closeLabel: 'Close',
                source: 'long source'
            }
        ]
    };

    renderer.render(container, detail);

    const section = container.children[0];
    const openButton = section.children[0];
    const dialog = section.children[1];
    const closeButton = dialog.children[0].children[0];

    assert.equal(typeof dialog.showModal, 'undefined');
    assert.equal(typeof dialog.close, 'undefined');

    openButton.click();
    assert.equal(dialog.hasAttribute('open'), true);

    closeButton.click();
    assert.equal(dialog.hasAttribute('open'), false);

    openButton.click();
    dialog.dispatchEvent({ type: 'click', target: dialog });
    assert.equal(dialog.hasAttribute('open'), false);
    assert.equal(renderer.hasCode(detail), true);
});
