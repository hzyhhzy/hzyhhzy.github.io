'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const modalSource = fs.readFileSync(
    path.join(__dirname, '..', 'modal.js'),
    'utf8'
);

class FakeElement {
    constructor(ownerDocument) {
        this.ownerDocument = ownerDocument;
        this.hidden = false;
        this.attributes = new Map();
        this.listeners = new Map();
        this.queries = new Map();
    }

    addEventListener(type, listener) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type).push(listener);
    }

    dispatch(type, event = {}) {
        (this.listeners.get(type) || []).forEach((listener) => {
            listener(event);
        });
    }

    focus() {
        this.ownerDocument.activeElement = this;
    }

    querySelector(selector) {
        return this.queries.get(selector) || null;
    }

    querySelectorAll() {
        return [];
    }

    setAttribute(name, value) {
        this.attributes.set(name, String(value));
    }

    getAttribute(name) {
        return this.attributes.get(name) || null;
    }
}

function createFixture() {
    const document = {
        activeElement: null,
        listeners: new Map(),
        addEventListener(type, listener) {
            if (!this.listeners.has(type)) {
                this.listeners.set(type, []);
            }
            this.listeners.get(type).push(listener);
        },
        dispatch(type, event = {}) {
            (this.listeners.get(type) || []).forEach((listener) => {
                listener(event);
            });
        }
    };
    const root = new FakeElement(document);
    const body = new FakeElement(document);
    const closeButton = new FakeElement(document);
    const trigger = new FakeElement(document);
    const rendered = [];
    const documentRenderer = {
        render(container, content) {
            rendered.push({ container, content });
        }
    };

    root.hidden = true;
    root.queries.set('#modal-body', body);
    root.queries.set('.modal-close', closeButton);
    document.activeElement = trigger;

    const window = {
        document,
        GoogologyContentDocument: documentRenderer
    };
    const context = vm.createContext({ document, window });
    vm.runInContext(modalSource, context, { filename: 'modal.js' });

    return {
        body,
        closeButton,
        document,
        Modal: window.GoogologyDetailModal,
        rendered,
        root,
        trigger
    };
}

function keyboardEvent(key) {
    return {
        key,
        defaultPrevented: false,
        propagationStopped: false,
        preventDefault() {
            this.defaultPrevented = true;
        },
        stopPropagation() {
            this.propagationStopped = true;
        }
    };
}

test('modal moves focus, closes on Escape, and restores its trigger', () => {
    const fixture = createFixture();
    const modal = new fixture.Modal(fixture.root);
    const content = {
        title: 'Example',
        sections: []
    };

    modal.show(content);

    assert.equal(fixture.root.hidden, false);
    assert.equal(fixture.root.getAttribute('aria-hidden'), 'false');
    assert.equal(fixture.document.activeElement, fixture.closeButton);
    assert.deepEqual(fixture.rendered, [{
        container: fixture.body,
        content
    }]);

    const escape = keyboardEvent('Escape');
    fixture.document.dispatch('keydown', escape);

    assert.equal(fixture.root.hidden, true);
    assert.equal(fixture.root.getAttribute('aria-hidden'), 'true');
    assert.equal(fixture.document.activeElement, fixture.trigger);
    assert.equal(escape.defaultPrevented, true);
    assert.equal(escape.propagationStopped, true);
});

test('modal closes through its button and backdrop', () => {
    const fixture = createFixture();
    const modal = new fixture.Modal(fixture.root);
    const content = { title: 'Example', sections: [] };

    modal.show(content);
    fixture.closeButton.dispatch('click', {
        target: fixture.closeButton
    });
    assert.equal(fixture.root.hidden, true);

    fixture.document.activeElement = fixture.trigger;
    modal.show(content);
    fixture.root.dispatch('click', { target: fixture.root });
    assert.equal(fixture.root.hidden, true);
    assert.equal(fixture.document.activeElement, fixture.trigger);
});
