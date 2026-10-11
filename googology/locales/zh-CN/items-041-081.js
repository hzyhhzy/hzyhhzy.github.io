(function (global) {
    'use strict';

    function unreviewedNotice() {
        return {
            type: 'note',
            html: '该内容由gpt6-astra完成，且暂时未经过人工审核，不保证正确性'
        };
    }

    global.GoogologyI18n.registerMessages('zh-CN', {
        items: {
            'item-041': {
                label: "三元 Ackermann 函数",
                detail: {
                    title: "三元 Ackermann 函数",
                    representations: [
                        { label: "常用表示", html: "三元 Ackermann 函数" },
                        { label: "FGH 表示", html: "\\(\\approx f_{\\omega^2}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>三元 Ackermann 函数是经典 Ackermann 函数的推广。它通过增加一个参数来迭代函数的增长速度，最高可达 \\(f_{{\\omega}^{2}}(n)\\)。</p>\n                                <p>有多种定义可以达到相同的增长率，下面给出其中一种。</p>\n                                <ul>\n                                    <li>\\(\\operatorname{A}(0,b,c)=c+1\\)</li>\n                                    <li>\\(\\operatorname{A}(a,0,c)=\\operatorname{A}(a-1,c,c)\\)</li>\n                                    <li>\\(\\operatorname{A}(a,b,0)=\\operatorname{A}(a,b-1,1)\\)</li>\n                                    <li>\\(\\operatorname{A}(a,b,c)=\\operatorname{A}(a,b-1,\\operatorname{A}(a,b,c-1))\\)</li>\n                                </ul>\n                                <p>当 \\(a=1\\) 时，\\(\\operatorname{A}(1,b,c)\\) 就是普通二元 Ackermann 函数 \\(\\operatorname{A}(b,c)\\)。固定第一个参数，再让后两个参数一起增长，\\(\\operatorname{A}(1,n,n)\\) 达到 \\(f_\\omega\\) 级，\\(\\operatorname{A}(2,n,n)\\) 达到 \\(f_{\\omega\\cdot2}\\) 级；不断增加第一个参数，就会逼近 \\(\\omega^2\\) 层级。</p>\n                                <p>三元 Ackermann 函数的对角线 \\(\\operatorname{A}(n,n,n)\\) 的增长速度大约相当于 FGH 中的 \\(f_{{\\omega}^{2}}(n)\\)。</p>\n                            "},
                        {
                            type: "code",
                            language: "python",
                            source: `def A3(a, b, c):
    if a == 0 :
        return c + 1
    elif b == 0:
        return A3(a - 1, c, c)
    elif c == 0:
        return A3(a, b - 1, 1)
    else:
        return A3(a, b - 1, A3(a, b, c - 1))
n = 100
print(A3(n, n, n))`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-042': {
                label: "\\(f_{{\\omega}^{2}+{\\omega}}(n)\\)",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">FGH</a> \\(f_{{\\omega}^{2}+{\\omega}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{2}+{\\omega}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{2}+{\\omega}}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\((\\omega^{2}+\\omega)[n]=\\omega^{2}+n\\)</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-043': {
                label: "\\(f_{{\\omega}^{2}\\cdot{}2}(n)\\)",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">FGH</a> \\(f_{{\\omega}^{2}\\cdot{}2}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{2}\\cdot{}2}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{2}\\cdot{}2}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\((\\omega^{2}\\cdot{}2)[n]=(\\omega^{2}+\\omega^{2})[n]=\\omega^{2}+\\omega\\cdot{}n\\)</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-044': {
                label: "\\(f_{{\\omega}^{3}}(n)\\)",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">FGH</a> \\(f_{{\\omega}^{3}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{3}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{3}}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\((\\omega^{3})[n]=(\\omega^{2}\\cdot{}\\omega)[n]=\\omega^{2}\\cdot{}n\\)</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-045': {
                label: "\\(f_{{\\omega}^{4}}(n)\\)",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">FGH</a> \\(f_{{\\omega}^{4}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{4}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{4}}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\((\\omega^{4})[n]=(\\omega^{3}\\cdot{}\\omega)[n]=\\omega^{3}\\cdot{}n\\)</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-046': {
                label: "\\(f_{{\\omega}^{{\\omega}}}(n)\\)",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">FGH</a> \\(f_{{\\omega}^{{\\omega}}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}}}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>采用基本列 \\((\\omega^{\\omega})[n]=\\omega^{n}\\) 时，例如：</p>\n                                <p>\\[\n                                    f_{\\omega^{\\omega}}(10)\n                                    =f_{\\omega^{10}}(10)\n                                    =f_{\\omega^{9}\\cdot{}10}(10)\n                                    =f_{\\omega^{9}\\cdot{}9+\\omega^{9}}(10)\n                                    =\\ldots\n                                \\]</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-047': {
                label: "多元 Ackermann 函数",
                detail: {
                    title: "多元 Ackermann 函数",
                    representations: [
                        { label: "常用表示", html: "多元 Ackermann 函数" },
                        { label: "FGH 表示", html: "\\(\\approx f_{\\omega^\\omega}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>把 Ackermann 函数进一步扩展到 \\(n\\) 个变量后，其增长率为 \\(f_{{\\omega}^{n-1}}\\) 级别。</p>\n                                <p>因此，最终的极限是 \\(f_{{\\omega}^{{\\omega}}}\\)；多元 Ackermann 函数无法表示增长率不低于 \\(f_{{\\omega}^{{\\omega}}}\\) 的函数。</p>\n                                <p>多元 Ackermann 函数的详细定义较为繁琐，此处不展开。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-048': {
                label: "Friedman n 函数",
                detail: {
                    title: "<a href=\"https://doi.org/10.1006/jcta.2000.3154\">Friedman n 函数</a>",
                    representations: [
                        { label: "常用表示", html: "Friedman n 函数" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\omega^\\omega}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p><strong>定义。</strong>固定 \\(k\\geq1\\)，取字母表 \\(\\{1,\\ldots,k\\}\\) 上的有限词 \\(x_1\\cdots x_N\\)。若不存在 \\(i\\lt j\\leq N/2\\)，使连续块 \\(x_i\\cdots x_{2i}\\) 是较后连续块 \\(x_j\\cdots x_{2j}\\) 的子序列，则称该词满足性质 \\(*\\)。这里“子序列”允许删除字符，但须保持其余字符的相对次序。\\(n(k)\\) 是满足性质 \\(*\\) 的词的最大长度。</p>\n                                <p>Higman 引理排除了无限长的反例；再对所有合法有限前缀组成的有限分支树应用 König 引理，即知最大长度存在。已知 \\(n(1)=3\\)、\\(n(2)=11\\)，而 \\(12221111111\\) 达到第二个值。</p>\n                                <p>以下下界使用 Friedman 的 Ackermann 约定：\\[A_1(t)=2t,\\qquad A_{r+1}(t)=A_r^{\\circ t}(1),\\qquad A(t)=A_t(t).\\]这里 \\(r,t\\geq1\\)，上标 \\(\\circ t\\) 表示函数复合 \\(t\\) 次。Friedman 证明了\\[n(3)>A_{7198}(158386),\\qquad n(4)>A^{\\circ A(187196)}(1).\\]</p>\n                                <p>作为 \\(k\\) 的函数，\\(n(k)\\) 最终支配每个 \\(H_\\beta\\; (\\beta\\lt\\omega^\\omega)\\)，并最终被 \\(H_{\\omega^\\omega+1}\\) 支配；这里的 \\(H\\) 沿用原论文的快速增长层级记号，不是本站的 Hardy 层级。按本站采用的 FGH 对照，可将它放在 \\(f_{\\omega^\\omega}\\) 层级。又因为 \\(\\operatorname{TREE}(3)\\) 远大于 \\(n(4)\\)，上述 \\(n(4)\\) 下界也成为 \\(\\operatorname{TREE}(3)\\) 的一个很弱的下界。</p>\n                                <p>不过，\\(\\operatorname{TREE}(3)\\) 位于<a href=\"https://googology.fandom.com/wiki/Small_Veblen_ordinal\">小 Veblen 序数（SVO）</a>级别，因此这个下界非常弱。后来，人们把 \\(\\operatorname{A}^{\\operatorname{A}(187196)}(1)\\) 及其他含有“187196”的相关表达式戏称为“\\(\\operatorname{TERR}(3)\\)”；“TERR”是对“TREE”的故意误拼。</p>\n                                <p><strong>来源：</strong><a href=\"https://doi.org/10.1006/jcta.2000.3154\">Harvey M. Friedman，《Long Finite Sequences》，§1、Theorems 5.19 与 6.8</a>；<a href=\"https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/1/1952/files/2014/01/EnormousInt.12pt.6_1_00-23kmig3.pdf\">Harvey M. Friedman，《Enormous Integers in Real Life》，Theorems 8.4–8.5</a>。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-049': {
                label: "字符串子序列函数",
                detail: {
                    title: "字符串子序列函数",
                    representations: [
                        { label: "常用表示", html: "字符串子序列函数" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\omega^\\omega}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p><strong>定义。</strong>令 \\(\\operatorname{STR}(n)\\) 为满足下述条件的最长字符串序列 \\(S_1,\\ldots,S_N\\) 的长度：字符串取自一个含 \\(n\\) 个字符的字母表，\\(|S_i|\\leq i\\)，并且对所有 \\(i\\lt j\\)，\\(S_i\\) 都不是 \\(S_j\\) 的子序列。这里“子序列”指删除若干字符而不改变其余字符的相对次序；空串也允许出现。</p>\n                                <p>Higman 引理和 König 引理保证 \\(\\operatorname{STR}(n)\\) 总是有限。小值及下界为 \\(\\operatorname{STR}(1)=2\\)、\\(\\operatorname{STR}(2)=4\\)、\\(\\operatorname{STR}(3)\\geq11\\)；相应例子可写成 \\((A,\\varnothing)\\)、\\((A,BB,B,\\varnothing)\\) 与 \\((A,BB,BC,CB,B,CCCCC,CCCC,CCC,CC,C,\\varnothing)\\)。</p>\n                                <p>这个定义可以看作不允许树分叉的 TREE 风格坏序列：带有 \\(n\\) 种标号的树退化为使用 \\(n\\) 种字符的字符串。由 \\(n\\) 个字符组成的全部有限串在子序列序下的最大序型为 \\(\\omega^{\\omega^{n-1}}\\)。Friedman 在《Long Finite Sequences》§5 中的 \\(F(n)\\) 把长度限制改为 \\(|S_i|\\leq i+1\\)，因此\\[\\operatorname{STR}(n)\\leq F(n)\\lt\\operatorname{STR}(n+1).\\]右侧不等式可通过在序列最前面放一个新字符得到。相应上下界将其增长放在 \\(H_{\\omega^{\\omega^{\\omega}}}=f_{\\omega^\\omega}\\) 层级。</p>\n                                <p><strong>来源：</strong><a href=\"https://mathoverflow.net/questions/285755/growth-rate-of-longest-sequence-of-strings-where-no-string-is-a-subsequence-of-a\">MathOverflow，“Growth rate of longest sequence of strings where no string is a subsequence of a later one”（定义与小值）</a>；<a href=\"https://doi.org/10.1006/jcta.2000.3154\">Harvey M. Friedman，《Long Finite Sequences》，§5 与 Theorem 5.19</a>；<a href=\"https://arxiv.org/abs/1103.4399\">Schmitz、Schnoebelen，《Multiply-Recursive Upper Bounds with Higman's Lemma》</a>。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-050': {
                label: "\\(f_{{\\omega}^{{\\omega}}\\cdot{}2}(n)\\)",
                detail: {
                    title: "\\(f_{{\\omega}^{{\\omega}}\\cdot{}2}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}}\\cdot{}2}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}}\\cdot{}2}(n)\\)" },
                    ],
                    sections: [
                        unreviewedNotice(),
                    ],
                },
            },
            'item-051': {
                label: "\\(f_{{\\omega}^{{\\omega}+1}}(n)\\)",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">FGH</a> \\(f_{{\\omega}^{{\\omega}+1}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}+1}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}+1}}(n)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p>\\((\\omega^{\\omega+1})[n]=(\\omega^{\\omega}\\cdot{}\\omega)[n]=\\omega^{\\omega}\\cdot{}n\\)</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-052': {
                label: "\\(f_{{\\omega}^{{\\omega}\\cdot{}2}}(n)\\)",
                detail: {
                    title: "\\(f_{{\\omega}^{{\\omega}\\cdot{}2}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}\\cdot{}2}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}\\cdot{}2}}(n)\\)" },
                    ],
                    sections: [
                        unreviewedNotice(),
                    ],
                },
            },
            'item-053': {
                label: "\\(f_{{\\omega}^{{\\omega}^{2}}}(n)\\)",
                detail: {
                    title: "\\(f_{{\\omega}^{{\\omega}^{2}}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}^{2}}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}^{2}}}(n)\\)" },
                    ],
                    sections: [
                        unreviewedNotice(),
                    ],
                },
            },
            'item-054': {
                label: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}}}}(n)\\)",
                detail: {
                    title: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}}}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}}}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}}}}(n)\\)" },
                    ],
                    sections: [
                        unreviewedNotice(),
                    ],
                },
            },
            'item-055': {
                label: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}(n)\\)",
                detail: {
                    title: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}(n)\\)" },
                    ],
                    sections: [
                        unreviewedNotice(),
                    ],
                },
            },
            'item-056': {
                label: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}}(n)\\)",
                detail: {
                    title: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}}(n)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}}(n)\\)" },
                        { label: "FGH 表示", html: "\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}}(n)\\)" },
                    ],
                    sections: [
                        unreviewedNotice(),
                    ],
                },
            },
            'item-057': {
                label: "\\({\\varepsilon}_{0}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{0}={\\omega}^{{\\omega}^{{\\omega}^{\\ldots{}^{{\\omega}}}}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>从这里开始，HH 追上了 FGH。这说明决定大小的不再是 FGH 本身的规则，而是序数本身。因此，后续不再强调 FGH，并省略 \\(f_{{\\varepsilon}_{0}}(n)\\) 的表述，直接写作 \\({\\varepsilon}_{0}\\)。</p>\n                                <p><a href=\"https://googology.fandom.com/wiki/%CE%95%E2%82%80\">\\({\\varepsilon}_{0}\\)</a> 是大数研究中的重要节点，许多不同类型的大数汇集在这一层级，只是知名度不及 Graham 数和 \\(\\operatorname{TREE}(3)\\)。</p>\n                                <ol>\n                                    <li><a href=\"https://googology.fandom.com/wiki/Goodstein_sequence\">Goodstein 序列</a></li>\n                                    <li><a href=\"https://googology.fandom.com/wiki/Fusible_number\">燃烧数（fusible numbers）</a>与<a href=\"https://www.zhihu.com/question/36464952/answer/2912411355\">伪燃烧数</a></li>\n                                    <li><a href=\"https://googology.fandom.com/wiki/Kirby-Paris_hydra\">Kirby–Paris 九头蛇问题</a></li>\n                                    <li><a href=\"https://googology.fandom.com/wiki/Primitive_sequence_number\">PrSS 的极限</a></li>\n                                    <li><a href=\"https://en.wikipedia.org/wiki/Ordinal_analysis\">皮亚诺算术（PA）的证明论序数</a></li>\n                                    <li><a href=\"https://googology.fandom.com/wiki/Hardy_hierarchy\">Hardy hierarchy（HH）</a>首次追上<a href=\"https://googology.fandom.com/wiki/Fast-growing_hierarchy\">快速增长层级（FGH）</a></li>\n                                </ol>\n                                <p>构造 \\({\\varepsilon}_{0}\\) 级大数的最简单代码基于伪燃烧数。</p>\n                            "},
                        {
                            type: "code",
                            language: "python",
                            source: `from fractions import Fraction


def f(x):
    x = Fraction(x)
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2
n = 100
print(1/f(100))`,
                        },
                        {"type":"html","html":"<p>也可以基于序数记号的 FGH 或 HH 构造。下面以 PrSS 为例。</p>"},
                        {
                            type: "code",
                            language: "python",
                            source: `class PrSS: # Primitive sequence system, can express ordinals < ε0
    def __init__(self, seq): # seq: integer list
        self.s = seq

    def isZero(self): # 0, is empty
        return len(self.s) == 0

    def isSuccessor(self): # successor ordinals, last element is 0
        return self.s[-1] == 0

    def sub1(self): # subtract 1 if is successor
        assert(self.isSuccessor()) # should be a successor ordinal
        self.s.pop()

    def expand(self,n): # [n] operation on limit ordinals
        assert(not self.isZero() and not self.isSuccessor()) # should be a limit ordinal
        # find the last element smaller than self.s[-1]
        root = len(self.s) - 1
        while self.s[root] >= self.s[-1]:
            root -= 1
            assert(root >= 0) # always have a parent unless self.s[-1] is 0
        # Keep the good prefix; repeat the bad part exactly n times.
        # In particular, [0] removes the whole bad part.
        assert n >= 0
        copy_part = self.s[root:-1]
        self.s = self.s[:root] + copy_part * n

def HH(a, n) -> int: # Hardy hierarchy. HH(ω^a, n) is strictly equal to FGH(a, n)
    if a.isZero():
        return n
    elif a.isSuccessor():
        a.sub1()
        return HH(a, n+1)
    else:
        a.expand(n)
        return HH(a, n)

n = 100
initial_ordinal=PrSS([i for i in range(n+1)]) # = ω^ω^ω...^ω = ε0[n]
print(HH(initial_ordinal, n)) # Notice that HH(ε0[n]) is strictly equal to FGH(ε0[n-1])`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-058': {
                label: "BMS: \\((0,0)(1,1)\\)",
                detail: {
                    title: "\\({\\varepsilon}_{0}\\) 的 BMS 表示：\\((0,0)(1,1)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p><a href=\"https://googology.fandom.com/wiki/Bashicu_matrix_system\">BMS（Bashicu matrix system）</a>是一种用于表示序数的记号。它可以表示极为巨大的序数，规则也较为简单，因此广泛用于大序数的表示。</p>\n                                <p>从这里开始，每一个序数都会给出 BMS 表示。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-059': {
                label: "\\({\\varphi}(1,0)\\)",
                detail: {
                    title: "\\({\\varepsilon}_{0}\\) 的 Veblen 函数表示：\\({\\varphi}(1,0)\\)",
                    representations: [
                        { label: "常用表示", html: "\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p><a href=\"https://googology.fandom.com/wiki/Veblen_function\">Veblen 函数</a>是一种用于表示序数的记号，记作 \\({\\varphi}\\)，常用于表示 \\({\\varepsilon}_{0}\\) 到 LVO 之间的序数。</p>\n                                <p>从这里开始，每一个序数都会给出 Veblen 函数表示，直到达到 Veblen 函数的极限。</p>\n                                <p>不过，\\({\\varphi}\\) 在 \\({\\Gamma}_{0}\\) 之后的规则较为复杂，建议改用<a href=\"https://googology.fandom.com/wiki/Ordinal_collapsing_function\">序数坍缩函数（OCF）</a>，例如 <a href=\"https://googology.fandom.com/wiki/Buchholz%27s_function\">Buchholz OCF（BOCF）</a>，或者直接使用 <a href=\"https://googology.fandom.com/wiki/Bashicu_matrix_system\">BMS</a>。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-060': {
                label: "Goodstein 序列",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Goodstein_sequence\">Goodstein 序列</a>",
                    representations: [
                        { label: "常用表示", html: "Goodstein 序列<br><small>对应序数：</small><br>\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>完整定义可参见链接页面。Goodstein 序列的行为与 \\({\\varepsilon}_{0}\\) 以下序数（即由 \\({\\omega}\\) 构成的指数塔）的 <a href=\"https://googology.fandom.com/wiki/Hardy_hierarchy\">Hardy hierarchy（HH）</a>行为完全相同。</p>\n                                <p>具体来说，对于 \\(\\operatorname{Goodstein}(n)\\)，先把 \\(n\\) 转化为底数 \\(2\\) 的指数塔形式，再把其中所有的 \\(2\\) 替换为 \\({\\omega}\\)，得到序数 \\({\\alpha}\\)，则有：</p>\n                                <p>\\(\\operatorname{Goodstein}(n)=H_{{\\alpha}}(3)-3\\)</p>\n                                <p>例如，\\(4=2^{2}\\) 对应 \\({\\alpha}={\\omega}^{{\\omega}}\\)，于是：</p>\n                                <ul>\n                                    <li>\\(\\operatorname{Goodstein}(4)=H_{{\\omega}^{{\\omega}}}(3)-3\\)</li>\n                                    <li>\\(=f_{{\\omega}}(3)-3\\)</li>\n                                    <li>\\(=f_{3}(3)-3\\)</li>\n                                    <li>\\(=f_{2}(f_{2}(f_{2}(3)))-3\\)，其中 \\(f_{2}(n)=n\\cdot{}2^{n}\\)</li>\n                                    <li>\\(=3\\cdot{}2^{402653211}-3\\)</li>\n                                </ul>\n                                <p>易得 \\(\\operatorname{Goodstein}(2\\uparrow{}\\uparrow{}n)=H_{{\\varepsilon}_{0}[n]}(3)-3=f_{{\\varepsilon}_{0}[n-1]}(3)-3\\)。</p>\n                                <p>因此，Goodstein 的增长率与 FGH 的 \\({\\varepsilon}_{0}\\) 几乎相同，\\(2\\uparrow{}\\uparrow{}n\\) 可以忽略不计。</p>\n                                <p>下面是计算 Goodstein 序列的 Python 实现，原理是序数的 Hardy hierarchy。</p>\n                            "},
                        {
                            type: "code",
                            language: "python",
                            source: `class PrSS: # Primitive sequence system, can express ordinals < ε0
    def __init__(self, seq): # seq: integer list
        self.s = seq

    def isZero(self): # 0, is empty
        return len(self.s) == 0

    def isSuccessor(self): # successor ordinals, last element is 0
        return self.s[-1] == 0

    def sub1(self): # subtract 1 if is successor
        assert(self.isSuccessor()) # should be a successor ordinal
        self.s.pop()

    def expand(self,n): # [n] operation on limit ordinals
        assert(not self.isZero() and not self.isSuccessor()) # should be a limit ordinal
        # find the last element smaller than self.s[-1]
        root = len(self.s) - 1
        while self.s[root] >= self.s[-1]:
            root -= 1
            assert(root >= 0) # always have a parent unless self.s[-1] is 0
        # Keep the good prefix; repeat the bad part exactly n times.
        # In particular, [0] removes the whole bad part.
        assert n >= 0
        copy_part = self.s[root:-1]
        self.s = self.s[:root] + copy_part * n

def HH(a, n) -> int: # Hardy hierarchy. HH(ω^a, n) is strictly equal to FGH(a, n)
    if a.isZero():
        return n
    elif a.isSuccessor():
        a.sub1()
        return HH(a, n+1)
    else:
        a.expand(n)
        return HH(a, n)

n = 100
initial_ordinal=PrSS([i for i in range(n+1)]) # = ω^ω^ω...^ω = ε0[n]
g = HH(initial_ordinal, 3) - 3 # g = Goodstein(2↑↑n)
print(g)`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-061': {
                label: "伪燃烧数",
                detail: {
                    title: "<a href=\"https://www.zhihu.com/question/36464952/answer/2912411355\">伪燃烧数</a>：已知构造 \\({\\varepsilon}_{0}\\) 级大数的最简单方法",
                    representations: [
                        { label: "常用表示", html: "伪燃烧数<br><small>对应序数：</small><br>\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>这里的“伪燃烧数”指论文中的 tame fusible numbers：普通二元燃烧数的一个子集，其序型同样为 \\(\\varepsilon_0\\)。下面的 \\(f(x)\\) 是论文的算法 \\(M\\)，返回严格大于 \\(x\\) 的最小 tame 燃烧数与 \\(x\\) 的差；产生大数的是间隙的倒数 \\(1/f(x)\\)。</p>\n                                <p>递归定义为\\[f(x)=\\begin{cases}-x,&x\\lt0,\\\\\\dfrac{f(x-f(x-1))}{2},&x\\geq0.\\end{cases}\\]代码使用有理数，避免浮点舍入改变递归路径。</p>\n                            "},
                        {
                            type: "code",
                            language: "python",
                            source: `from fractions import Fraction


def f(x):
    x = Fraction(x)
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2`,
                        },
                        {"type":"html","html":"\n                                <ul>\n                                    <li>\\(f(1)=\\frac{1}{8}\\)</li>\n                                    <li>\\(f(2)=\\frac{1}{1024}=2^{-10}\\)</li>\n                                    <li>\\(f(3)=2^{-1541023937}\\)</li>\n                                </ul>\n                                <p>按增长层级估计：\\[f(4)\\approx10^{-10^{10^{1.05\\times10^{28}}}}.\\]\\[\\frac{1}{f(5)}\\approx f_\\omega\\!\\left(10^{10^{1.05\\times10^{28}}}\\right).\\]后一个带下标的 \\(f\\) 表示快速增长层级（FGH）。</p>\n                                <p><strong>来源：</strong><a href=\"https://arxiv.org/html/2003.14342#S4\">Erickson、Nivasch、Xu，《Fusible numbers and Peano Arithmetic》，§4 与 §4.1</a>给出 tame 构造、算法 \\(M\\) 和 \\(f(3)\\) 的精确指数；\\(f(4)\\)、\\(f(5)\\) 的上述估计采用本次提供的 2026 年 9 月计算笔记。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-062': {
                label: "PrSS",
                detail: {
                    title: "<a href=\"https://googology.fandom.com/wiki/Primitive_sequence_number\">PrSS（Primitive sequence system）</a>的表示上限",
                    representations: [
                        { label: "常用表示", html: "PrSS<br><small>记号极限：</small><br>\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>PrSS 是一种用有限自然数序列表示 \\({\\varepsilon}_{0}\\) 以下序数的记号系统，规则较短，也便于编程实现。</p>\n                                <h3>基本规则</h3>\n                                <ul>\n                                    <li>这里使用反复展开得到的标准序列；非空序列以 \\(0\\) 开头，且相邻两项的上升不超过 \\(1\\)，例如 \\((0,1,2,3)\\) 或 \\((0,1,2,1,2,0)\\)。空序列表示序数 \\(0\\)。</li>\n                                    <li>若最后一项是 \\(0\\)，则表达式表示后继序数；减 \\(1\\) 对应删除末尾的 \\(0\\)。例如，\\((0,1,2,3,0)=(0,1,2,3)+1\\)。</li>\n                                    <li>若最后一项不是 \\(0\\)，则表达式表示极限序数。进行 \\([n]\\) 展开时，设末项为 \\(k\\)，先找到离它最近且比它小的数；可以证明这个数一定是 \\(k-1\\)。删除末项，再把从 \\(k-1\\) 到新末尾的片段补至总计重复 \\(n\\) 次。</li>\n                                </ul>\n                                <h3>展开示例</h3>\n                                <ul>\n                                    <li>\\((0,1,2,3,4)[3]=(0,1,2,3,3,3)\\)</li>\n                                    <li>\\((0,1,2,3,2)[3]=(0,1,2,3,1,2,3,1,2,3)\\)</li>\n                                    <li>\\((0,1,2,1,0,1,1)[5]=(0,1,2,1,0,1,0,1,0,1,0,1,0,1)\\)</li>\n                                </ul>\n                                <p>有了后继与基本列规则，就可以把 PrSS 表达式用作 FGH 或 HH 的序数指标。</p>\n                                <h3>表示示例</h3>\n                                <ul>\n                                    <li>\\(()=0\\)</li>\n                                    <li>\\((0)=1\\)</li>\n                                    <li>\\((0,0)=2\\)</li>\n                                    <li>\\((0,1)={\\omega}\\)，因为 \\((0,1)[n]\\) 是由 \\(n\\) 个 \\(0\\) 组成的序列，即自然数 \\(n\\)</li>\n                                    <li>\\((0,1,0)={\\omega}+1\\)</li>\n                                    <li>\\((0,1,0,0)={\\omega}+2\\)</li>\n                                    <li>\\((0,1,0,1)={\\omega}\\cdot{}2\\)，因为 \\((0,1,0,1)[n]={\\omega}+n\\)</li>\n                                    <li>\\((0,1,1)={\\omega}^{2}\\)，因为 \\((0,1,1)[n]={\\omega}\\cdot{}n\\)</li>\n                                    <li>\\((0,1,2)={\\omega}^{{\\omega}}\\)</li>\n                                    <li>\\((0,1,2,3)={\\omega}^{{\\omega}^{{\\omega}}}\\)</li>\n                                    <li>\\((0,1,2,3,\\ldots{},n)={\\varepsilon}_{0}[n]\\)</li>\n                                </ul>\n                                <p>一种直观但非正式的理解是：把 \\({\\omega}\\) 的指数塔看成树，每个 PrSS 数字记录相应节点的深度。</p>\n                                <p>下面给出 PrSS 的 Python 实现。</p>\n                            "},
                        {
                            type: "code",
                            language: "python",
                            source: `class PrSS: # Primitive sequence system, can express ordinals < ε0
    def __init__(self, seq): # seq: integer list
        self.s = seq

    def isZero(self): # 0, is empty
        return len(self.s) == 0

    def isSuccessor(self): # successor ordinals, last element is 0
        return self.s[-1] == 0

    def sub1(self): # subtract 1 if is successor
        assert(self.isSuccessor()) # should be a successor ordinal
        self.s.pop()

    def expand(self,n): # [n] operation on limit ordinals
        assert(not self.isZero() and not self.isSuccessor()) # should be a limit ordinal
        # find the last element smaller than self.s[-1]
        root = len(self.s) - 1
        while self.s[root] >= self.s[-1]:
            root -= 1
            assert(root >= 0) # always have a parent unless self.s[-1] is 0
        # Keep the good prefix; repeat the bad part exactly n times.
        # In particular, [0] removes the whole bad part.
        assert n >= 0
        copy_part = self.s[root:-1]
        self.s = self.s[:root] + copy_part * n`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-063': {
                label: "九头蛇游戏",
                detail: {
                    title: "<a href=\"https://doi.org/10.1112/blms/14.4.285\">九头蛇（Hydra）游戏</a>",
                    representations: [
                        { label: "常用表示", html: "九头蛇游戏<br><small>对应序数：</small><br>\\(\\varepsilon_0\\)<br>\\(\\varphi(1,0)\\)<br>\\(\\operatorname{PTO}(\\mathrm{PA})\\)" },
                        { label: "FGH 表示", html: "层级：\\(f_{\\varepsilon_0}(n)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"\n                                <p>Kirby–Paris 九头蛇是一棵有限有根树；非根叶节点及其相连的边称为一个“头”。在第 \\(n\\geq1\\) 步，Hercules 可以砍掉任意一个头。若断口就是根节点，则不发生再生；否则，设断口为 \\(v\\)，\\(v\\) 朝根方向的父节点为 \\(u\\)，便把以 \\(v\\) 为根、完成本次砍头后的剩余子树另复制 \\(n\\) 份，并把这些副本接到 \\(u\\) 上。</p>\n                                <p>无论初始九头蛇是什么，也无论每一步选择哪个头，战斗最终都会在有限步后只剩根节点。证明方法是给树赋予一个小于 \\(\\varepsilon_0\\) 的序数：叶节点赋值 \\(0\\)；若一个节点的子节点依次带有序数 \\(\\alpha_1\\geq\\cdots\\geq\\alpha_r\\)，则给它赋值 \\[\\omega^{\\alpha_1}+\\cdots+\\omega^{\\alpha_r}.\\]整棵九头蛇的序数是根节点的赋值。每次砍头虽然可能大幅增加树的大小，却会使这个序数严格下降，因此 \\(\\varepsilon_0\\) 以下的良序性保证战斗终止。</p>\n                                <p>每一局的步数都是随初始树和砍头策略变化的有限自然数；这里的 \\(\\varepsilon_0\\) 描述统一终止定理及其长度函数的层级。Kirby 与 Paris 证明，“每个递归策略都能获胜”这一算术命题不能由 Peano arithmetic（PA）证明；对于他们构造的特定递归策略 \\(\\tau\\)，其统一终止性对应于使用相关前驱运算的 \\(\\varepsilon_0\\)-归纳。</p>\n                                <p><a href=\"https://googology.fandom.com/wiki/Primitive_sequence_number\">PrSS</a> 的数字可以与九头蛇节点的层数对应，而砍蛇头规则中的“第 \\(n\\) 步复制 \\(n\\) 遍”与 <a href=\"https://googology.fandom.com/wiki/Hardy_hierarchy\">Hardy hierarchy（HH）</a>的递推非常接近。这也给出了本站将砍完九头蛇所需步数函数放在 \\(\\varepsilon_0\\) 级的直观解释。</p>\n                                <p><strong>来源：</strong><a href=\"https://doi.org/10.1112/blms/14.4.285\">Laurie Kirby、Jeff Paris，《Accessible Independence Results for Peano Arithmetic》，Theorem 2 与 pp. 286–293</a>（<a href=\"https://www.cs.tau.ac.il/~nachumd/term/Kirbyparis.pdf\">开放 PDF</a>）。</p>\n                            "},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-064': {
                label: "\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(1,0)(2,1)(2,0)(3,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-065': {
                label: "\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}^{{\\varepsilon}_{0}}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}^{{\\varepsilon}_{0}}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}^{{\\varepsilon}_{0}}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(1,0)(2,1)(2,0)(3,1)(3,0)(4,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-066': {
                label: "\\({\\varepsilon}_{1}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{1}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{1}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>\\(\\varepsilon_1\\) 是 \\(\\varepsilon_0\\) 之后第一个满足 \\(\\omega^\\alpha=\\alpha\\) 的序数。令 \\(a_0=\\varepsilon_0+1\\)、\\(a_{n+1}=\\omega^{a_n}\\)，则 \\(\\varepsilon_1=\\sup_{n\\lt\\omega}a_n\\)。Veblen 记号为 \\(\\varphi_1(1)\\)。</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-067': {
                label: "\\({\\varepsilon}_{1}^{{\\varepsilon}_{1}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{1}^{{\\varepsilon}_{1}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{1}^{{\\varepsilon}_{1}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(1,1)(1,0)(2,1)(2,1)(2,0)(3,1)(3,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-068': {
                label: "\\({\\varepsilon}_{2}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{2}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{2}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(1,1)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>\\(\\varepsilon_2\\) 是第三个 epsilon 数，也就是 \\(\\varepsilon_1\\) 之后的下一个 \\(\\omega^\\alpha=\\alpha\\) 不动点。一般地，\\(\\varepsilon_{\\beta+1}\\) 是 \\(\\varepsilon_\\beta\\) 之后的第一个这种不动点。</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-069': {
                label: "\\({\\varepsilon}_{{\\omega}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\omega}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\omega}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,0)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>把所有有限编号的 epsilon 数汇集起来：\\[\\varepsilon_\\omega=\\sup_{n\\lt\\omega}\\varepsilon_n.\\]它仍满足 \\(\\omega^{\\varepsilon_\\omega}=\\varepsilon_\\omega\\)，而下标已经从有限数进入了 \\(\\omega\\)。</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-070': {
                label: "\\({\\varepsilon}_{{\\omega}+1}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\omega}+1}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\omega}+1}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,0)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-071': {
                label: "\\({\\varepsilon}_{{\\varepsilon}_{0}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\varepsilon}_{0}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\varepsilon}_{0}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,0)(3,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-072': {
                label: "\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,0)(3,1)(4,0)(5,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-073': {
                label: "\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,0)(3,1)(4,0)(5,1)(6,0)(7,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-074': {
                label: "\\({\\zeta}_{0}\\)",
                detail: {
                    title: "\\({\\zeta}_{0}={\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{\\ldots{}}}}}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\zeta}_{0}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>\\({\\zeta}_{0}\\) 是枚举 epsilon 数的函数 \\(\\alpha\\mapsto\\varepsilon_{\\alpha}\\) 的第一个不动点，即满足 \\(\\varepsilon_{{\\zeta}_{0}}={\\zeta}_{0}\\) 的最小正序数。</p><p>令 \\(\\alpha_{0}=0\\)、\\(\\alpha_{n+1}=\\varepsilon_{\\alpha_n}\\)，则 \\({\\zeta}_{0}=\\sup_{n\\lt{}\\omega}\\alpha_n\\)。在常用的二元 Veblen 函数约定下，它也写作 \\(\\varphi_{2}(0)\\)。这一固定点层级源自 <a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的连续递增序数函数</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-075': {
                label: "\\({\\varepsilon}_{{\\zeta}_{0}+1}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\zeta}_{0}+1}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\zeta}_{0}+1}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)(1,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-076': {
                label: "\\({\\varepsilon}_{{\\varepsilon}_{{\\zeta}_{0}+1}}\\)",
                detail: {
                    title: "\\({\\varepsilon}_{{\\varepsilon}_{{\\zeta}_{0}+1}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varepsilon}_{{\\varepsilon}_{{\\zeta}_{0}+1}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,0)(3,1)(4,1)(3,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-077': {
                label: "\\({\\zeta}_{1}\\)",
                detail: {
                    title: "\\({\\zeta}_{1}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\zeta}_{1}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)(1,1)(2,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>\\(\\zeta_1\\) 是 \\(\\zeta_0\\) 之后第一个满足 \\(\\varepsilon_\\alpha=\\alpha\\) 的序数。在 Veblen 记号中，\\(\\zeta_1=\\varphi_2(1)\\)。</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-078': {
                label: "\\({\\zeta}_{{\\zeta}_{0}}\\)",
                detail: {
                    title: "\\({\\zeta}_{{\\zeta}_{0}}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\zeta}_{{\\zeta}_{0}}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)(2,0)(3,1)(4,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-079': {
                label: "\\({\\eta}_{0}\\)",
                detail: {
                    title: "\\({\\eta}_{0}\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\eta}_{0}\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)(2,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>\\(\\eta_0\\) 是枚举 zeta 数的函数 \\(\\alpha\\mapsto\\zeta_\\alpha\\) 的第一个不动点，即最小的 \\(\\zeta_\\alpha=\\alpha\\) 解。常用 Veblen 记号为 \\(\\eta_0=\\varphi_3(0)\\)。</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-080': {
                label: "\\({\\varphi}(4,0)\\)",
                detail: {
                    title: "\\({\\varphi}(4,0)\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varphi}(4,0)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)(2,1)(2,1)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>Veblen 层级再前进一步：\\(\\varphi_4\\) 枚举 \\(\\varphi_3\\) 的不动点，\\(\\varphi_4(0)\\) 是其中第一个。因此它同时也是所有较低 Veblen 层级的共同不动点。</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            },
            'item-081': {
                label: "\\({\\varphi}({\\omega},0)\\)",
                detail: {
                    title: "\\({\\varphi}({\\omega},0)\\)",
                    representations: [
                        { label: "常用表示", html: "\\({\\varphi}({\\omega},0)\\)" },
                        { label: "BMS 表示", html: "\\((0,0)(1,1)(2,1)(3,0)\\)" },
                    ],
                    sections: [
                        {"type":"html","html":"<p><a href=\"https://github.com/smilelee-lyx/ne-rewritten/blob/master/src/notations/translators/BM-BOCF.ts\">NER 的 BMS–BOCF 转换实现</a>。</p>"},
                        {"type":"html","html":"<p>第一个极限编号的 Veblen 层级：\\(\\varphi_\\omega(0)\\) 是所有有限层 \\(\\varphi_n\\) 的第一个共同不动点，并且 \\[\\varphi_\\omega(0)=\\sup_{n\\lt\\omega}\\varphi_n(0).\\]</p><p>参考：<a href=\"https://doi.org/10.1090/S0002-9947-1908-1500814-9\">Veblen 的序数不动点层级</a>。</p>"},
                        unreviewedNotice(),
                    ],
                },
            }
        }
    });
})(typeof globalThis !== 'undefined' ? globalThis : this);
