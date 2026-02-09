const items = [
    { 
        value: 0, label: '1', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>1</h2><p>万物之始，googology 的起点。</p>`
    },
    { 
        value: 1, label: '10<sup>100</sup>', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>Googol (10<sup>100</sup>)</h2><p>是 googology 这个词的词源。</p><code>10**100</code>`
    },
    { 
        value: 2, label: 'f<sub>&omega;</sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>f<sub>&omega;</sub>(n)</h2><p>快速增长层次结构（FGH）中的第一级无限。它的增长速度大致相当于阿克曼函数。</p>`
    },
    { 
        value: 3, label: 'f<sub>&epsilon;<sub>0</sub></sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>f<sub>&epsilon;<sub>0</sub></sub>(n)</h2><p>FGH 中对应皮亚诺算术（PA）证明强度的极限。它的增长速度极其惊人。</p>`
    },
    { 
        value: 4, label: '&psi;(&Omega;<sub>&omega;</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>&psi;(&Omega;<sub>&omega;</sub>)</h2><p>序数坍缩函数（OCF）的一个例子，标志着进入了更强大的序数系统。</p>`
    },
    { 
        value: 5, label: 'BMS:(0,0,0)(1,1,1)(2,2,0)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>Bashicu Matrix System</h2><p>TODO。</p>`
    },
    { 
        value: 6, label: 'BMS极限', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>Bashicu Matrix System</h2><p>一种极其强大的符号系统，能够表示远远超过传统 OCF 的大数。</p>`
    },
    
    { 
        value: 2, label: 'Ackermann函数', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `<h2>Ackermann函数</h2><p>一个递归函数，其增长速度非常快。</p>`
    },
    { 
        value: 2.1, label: '葛立恒数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `<h2>葛立恒数</h2><p>来自于拉姆齐理论，曾经作为数学证明中出现的最大数字被载入吉尼斯世界纪录。</p>`
    },
    
    { 
        value: 3, label: 'Goodstein函数', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `<h2>Goodstein函数</h2><p>一种递归函数，其增长速度非常快。</p>`
    },
    { 
        value: 3, label: '伪燃烧数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `<h2>特殊的递归定义</h2><p>f(x)=f(x-f(x-1))/2</p>`
    },
    
    { 
        value: 3.5, label: 'TREE(3)', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `<h2>TREE(3)</h2><p>来自于 Kruskal 树定理。虽然其定义很简单，但它的大小远超葛立恒数，甚至在 FGH 中也处于极高的位置。</p>`
    },
    { 
        value: 3.55, label: 'TREE(n)', zoomLevel: 1, side: 'bottom', level: 0, branch: 0,
        detail: `<h2>TREE 函数</h2><p>TREE(1)=1, TREE(2)=3, 而 TREE(3) 已经无法用常规语言描述其巨大。</p>`
    },
    { 
        value: 3.6, label: 'test', zoomLevel: 2, side: 'bottom', level: 0, branch: 0,
        detail: `<h2>测试项</h2><p>用于验证高缩放级别下的内容显示。</p>`
    },
    { 
        value: 3.65, label: 'test3', zoomLevel: 3, side: 'bottom', level: 0, branch: 0,
        detail: `<h2>高层级测试</h2><p>仅在极大缩放倍数下可见。</p>`
    },

    // 分支 1 示例
    { 
        value: 7.25 + 0.0, label: '（待补充）', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `<h2>分支 1 待定内容</h2><p>暂时没想好填什么。</p>`
    },
    { 
        value: 7.25 + 0.5, label: 'Y序列极限', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `<h2>Y 序列极限</h2><p>Y 序列是一种基于矩阵的大数表示法，其极限非常巨大。</p>`
    },
    { 
        value: 7.25 + 1.5, label: '&omega;-Y序列极限', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `<h2>&omega;-Y 序列极限</h2><p>Y 序列的进一步扩展。</p>`
    },
    // 分支 2 示例
    { 
        value: 7.25 + 0, label: 'iBLP极限', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `<h2>iBLP 极限</h2><p>Infinite Basic Laver Patterns 作者为@test_alpha0</p>`
    },
    { 
        value: 7.25 + 0.5, label: 'Laver table', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `<h2>Laver table</h2><p>集合论中研究的一类特殊的有限代数结构。</p>`
    },
    { 
        value: 7.25 + 1, label: 'LTY', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `<h2>LTY</h2><p>Laver table yarn。</p>`
    },
    // 分支 3 示例
    { 
        value: 7.25 + 1, label: '(Friedman的那几个没人研究的，待补充)', zoomLevel: 0, side: 'top', level: 0, branch: 3,
        detail: `<h2>Harvey Friedman 的未定义项</h2><p>这位伟大的数学家提出了许多增长极其迅速但尚未被 googologist 完全消化的概念。</p>`
    },
    // 分支 4 示例
    { 
        value: 7.25 + 0, label: 'PTO(Z<sub>2</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 4,
        detail: `<h2>PTO(Z<sub>2</sub>)</h2><p>Proof-Theoretic Ordinal of Second-order Arithmetic。有可能和BMS极限一样大</p>`
    },
    { 
        value: 7.25 + 0.5, label: 'PTO(Z<sub>&omega;</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 4,
        detail: `<h2>PTO(Z<sub>&omega;</sub>)</h2><p>更高级别的证明论序数。</p>`
    },
    { 
        value: 7.25 + 0.5, label: 'Loader数', zoomLevel: 0, side: 'bottom', level: 0, branch: 4,
        detail: `<h2>Loader 数</h2><p>由程序生成的巨大数字。它的生成逻辑非常简洁但结果极其巨大。</p>`
    },
    { 
        value: 7.25 + 1.5, label: 'PTO(ZFC)', zoomLevel: 0, side: 'top', level: 0, branch: 4,
        detail: `<h2>PTO(ZFC)</h2><p>现代数学标准公理系统 ZFC 的证明论序数。</p>`
    },
    { 
        value: 7.25 + 2, label: 'PTO(ZFC+I0)', zoomLevel: 0, side: 'top', level: 0, branch: 4,
        detail: `<h2>PTO(ZFC+I0)</h2><p>带有大基数公理 I0 的 ZFC 系统的序数。</p>`
    },
    {
        value: 10, label: 'BB(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>忙碌海狸函数 (Busy Beaver)</h2><p>BB(n) 定义为在停机之前，拥有 n 个状态的图灵机所能打印的最大符号数。这是一个典型的不可计算函数，其增长速度远超任何可计算的序数系统。</p>`
    },
    {
        value: 11, label: 'Rayo(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `<h2>拉约数 (Rayo's Number)</h2><p>Rayo(10<sup>100</sup>) 曾被认为是数学中定义过的最大大数。它使用二阶算术语言，定义为能被不超过指定数量符号定义的最小正整数。</p>`
    }
];