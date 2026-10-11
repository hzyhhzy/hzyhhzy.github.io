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
                    sections: [
                        {
                            type: 'html',
                            html: "<p>TBMS 把 BMS 的行数结构推广为可递归展开的行标签。每个条目同时保存一个自然数和表示行高的 TBMS 表达式，因此“行的结构”本身也由同一种记号描述。</p><p>行标签为极限时，先展开行标签；到后继结构时，再依据父关系复制矩阵的坏部。顶端基本列依次增加这种递归行标签的嵌套层数。</p><p>2026 年收录的比较结果给整个普通 TBMS 找到了一个固定有限 SRPD 项作为上界，得到\\[\\lim(\\mathrm{TBMS})\\lt\\lim(\\mathrm{SRPD}).\\]一个较小的校准点是\\[Y(1,3,4,2,5,8)=\\mathrm{SRPD}(1,2,4,8,4)=\\mathrm{TBMS}\\bigl[()(1^{\\omega^2})\\bigr].\\]这里 TBMS 上标记录行高。</p><p><strong>来源：</strong><a href=\"https://github.com/SmileLee-lyx/ne-rewritten/blob/master/src/notations/BM-like/TBM.ts\">NER 的 TBMS 代码定义</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.zh-CN.md\">TBMS／SRPD／Y 比较总览</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-124': {
                label: "\\(\\lim(\\mathrm{SRPD})\\)",
                detail: {
                    title: "SRPD：父列表记号",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>SRPD 旧名 RPD0，是 RPD 第零层的去冗余表示。公共首根隐含，每列只记录一个非增的父地址列表；展开通过反射复制、父地址搬运及补层完成。</p><p>它抽取了多个列图记号共有的初段。最方便的对应是\\[\\lim(\\mathrm{SRPD})=|\\mathrm{e0MN}(1,3)|=|\\mathrm{RPD}(1,2)|,\\]其中右侧取指定端点严格以下的序型。其标准域良序性由 RPD 初段的对应得到。</p><p>整个 TBMS 的极限不超过 SRPD 的有限项\\[\\mathrm{SRPD}(1,2,4,8,4,1,2,9,38,4,12,42,44)\\]，因而 SRPD 极限在 TBMS 极限之上。父列表、计数序列和 BMS 式高度列表是观察同一结构的几种方式。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/definition.zh-CN.md\">SRPD 定义与展开程序</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/SRPD/correspondence.zh-CN.md\">公共初段对应</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.zh-CN.md\">TBMS 比较</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-125': {
                label: "\\(Y(1,3,4,3)\\)",
                detail: {
                    title: "\\(Y(1,3,4,3)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>这是 Y 序列中的具体四项表达式 \\((1,3,4,3)\\)。它代表该节点以下的一个固定阶段，整个 Y 序列极限则汇集所有标准种子生成的阶段。</p><p>展开时仍使用 Y 的差分山脉和祖先关系。短短四项可以生成很长的后续序列；数字本身不是普通指数，也不能只按末项大小估算展开后的增长。</p><p>这个节点也是近来的 TBMS、SRPD 与 Y 比较中研究过的定位目标。可以在 NER 中输入该序列，逐步查看山脉与基本列。</p><p><strong>来源：</strong><a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">NER 的 Y 序列展开器</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/srpd-tbms/continuation/README.zh-CN.md\">SRPD 与 Y 的比较研究</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-126': {
                label: "\\(\\varepsilon_0\\mathrm{MN}\\)",
                detail: {
                    title: "\\(\\varepsilon_0\\) Mountain Notation",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>\\(\\varepsilon_0\\)MN（e0 Mountain Notation）由 @test_alpha0 提出。本条使用普通版：每列保存父地址与 \\(\\varepsilon_0\\) 以下的 Cantor 正规形行标；反射复制时，父地址和行标内部的数值都会随结构搬运。</p><p>默认基本列对极限项进行指定次数的反射，最后删去末列。NER 中还可以切换到行高差、山脉图和精确计数序列，观察同一个表达式。</p><p>@test_alpha0 已完成普通版在 \\(KP_\\omega+\\text{“}\\omega_1\\text{ 存在”}\\) 中的良序证明。</p><p>已有构造把整个 \\(\\omega\\)-Y 标准域保序嵌入普通 \\(\\varepsilon_0\\)MN 的有限项 \\((1,3,14,2)\\) 以下；该项又位于 \\((1,4)\\) 以下。另有\\[\\lim(\\mathrm{SRPD})=|\\mathrm{e0MN}(1,3)|.\\]这些具体对应让它与前面的序列和列图记号连接起来。</p><p><strong>展开与比较资料：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/external/README.zh-CN.md\">作者、版本及 NER 代码</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/order-comparisons/proofs/cwy2-e0mn-cover-20260917/CWY2-wY-le-e0MN.zh-CN.md\">\\(\\omega\\)-Y 到普通 \\(\\varepsilon_0\\)MN 的嵌入</a>。</p>",
                        },
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
                        {
                            type: 'html',
                            html: "<p>DQDN（Demand Query Diagram Notation）把有类型程序、类型和环境写成只向左引用的图列。数据列和活动列分别以 \\(1\\)、\\(2\\) 计数；基本列改写末端活动列，并公平枚举程序的下一步分支。</p><p>查询指令 \\(Q(n)\\) 可以返回任意自然数 \\(m\\)，因此一次活动可以产生无限多个孩子；每个基本列指标只取其中有限部分。整个记号把程序归约、递归和查询结构统一为列的展开。</p><p>标准 TOP 域已有纸面良序论证，已收录的定位包括\\[\\mathrm{TOP}[1]=\\varepsilon_0,\\qquad \\lim(\\mathrm{BMS})\\le\\operatorname{PTO}(Z_2)\\le|\\mathrm{TOP}[2]|,\\]\\[\\lim(\\mathrm{DQDN})\\ge\\operatorname{PTO}(Z_\\omega).\\]这给出了与有限高阶算术相连的具体记号。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/DQDN/definition.zh-CN.md\">DQDN 定义</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/dqdn-well-ordering.zh-CN.md\">标准域良序证明</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/README.zh-CN.md\">定位与证明总览</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-130': {
                label: "\\(\\operatorname{PTO}(Z_2)\\,?\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(Z_2)\\,?\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>\\(Z_2\\) 是完全二阶算术，允许自然数和任意自然数集合，并具有完全概括公理。\\(\\operatorname{PTO}(Z_2)\\) 衡量它能够证明良序的可计算序关系的序型高度。</p><p>BMS 极限高度疑似对应这一位置，所以将这个带问号的标记放在 BMS 极限旁。目前收录的比较结果给出的上界是\\[\\lim(\\mathrm{BMS})\\le\\operatorname{PTO}(Z_2).\\]这提供了上述对应的一个方向。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/bms-top2.zh-CN.md\">BMS、二阶算术与 DQDN 的比较</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
        },
    });
})(globalThis);
