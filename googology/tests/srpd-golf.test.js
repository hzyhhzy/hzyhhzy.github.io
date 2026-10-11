'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { expand, countdown } = require('../programs/srpd-reference.cjs');

const source = fs.readFileSync(path.join(__dirname, '../programs/srpd-golf.js'), 'utf8').trim();

// Tests replace the large seed and optionally stop after a single fundamental-
// sequence step. They never run the advertised seed-9 full countdown.
function runSmall(graph, index, singleStep = false) {
    const initialized = source.replace('a=[[],[0]],n=9', `a=${JSON.stringify([[], ...graph])},n=${index}`);
    const bounded = singleStep ? initialized.replace('a[1];', 'a[1]&&steps++<1;') : initialized;
    const printed = [];
    const context = { steps: 0, console: { log: (value) => printed.push(value) } };
    vm.runInNewContext(bounded, context, { timeout: 1000 });
    assert.equal(printed.length, 1);
    return { graph: JSON.parse(JSON.stringify(context.a.slice(1))), output: printed[0] };
}

test('SRPD golf is a complete 226-character ASCII program, including seed and output', () => {
    assert.equal(source.length, 226);
    assert.equal(Buffer.byteLength(source, 'utf8'), 226);
    assert.match(source, /^for\(a=\[\[\],\[0\]\],n=9;/u);
    assert.match(source, /console\.log\(n\)$/u);
    assert.doesNotMatch(source, /\b(?:require|import|fetch|eval|prompt|readline)\b/u);
    assert.doesNotThrow(() => new vm.Script(source));
});

test('SRPD initial fundamental sequences agree with the published parent-list examples', () => {
    const examples = [[], [[]], [[], [1]], [[], [1], [2, 2]], [[], [1], [2, 2], [3, 3, 3]]];
    for (let index = 0; index < examples.length; index += 1) {
        assert.deepEqual(expand([[0]], index), examples[index]);
        assert.deepEqual(runSmall([[0]], index, true).graph, examples[index]);
    }
});

test('SRPD golf preserves the essential row-insertion counterexample', () => {
    // Published standard-path fixture: omitting row insertion changes this case.
    const seed = [[], [1], [2, 2], [3, 3, 3], [2]];
    const expected = [[], [1], [2, 2], [3, 3, 3], [1], [5, 5], [6, 6, 6, 6, 6, 6]];
    assert.deepEqual(expand(seed, 1), expected);
    assert.deepEqual(runSmall(seed, 1, true).graph, expected);
});

test('SRPD compact and readable expanders agree on a bounded standard-descendant tree', () => {
    let frontier = [[[0]]];
    const seen = new Set();
    let comparisons = 0;
    for (let depth = 0; depth < 6; depth += 1) {
        const next = [];
        for (const graph of frontier) {
            const key = JSON.stringify(graph);
            if (seen.has(key)) continue;
            seen.add(key);
            for (let index = 0; index <= 4; index += 1) {
                const expected = expand(graph, index);
                assert.deepEqual(runSmall(graph, index, true).graph, expected, `${key}[${index}]`);
                comparisons += 1;
                if (expected.length <= 25 && expected.reduce((sum, column) => sum + column.length, 0) <= 100) {
                    next.push(expected);
                }
            }
        }
        frontier = next;
    }
    assert.ok(comparisons >= 100, `Only ${comparisons} bounded cases checked`);
});

test('SRPD full program terminates and prints the reference count on small seeds', () => {
    for (let initialIndex = 0; initialIndex <= 2; initialIndex += 1) {
        const expected = countdown([[0]], initialIndex);
        assert.equal(runSmall([[0]], initialIndex).output, expected);
    }
    for (let width = 0; width <= 5; width += 1) {
        const graph = Array.from({ length: width }, () => []);
        for (let initialIndex = 0; initialIndex <= 4; initialIndex += 1) {
            assert.equal(runSmall(graph, initialIndex).output, initialIndex + width);
        }
    }
});
