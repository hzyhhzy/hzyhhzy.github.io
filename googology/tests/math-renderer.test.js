'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(
    path.join(__dirname, '..', 'math-renderer.js'),
    'utf8'
);

function createFixture(withRenderer = true) {
    const calls = [];
    const context = vm.createContext(
        withRenderer
            ? {
                renderMathInElement(root, options) {
                    calls.push({ root, options });
                }
            }
            : {}
    );

    vm.runInContext(source, context, {
        filename: 'math-renderer.js'
    });

    return {
        calls,
        context,
        math: context.GoogologyMath
    };
}

test('formula helpers emit only the supported explicit delimiters', () => {
    const { context, math } = createFixture();

    assert.equal(math.inline('  f_\\alpha(n)  '), '\\(f_\\alpha(n)\\)');
    assert.equal(math.display('  x=y  '), '\\[x=y\\]');

    vm.runInContext(
        'globalThis.__tagged = GoogologyMath.inline`f_{\\alpha}(${2})`;',
        context
    );
    assert.equal(context.__tagged, '\\(f_{\\alpha}(2)\\)');
});

test('render delegates to auto-render with safe, code-preserving options', () => {
    const { calls, math } = createFixture();
    const root = {};

    assert.equal(math.render(root), true);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].root, root);

    const options = calls[0].options;
    assert.deepEqual(
        Array.from(options.delimiters, (entry) => ({
            left: entry.left,
            right: entry.right,
            display: entry.display
        })),
        [
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
        ]
    );
    assert.equal(options.throwOnError, false);
    assert.equal(options.strict, 'warn');
    assert.equal(options.trust, false);
    assert.equal(options.output, 'htmlAndMathml');
    assert.equal(options.ignoredTags.includes('pre'), true);
    assert.equal(options.ignoredTags.includes('code'), true);
    assert.equal(options.ignoredClasses.includes('katex'), true);
    assert.equal(options.ignoredClasses.includes('no-math'), true);
});

test('render degrades cleanly when auto-render is unavailable', () => {
    const { math } = createFixture(false);

    assert.equal(math.render({}), false);
    assert.equal(math.render(null), false);
});
