(function registerItems123To130(global) {
    'use strict';

    function unreviewedNotice() {
        return {
            type: 'note',
            html: "<p>该内容由gpt6-astra完成，且暂时未经过人工审核，不保证正确性</p>",
        };
    }

    global.GoogologyI18n.registerMessages('zh-CN', {
        items: {
            'item-123': {
                label: "\\(\\lim(\\mathrm{TBMS})\\)",
                detail: {
                    title: "TBMS：Transfinite Bashicu Matrix System",
                    representations: [
                        { label: "常用表示", html: "\\(\\lim(\\mathrm{TBMS})\\)" },
                        { label: "Y 序列表示", html: "已知下界：\\(Y(1,3,4,2,5,8,10)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>TBMS 把 BMS 的行数结构推广为可递归展开的行标签。每个条目同时保存一个自然数和表示行高的 TBMS 表达式，因此“行的结构”本身也由同一种记号描述。</p><p>行标签为极限时，先展开行标签；到后继结构时，再依据父关系复制矩阵的坏部。顶端基本列依次增加这种递归行标签的嵌套层数。</p><p>2026 年收录的比较结果给整个普通 TBMS 找到了一个固定有限 SRPD 项作为上界，得到\\[\\lim(\\mathrm{TBMS})\\lt\\lim(\\mathrm{SRPD}).\\]一个较小的校准点是\\[Y(1,3,4,2,5,8)=\\mathrm{SRPD}(1,2,4,8,4)=\\mathrm{TBMS}\\bigl[()(1^{\\omega^2})\\bigr].\\]这里 TBMS 上标记录行高。</p><p><strong>来源：</strong><a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/notations/BM-like/TBM.ts\">NER 的 TBMS 代码定义</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.zh-CN.md\">TBMS／SRPD／Y 比较总览</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-124': {
                label: "\\( \\lim(\\mathrm{SRPD}) \\) · S🎄O",
                detail: {
                    title: "SRPD · S🎄O：父列表记号",
                    representations: [
                        { label: "常用表示", html: "\\(\\lim(\\mathrm{SRPD})\\)<br>S🎄O<br>SRPD / RPD0" },
                        { label: "Y 序列表示", html: "可能是 \\(Y(1,3,4,2,5,8,10,4,9,14,17,10)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>SRPD（旧名 RPD0）抽出了 \\(\\varepsilon_0\\mathrm{MN}\\)、RPD、ARD、ARD2 等记号共有的初段。它的定义很简洁：每列只记录一个非增的父地址列表，展开时反射复制、搬运父地址并补层；展开图却像一棵不断长高的圣诞树，因此也戏称 <strong>S🎄O</strong>。</p><p>这类记号的一个典型特征是：\\(\\lim(\\mathrm{BMS})\\) 对应计数序列 \\((1,2,4,2)\\)；显式保留首根时写成 \\((1,1,2,4,2)\\)。前者展开后出现\\[(1,2,4,1,2,7,1,2,10,\\ldots).\\]规则短，复制出的层层分枝却很繁茂。</p><p>公共初段的几个端点为\\[\\begin{aligned}\\lim(\\mathrm{SRPD})&=|\\mathrm{e0MN}(1,3)|\\\\&=|\\mathrm{RPD}(1,2)|\\\\&=|\\mathrm{ARD}(1,1,3)|\\\\&=|\\mathrm{ARD2}(1,1,3)|.\\end{aligned}\\]这些是指定端点以下的序型，不是各记号整体的极限。</p><p>整个 TBMS 的极限已被一个固定有限 SRPD 项覆盖，故 \\(\\lim(\\mathrm{TBMS})\\lt\\lim(\\mathrm{SRPD})\\)。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/definition.zh-CN.md\">SRPD 定义</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/correspondence.zh-CN.md\">公共初段对应</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.zh-CN.md\">Y 候选与 TBMS 比较记录</a>。</p>"},
                        {
                            type: "html",
                            html: "<p><strong>JavaScript 大数高尔夫：226 字符。</strong>规则参考 <a href=\"https://codegolf.stackexchange.com/questions/148897/bignum-bakeoff-reboot\">BigNum Bakeoff Reboot</a>：完整程序不读输入、不调用外部资源，最终停止并输出一个确定的整数；按理想化机器计算，整数精确且不设位数、数组长度、内存和运行时间上限。这里统计全部 ASCII 源码，包含初值与输出，不含末尾换行。</p><p>程序从 SRPD 的顶端项 \\([0]\\) 和指标 \\(9\\) 出发，每步按当前指标展开，再将指标加一，最终输出指标。这一版为 \\(226\\) 字符，尚未压到 \\(200\\) 或 \\(150\\) 以下。可读参考版用于小规模核对，设有保护性运行上限；不要在真实浏览器中尝试跑完高尔夫版的默认初值。</p>",
                        },
                        {
                            type: "code",
                            title: "SRPD JavaScript 大数高尔夫 · 226 字符",
                            language: "javascript",
                            display: "dialog",
                            openLabel: "查看 226 字符程序",
                            closeLabel: "关闭代码",
                            source: `for(a=[[],[0]],n=9;a[1];a.pop(),n++)for(i=n;i--&&(c=a[l=a.length-1])>"";p=c.at(-1),d=l-p,a.push(...a.slice(-d).map(b=>b.flatMap((x,j)=>Array(j-p?1:d+1).fill(x<p?x:x+d)))),c.pop(),c.push(...a[p].slice(c.length)));console.log(n)`,
                        },
                        {
                            type: "code",
                            title: "SRPD 可读参考实现（小规模核对）",
                            language: "javascript",
                            display: "dialog",
                            openLabel: "查看可读参考实现",
                            closeLabel: "关闭代码",
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
                        { label: "常用表示", html: "\\(Y(1,3,4,3)\\)" },
                        { label: "Y 序列表示", html: "\\(Y(1,3,4,3)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>这是 Y 序列中的具体四项表达式 \\((1,3,4,3)\\)。它代表该节点以下的一个固定阶段，整个 Y 序列极限则汇集所有标准种子生成的阶段。</p><p>展开时仍使用 Y 的差分山脉和祖先关系。短短四项可以生成很长的后续序列；数字本身不是普通指数，也不能只按末项大小估算展开后的增长。</p><p>这个节点也是近来的 TBMS、SRPD 与 Y 比较中研究过的定位目标。可以在 NER 中输入该序列，逐步查看山脉与基本列。</p><p><strong>来源：</strong><a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">NER 的 Y 序列展开器</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.zh-CN.md\">SRPD 与 Y 的比较研究</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-126': {
                label: "\\(\\varepsilon_0\\mathrm{MN}\\)",
                detail: {
                    title: "\\(\\varepsilon_0\\) Mountain Notation",
                    representations: [
                        { label: "常用表示", html: "\\(\\varepsilon_0\\mathrm{MN}\\)" },
                        { label: "Y 序列表示", html: "超出 \\(\\lim(Y)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\(\\varepsilon_0\\)MN（e0 Mountain Notation）由 @test_alpha0 提出。本条使用普通版：每列保存父地址与 \\(\\varepsilon_0\\) 以下的 Cantor 正规形行标；反射复制时，父地址和行标内部的数值都会随结构搬运。</p><p>默认基本列对极限项进行指定次数的反射，最后删去末列。NER 中还可以切换到行高差、山脉图和精确计数序列，观察同一个表达式。</p><p>@test_alpha0 已完成普通版在 \\(KP_\\omega+\\text{“}\\omega_1\\text{ 存在”}\\) 中的良序证明。</p><p>已有构造把整个 \\(\\omega\\)-Y 标准域保序嵌入普通 \\(\\varepsilon_0\\)MN 的有限项 \\((1,3,14,2)\\) 以下；该项又位于 \\((1,4)\\) 以下。另有\\[\\lim(\\mathrm{SRPD})=|\\mathrm{e0MN}(1,3)|.\\]这些具体对应让它与前面的序列和列图记号连接起来。</p><p><strong>展开与比较资料：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/external/README.zh-CN.md\">作者、版本及 NER 代码</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/order-comparisons/proofs/cwy2-e0mn-cover-20260917/CWY2-wY-le-e0MN.zh-CN.md\">\\(\\omega\\)-Y 到普通 \\(\\varepsilon_0\\)MN 的嵌入</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-127': {
                label: "\\(\\operatorname{PTO}(KP_\\omega+\\text{“}\\omega_1\\text{ 存在”})\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(KP_\\omega+\\text{“}\\omega_1\\text{ 存在”})\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>这里“\\(\\omega_1\\) 存在”指存在不可数序数：存在序数 \\(\\nu\\gt\\omega\\)，不存在集合函数 \\(\\omega\\twoheadrightarrow\\nu\\)。基础 \\(KP_\\omega\\) 为含无穷公理和完整集合归纳的 Kripke–Platek 集合论。</p><p>2026 年的 Y 与 \\(\\omega\\)-Y 良序分析使用这一弱集合论背景。它提供足够的序数秩来证明展开下降，同时不需要加入幂集或选择公理。主轴在这里标示该理论的证明论序数。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/well-ordering.zh-CN.md\">Y 与列图记号：弱集合论内的良序证明</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/CWY2/definition.zh-CN.md\">\\(\\omega\\)-Y 的证明背景</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-128': {
                label: "BTBMS",
                detail: {
                    title: "BTBMS：Bubby3’s Transfinite BMS",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>BTBMS 最初由 Bubby3 构想并经社区完善。它让列条目的高度继续用同类矩阵递归表示，并区分不同嵌套层中的内部与外部列引用，把 TBMS 式构造推进到更深的结构。</p><p>NER 的展开器由笑姐姐基于与 Asheep233 的讨论编写，提供带列标的表示及层级视图。一个具体校准是：BTBMS 的 \\( ()(1^{(2,1)}) \\) 对应 TBMS 极限；其中上标是记号内部的高度结构。</p><p><strong>来源：</strong><a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/notations/BM-like/BTBM.ts\">BTBMS 代码定义</a>；<a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/composables/use_i18n.ts\">NER 的作者说明与校准表</a>；<a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">在线展开器</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-129': {
                label: "DQDN",
                detail: {
                    title: "DQDN：按需查询图列记号",
                    sections: [
                        {"type":"html","html":"<p>DQDN 的理念是把强大的类型系统“塞进”数列：先把 \\(F_\\omega\\) 的程序和类型推导编码成列，再加入自然数、递归和可返回任意自然数的查询操作；最后把数据列、活动列分别记成 \\(1\\)、\\(2\\)，让共同 TOP 以下的标准表达式直接按普通字典序排列。</p><p>其标准域已有良序证明，整体强度至少达到 \\(\\operatorname{PTO}(Z_\\omega)\\)。但这种强度是以可读性为代价换来的：已有的 \\(\\omega^\\omega\\) 表示就有 \\(880\\) 列，\\(\\omega^{\\omega\\cdot2}\\) 有 \\(1079\\) 列。一个并不复杂的序数也会被编码成庞大的表达式，几乎无法凭数列外观分析它的大小。</p><p>它更像是把类型系统与程序求值包装成序数记号，而不是追求简洁、直观的展开式。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/DQDN/definition.zh-CN.md\">DQDN 定义与字典序</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/dqdn-well-ordering.zh-CN.md\">标准域良序证明</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/README.zh-CN.md\">强度定位</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/small-ordinals.zh-CN.md\">小序数的列数记录</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-130': {
                label: "\\(\\operatorname{PTO}(Z_2)\\,?\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(Z_2)\\,?\\)",
                    representations: [
                        { label: "常用表示", html: "\\(\\operatorname{PTO}(Z_2)\\,?\\)" },
                        { label: "BMS 表示", html: "疑似对应：\\(\\lim(\\mathrm{BMS})\\)" },
                        { label: "Y 序列表示", html: "疑似对应：\\(Y(1,3)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\(Z_2\\) 是完全二阶算术，允许自然数和任意自然数集合，并具有完全概括公理。\\(\\operatorname{PTO}(Z_2)\\) 衡量它能够证明良序的可计算序关系的序型高度。</p><p>BMS 极限高度疑似对应这一位置，所以将这个带问号的标记放在 BMS 极限旁。目前收录的比较结果给出的上界是\\[\\lim(\\mathrm{BMS})\\le\\operatorname{PTO}(Z_2).\\]这提供了上述对应的一个方向。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/bms-top2.zh-CN.md\">BMS、二阶算术与 DQDN 的比较</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
        },
    });
})(globalThis);
