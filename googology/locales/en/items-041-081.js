(function (global) {
    'use strict';

    function unreviewedNotice() {
        return {
            type: 'note',
            html: 'This content was produced by gpt5.6sol and has not yet been reviewed; its correctness is not guaranteed.'
        };
    }

    global.GoogologyI18n.registerMessages('en', {
        items: {
            'item-041': {
                label: 'Ternary Ackermann function',
                detail: {
                    title: 'Ternary Ackermann function',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>The ternary Ackermann function generalizes the classical Ackermann function. Its additional argument iterates the function's growth rate, reaching as high as \\(f_{{\\omega}^{2}}(n).\\)</p>
                                <p>Several definitions achieve the same growth rate; the following is one of them.</p>
                                <ul>
                                    <li>\\(\\operatorname{A}(0,b,c)=c+1\\)</li>
                                    <li>\\(\\operatorname{A}(a,0,c)=\\operatorname{A}(a-1,c,c)\\)</li>
                                    <li>\\(\\operatorname{A}(a,b,0)=\\operatorname{A}(a,b-1,1)\\)</li>
                                    <li>\\(\\operatorname{A}(a,b,c)=\\operatorname{A}(a,b-1,\\operatorname{A}(a,b,c-1))\\)</li>
                                </ul>
                                <p>When \\(a=1\\), \\(\\operatorname{A}(1,b,c)\\) is equivalent to the ordinary binary Ackermann function \\(\\operatorname{A}(b,c)\\). When \\(a=2\\), \\(\\operatorname{A}(2,b,c)\\) grows at the level of \\(f_{{\\omega}\\cdot{}2}(n).\\) In general, \\(\\operatorname{A}(a,b,c)\\) is approximately \\(f_{{\\omega}\\cdot{}a+b}(n).\\)</p>
                                <p>The diagonal \\(\\operatorname{A}(n,n,n)\\) of the ternary Ackermann function grows at approximately the level of \\(f_{{\\omega}^{2}}(n)\\) in the FGH.</p>
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
                                <p>Using the fundamental sequence \\((\\omega^{\\omega})[n]=\\omega^{n},\\) for example:</p>
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
                label: 'Multivariate Ackermann function',
                detail: {
                    title: 'Multivariate Ackermann function',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>Extending the Ackermann function to \\(n\\) variables gives a growth rate at the level of \\(f_{{\\omega}^{n-1}}.\\)</p>
                                <p>Its final limit is therefore \\(f_{{\\omega}^{{\\omega}}}\\); multivariate Ackermann functions cannot express functions whose growth rate is at least \\(f_{{\\omega}^{{\\omega}}}.\\)</p>
                                <p>The full definition of the multivariate Ackermann function is lengthy and is omitted here.</p>
                            `
                        }
                    ]
                }
            },
            'item-048': {
                label: "Friedman's n function",
                detail: {
                    title: '<a href="https://doi.org/10.1006/jcta.2000.3154">Friedman&#39;s n function</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p><strong>Definition.</strong> Fix \\(k\\geq1\\) and take a finite word \\(x_1\\cdots x_N\\) over \\(\\{1,\\ldots,k\\}\\). It has property \\(*\\) when there are no \\(i\\lt j\\leq N/2\\) for which the consecutive block \\(x_i\\cdots x_{2i}\\) is a subsequence of the later block \\(x_j\\cdots x_{2j}\\). Here a subsequence may delete symbols but must preserve the relative order of those retained. The number \\(n(k)\\) is the greatest possible \\(N\\).</p>
                                <p>Higman's lemma rules out an infinite word with property \\(*\\); applying König's lemma to the finitely branching tree of valid finite prefixes then gives a maximum length. The first two exact values are \\(n(1)=3\\) and \\(n(2)=11\\), with \\(12221111111\\) attaining the latter. Friedman also proved \\(n(3)>\\operatorname{A}_{7198}(158386)\\). If \\(\\operatorname{A}(t)=\\operatorname{A}(t,t)\\), then \\[n(4)>\\operatorname{A}^{\\operatorname{A}(187196)}(1),\\]where the superscript denotes functional iteration.</p>
                                <p>As a function of \\(k\\), \\(n(k)\\) eventually dominates every \\(H_\\beta\\) with \\(\\beta\\lt\\omega^\\omega\\), and is eventually dominated by \\(H_{\\omega^\\omega+1}\\). Under the FGH correspondence used on this site, this places it at the \\(f_{\\omega^\\omega}\\) level. Since \\(\\operatorname{TREE}(3)\\) is far larger than \\(n(4)\\), the bound above is also a very weak lower bound for \\(\\operatorname{TREE}(3)\\).</p>
                                <p>However, \\(\\operatorname{TREE}(3)\\) lies at the level of the <a href="https://googology.fandom.com/wiki/Small_Veblen_ordinal">small Veblen ordinal (SVO)</a>, so this lower bound is extremely weak. People later jokingly called \\(\\operatorname{A}^{\\operatorname{A}(187196)}(1),\\) and related expressions containing “187196,” “\\(\\operatorname{TERR}(3)\\)”; “TERR” is an intentional misspelling of “TREE.”</p>
                                <p><strong>Sources:</strong> <a href="https://doi.org/10.1006/jcta.2000.3154">Harvey M. Friedman, <cite>Long Finite Sequences</cite>, §1 and Theorems 5.19 and 6.8</a>; <a href="https://bpb-us-w2.wpmucdn.com/u.osu.edu/dist/1/1952/files/2014/01/EnormousInt.12pt.6_1_00-23kmig3.pdf">Harvey M. Friedman, <cite>Enormous Integers in Real Life</cite>, Theorems 8.4–8.5</a>.</p>
                            `
                        },
                        unreviewedNotice()
                    ]
                }
            },
            'item-049': {
                label: 'String-subsequence function',
                detail: {
                    title: 'String-subsequence function',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p><strong>Definition.</strong> Let \\(\\operatorname{STR}(n)\\) be the greatest length \\(N\\) of a sequence of strings \\(S_1,\\ldots,S_N\\) such that the alphabet has \\(n\\) symbols, \\(|S_i|\\leq i\\), and \\(S_i\\) is not a subsequence of \\(S_j\\) whenever \\(i\\lt j\\). A subsequence may delete symbols but preserves the relative order of those retained; the empty string is allowed.</p>
                                <p>Higman's lemma together with König's lemma ensures that \\(\\operatorname{STR}(n)\\) is finite. The known initial values and bound are \\(\\operatorname{STR}(1)=2\\), \\(\\operatorname{STR}(2)=4\\), and \\(\\operatorname{STR}(3)\\geq11\\). Witnesses are \\((A,\\varnothing)\\), \\((A,BB,B,\\varnothing)\\), and \\((A,BB,BC,CB,B,CCCCC,CCCC,CCC,CC,C,\\varnothing)\\), respectively.</p>
                                <p>This can be viewed as a TREE-style bad-sequence function with no branching: trees with \\(n\\) node labels degenerate into strings over an \\(n\\)-symbol alphabet. The maximal order type of all finite strings over \\(n\\) symbols under the subsequence ordering is \\(\\omega^{\\omega^{n-1}}\\). This construction differs only by an indexing convention from the function \\(F\\) studied in §5 of Friedman's <cite>Long Finite Sequences</cite>; the corresponding bounds place its growth at \\(H_{\\omega^{\\omega^{\\omega}}}=f_{\\omega^\\omega}\\).</p>
                                <p><strong>Sources:</strong> <a href="https://mathoverflow.net/questions/285755/growth-rate-of-longest-sequence-of-strings-where-no-string-is-a-subsequence-of-a">MathOverflow, “Growth rate of longest sequence of strings where no string is a subsequence of a later one” (definition and small cases)</a>; <a href="https://doi.org/10.1006/jcta.2000.3154">Harvey M. Friedman, <cite>Long Finite Sequences</cite>, §5 and Theorem 5.19</a>; <a href="https://arxiv.org/abs/1103.4399">Schmitz and Schnoebelen, <cite>Multiply-Recursive Upper Bounds with Higman's Lemma</cite></a>.</p>
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
                                <p>Starting here, the HH catches up with the FGH. This shows that size is no longer determined by the rules of the FGH itself, but by the ordinal. Later entries therefore stop emphasizing the FGH and omit the notation \\(f_{{\\varepsilon}_{0}}(n),\\) writing \\({\\varepsilon}_{0}\\) directly.</p>
                                <p><a href="https://googology.fandom.com/wiki/%CE%95%E2%82%80">\\({\\varepsilon}_{0}\\)</a> is an important milestone in googology. Many different kinds of large-number constructions meet at this level, although it is less famous than Graham's number and \\(\\operatorname{TREE}(3)\\).</p>
                                <ol>
                                    <li>the <a href="https://googology.fandom.com/wiki/Goodstein_sequence">Goodstein sequence</a>;</li>
                                    <li><a href="https://googology.fandom.com/wiki/Fusible_number">fusible numbers</a> and <a href="https://www.zhihu.com/question/36464952/answer/2912411355">pseudo-fusible numbers</a>;</li>
                                    <li>the <a href="https://googology.fandom.com/wiki/Kirby-Paris_hydra">Kirby–Paris hydra</a>;</li>
                                    <li>the limit of <a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS</a>;</li>
                                    <li>the <a href="https://en.wikipedia.org/wiki/Ordinal_analysis">proof-theoretic ordinal of Peano arithmetic (PA)</a>; and</li>
                                    <li>the point where the <a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy (HH)</a> first catches up with the <a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">fast-growing hierarchy (FGH)</a>.</li>
                                </ol>
                                <p>The simplest code for constructing an \\({\\varepsilon}_{0}-level\\) large number is based on pseudo-fusible numbers.</p>
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
                            html: `<p>They can also be constructed from an ordinal notation through the FGH or HH. The following example uses PrSS.</p>`
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
                    title: 'BMS representation of \\({\\varepsilon}_{0}:\\) \\((0,0)(1,1)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>The <a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">Bashicu matrix system (BMS)</a> is a notation for representing ordinals. It can represent extremely large ordinals and has relatively simple rules, so it is widely used to express large ordinals.</p>
                                <p>Starting here, every ordinal entry gives a BMS representation.</p>
                            `
                        }
                    ]
                }
            },
            'item-059': {
                label: '\\({\\varphi}(1,0)\\)',
                detail: {
                    title: 'Veblen-function representation of \\({\\varepsilon}_{0}:\\) \\({\\varphi}(1,0)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>The <a href="https://googology.fandom.com/wiki/Veblen_function">Veblen function</a> is a notation for representing ordinals, written \\({\\varphi}.\\) It is commonly used for ordinals between \\({\\varepsilon}_{0}\\) and the LVO.</p>
                                <p>Starting here, every ordinal entry gives a Veblen-function representation until the limit of the Veblen function is reached.</p>
                                <p>However, the rules for \\({\\varphi}\\) become complicated after \\({\\Gamma}_{0}.\\) It is preferable to use an <a href="https://googology.fandom.com/wiki/Ordinal_collapsing_function">ordinal collapsing function (OCF)</a>, such as <a href="https://googology.fandom.com/wiki/Buchholz%27s_function">Buchholz's OCF (BOCF)</a>, or simply use <a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS</a>.</p>
                            `
                        }
                    ]
                }
            },
            'item-060': {
                label: 'Goodstein sequence',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Goodstein_sequence">Goodstein sequence</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>Follow the link for the full definition. The behavior of Goodstein sequences is exactly the same as that of the <a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy (HH)</a> on ordinals below \\({\\varepsilon}_{0},\\) namely towers of \\({\\omega}.\\)</p>
                                <p>More specifically, for \\(\\operatorname{Goodstein}(n)\\), first convert \\(n\\) into a base-\\(2\\) tower and then replace every \\(2\\) by \\({\\omega},\\) obtaining an ordinal \\({\\alpha}.\\) Then:</p>
                                <p>\\(\\operatorname{Goodstein}(n)=H_{{\\alpha}}(3)-3\\)</p>
                                <p>For example, \\(4=2^{2}\\) corresponds to \\({\\alpha}={\\omega}^{{\\omega}},\\) so:</p>
                                <ul>
                                    <li>\\(\\operatorname{Goodstein}(4)=H_{{\\omega}^{{\\omega}}}(3)-3\\)</li>
                                    <li>\\(=f_{{\\omega}}(3)-3\\)</li>
                                    <li>\\(=f_{3}(3)-3\\)</li>
                                    <li>\\(=f_{2}(f_{2}(f_{2}(3)))-3\\), where \\(f_{2}(n)=n\\cdot{}2^{n}\\)</li>
                                    <li>\\(=3\\cdot{}2^{402653211}-3\\)</li>
                                </ul>
                                <p>It follows directly that \\(\\operatorname{Goodstein}(2\\uparrow{}\\uparrow{}n)=H_{{\\varepsilon}_{0}[n]}(3)-3=f_{{\\varepsilon}_{0}[n-1]}(3)-3.\\)</p>
                                <p>Thus, the growth rate of Goodstein is almost identical to the \\({\\varepsilon}_{0}\\) level of the FGH; \\(2\\uparrow{}\\uparrow{}n\\) can be ignored.</p>
                                <p>The following Python implementation computes a Goodstein sequence through the Hardy hierarchy on ordinals.</p>
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
                label: 'Pseudo-fusible numbers',
                detail: {
                    title: '<a href="https://www.zhihu.com/question/36464952/answer/2912411355">Pseudo-fusible numbers</a>: the simplest known construction of an \\({\\varepsilon}_{0}-level\\) large number',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>They form a lower bound for <a href="https://googology.fandom.com/wiki/Fusible_number">fusible numbers</a> and are almost as large on the googological scale; both are at the \\({\\varepsilon}_{0}\\) level. The definition is given by the following code.</p>
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
                                <p>\\(\\frac{1}{f(4)}\\) is at the level of \\(10\\uparrow{}\\uparrow{}5.\\) According to @Hypcos's analysis, the exact value and source still need to be added.</p>
                                <p>@Hypcos conjectures that \\(\\frac{1}{f(5)}\\) may be at the level of the Ackermann function; the specific source still needs to be added.</p>
                                <p><a href="https://lmcs.episciences.org/9850/pdf">It has been proved that \\(f(n)>f_{{\\varepsilon}_{0}}(n-7)\\)</a>.</p>
                            `
                        }
                    ]
                }
            },
            'item-062': {
                label: 'PrSS',
                detail: {
                    title: 'Representational limit of <a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS (Primitive sequence system)</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>PrSS is an ordinal-notation system that represents ordinals below \\({\\varepsilon}_{0}\\) by finite sequences of natural numbers. Its rules are short and straightforward to implement.</p>
                                <h3>Basic rules</h3>
                                <ul>
                                    <li>An expression is a finite sequence of natural numbers beginning with \\(0\\), such as \\((0,1,2,3)\\) or \\((0,1,2,1,2,0)\\). The empty sequence represents the ordinal \\(0\\).</li>
                                    <li>If the final entry is \\(0\\), the expression denotes a successor ordinal; subtracting \\(1\\) removes that final \\(0\\). For example, \\((0,1,2,3,0)=(0,1,2,3)+1\\).</li>
                                    <li>If the final entry is nonzero, the expression denotes a limit ordinal. To perform the \\([n]\\) expansion, let the last entry be \\(k\\) and find the nearest earlier entry smaller than it; this entry can be proved to be \\(k-1\\). Remove the final entry, then repeat the segment from \\(k-1\\) through the new end until there are \\(n\\) copies in total.</li>
                                </ul>
                                <h3>Expansion examples</h3>
                                <ul>
                                    <li>\\((0,1,2,3,4)[3]=(0,1,2,3,3,3)\\)</li>
                                    <li>\\((0,1,2,3,2)[3]=(0,1,2,3,1,2,3,1,2,3)\\)</li>
                                    <li>\\((0,1,2,1,0,1,1)[5]=(0,1,2,1,0,1,0,1,0,1,0,1,0,1)\\)</li>
                                </ul>
                                <p>These successor and fundamental-sequence rules allow a PrSS expression to serve as an ordinal index for the FGH or HH.</p>
                                <h3>Representation examples</h3>
                                <ul>
                                    <li>\\(()=0\\)</li>
                                    <li>\\((0)=1\\)</li>
                                    <li>\\((0,0)=2\\)</li>
                                    <li>\\((0,1)={\\omega},\\) because \\((0,1)[n]\\) is a sequence of \\(n\\) zeroes and therefore represents the natural number \\(n\\)</li>
                                    <li>\\((0,1,0)={\\omega}+1\\)</li>
                                    <li>\\((0,1,0,0)={\\omega}+2\\)</li>
                                    <li>\\((0,1,0,1)={\\omega}\\cdot{}2,\\) because \\((0,1,0,1)[n]={\\omega}+n\\)</li>
                                    <li>\\((0,1,1)={\\omega}^{2},\\) because \\((0,1,1)[n]={\\omega}\\cdot{}n\\)</li>
                                    <li>\\((0,1,2)={\\omega}^{{\\omega}}\\)</li>
                                    <li>\\((0,1,2,3)={\\omega}^{{\\omega}^{{\\omega}}}\\)</li>
                                    <li>\\((0,1,2,3,\\ldots{},n)={\\varepsilon}_{0}[n]\\)</li>
                                </ul>
                                <p>One useful but informal intuition is to view a tower of \\({\\omega}\\) exponents as a tree, with each PrSS entry recording the depth of the corresponding node.</p>
                                <p>The following is a Python implementation of PrSS.</p>
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
                label: 'Hydra game',
                detail: {
                    title: '<a href="https://doi.org/10.1112/blms/14.4.285">Hydra game</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>A Kirby–Paris hydra is a finite rooted tree. A non-root leaf together with its incident edge is called a head. At stage \\(n\\geq1\\), Hercules removes any head. If the exposed node is the root, nothing grows back. Otherwise, let \\(v\\) be the node exposed by the cut and let \\(u\\) be its parent toward the root. Attach to \\(u\\) another \\(n\\) copies of the post-cut subtree rooted at \\(v\\).</p>
                                <p>Every battle eventually leaves only the root, independently of both the initial hydra and Hercules' choices. The proof assigns an ordinal below \\(\\varepsilon_0\\) to the tree. A leaf receives \\(0\\); if the children of a node carry ordinals \\(\\alpha_1\\geq\\cdots\\geq\\alpha_r\\), that node receives \\[\\omega^{\\alpha_1}+\\cdots+\\omega^{\\alpha_r}.\\]The ordinal of the hydra is the value at its root. A move may greatly enlarge the finite tree, but it strictly decreases this ordinal, so well-foundedness below \\(\\varepsilon_0\\) proves termination.</p>
                                <p>Each individual battle has a finite natural-number length depending on its initial tree and chopping strategy; \\(\\varepsilon_0\\) describes the level of the uniform termination theorem and its length function. Kirby and Paris proved that the arithmetical statement “every recursive strategy is winning” is not provable in Peano arithmetic (PA). For their particular recursive strategy \\(\\tau\\), uniform termination corresponds to \\(\\varepsilon_0\\)-induction for the associated predecessor operation.</p>
                                <p>The entries in <a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS</a> can be matched with node levels in a hydra, while the rule “make \\(n\\) copies at step \\(n\\)” closely resembles the recursion in the <a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy (HH)</a>. This also gives the site's intuitive reason for placing the battle-length function at the \\(\\varepsilon_0\\) level.</p>
                                <p><strong>Source:</strong> <a href="https://doi.org/10.1112/blms/14.4.285">Laurie Kirby and Jeff Paris, <cite>Accessible Independence Results for Peano Arithmetic</cite>, Theorem 2 and pp. 286–293</a> (<a href="https://www.cs.tau.ac.il/~nachumd/term/Kirbyparis.pdf">open PDF</a>).</p>
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
                            html: `<p>\\({\\zeta}_{0}\\) is the first fixed point of the epsilon-enumerating function \\(\\alpha\\mapsto\\varepsilon_{\\alpha}\\): it is the least positive ordinal satisfying \\(\\varepsilon_{{\\zeta}_{0}}={\\zeta}_{0}\\).</p><p>If \\(\\alpha_{0}=0\\) and \\(\\alpha_{n+1}=\\varepsilon_{\\alpha_n}\\), then \\({\\zeta}_{0}=\\sup_{n\\lt{}\\omega}\\alpha_n\\). Under the usual binary Veblen convention it can also be written \\(\\varphi_{2}(0)\\). This fixed-point hierarchy goes back to <a href="https://doi.org/10.1090/S0002-9947-1908-1500814-9">Veblen's continuous increasing ordinal functions</a>.</p>`
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
