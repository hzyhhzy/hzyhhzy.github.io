(function registerChineseInterface(global) {
    'use strict';

    var i18n = global.GoogologyI18n;
    var links = {
        arrows: 'https://googology.fandom.com/wiki/Arrow_notation',
        bms: 'https://googology.fandom.com/wiki/Bashicu_matrix_system',
        epsilon0:
            'https://googology.fandom.com/wiki/%CE%95%E2%82%80',
        extendedBuchholz:
            'https://googology.fandom.com/wiki/Extended_Buchholz%27s_function',
        fgh: 'https://googology.fandom.com/wiki/Fast-growing_hierarchy',
        graham: 'https://googology.fandom.com/wiki/Graham%27s_number',
        lvo: 'https://googology.fandom.com/wiki/Large_Veblen_ordinal',
        ocf: 'https://googology.fandom.com/wiki/Ordinal_collapsing_function',
        prss: 'https://googology.fandom.com/wiki/Primitive_sequence_number',
        pseudoFusible:
            'https://www.zhihu.com/question/36464952/answer/2912411355',
        svo: 'https://googology.fandom.com/wiki/Small_Veblen_ordinal',
        tree: 'https://googology.fandom.com/wiki/TREE_sequence',
        veblen: 'https://googology.fandom.com/wiki/Veblen_function'
    };
    var prssSource = `class PrSS:  # Primitive sequence system, can express ordinals < ε0
    def __init__(self, seq):  # seq: integer list
        self.s = seq

    def isZero(self):  # 0 is represented by the empty sequence
        return len(self.s) == 0

    def isSuccessor(self):  # the last element of a successor ordinal is 0
        return self.s[-1] == 0

    def sub1(self):  # subtract 1 from a successor ordinal
        assert self.isSuccessor()
        self.s.pop()

    def expand(self, n):  # [n] operation on a limit ordinal
        assert not self.isZero() and not self.isSuccessor()
        root = len(self.s) - 1
        while self.s[root] >= self.s[-1]:
            root -= 1
            assert root >= 0

        self.s = self.s[:-1]
        copy_part = self.s[root:]
        if n > 1:
            self.s = self.s + copy_part * (n - 1)


def HH(a, n) -> int:
    # Hardy hierarchy: HH(ω^a, n) is strictly equal to FGH(a, n).
    if a.isZero():
        return n
    if a.isSuccessor():
        a.sub1()
        return HH(a, n + 1)

    a.expand(n)
    return HH(a, n)


initial_ordinal = PrSS([0, 1, 2, 3, 4])  # ω^ω^ω^ω
g = HH(initial_ordinal, 100)
print(g)`;

    function document(title, sections) {
        return { title: title, sections: sections };
    }

    function html(value) {
        return { type: 'html', html: value };
    }

    function code(language, source, title) {
        return {
            type: 'code',
            language: language,
            source: source,
            title: title
        };
    }

    i18n.registerLocale({
        code: 'zh-CN',
        name: '中文',
        direction: 'ltr'
    });

    i18n.registerMessages('zh-CN', {
        ui: {
            "documentTitle": "大数阶梯 — Googology Scale",
            "title": "Googology Scale",
            "language": "语言",
            "modalLabel": "词条详情",
            "modalClose": "关闭详情",
            "codeClose": "关闭代码",
            "codeOpen": "查看程序",
            "subtitle": "从有限，走向无限的记号。",
            "home": "返回主页",
            "explore": "探索工具",
            "search": "搜索所有词条",
            "searchPlaceholder": "搜索词条、记号、关键词…",
            "directory": "词条目录",
            "jump": "跳转",
            "guide": "阅读指南",
            "mapLabel": "大数阶梯：方向键平移，加减键缩放",
            "mapCaption": "等距展示阶段；支线的横坐标仅作排版定位。",
            "edition": "资料更新 · 2026-10",
            "sources": "资料仓库 ↗",
            "copyLink": "复制链接",
            "copied": "已复制",
            "copyFallback": "请复制地址栏中的词条链接",
            "mainAxis": "主轴",
            "noResults": "没有匹配的词条。试试缩短关键词，或在显示设置中选择“全部”。",
            "resultCount": "{count} 项",
            "jumps": {
                "frontier": "序数前沿",
                "start": "日常与超运算",
                "epsilon": "基础序数",
                "bms": "山脉记号家族",
                "pto": "证明论序数",
                "laver": "Laver Table"
            },
            "filters": {
                "label": "显示设置",
                "all": "全部",
                "info": "有说明",
                "code": "有代码",
                "zoomVisibility": "按缩放自动显示细节",
                "manualLevel": "显示层级：{level}（0–3）"
            },
            "view": {
                "label": "视图控制",
                "zoom": "缩放",
                "hint": "拖动平移 · 滚轮缩放 · Shift + 滚轮纵览分支",
                "reset": "总览",
                "zoomIn": "放大",
                "zoomOut": "缩小"
            }
        },
        guide: {
            "title": "如何阅读这张图",
            "sections": [
                {
                    "type": "html",
                    "html": "<p>主轴从日常数字出发，经过序数记号、证明论强度，最后到达忙碌海狸与 Rayo。从 \\(\\varepsilon_0\\) 起，主要节点采用等间距排版。</p><p>拖动图面，或用“跳转”快速定位。词条目录同时搜索中英文，缩放时隐藏的词条也能搜到。点击词条可查看定义、来源和程序，并通过“复制链接”分享该词条。</p><p>主轴保持水平连续。三条支线分别收纳 Laver 相关构造、BTBMS 和 Friedman 的有限组合学问题。支线横坐标是大致区域的排版位置，不表示与主轴节点的精确大小关系；省略号表示未展示的距离。图中的序数记号、具体大数与函数作为增长层级的参照共同展示。</p><p>键盘聚焦图面后，可用左右方向键平移、加减键缩放、Home 和 End 跳到两端。触屏上左右拖动平移，上下滑动查看分支。</p>"
                },
                {
                    "type": "note",
                    "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                }
            ]
        },
        branches: {
            "branch-1": {
                "text": "Laver 相关构造",
                "detail": {
                    "title": "Laver 相关构造",
                    "sections": [
                        {
                            "type": "html",
                            "html": "<p>iBLP、Laver Table 与 LTY 将有限组合规则和初等嵌入联系起来；各词条中给出具体构造及来源。</p>"
                        },
                        {
                            "type": "note",
                            "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                        }
                    ]
                }
            },
            "branch-2": {
                "text": "BTBMS",
                "detail": {
                    "title": "BTBMS",
                    "sections": [
                        {
                            "type": "html",
                            "html": "<p>Bubby3’s Transfinite BMS 为 BMS 的父关系引入序数索引的祖先层；词条中提供 NER 实现的链接。</p>"
                        },
                        {
                            "type": "note",
                            "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                        }
                    ]
                }
            },
            "branch-3": {
                "text": "Friedman 有限组合学",
                "detail": {
                    "title": "Friedman 的有限组合学",
                    "sections": [
                        {
                            "type": "html",
                            "html": "<p>有限树、图和其他组合对象，也能给出逻辑强度极高的终止原理。这条支线承接前面主轴上的 TREE、SCG 等例子。</p>"
                        },
                        {
                            "type": "note",
                            "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                        }
                    ]
                }
            }
        },
        axisSegments: {
            'axis-00': {
                text: '现实世界',
                detail: document('现实世界', [
                    html(
                        '<p>小于 \\(10^{100}\\)。现实世界乃至宇宙相关的数字，通常不会超过这个范围。</p>'
                    )
                ])
            },
            'axis-01': {
                text: '超运算',
                detail: document('超运算', [
                    html(
                        '<p>远远超出了现实世界中的一切数字，但在算法上通过简单迭代即可得到。</p>'
                    )
                ])
            },
            'axis-02': {
                text: '基础 FGH',
                detail: document('基础 FGH', [
                    html(
                        '<p>将 FGH 与序数结合，可以表示极为复杂的函数嵌套，从而构造更大的数。</p>'
                    )
                ])
            },
            'axis-03': {
                text: '\\(\\varphi\\) 函数与 OCF',
                detail: document('\\(\\varphi\\) 函数与 OCF', [
                    html(
                        '<p>引入<a href="' + links.veblen + '">Veblen \\(\\varphi\\) 函数</a>和' +
                        '<a href="' + links.ocf + '">OCF（ordinal collapsing function）</a>，' +
                        '用来表示更大的序数。</p>'
                    )
                ])
            },
            'axis-04': {
            "text": "扩展折叠函数",
            "detail": {
                "title": "扩展折叠函数",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>序数折叠函数将较大结构的符号与折叠运算结合，用来描述可数序数。扩展 Buchholz 系统与 BMS 为探索这一段提供了不同的表示方式。</p><p>沿主轴到达 BMS 的 \\((0,0,0)(1,1,1)(2,2,0)\\)，再越过固定行数的限制，走向 BMS 极限。</p>"
                    },
                    {
                        "type": "note",
                        "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                    }
                ]
            }
        },
            'axis-05': {
                text: 'BMS',
                detail: document(
                    '<a href="' + links.bms +
                    '">BMS（Bashicu Matrix System）</a>',
                    [
                        html(
                            '<p>BMS 的强度极高，且规则较为简单，因此已成为 Googology 中最常用的标尺。</p>'
                        )
                    ]
                )
            },
            'axis-06': {
            "text": "山脉记号家族",
            "detail": {
                "title": "山脉记号家族",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>这一段收纳 TBMS、SRPD、Y 与 \\(\\omega\\)-Y。新的大小比较与良序证明，将具体的展开规则和弱集合论联系起来。</p><p>各词条中列出结论；具体定义可在 <a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">NER</a> 与<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy\">资料仓库</a>中继续阅读。</p>"
                    },
                    {
                        "type": "note",
                        "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                    }
                ]
            }
        },
            'axis-07': {
            "text": "超越可计算增长",
            "detail": {
                "title": "忙碌海狸与 Rayo",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>忙碌海狸函数最终超过每个全可计算函数。Rayo 则对固定语言中能够唯一指定自然数的公式取上界。这里的每个具体值仍是有限自然数；不可计算性说的是无法用一个统一算法计算整个函数。</p>"
                    },
                    {
                        "type": "note",
                        "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                    }
                ]
            }
        },
            'axis-08': {
            "text": "证明论序数"
        }
        },
        axisSubSegments: {
            'subaxis-00': {
                text: '日常数字',
                detail: document('日常数字', [
                    html(
                        '<p>从 \\(0\\) 到 \\(10^{10}\\) 左右，包含人类日常生活中能接触到的绝大部分数字。</p>'
                    )
                ])
            },
            'subaxis-01': {
                text: '天文数字',
                detail: document('天文数字', [
                    html(
                        '<p>从 \\(10^{10}\\) 到 \\(10^{100}\\) 左右，' +
                        '包含天文、物理、计算机等领域中常用的数字。</p>'
                    )
                ])
            },
            'subaxis-02': {
                text: '指数爆炸',
                detail: document('指数爆炸', [
                    html(
                        '<p>从 \\(10^{100}\\) 到 \\(10\\uparrow{}\\uparrow{}10\\)，包含围棋状态数、庞加莱回归时间等' +
                        '具有数学或物理意义的大数。在此之后，数字几乎不再具有现实意义。</p>'
                    )
                ])
            },
            'subaxis-03': {
                text: '超运算',
                detail: document('超运算', [
                    html(
                        '<p>“大数”的开端。从这里开始，数字已经失去现实意义，变成纯粹的数学游戏。</p>' +
                        '<p>这里最著名的记号是<a href="' + links.arrows +
                        '">高德纳箭号（Knuth’s up-arrow）</a>。它将运算不断嵌套，' +
                        '得到四级、五级，乃至 \\(n\\) 级运算。</p>'
                    )
                ])
            },
            'subaxis-04': {
                text: '函数嵌套',
                detail: document('函数嵌套', [
                    html(
                        '<p>“大数”的初级阶段。这里引入“对角化”：不仅嵌套函数，' +
                        '还把嵌套次数作为参数进一步嵌套。</p>' +
                        '<p>把嵌套次数作为参数进行嵌套，就到达了著名的' +
                        '<a href="' + links.graham + '">葛立恒数</a>。继续嵌套，' +
                        '并反复把嵌套次数本身作为参数，最终来到 ' +
                        '\\(f_{{\\omega}^{2}}(n)\\) 级别。</p>' +
                        '<p>接下来需要引入更系统化的方法：' +
                        '<a href="' + links.fgh + '">FGH</a>。</p>'
                    )
                ])
            },
            'subaxis-05': {
                text: 'FGH 与序数',
                detail: document('FGH 与序数', [
                    html(
                        '<p>“大数”的入门阶段。这里引入<a href="' + links.fgh +
                        '">FGH</a>与序数。</p>' +
                        '<p>引入 \\(\\omega\\) 及其加、乘、幂运算，配合 FGH 可以实现非常多层级的函数嵌套。' +
                        '最终，穷尽所有 \\(\\omega\\) 的幂运算，到达 ' +
                        '\\(\\omega^{\\omega^{\\omega^{\\ldots^{\\omega}}}}\\)，' +
                        '此时需要引入新的符号。</p>' +
                        '<p>这个极限称为<a href="' + links.epsilon0 +
                        '">\\(\\varepsilon_0\\)</a>，是一个非常重要的节点。</p>' +
                        '<p>一个很简单的分段函数（称为<a href="' +
                        links.pseudoFusible + '">伪燃烧数</a>）就能构造出这个级别的数字：</p>' +
                        '<ul><li>\\(f(x)=-x,\\quad x\\lt 0\\)</li>' +
                        '<li>\\(f(x)=0.5\\times f(x-f(x-1)),\\quad x\\ge 0\\)</li></ul>' +
                        '<p>则 \\(1/f(n)\\) 是 \\(\\varepsilon_0\\) 级的大数。</p>' +
                        '<p>描述这一段的序数时，除了直接使用含 \\(\\omega\\) 的式子，也常使用' +
                        '<a href="' + links.prss +
                        '">PrSS（Primitive Sequence System）</a>。' +
                        'PrSS 对程序实现更友好，下面给出它的程序定义。</p>'
                    ),
                    code('python', prssSource, 'Python · PrSS')
                ])
            },
            'subaxis-06': {
                text: '\\(\\varphi\\) 函数',
                detail: document(
                    '\\(\\varepsilon_0\\) 到 \\(\\Gamma_0\\)：\\(\\varphi\\) 函数',
                    [
                        html(
                            '<p>“大数”的中级阶段。这一段最常见的是' +
                            '<a href="' + links.veblen +
                            '">Veblen \\(\\varphi\\) 函数</a>，类似于 \\(\\omega\\) 的超运算。</p>' +
                            '<p>记 \\(\\varepsilon_0=\\omega^{\\omega^{\\omega^{\\ldots^{\\omega}}}}\\)，' +
                            '再记 \\(\\varepsilon_1=\\varepsilon_0^{\\varepsilon_0^{\\varepsilon_0^{\\ldots}}}\\)。</p>' +
                            '<p>也可以令 \\(\\varepsilon_1=' +
                            '\\omega^{\\omega^{\\omega^{\\ldots^{\\varepsilon_0+1}}}}\\)。' +
                            '与前一种写法相比，虽然在 FGH 上不完全相同，但差距极小。' +
                            '不过，幂塔顶端不能直接使用 \\(\\varepsilon_0\\)，因为它在第一次展开时就会消失，' +
                            '因此与 \\(\\varepsilon_0\\) 没有区别。</p>' +
                            '<p>经验上，数学中相等的序数，例如 \\(\\varepsilon_0\\) 与 ' +
                            '\\(\\omega^{\\varepsilon_0}\\)，在 FGH 中不一定完全相等，但通常非常接近。</p>' +
                            '<p>记 \\(\\varepsilon_2=\\varepsilon_1^{\\varepsilon_1^{\\varepsilon_1^{\\ldots}}}\\)，' +
                            '再继续得到 \\(\\varepsilon_3\\)、\\(\\varepsilon_\\omega\\)、' +
                            '\\(\\varepsilon_{\\varepsilon_0}\\) 等。</p>' +
                            '<p>随后令 \\(\\zeta_0=\\varepsilon_{\\varepsilon_{\\varepsilon_{\\ldots}}}\\)，' +
                            '并继续得到 \\(\\zeta_1\\)、\\(\\zeta_\\omega\\)、' +
                            '\\(\\zeta_{\\zeta_0}\\) 等；再令 ' +
                            '\\(\\eta_0=\\zeta_{\\zeta_{\\zeta_{\\ldots}}}\\)。</p>' +
                            '<p>将类似过程嵌套 \\(n\\) 次记为 \\(\\varphi(n,0)\\)，随后得到 ' +
                            '\\(\\varphi(\\omega,0)\\)、\\(\\varphi(\\omega+1,0)\\)、' +
                            '\\(\\varphi(\\varphi(\\omega,0),0)\\) 等。' +
                            '最后，把无限嵌套的 \\(\\varphi\\) 记作 \\(\\Gamma_0\\)。</p>'
                        )
                    ]
                )
            },
            'subaxis-07': {
                text: '多元 \\(\\varphi\\) 与 OCF',
                detail: document(
                    '\\(\\Gamma_0\\) 到 BO：多元 \\(\\varphi\\) 与 OCF',
                    [
                        html(
                            '<p>这一段最常见的是<a href="' + links.veblen +
                            '">Veblen 函数 \\(\\varphi\\)</a>的多元和序数元扩展，以及' +
                            '<a href="' + links.ocf +
                            '">OCF（ordinal collapsing function）</a>。</p>' +
                            '<p>二元 Veblen 函数 \\(\\varphi\\) 的极限是 \\(\\Gamma_0\\)。' +
                            '随后扩展到三元、四元乃至 \\(n\\) 元 \\(\\varphi\\)，到达' +
                            '<a href="' + links.svo +
                            '">SVO（Small Veblen Ordinal）</a>。</p>' +
                            '<p>著名的 tree 和<a href="' + links.tree +
                            '">TREE</a>就在这附近：\\(\\operatorname{tree}(n)\\) 和 \\(\\operatorname{TREE}(3)\\) 几乎处于 SVO 级别，' +
                            '\\(\\operatorname{TREE}(n)\\) 略大一些。</p>' +
                            '<p>序数元 \\(\\varphi\\) 继续到达<a href="' + links.lvo +
                            '">LVO（Large Veblen Ordinal）</a>。之后通常使用各种 OCF，' +
                            '形式上多为 \\(\\Psi\\) 与 \\(\\Omega\\) 的组合。</p>' +
                            '<p>\\(\\varphi\\) 的多元扩展比 OCF 复杂得多，因此在 \\(\\Gamma_0\\) 以后，' +
                            '人们更常使用 OCF 或便于编程的记号，例如<a href="' +
                            links.bms + '">BMS</a>。</p>'
                        )
                    ]
                )
            },
            'subaxis-08': {
                text: '\\(\\Psi\\) 的简单扩展',
                detail: document('BO 到 EBO：\\(\\Psi\\) 的简单扩展', [
                    html(
                        '<p>“大数”的高级阶段，从这里开始难度显著增加。' +
                        '这一段最常见的是<a href="' + links.extendedBuchholz +
                        '">扩展 Buchholz 函数</a>与<a href="' + links.bms +
                        '">BMS</a>。</p>' +
                        '<p>著名的 SCG / SSCG 函数位于略大于 BO 的位置。目前推测它们介于 ' +
                        '\\(\\Psi(\\Omega_\\omega\\times\\omega)\\) 与 \\(\\Psi(\\Omega_\\omega^\\omega)\\) 之间，' +
                        '对应 BMS 的 \\((0,0,0)(1,1,1)(2,0,0)\\) 到 ' +
                        '\\((0,0,0)(1,1,1)(2,1,0)(3,0,0)\\)，暂无精确结论。</p>'
                    )
                ])
            },
            'subaxis-09': {
            "text": "大基数折叠",
            "detail": {
                "title": "EBO 之后",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>进一步的折叠函数引入 \\(I\\)、\\(M\\)、\\(K\\) 等符号，具体规则取决于所选体系。这里同时用 BMS 矩阵作为路标，逐步走向 \\((0,0,0)(1,1,1)(2,2,0)\\)。</p>"
                    },
                    {
                        "type": "note",
                        "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                    }
                ]
            }
        },
            'subaxis-10': {
            "text": "行数与父关系",
            "detail": {
                "title": "BMS 的行数与父关系",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>BMS 以有限矩阵表示记号，通过各行记录嵌套的父关系。展开时删去末列，并按父关系选择、复制与调整一段列。增加行数使更深层的祖先关系也能参与复制规则。</p>"
                    },
                    {
                        "type": "note",
                        "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                    }
                ]
            }
        },
            'subaxis-11': {
            "text": "走向 BMS 极限",
            "detail": {
                "title": "走向 BMS 极限",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>有限行 BMS 系统不断增加行数，汇成整个 BMS 极限。进一步的超限扩展允许行结构本身携带序数信息；下一段将介绍 TBMS 与 Y 相关系统。</p>"
                    },
                    {
                        "type": "note",
                        "html": "该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性"
                    }
                ]
            }
        }
        }
    });
}(globalThis));
