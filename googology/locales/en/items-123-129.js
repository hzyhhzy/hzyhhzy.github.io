(function registerItems123To130(global) {
    'use strict';

    function unreviewedNotice() {
        return {
            type: 'note',
            html: "<p>This content was produced by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed.</p>",
        };
    }

    global.GoogologyI18n.registerMessages('en', {
        items: {
            'item-123': {
                label: "\\(\\lim(\\mathrm{TBMS})\\)",
                detail: {
                    title: "TBMS: Transfinite Bashicu Matrix System",
                    representations: [
                        { label: "Common representations", html: "\\(\\lim(\\mathrm{TBMS})\\)" },
                        { label: "Y-sequence representation", html: "Known lower bound: \\(Y(1,3,4,2,5,8,10)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>TBMS extends the row structure of BMS to recursively expandable row labels. Each entry stores both a natural number and a TBMS expression describing its row height, so the structure of the rows is itself expressed in the same notation.</p><p>Limit row labels expand first. Successor structure then triggers bad-part copying according to parent relations. The fundamental sequence of the top successively increases the nesting depth of these recursive row labels.</p><p>Comparison results archived in 2026 give a fixed finite SRPD term as an upper bound for the whole ordinary TBMS system, giving\\[\\lim(\\mathrm{TBMS})\\lt\\lim(\\mathrm{SRPD}).\\]A smaller calibration point is\\[Y(1,3,4,2,5,8)=\\mathrm{SRPD}(1,2,4,8,4)=\\mathrm{TBMS}\\bigl[()(1^{\\omega^2})\\bigr].\\]The TBMS superscript records row height.</p><p><strong>Sources:</strong> <a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/notations/BM-like/TBM.ts\">NER's TBMS code definition</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.md\">TBMS/SRPD/Y comparison overview</a>.</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-124': {
                label: "\\( \\lim(\\mathrm{SRPD}) \\) · S🎄O",
                detail: {
                    title: "SRPD · S🎄O: parent-list notation",
                    representations: [
                        { label: "Common representations", html: "\\(\\lim(\\mathrm{SRPD})\\)<br>S🎄O<br>SRPD / RPD0" },
                        { label: "Y-sequence representation", html: "Possibly \\(Y(1,3,4,2,5,8,10,4,9,14,17,10)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>SRPD (formerly RPD0) isolates an initial segment shared by \\(\\varepsilon_0\\mathrm{MN}\\), RPD, ARD, ARD2 and related notations. Its definition is compact: each column stores a nonincreasing list of parent addresses, and expansion reflects copies, relocates references and inserts levels. Its sprawling expansion diagrams resemble Christmas trees, hence the nickname <strong>S🎄O</strong>.</p><p>A characteristic landmark is the count sequence \\((1,2,4,2)\\) for \\(\\lim(\\mathrm{BMS})\\), or \\((1,1,2,4,2)\\) when the initial root is explicit. Expanding the former produces\\[(1,2,4,1,2,7,1,2,10,\\ldots).\\]The short rules generate luxuriant layers of branches.</p><p>Some endpoints of the shared initial segment are\\[\\begin{aligned}\\lim(\\mathrm{SRPD})&=|\\mathrm{e0MN}(1,3)|\\\\&=|\\mathrm{RPD}(1,2)|\\\\&=|\\mathrm{ARD}(1,1,3)|\\\\&=|\\mathrm{ARD2}(1,1,3)|.\\end{aligned}\\]These denote the order types below the indicated endpoints, not the limits of the entire systems.</p><p>A fixed finite SRPD term already covers the whole TBMS limit, so \\(\\lim(\\mathrm{TBMS})\\lt\\lim(\\mathrm{SRPD})\\).</p><p><strong>Sources:</strong> <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/definition.md\">SRPD definition</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/correspondence.md\">shared initial segments</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.md\">Y candidate and TBMS comparisons</a>.</p>"},
                        {
                            type: "html",
                            html: "<p><strong>JavaScript big-number golf: 226 characters.</strong>Following the style of <a href=\"https://codegolf.stackexchange.com/questions/148897/bignum-bakeoff-reboot\">BigNum Bakeoff Reboot</a>, the complete program takes no input or external resources, eventually halts, and prints a deterministic integer. We use an idealized machine with exact integers and no limits on integer size, array length, memory, or runtime. The count includes all ASCII source, initialization, and output, excluding only the final newline.</p><p>Starting at SRPD's top term \\([0]\\) with index \\(9\\), the program expands at the current index, increments the index, and finally prints it. This version has \\(226\\) characters; the \\(200\\)- and \\(150\\)-character targets have not yet been reached. The readable reference has protective limits for small-case checking; do not try to finish the golf program's default seed in a real browser.</p>",
                        },
                        {
                            type: "code",
                            title: "SRPD JavaScript big-number golf · 226 characters",
                            language: "javascript",
                            display: "dialog",
                            openLabel: "View the 226-character program",
                            closeLabel: "Close code",
                            source: `for(a=[[],[0]],n=9;a[1];a.pop(),n++)for(i=n;i--&&(c=a[l=a.length-1])>"";p=c.at(-1),d=l-p,a.push(...a.slice(-d).map(b=>b.flatMap((x,j)=>Array(j-p?1:d+1).fill(x<p?x:x+d)))),c.pop(),c.push(...a[p].slice(c.length)));console.log(n)`,
                        },
                        {
                            type: "code",
                            title: "SRPD readable reference (small-case checks)",
                            language: "javascript",
                            display: "dialog",
                            openLabel: "View the readable reference",
                            closeLabel: "Close code",
                            source: `'use strict';

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

module.exports = { expand, countdown };`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-125': {
                label: "\\(Y(1,3,4,3)\\)",
                detail: {
                    title: "\\(Y(1,3,4,3)\\)",
                    representations: [
                        { label: "Common representations", html: "\\(Y(1,3,4,3)\\)" },
                        { label: "Y-sequence representation", html: "\\(Y(1,3,4,3)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>This is the specific four-entry Y expression \\((1,3,4,3)\\). It represents a fixed stage below that node, whereas the Y limit collects all stages generated by the standard seeds.</p><p>Expansion uses the usual Y difference mountains and ancestry relations. Just four entries can generate long subsequent sequences; the digits are not ordinary exponents, and the final entry alone does not measure the resulting growth.</p><p>This node has also been a target in recent comparisons of TBMS, SRPD and Y. Enter it in NER to inspect its mountains and fundamental-sequence steps.</p><p><strong>Sources:</strong> <a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">NER's Y-sequence expander</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.md\">SRPD/Y comparison research</a>.</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-126': {
                label: "\\(\\varepsilon_0\\mathrm{MN}\\)",
                detail: {
                    title: "\\(\\varepsilon_0\\) Mountain Notation",
                    representations: [
                        { label: "Common representations", html: "\\(\\varepsilon_0\\mathrm{MN}\\)" },
                        { label: "Y-sequence representation", html: "Beyond \\(\\lim(Y)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\(\\varepsilon_0\\)MN (e0 Mountain Notation) was introduced by @test_alpha0. This entry uses the ordinary version: columns store parent addresses and Cantor-normal-form row labels below \\(\\varepsilon_0\\). Reflection transports both parent addresses and numbers inside those row labels.</p><p>The default fundamental sequence performs the specified number of reflections on a limit term, then deletes the last column. NER also provides row-height differences, mountain diagrams and exact count-sequence views of the same expression.</p><p>@test_alpha0 has proved well-ordering of the ordinary system in \\(KP_\\omega+\\text{“}\\omega_1\\text{ exists”}\\).</p><p>An existing construction order-embeds the entire \\(\\omega\\)-Y standard domain below the finite ordinary \\(\\varepsilon_0\\)MN term \\((1,3,14,2)\\), itself below \\((1,4)\\). Another correspondence is\\[\\lim(\\mathrm{SRPD})=|\\mathrm{e0MN}(1,3)|.\\]These concrete connections link it to the preceding sequence and column notations.</p><p><strong>Expansion and comparison sources:</strong> <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/external/README.md\">attribution, versions and NER code</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/order-comparisons/proofs/cwy2-e0mn-cover-20260917/CWY2-wY-le-e0MN.zh-CN.md\">embedding \\(\\omega\\)-Y into ordinary \\(\\varepsilon_0\\)MN</a>.</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-127': {
                label: "\\(\\operatorname{PTO}(KP_\\omega+\\text{“}\\omega_1\\text{ exists”})\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(KP_\\omega+\\text{“}\\omega_1\\text{ exists”})\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>Here “\\(\\omega_1\\) exists” means that an uncountable ordinal exists: there is an ordinal \\(\\nu\\gt\\omega\\) with no set-function surjection \\(\\omega\\twoheadrightarrow\\nu\\). The base theory \\(KP_\\omega\\) is Kripke–Platek set theory with infinity and full set induction.</p><p>The 2026 well-ordering analyses of Y and \\(\\omega\\)-Y use this weak set-theoretic background. It supplies ordinal ranks that decrease under expansion, without adding power set or choice. This axis marker denotes the theory's proof-theoretic ordinal.</p><p><strong>Sources:</strong> <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/well-ordering.md\">Y and column notations: well-ordering in weak set theory</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/CWY2/definition.md\">the \\(\\omega\\)-Y proof background</a>.</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-128': {
                label: "BTBMS",
                detail: {
                    title: "BTBMS: Bubby3's Transfinite BMS",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>Originally conceived by Bubby3 and developed by the community, BTBMS recursively represents entry heights by matrices of the same kind. It distinguishes internal and external column references across nesting levels, extending TBMS-style construction to deeper structures.</p><p>SmileLee wrote the NER expander following discussions with Asheep233. It includes column-labelled and level-based displays. A concrete calibration is the BTBMS expression \\( ()(1^{(2,1)}) \\), which corresponds to the TBMS limit; its superscript is an internal height structure.</p><p><strong>Sources:</strong> <a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/notations/BM-like/BTBM.ts\">BTBMS code definition</a>; <a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/composables/use_i18n.ts\">NER credits and calibration table</a>; <a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">online expander</a>.</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-129': {
                label: "DQDN",
                detail: {
                    title: "DQDN: Demand Query Diagram Notation",
                    sections: [
                        {"type":"html","html":"<p>DQDN's idea is to squeeze a powerful type system into sequences: encode \\(F_\\omega\\) programs and typing derivations as columns, add natural numbers, recursion and queries with arbitrary natural-number answers, then count data and active columns as \\(1\\) and \\(2\\). Standard expressions below the common TOP can then be compared in ordinary lexicographic order.</p><p>Its standard domain has a well-ordering proof, and its overall strength is at least \\(\\operatorname{PTO}(Z_\\omega)\\). Readability pays the price: an existing representation of \\(\\omega^\\omega\\) already has \\(880\\) columns, and \\(\\omega^{\\omega\\cdot2}\\) has \\(1079\\). Even a relatively simple ordinal can become a huge expression whose size is almost impossible to discern from the sequence alone.</p><p>It packages a type system and program evaluation as ordinal notation, rather than seeking a compact, intuitive expansion rule.</p><p><strong>Sources:</strong> <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/DQDN/definition.md\">DQDN definition and lexicographic order</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/dqdn-well-ordering.md\">standard-domain well-ordering proof</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/README.md\">strength bounds</a>; <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/small-ordinals.md\">small-ordinal column counts</a>.</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-130': {
                label: "\\(\\operatorname{PTO}(Z_2)\\,?\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(Z_2)\\,?\\)",
                    representations: [
                        { label: "Common representations", html: "\\(\\operatorname{PTO}(Z_2)\\,?\\)" },
                        { label: "BMS representation", html: "Suspected correspondence: \\(\\lim(\\mathrm{BMS})\\)" },
                        { label: "Y-sequence representation", html: "Suspected correspondence: \\(Y(1,3)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\(Z_2\\) is full second-order arithmetic, allowing natural numbers and arbitrary sets of natural numbers with full comprehension. \\(\\operatorname{PTO}(Z_2)\\) measures the order types of computable well-orders whose well-ordering it proves.</p><p>The BMS limit is strongly suspected to coincide with this height, so this marker is placed alongside it with a question mark. The currently archived comparison gives the upper bound\\[\\lim(\\mathrm{BMS})\\le\\operatorname{PTO}(Z_2).\\]This bound supplies one direction of the proposed identification.</p><p><strong>Source:</strong> <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/bms-top2.md\">BMS, second-order arithmetic and the DQDN comparison</a>.</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
        },
    });
})(globalThis);
