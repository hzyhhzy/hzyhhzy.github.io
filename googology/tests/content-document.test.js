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
    constructor(ownerDocument, tagName) {
        this.ownerDocument = ownerDocument;
        this.tagName = String(tagName).toUpperCase();
        this.children = [];
        this.className = '';
        this.innerHTML = '';
        this.textContent = '';
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
}

class FakeDocument {
    createElement(tagName) {
        return new FakeElement(this, tagName);
    }
}

function createFixture() {
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

    const document = new FakeDocument();
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
