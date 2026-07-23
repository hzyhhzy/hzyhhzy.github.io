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
            documentTitle: '大数阶梯 — Googology Scale',
            title: 'Googology Scale',
            language: '语言',
            modalLabel: '内容详情',
            modalClose: '关闭详情',
            filters: {
                label: '内容筛选',
                all: '显示全部',
                info: '只显示有说明的条目',
                code: '只显示有代码的条目',
                zoomVisibility: '根据缩放自动隐藏',
                manualLevel: '显示层级：{level}（0–3）'
            },
            view: {
                label: '视图控制',
                zoom: '缩放倍率：',
                hint: '滚轮缩放 / 拖拽移动',
                reset: '回到起点',
                zoomIn: '放大',
                zoomOut: '缩小'
            }
        },
        branches: {
            'branch-1': {
                text: 'Y 序列及其变种',
                detail: document('Y 序列及其变种', [
                    html(
                        '<p>由多位 Googologist 共同开发的矩阵系统扩展，旨在探索 BMS 之后的增长极限。</p>'
                    )
                ])
            },
            'branch-2': {
                text: 'Laver Table 相关',
                detail: document('Laver Table 相关', [
                    html(
                        '<p>源自集合论中的大基数公理，与有限代数结构的组合性质密切相关，其增长速度非常独特。</p>'
                    )
                ])
            },
            'branch-3': {
                text: 'PTO 系列',
                detail: document('证明论序数（PTO）系列', [
                    html(
                        '<p>用于衡量数学系统的“强度”。从 ZFC 到带有各种大基数公理的系统，' +
                        '其对应的增长率是目前已知最快的。</p>'
                    )
                ])
            },
            'branch-4': {
                text: '未被研究的内容',
                detail: document('未被研究的内容', [
                    html(
                        '<p>大数研究中尚未被完全形式化，或仍缺乏深入分析的定义。</p>'
                    )
                ])
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
                text: '扩展 OCF',
                detail: document('扩展 OCF', [
                    html(
                        '<p>对 OCF 继续扩展，引入更大的基数（如 \\(I\\)、\\(M\\)、\\(K\\) 等）来构造更强的序数系统。' +
                        '但大基数 OCF 的规则较为混乱，目前已基本被放弃并由 BMS 取代。</p>'
                    )
                ])
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
                text: '前沿未知领域',
                detail: document('进入未知领域', [
                    html(
                        '<p>这里是目前的研究前沿，难度巨大，人们对这些内容所知甚少。' +
                        '许多条目之间暂时无法比较大小，大部分也缺乏严格的停机性证明。</p>' +
                        '<p>本网页将不同类型的记号划分为不同分支；不同分支之间的大小顺序暂时未知。</p>'
                    )
                ])
            },
            'axis-07': {
                text: '不可计算大数',
                detail: document('不可计算大数', [
                    html(
                        '<p>不可计算大数大于一切可计算函数。由于它们无法用程序代码表示，' +
                        '且原理大多类似于“某种语言用 \\(N\\) 个字符能表达的最大数”，因此感兴趣的人相对较少。</p>'
                    )
                ])
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
                text: '大基数 \\(\\Psi\\)',
                detail: document('EBO 到 SSO：大基数 \\(\\Psi\\)', [
                    html(
                        '<p>在 \\(\\Psi\\) 中引入 \\(I\\)、\\(M\\)、\\(K\\) 等大基数后，定义变得非常复杂和混乱，' +
                        '相关资料也不易查找。</p>' +
                        '<p>然而，与<a href="' + links.bms +
                        '">BMS</a>相比，其强度提升微乎其微：即使用尽所有字母，' +
                        '也很难到达 \\((0,0,0)(1,1,1)(2,2,0)\\)。</p>' +
                        '<p>因此，目前大基数 \\(\\Psi\\) 已很少使用，通常改用 BMS 表达式。</p>'
                    )
                ])
            },
            'subaxis-10': {
                text: '[TODO:取个合适的名字]',
                detail: document('[TODO:取个合适的名字]', [
                    html(
                        '<p>[TODO:补充这一段的说明。]</p>'
                    )
                ])
            },
            'subaxis-11': {
                text: 'BMS 主导区间',
                detail: document(
                    '<a href="' + links.bms + '">BMS</a> 主导区间',
                    [
                        html(
                            '<p>从这里到 BMS 极限 \\((0,0,0,\\ldots{})(1,1,1,\\ldots{})\\) 之前，' +
                            '并没有太多其他内容。不借助 BMS 或类似结构，' +
                            '很少有记号可以到达 BMS 的 \\((0,0,0)(1,1,1)(2,2,2)\\)。</p>'
                        )
                    ]
                )
            }
        }
    });
}(globalThis));
