(function (global) {
    'use strict';

    function unreviewedNotice() {
        return {
            type: 'note',
            html: '该内容由gpt5.6sol完成，且暂时未经过审核，不保证正确性'
        };
    }

    global.GoogologyI18n.registerMessages('zh-CN', {
        items: {
            'item-041': {
                label: '三元 Ackermann 函数',
                detail: {
                    title: '三元 Ackermann 函数',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>三元 Ackermann 函数是经典 Ackermann 函数的推广。它通过增加一个参数来迭代函数的增长速度，最高可达 \\(f_{{\\omega}^{2}}(n)\\)。</p>
                                <p>有多种定义可以达到相同的增长率，下面给出其中一种。</p>
                                <ul>
                                    <li>\\(\\operatorname{A}(0,b,c)=c+1\\)</li>
                                    <li>\\(\\operatorname{A}(a,0,c)=\\operatorname{A}(a-1,c,c)\\)</li>
                                    <li>\\(\\operatorname{A}(a,b,0)=\\operatorname{A}(a,b-1,1)\\)</li>
                                    <li>\\(\\operatorname{A}(a,b,c)=\\operatorname{A}(a,b-1,\\operatorname{A}(a,b,c-1))\\)</li>
                                </ul>
                                <p>当 \\(a=1\\) 时，\\(\\operatorname{A}(1,b,c)\\) 相当于普通的二元 Ackermann 函数 \\(\\operatorname{A}(b,c)\\)。当 \\(a=2\\) 时，\\(\\operatorname{A}(2,b,c)\\) 的增长速度达到 \\(f_{{\\omega}\\cdot{}2}(n)\\)。一般地，\\(\\operatorname{A}(a,b,c)\\) 约等于 \\(f_{{\\omega}\\cdot{}a+b}(n)\\)。</p>
                                <p>三元 Ackermann 函数的对角线 \\(\\operatorname{A}(n,n,n)\\) 的增长速度大约相当于 FGH 中的 \\(f_{{\\omega}^{2}}(n)\\)。</p>
                            `
                        },
                        {
                            type: 'code',
                            language: 'python',
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
print(A3(n, n, n))`
                        }
                    ]
                }
            },
            'item-042': {
                label: '\\(f_{{\\omega}^{2}+{\\omega}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> \\(f_{{\\omega}^{2}+{\\omega}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\((\\omega^{2}+\\omega)[n]=\\omega^{2}+n\\)</p>`
                        }
                    ]
                }
            },
            'item-043': {
                label: '\\(f_{{\\omega}^{2}\\cdot{}2}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> \\(f_{{\\omega}^{2}\\cdot{}2}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\((\\omega^{2}\\cdot{}2)[n]=(\\omega^{2}+\\omega^{2})[n]=\\omega^{2}+\\omega\\cdot{}n\\)</p>`
                        }
                    ]
                }
            },
            'item-044': {
                label: '\\(f_{{\\omega}^{3}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> \\(f_{{\\omega}^{3}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\((\\omega^{3})[n]=(\\omega^{2}\\cdot{}\\omega)[n]=\\omega^{2}\\cdot{}n\\)</p>`
                        }
                    ]
                }
            },
            'item-045': {
                label: '\\(f_{{\\omega}^{4}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> \\(f_{{\\omega}^{4}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\((\\omega^{4})[n]=(\\omega^{3}\\cdot{}\\omega)[n]=\\omega^{3}\\cdot{}n\\)</p>`
                        }
                    ]
                }
            },
            'item-046': {
                label: '\\(f_{{\\omega}^{{\\omega}}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> \\(f_{{\\omega}^{{\\omega}}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>采用基本列 \\((\\omega^{\\omega})[n]=\\omega^{n}\\) 时，例如：</p>
                                <p>\\[
                                    f_{\\omega^{\\omega}}(10)
                                    =f_{\\omega^{10}}(10)
                                    =f_{\\omega^{9}\\cdot{}10}(10)
                                    =f_{\\omega^{9}\\cdot{}9+\\omega^{9}}(10)
                                    =\\ldots
                                \\]</p>
                            `
                        }
                    ]
                }
            },
            'item-047': {
                label: '多元 Ackermann 函数',
                detail: {
                    title: '多元 Ackermann 函数',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>把 Ackermann 函数进一步扩展到 \\(n\\) 个变量后，其增长率为 \\(f_{{\\omega}^{n-1}}\\) 级别。</p>
                                <p>因此，最终的极限是 \\(f_{{\\omega}^{{\\omega}}}\\)；多元 Ackermann 函数无法表示增长率不低于 \\(f_{{\\omega}^{{\\omega}}}\\) 的函数。</p>
                                <p>多元 Ackermann 函数的详细定义较为繁琐，此处不展开。</p>
                            `
                        }
                    ]
                }
            },
            'item-048': {
                label: 'Friedman n 函数',
                detail: {
                    title: '<a href="https://doi.org/10.1006/jcta.2000.3154">Friedman n 函数</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p><strong>定义。</strong>固定 \\(k\\geq1\\)，取字母表 \\(\\{1,\\ldots,k\\}\\) 上的有限词 \\(x_1\\cdots x_N\\)。若不存在 \\(i\\lt j\\leq N/2\\)，使连续块 \\(x_i\\cdots x_{2i}\\) 是较后连续块 \\(x_j\\cdots x_{2j}\\) 的子序列，则称该词满足性质 \\(*\\)。这里“子序列”允许删除字符，但须保持其余字符的相对次序。\\(n(k)\\) 是满足性质 \\(*\\) 的词的最大长度。</p>
                                <p>Higman 引理排除了无限长的反例；再对所有合法有限前缀组成的有限分支树应用 König 引理，即知最大长度存在。已知 \\(n(1)=3\\)、\\(n(2)=11\\)，而 \\(12221111111\\) 达到第二个值。Friedman 还证明 \\(n(3)>\\operatorname{A}_{7198}(158386)\\)。令 \\(\\operatorname{A}(t)=\\operatorname{A}(t,t)\\)，则有 \\[n(4)>\\operatorname{A}^{\\operatorname{A}(187196)}(1),\\]其中上标表示函数复合迭代。</p>
                                <p>作为 \\(k\\) 的函数，\\(n(k)\\) 最终支配每个 \\(H_\\beta\\; (\\beta\\lt\\omega^\\omega)\\)，并最终被 \\(H_{\\omega^\\omega+1}\\) 支配；按本站采用的 FGH 对照，可将它放在 \\(f_{\\omega^\\omega}\\) 层级。又因为 \\(\\operatorname{TREE}(3)\\) 远大于 \\(n(4)\\)，上述 \\(n(4)\\) 下界也成为 \\(\\operatorname{TREE}(3)\\) 的一个很弱的下界。</p>
                                <p>不过，\\(\\operatorname{TREE}(3)\\) 位于<a href="https://googology.fandom.com/wiki/Small_Veblen_ordinal">小 Veblen 序数（SVO）</a>级别，因此这个下界非常弱。后来，人们把 \\(\\operatorname{A}^{\\operatorname{A}(187196)}(1)\\) 及其他含有“187196”的相关表达式戏称为“\\(\\operatorname{TERR}(3)\\)”；“TERR”是对“TREE”的故意误拼。</p>
                                <p><strong>来源：</strong><a href="https://doi.org/10.1006/jcta.2000.3154">Harvey M. Friedman，《Long Finite Sequences》，§1、Theorems 5.19 与 6.8</a>；<a href="https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/1/1952/files/2014/01/EnormousInt.12pt.6_1_00-23kmig3.pdf">Harvey M. Friedman，《Enormous Integers in Real Life》，Theorems 8.4–8.5</a>。</p>
                            `
                        },
                        unreviewedNotice()
                    ]
                }
            },
            'item-049': {
                label: '字符串子序列函数',
                detail: {
                    title: '字符串子序列函数',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p><strong>定义。</strong>令 \\(\\operatorname{STR}(n)\\) 为满足下述条件的最长字符串序列 \\(S_1,\\ldots,S_N\\) 的长度：字符串取自一个含 \\(n\\) 个字符的字母表，\\(|S_i|\\leq i\\)，并且对所有 \\(i\\lt j\\)，\\(S_i\\) 都不是 \\(S_j\\) 的子序列。这里“子序列”指删除若干字符而不改变其余字符的相对次序；空串也允许出现。</p>
                                <p>Higman 引理和 König 引理保证 \\(\\operatorname{STR}(n)\\) 总是有限。小值及下界为 \\(\\operatorname{STR}(1)=2\\)、\\(\\operatorname{STR}(2)=4\\)、\\(\\operatorname{STR}(3)\\geq11\\)；相应例子可写成 \\((A,\\varnothing)\\)、\\((A,BB,B,\\varnothing)\\) 与 \\((A,BB,BC,CB,B,CCCCC,CCCC,CCC,CC,C,\\varnothing)\\)。</p>
                                <p>这个定义可以看作不允许树分叉的 TREE 风格坏序列：带有 \\(n\\) 种标号的树退化为使用 \\(n\\) 种字符的字符串。由 \\(n\\) 个字符组成的全部有限串在子序列序下的最大序型为 \\(\\omega^{\\omega^{n-1}}\\)。该构造与 Friedman 在《Long Finite Sequences》§5 中研究的 \\(F\\) 函数只差索引约定；相应上下界将它的增长放在 \\(H_{\\omega^{\\omega^{\\omega}}}=f_{\\omega^\\omega}\\) 层级。</p>
                                <p><strong>来源：</strong><a href="https://mathoverflow.net/questions/285755/growth-rate-of-longest-sequence-of-strings-where-no-string-is-a-subsequence-of-a">MathOverflow，“Growth rate of longest sequence of strings where no string is a subsequence of a later one”（定义与小值）</a>；<a href="https://doi.org/10.1006/jcta.2000.3154">Harvey M. Friedman，《Long Finite Sequences》，§5 与 Theorem 5.19</a>；<a href="https://arxiv.org/abs/1103.4399">Schmitz、Schnoebelen，《Multiply-Recursive Upper Bounds with Higman's Lemma》</a>。</p>
                            `
                        },
                        unreviewedNotice()
                    ]
                }
            },
            'item-050': {
                label: '\\(f_{{\\omega}^{{\\omega}}\\cdot{}2}(n)\\)'
            },
            'item-051': {
                label: '\\(f_{{\\omega}^{{\\omega}+1}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> \\(f_{{\\omega}^{{\\omega}+1}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\((\\omega^{\\omega+1})[n]=(\\omega^{\\omega}\\cdot{}\\omega)[n]=\\omega^{\\omega}\\cdot{}n\\)</p>`
                        }
                    ]
                }
            },
            'item-052': {
                label: '\\(f_{{\\omega}^{{\\omega}\\cdot{}2}}(n)\\)'
            },
            'item-053': {
                label: '\\(f_{{\\omega}^{{\\omega}^{2}}}(n)\\)'
            },
            'item-054': {
                label: '\\(f_{{\\omega}^{{\\omega}^{{\\omega}}}}(n)\\)'
            },
            'item-055': {
                label: '\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}(n)\\)'
            },
            'item-056': {
                label: '\\(f_{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}^{{\\omega}}}}}}(n)\\)'
            },
            'item-057': {
                label: '\\({\\varepsilon}_{0}\\)',
                detail: {
                    title: '\\({\\varepsilon}_{0}={\\omega}^{{\\omega}^{{\\omega}^{\\ldots{}^{{\\omega}}}}}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>从这里开始，HH 追上了 FGH。这说明决定大小的不再是 FGH 本身的规则，而是序数本身。因此，后续不再强调 FGH，并省略 \\(f_{{\\varepsilon}_{0}}(n)\\) 的表述，直接写作 \\({\\varepsilon}_{0}\\)。</p>
                                <p><a href="https://googology.fandom.com/wiki/%CE%95%E2%82%80">\\({\\varepsilon}_{0}\\)</a> 是大数研究中的重要节点，许多不同类型的大数汇集在这一层级，只是知名度不及 Graham 数和 \\(\\operatorname{TREE}(3)\\)。</p>
                                <ol>
                                    <li><a href="https://googology.fandom.com/wiki/Goodstein_sequence">Goodstein 序列</a></li>
                                    <li><a href="https://googology.fandom.com/wiki/Fusible_number">燃烧数（fusible numbers）</a>与<a href="https://www.zhihu.com/question/36464952/answer/2912411355">伪燃烧数</a></li>
                                    <li><a href="https://googology.fandom.com/wiki/Kirby-Paris_hydra">Kirby–Paris 九头蛇问题</a></li>
                                    <li><a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS 的极限</a></li>
                                    <li><a href="https://en.wikipedia.org/wiki/Ordinal_analysis">皮亚诺算术（PA）的证明论序数</a></li>
                                    <li><a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy（HH）</a>首次追上<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">快速增长层级（FGH）</a></li>
                                </ol>
                                <p>构造 \\({\\varepsilon}_{0}\\) 级大数的最简单代码基于伪燃烧数。</p>
                            `
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def f(x):
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2
n = 100
print(1/f(100))`
                        },
                        {
                            type: 'html',
                            html: `<p>也可以基于序数记号的 FGH 或 HH 构造。下面以 PrSS 为例。</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
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
        # remove self.s[-1]
        self.s = self.s[:-1]
        # append the part from the root to the last element n times
        copy_part = self.s[root:]
        if(n > 1):
            self.s = self.s + copy_part * (n - 1)

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
print(HH(initial_ordinal, n)) # Notice that HH(ε0[n]) is strictly equal to FGH(ε0[n-1])`
                        }
                    ]
                }
            },
            'item-058': {
                label: 'BMS: \\((0,0)(1,1)\\)',
                detail: {
                    title: '\\({\\varepsilon}_{0}\\) 的 BMS 表示：\\((0,0)(1,1)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p><a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS（Bashicu matrix system）</a>是一种用于表示序数的记号。它可以表示极为巨大的序数，规则也较为简单，因此广泛用于大序数的表示。</p>
                                <p>从这里开始，每一个序数都会给出 BMS 表示。</p>
                            `
                        }
                    ]
                }
            },
            'item-059': {
                label: '\\({\\varphi}(1,0)\\)',
                detail: {
                    title: '\\({\\varepsilon}_{0}\\) 的 Veblen 函数表示：\\({\\varphi}(1,0)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p><a href="https://googology.fandom.com/wiki/Veblen_function">Veblen 函数</a>是一种用于表示序数的记号，记作 \\({\\varphi}\\)，常用于表示 \\({\\varepsilon}_{0}\\) 到 LVO 之间的序数。</p>
                                <p>从这里开始，每一个序数都会给出 Veblen 函数表示，直到达到 Veblen 函数的极限。</p>
                                <p>不过，\\({\\varphi}\\) 在 \\({\\Gamma}_{0}\\) 之后的规则较为复杂，建议改用<a href="https://googology.fandom.com/wiki/Ordinal_collapsing_function">序数坍缩函数（OCF）</a>，例如 <a href="https://googology.fandom.com/wiki/Buchholz%27s_function">Buchholz OCF（BOCF）</a>，或者直接使用 <a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS</a>。</p>
                            `
                        }
                    ]
                }
            },
            'item-060': {
                label: 'Goodstein 序列',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Goodstein_sequence">Goodstein 序列</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>完整定义可参见链接页面。Goodstein 序列的行为与 \\({\\varepsilon}_{0}\\) 以下序数（即由 \\({\\omega}\\) 构成的指数塔）的 <a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy（HH）</a>行为完全相同。</p>
                                <p>具体来说，对于 \\(\\operatorname{Goodstein}(n)\\)，先把 \\(n\\) 转化为底数 \\(2\\) 的指数塔形式，再把其中所有的 \\(2\\) 替换为 \\({\\omega}\\)，得到序数 \\({\\alpha}\\)，则有：</p>
                                <p>\\(\\operatorname{Goodstein}(n)=H_{{\\alpha}}(3)-3\\)</p>
                                <p>例如，\\(4=2^{2}\\) 对应 \\({\\alpha}={\\omega}^{{\\omega}}\\)，于是：</p>
                                <ul>
                                    <li>\\(\\operatorname{Goodstein}(4)=H_{{\\omega}^{{\\omega}}}(3)-3\\)</li>
                                    <li>\\(=f_{{\\omega}}(3)-3\\)</li>
                                    <li>\\(=f_{3}(3)-3\\)</li>
                                    <li>\\(=f_{2}(f_{2}(f_{2}(3)))-3\\)，其中 \\(f_{2}(n)=n\\cdot{}2^{n}\\)</li>
                                    <li>\\(=3\\cdot{}2^{402653211}-3\\)</li>
                                </ul>
                                <p>易得 \\(\\operatorname{Goodstein}(2\\uparrow{}\\uparrow{}n)=H_{{\\varepsilon}_{0}[n]}(3)-3=f_{{\\varepsilon}_{0}[n-1]}(3)-3\\)。</p>
                                <p>因此，Goodstein 的增长率与 FGH 的 \\({\\varepsilon}_{0}\\) 几乎相同，\\(2\\uparrow{}\\uparrow{}n\\) 可以忽略不计。</p>
                                <p>下面是计算 Goodstein 序列的 Python 实现，原理是序数的 Hardy hierarchy。</p>
                            `
                        },
                        {
                            type: 'code',
                            language: 'python',
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
        # remove self.s[-1]
        self.s = self.s[:-1]
        # append the part from the root to the last element n times
        copy_part = self.s[root:]
        if(n > 1):
            self.s = self.s + copy_part * (n - 1)

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
print(g)`
                        }
                    ]
                }
            },
            'item-061': {
                label: '伪燃烧数',
                detail: {
                    title: '<a href="https://www.zhihu.com/question/36464952/answer/2912411355">伪燃烧数</a>：已知构造 \\({\\varepsilon}_{0}\\) 级大数的最简单方法',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>它是<a href="https://googology.fandom.com/wiki/Fusible_number">燃烧数（fusible numbers）</a>的一个下界，而且在大数尺度上与燃烧数几乎一样大，两者均为 \\({\\varepsilon}_{0}\\) 级。定义由下面的代码给出。</p>
                            `
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def f(x):
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2`
                        },
                        {
                            type: 'html',
                            html: `
                                <ul>
                                    <li>\\(f(1)=\\frac{1}{8}\\)</li>
                                    <li>\\(f(2)=\\frac{1}{1024}=2^{-10}\\)</li>
                                    <li>\\(f(3)=2^{-1541023937}\\)</li>
                                </ul>
                                <p>\\(\\frac{1}{f(4)}\\) 是 \\(10\\uparrow{}\\uparrow{}5\\) 级别。根据 @Hypcos 的分析，具体数值与消息来源仍需补充。</p>
                                <p>@Hypcos 猜测 \\(\\frac{1}{f(5)}\\) 可能达到 Ackermann 函数级别，具体消息来源仍需补充。</p>
                                <p><a href="https://lmcs.episciences.org/9850/pdf">已有证明给出 \\(f(n)>f_{{\\varepsilon}_{0}}(n-7)\\)</a>。</p>
                            `
                        }
                    ]
                }
            },
            'item-062': {
                label: 'PrSS',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS（Primitive sequence system）</a>的表示上限',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>PrSS 是一种用有限自然数序列表示 \\({\\varepsilon}_{0}\\) 以下序数的记号系统，规则较短，也便于编程实现。</p>
                                <h3>基本规则</h3>
                                <ul>
                                    <li>表达式是以 \\(0\\) 开头的有限自然数序列，例如 \\((0,1,2,3)\\) 或 \\((0,1,2,1,2,0)\\)。空序列表示序数 \\(0\\)。</li>
                                    <li>若最后一项是 \\(0\\)，则表达式表示后继序数；减 \\(1\\) 对应删除末尾的 \\(0\\)。例如，\\((0,1,2,3,0)=(0,1,2,3)+1\\)。</li>
                                    <li>若最后一项不是 \\(0\\)，则表达式表示极限序数。进行 \\([n]\\) 展开时，设末项为 \\(k\\)，先找到离它最近且比它小的数；可以证明这个数一定是 \\(k-1\\)。删除末项，再把从 \\(k-1\\) 到新末尾的片段补至总计重复 \\(n\\) 次。</li>
                                </ul>
                                <h3>展开示例</h3>
                                <ul>
                                    <li>\\((0,1,2,3,4)[3]=(0,1,2,3,3,3)\\)</li>
                                    <li>\\((0,1,2,3,2)[3]=(0,1,2,3,1,2,3,1,2,3)\\)</li>
                                    <li>\\((0,1,2,1,0,1,1)[5]=(0,1,2,1,0,1,0,1,0,1,0,1,0,1)\\)</li>
                                </ul>
                                <p>有了后继与基本列规则，就可以把 PrSS 表达式用作 FGH 或 HH 的序数指标。</p>
                                <h3>表示示例</h3>
                                <ul>
                                    <li>\\(()=0\\)</li>
                                    <li>\\((0)=1\\)</li>
                                    <li>\\((0,0)=2\\)</li>
                                    <li>\\((0,1)={\\omega}\\)，因为 \\((0,1)[n]\\) 是由 \\(n\\) 个 \\(0\\) 组成的序列，即自然数 \\(n\\)</li>
                                    <li>\\((0,1,0)={\\omega}+1\\)</li>
                                    <li>\\((0,1,0,0)={\\omega}+2\\)</li>
                                    <li>\\((0,1,0,1)={\\omega}\\cdot{}2\\)，因为 \\((0,1,0,1)[n]={\\omega}+n\\)</li>
                                    <li>\\((0,1,1)={\\omega}^{2}\\)，因为 \\((0,1,1)[n]={\\omega}\\cdot{}n\\)</li>
                                    <li>\\((0,1,2)={\\omega}^{{\\omega}}\\)</li>
                                    <li>\\((0,1,2,3)={\\omega}^{{\\omega}^{{\\omega}}}\\)</li>
                                    <li>\\((0,1,2,3,\\ldots{},n)={\\varepsilon}_{0}[n]\\)</li>
                                </ul>
                                <p>一种直观但非正式的理解是：把 \\({\\omega}\\) 的指数塔看成树，每个 PrSS 数字记录相应节点的深度。</p>
                                <p>下面给出 PrSS 的 Python 实现。</p>
                            `
                        },
                        {
                            type: 'code',
                            language: 'python',
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
        # remove self.s[-1]
        self.s = self.s[:-1]
        # append the part from the root to the last element n times
        copy_part = self.s[root:]
        if(n > 1):
            self.s = self.s + copy_part * (n - 1)`
                        }
                    ]
                }
            },
            'item-063': {
                label: '九头蛇游戏',
                detail: {
                    title: '<a href="https://doi.org/10.1112/blms/14.4.285">九头蛇（Hydra）游戏</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>Kirby–Paris 九头蛇是一棵有限有根树；非根叶节点及其相连的边称为一个“头”。在第 \\(n\\geq1\\) 步，Hercules 可以砍掉任意一个头。若断口就是根节点，则不发生再生；否则，设断口为 \\(v\\)，\\(v\\) 朝根方向的父节点为 \\(u\\)，便把以 \\(v\\) 为根、完成本次砍头后的剩余子树另复制 \\(n\\) 份，并把这些副本接到 \\(u\\) 上。</p>
                                <p>无论初始九头蛇是什么，也无论每一步选择哪个头，战斗最终都会在有限步后只剩根节点。证明方法是给树赋予一个小于 \\(\\varepsilon_0\\) 的序数：叶节点赋值 \\(0\\)；若一个节点的子节点依次带有序数 \\(\\alpha_1\\geq\\cdots\\geq\\alpha_r\\)，则给它赋值 \\[\\omega^{\\alpha_1}+\\cdots+\\omega^{\\alpha_r}.\\]整棵九头蛇的序数是根节点的赋值。每次砍头虽然可能大幅增加树的大小，却会使这个序数严格下降，因此 \\(\\varepsilon_0\\) 以下的良序性保证战斗终止。</p>
                                <p>每一局的步数都是随初始树和砍头策略变化的有限自然数；这里的 \\(\\varepsilon_0\\) 描述统一终止定理及其长度函数的层级。Kirby 与 Paris 证明，“每个递归策略都能获胜”这一算术命题不能由 Peano arithmetic（PA）证明；对于他们构造的特定递归策略 \\(\\tau\\)，其统一终止性对应于使用相关前驱运算的 \\(\\varepsilon_0\\)-归纳。</p>
                                <p><a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS</a> 的数字可以与九头蛇节点的层数对应，而砍蛇头规则中的“第 \\(n\\) 步复制 \\(n\\) 遍”与 <a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy（HH）</a>的递推非常接近。这也给出了本站将砍完九头蛇所需步数函数放在 \\(\\varepsilon_0\\) 级的直观解释。</p>
                                <p><strong>来源：</strong><a href="https://doi.org/10.1112/blms/14.4.285">Laurie Kirby、Jeff Paris，《Accessible Independence Results for Peano Arithmetic》，Theorem 2 与 pp. 286–293</a>（<a href="https://www.cs.tau.ac.il/~nachumd/term/Kirbyparis.pdf">开放 PDF</a>）。</p>
                            `
                        },
                        unreviewedNotice()
                    ]
                }
            },
            'item-064': {
                label: '\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}}\\)'
            },
            'item-065': {
                label: '\\({\\varepsilon}_{0}^{{\\varepsilon}_{0}^{{\\varepsilon}_{0}}}\\)'
            },
            'item-066': {
                label: '\\({\\varepsilon}_{1}\\)'
            },
            'item-067': {
                label: '\\({\\varepsilon}_{1}^{{\\varepsilon}_{1}}\\)'
            },
            'item-068': {
                label: '\\({\\varepsilon}_{2}\\)'
            },
            'item-069': {
                label: '\\({\\varepsilon}_{{\\omega}}\\)'
            },
            'item-070': {
                label: '\\({\\varepsilon}_{{\\omega}+1}\\)'
            },
            'item-071': {
                label: '\\({\\varepsilon}_{{\\varepsilon}_{0}}\\)'
            },
            'item-072': {
                label: '\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}\\)'
            },
            'item-073': {
                label: '\\({\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{0}}}}\\)'
            },
            'item-074': {
                label: '\\({\\zeta}_{0}\\)',
                detail: {
                    title: '\\({\\zeta}_{0}={\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{{\\varepsilon}_{\\ldots{}}}}}}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\({\\zeta}_{0}\\) 是枚举 epsilon 数的函数 \\(\\alpha\\mapsto\\varepsilon_{\\alpha}\\) 的第一个不动点，即满足 \\(\\varepsilon_{{\\zeta}_{0}}={\\zeta}_{0}\\) 的最小正序数。</p><p>令 \\(\\alpha_{0}=0\\)、\\(\\alpha_{n+1}=\\varepsilon_{\\alpha_n}\\)，则 \\({\\zeta}_{0}=\\sup_{n\\lt{}\\omega}\\alpha_n\\)。在常用的二元 Veblen 函数约定下，它也写作 \\(\\varphi_{2}(0)\\)。这一固定点层级源自 <a href="https://doi.org/10.1090/S0002-9947-1908-1500814-9">Veblen 的连续递增序数函数</a>。</p>`
                        },
                        unreviewedNotice()
                    ]
                }
            },
            'item-075': {
                label: '\\({\\varepsilon}_{{\\zeta}_{0}+1}\\)'
            },
            'item-076': {
                label: '\\({\\varepsilon}_{{\\varepsilon}_{{\\zeta}_{0}+1}}\\)'
            },
            'item-077': {
                label: '\\({\\zeta}_{1}\\)'
            },
            'item-078': {
                label: '\\({\\zeta}_{{\\zeta}_{0}}\\)'
            },
            'item-079': {
                label: '\\({\\eta}_{0}\\)'
            },
            'item-080': {
                label: '\\({\\varphi}(4,0)\\)'
            },
            'item-081': {
                label: '\\({\\varphi}({\\omega},0)\\)'
            }
        }
    });
})(typeof globalThis !== 'undefined' ? globalThis : this);
