'use strict';

// Readable reference for the golfing entry. The displayed program is a
// standalone script, not a call to this helper. Do not run the seed-9 entry:
// only small, explicitly bounded cases are suitable for a real JS engine.
// Rules: https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/definition.md
// Graphs here omit the implicit empty root, as in the author implementation.
function expand(graph, index) {
    if (!Number.isSafeInteger(index) || index < 0) {
        throw new RangeError('Expected a nonnegative safe integer');
    }
    const result = graph.map((column) => column.slice());
    if (!result.length || !index || !result.at(-1).length) {
        result.pop();
        return result;
    }
    for (let reflection = 0; reflection < index; reflection += 1) {
        const last = result.at(-1);
        const parent = last.at(-1);
        const span = result.length - parent;
        const parentColumn = parent ? result[parent - 1] : [];
        const copies = result.slice(parent).map((column) => {
            const moved = column.map((value) => value >= parent ? value + span : value);
            const inserted = moved.length > parent ? Array(span).fill(moved[parent]) : [];
            return moved.slice(0, parent).concat(inserted, moved.slice(parent));
        });
        result[result.length - 1] = last.slice(0, -1).concat(parentColumn.slice(last.length - 1));
        result.push(...copies);
    }
    result.pop();
    return result;
}

function countdown(graph, initialIndex, maxSteps = 1000) {
    let current = graph;
    let index = initialIndex;
    let steps = 0;
    while (current.length) {
        if (steps++ >= maxSteps) throw new RangeError('Small-case test budget exceeded');
        current = expand(current, index);
        index += 1;
    }
    return index;
}

module.exports = { expand, countdown };
