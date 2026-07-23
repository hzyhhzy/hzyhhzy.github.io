(function (global) {
    'use strict';

    global.GoogologyI18n.registerMessages('en', {
        items: {
            'item-000': {
                label: '\\(1\\)',
                detail: {
                    title: '\\(1\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>The beginning of everything and the starting point of googology.</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `print(1)`
                        }
                    ]
                }
            },
            'item-001': {
                label: '\\(1000\\)',
                detail: {
                    title: '\\(1000\\)',
                    sections: []
                }
            },
            'item-002': {
                label: 'Earth population',
                detail: {
                    title: 'Earth currently has a population of about 8 billion',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Earth's current human population is approximately 8 billion.</p>`
                        }
                    ]
                }
            },
            'item-003': {
                label: '\\(10^{10}\\)',
                detail: {
                    title: '\\(10^{10}=10{,}000{,}000{,}000\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Ten billion.</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `print(10**10)`
                        }
                    ]
                }
            },
            'item-004': {
                    label: 'Large-model parameter count',
                detail: {
                    title: 'Parameter counts of mainstream large language models',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Mainstream large language models (LLMs) currently have between \\(10^{11}\\) and \\(10^{13}\\) parameters.</p>`
                        }
                    ]
                }
            },
            'item-005': {
                    label: 'Computer operations per second',
                detail: {
                    title: 'Mainstream consumer GPUs perform \\(10^{13}\\) to \\(10^{15}\\) operations per second',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Mainstream consumer GPUs currently perform about 10 to 1000 TFLOP/s.</p>`
                        }
                    ]
                }
            },
            'item-006': {
                label: 'Avogadro constant',
                detail: {
                    title: 'Avogadro constant \\(N_{A}\\approx 6.022\\times 10^{23}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This is approximately the number of atoms in one gram of hydrogen gas.</p>`
                        }
                    ]
                }
            },
            'item-007': {
                label: '\\(10^{30}\\)',
                detail: {
                    title: '\\(10^{30}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This number is called a nonillion in the short scale.</p><p>The total number of operations performed by all computers in the world is currently near this order of magnitude.</p>`
                        }
                    ]
                }
            },
            'item-008': {
                label: 'Atoms in the observable universe',
                detail: {
                    title: 'The observable universe contains roughly \\(10^{78}\\) to \\(10^{82}\\) atoms',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>The following is a rough estimate:</p><ul><li>One kilogram of hydrogen contains about \\(1000N_{A}\\approx 6\\times 10^{26}\\) atoms.</li><li>The Sun has a mass of about \\(2\\times 10^{30}\\) kilograms and contains about \\(10^{57}\\) atoms.</li><li>The Milky Way contains about \\(10^{11}\\) Suns, or about \\(10^{68}\\) atoms.</li><li>The observable universe contains about \\(10^{12}\\) Milky Ways.</li></ul><p>The total is therefore about \\(10^{80}\\) atoms.</p>`
                        }
                    ]
                }
            },
            'item-009': {
                label: '\\(10^{100}\\)',
                detail: {
                    title: '\\(\\mathrm{Googol}=10^{100}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>The word “googology” is derived from “googol.”</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `print(10**100)`
                        }
                    ]
                }
            },
            'item-010': {
                label: 'Legal Go positions',
                detail: {
                    title: 'A \\(19\\times 19\\) Go board has about \\(2.08\\times 10^{170}\\) legal positions',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>A Go board has 361 intersections. Treating each intersection as black, white, or empty gives \\(3^{361}\\) colorings, on the order of \\(10^{172}.\\) After illegal positions are excluded, the number of legal positions is approximately \\(2.08\\times 10^{170}.\\)</p><p>Reference: <a href="https://zhuanlan.zhihu.com/p/34532047">discussion of the number of Go positions</a>.</p>`
                        }
                    ]
                }
            },
            'item-011': {
                label: '\\(10^{10^{100}}\\)',
                detail: {
                    title: '\\(\\mathrm{Googolplex}=10^{10^{100}}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This number is called a googolplex: 10 raised to the power of a googol.</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `print(10**(10**100))`
                        }
                    ]
                }
            },
            'item-012': {
                label: 'Poincaré recurrence time of the universe',
                detail: {
                    title: 'Poincaré recurrence time of the universe',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>The Poincaré recurrence time of the universe is approximately \\(10^{10^{10^{50}}}\\) to \\(10^{10^{10^{150}}}.\\) At this scale, it makes almost no difference whether the unit is a Planck time or a year.</p>`
                        }
                    ]
                }
            },
            'item-013': {
                label: '\\(10\\uparrow{}\\uparrow{}10\\)',
                detail: {
                    title: '\\(10\\uparrow{}\\uparrow{}10=10^{10^{10^{10^{10^{10^{10^{10^{10^{10}}}}}}}}}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>From this point onward, the scale uses <a href="https://googology.fandom.com/wiki/Arrow_notation">Knuth's up-arrow notation</a>, the most commonly used notation for hyperoperations. One arrow, \\(\\uparrow{},\\) denotes exponentiation; two arrows, \\(\\uparrow{}\\uparrow{},\\) denote the fourth hyperoperation; three arrows, \\(\\uparrow{}\\uparrow{}\\uparrow{},\\) denote the fifth; and so on.</p><p>\\(10\\uparrow{}\\uparrow{}10\\) is a power tower of ten 10s. Applying “number of decimal digits” eight times produces \\(10{,}000{,}000{,}001\\).</p><p>From this point onward, the base—the number before the arrows—becomes irrelevant. The size depends only on the number after the arrows and on the arrow count. It is easy to prove that:</p>\\[\\begin{aligned}1{,}000{,}000{,}000\\uparrow{}\\uparrow{}n&\\lt 10\\uparrow{}\\uparrow{}(n+1)\\\\&\\lt 3\\uparrow{}\\uparrow{}(n+2)\\\\&\\lt 2\\uparrow{}\\uparrow{}(n+4)\\end{aligned}\\]`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `result = 10
for _ in range(9):
    result = 10 ** result
print(result)`
                        }
                    ]
                }
            },
            'item-014': {
                label: '\\(3\\uparrow{}\\uparrow{}\\uparrow{}3\\)',
                detail: {
                    title: '\\(3\\uparrow{}\\uparrow{}\\uparrow{}3=3\\uparrow{}\\uparrow{}(3\\uparrow{}\\uparrow{}3)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[\\begin{aligned}3\\uparrow{}\\uparrow{}\\uparrow{}3&=3\\uparrow{}\\uparrow{}(3\\uparrow{}\\uparrow{}3)\\\\&=3\\uparrow{}\\uparrow{}(3^{3^{3}})\\\\&=3\\uparrow{}\\uparrow{}(3^{27})\\\\&=3\\uparrow{}\\uparrow{}7{,}625{,}597{,}484{,}987\\\\&>10\\uparrow{}\\uparrow{}7{,}625{,}597{,}484{,}986\\end{aligned}\\]`
                        }
                    ]
                }
            },
            'item-015': {
                label: '\\(10\\uparrow{}\\uparrow{}\\uparrow{}10\\)',
                detail: {
                    title: '\\(10\\uparrow{}\\uparrow{}\\uparrow{}10\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(10\\uparrow{}\\uparrow{}\\uparrow{}10=10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}10)))))))))\\)</p><p>Applying “number of decimal digits” to \\(10\\uparrow{}\\uparrow{}\\uparrow{}10\\) a total of \\(10\\uparrow{}\\uparrow{}\\uparrow{}9-1\\) times gives 11. Applying it to \\(10\\uparrow{}\\uparrow{}\\uparrow{}9\\) a total of \\(10\\uparrow{}\\uparrow{}\\uparrow{}8-1\\) times also gives 11; applying it to \\(10\\uparrow{}\\uparrow{}\\uparrow{}8\\) a total of \\(10\\uparrow{}\\uparrow{}\\uparrow{}7-1\\) times again gives 11; and so on.</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `TODO`
                        }
                    ]
                }
            },
            'item-016': {
                label: 'Graham sequence \\(G_{1}\\)',
                detail: {
                    title: 'The first term of the <a href="https://googology.fandom.com/wiki/Graham\'s_number">Graham sequence</a>: \\(G_{1}=3\\uparrow{}\\uparrow{}\\uparrow{}\\uparrow{}3\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>By the recursive definition of up-arrows:</p><p>\\(3\\uparrow{}\\uparrow{}\\uparrow{}\\uparrow{}3=3\\uparrow{}\\uparrow{}\\uparrow{}(3\\uparrow{}\\uparrow{}\\uparrow{}3).\\)</p>`
                        }
                    ]
                }
            },
            'item-017': {
                label: 'FGH: \\(f_{{\\omega}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">Fast-growing hierarchy (FGH)</a>: \\(f_{{\\omega}}(n)=f_{n}(n)\\approx n\\uparrow{}(\\times{}n)n\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>From this point onward, the scale consistently uses the fast-growing hierarchy (FGH) to represent large numbers.</p><h3>The three defining rules of the FGH</h3><ul><li><strong>Starting point:</strong> \\(f_{0}(n)=n+1\\).</li><li><strong>Successor ordinal:</strong> \\(f_{{\\alpha}+1}(n)=f_{{\\alpha}}^{n}(n),\\) meaning that \\(f_{{\\alpha}}\\) is nested \\(n\\) times.</li><li><strong>Limit ordinal:</strong> \\(f_{{\\alpha}}(n)=f_{{\\alpha}[n]}(n),\\) where \\({\\alpha}[n]\\) is the nth term of the fundamental sequence for the limit ordinal \\({\\alpha}.\\)</li></ul><h3>Direct consequences</h3><ul><li>\\(f_{1}(n)=2n\\);</li><li>\\(f_{2}(n)=n\\cdot 2^{n}\\);</li><li>\\(f_{3}(n)\\) is on the same level as \\(n\\uparrow{}\\uparrow{}n\\);</li><li>\\(f_{4}(n)\\) is on the same level as \\(n\\uparrow{}\\uparrow{}\\uparrow{}n\\);</li><li>\\(\\ldots{}\\)</li></ul><h3>Introducing \\({\\omega}\\)</h3><p>Let \\({\\omega}[n]=n\\). Then \\(f_{{\\omega}}(n)=f_{n}(n).\\)</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def f(n,a):
    if a == 0:
        return n + 1
    else:
        x = n
        for i in range(n):
            x = f(x,a - 1)
        return x
n = 10
print(f(n, n))`
                        }
                    ]
                }
            },
            'item-018': {
                label: 'HH: \\(H_{{\\omega}^{{\\omega}}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy (HH)</a>: \\(H_{{\\omega}^{{\\omega}}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Reading the FGH entry first is recommended. The Hardy hierarchy (HH) likewise converts ordinals into large numbers. At successor ordinals it discards the nesting rule and replaces it with a simple “\\(+1\\).” The behavior of large-number constructions such as Goodstein sequences, \\(\\operatorname{TREE}\\), and \\(\\operatorname{SCG}\\) resembles HH at some ordinal, so HH provides a tool for analyzing them.</p><h3>The three defining rules of HH</h3><ul><li><strong>Starting point:</strong> \\(H_{0}(n)=n\\).</li><li><strong>Successor ordinal:</strong> \\(H_{{\\alpha}+1}(n)=H_{{\\alpha}}(n)+1\\).</li><li><strong>Limit ordinal:</strong> \\(H_{{\\alpha}}(n)=H_{{\\alpha}[n]}(n),\\) where \\({\\alpha}[n]\\) is the nth term of the fundamental sequence for the limit ordinal \\({\\alpha}.\\)</li></ul><p>At first HH is much smaller than FGH, but after reaching \\({\\varepsilon}_{0},\\) HH grows at a rate comparable to FGH. The following is a rough proof.</p><h3>Theorem: \\(H_{{\\omega}^{{\\alpha}}}(n)=f_{{\\alpha}}(n)\\)</h3><p>This is strict equality, not an approximation.</p><ul><li>It is easy to prove that \\(H_{{\\alpha}+{\\beta}}(n)=H_{{\\alpha}}(H_{{\\beta}}(n)).\\)</li><li>Therefore:\\[\\begin{aligned}H_{{\\omega}^{{\\alpha}+1}}(n)&=H_{{\\omega}^{{\\alpha}}\\cdot{}{\\omega}}(n)\\\\&=H_{{\\omega}^{{\\alpha}}\\cdot{}n}(n)\\\\&=H_{{\\omega}^{{\\alpha}}}(H_{{\\omega}^{{\\alpha}}}(\\ldots{}H_{{\\omega}^{{\\alpha}}}(n)\\ldots{}))&& (n\\text{ levels})\\\\&=f_{{\\alpha}}(f_{{\\alpha}}(\\ldots{}f_{{\\alpha}}(n)\\ldots{}))&& (n\\text{ levels})\\\\&=f_{{\\alpha}+1}(n).\\end{aligned}\\]</li><li>Induction gives \\(H_{{\\omega}^{{\\alpha}}}(n)=f_{{\\alpha}}(n)\\); the remaining proof details are omitted.</li></ul><p>The following program represents ordinals below \\({\\omega}^{{\\omega}}\\) with a one-dimensional array and evaluates \\(H_{{\\omega}^{{\\omega}}}(n).\\)</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `n = 10
a = [n] # a represents the ordinal = ω^a[0] + ω^a[1] + ... + ω^a[-1].
while(len(a) > 0): # Hardy hierarchy on ordinals.
    if a[-1] == 0: # a is a successor ordinal
        a.pop() # subtract 1
        n += 1
    else: # a is a limit ordinal
        v = a[-1]
        a.pop()
        a.extend([v-1,] * n)
print(n)`
                        }
                    ]
                }
            },
            'item-019': {
                label: 'Ackermann function',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Ackermann_function">Ackermann function</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>The Ackermann function is one of the earliest discovered functions that is not primitive recursive. It grows extremely quickly.</p><p>It is defined by:</p>\\[\\begin{aligned}A(0,n)&=n+1,\\\\A(m,0)&=A(m-1,1),\\\\A(m,n)&=A(m-1,A(m,n-1)).\\end{aligned}\\]<p>The diagonal \\(A(n,n)\\) grows at approximately the same rate as \\(f_{{\\omega}}(n)\\) in the FGH.</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def A(m, n): # Ackermann function
    if m == 0:
        return n + 1
    elif n == 0:
        return A(m - 1, 1)
    else:
        return A(m - 1, A(m, n - 1))
n = 10
print(A(10, 10))`
                        }
                    ]
                }
            },
            'item-020': {
                label: 'Knuth up-arrow notation',
                detail: {
                    title: 'The limit of <a href="https://googology.fandom.com/wiki/Arrow_notation">Knuth\'s up-arrow notation</a>: \\(n\\uparrow{}\\uparrow{}\\ldots{}\\uparrow{}\\uparrow{}n\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This is the most commonly used notation for hyperoperations. Donald Knuth introduced it in 1976. One arrow, \\(\\uparrow{},\\) denotes exponentiation; two arrows, \\(\\uparrow{}\\uparrow{},\\) denote the fourth hyperoperation; three arrows, \\(\\uparrow{}\\uparrow{}\\uparrow{},\\) denote the fifth; and so on.</p><p>Writing \\(\\uparrow{}^{k}\\) for \\(k\\) arrows, the definition is:</p><ul><li>\\(a\\uparrow{}b=a^{b}\\);</li><li>\\(a\\uparrow{}^{n}1=a\\);</li><li>\\(a\\uparrow{}^{n+1}b=a\\uparrow{}^{n}(a\\uparrow{}^{n+1}(b-1))\\).</li></ul>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def arr(a,b,k): # knuth_arrow, a ^(k) b
    if k == 1:
        return a**b
    else:
        if b == 1:
            return a
        else:
            return arr(a,arr(a,b-1,k),k-1)

n = 100
print(n,n,n)`
                        }
                    ]
                }
            },
            'item-021': {
                label: '\\(f_{{\\omega}}(f_{{\\omega}}(n))\\)',
                detail: {
                    title: '\\(f_{{\\omega}}(f_{{\\omega}}(n))\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This is the second iterate of \\(f_{{\\omega}}.\\) Since \\(f_{{\\omega}}(n)=f_{n}(n),\\) it can be written as:</p>\\[\\begin{aligned}f_{{\\omega}}(f_{{\\omega}}(n))&=f_{{\\omega}}(f_{n}(n))\\\\&=f_{f_{n}(n)}(f_{n}(n)).\\end{aligned}\\]`
                        }
                    ]
                }
            },
            'item-022': {
                label: '\\(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(n)))\\)',
                detail: {
                    title: '\\(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(n)))\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This is the third iterate of \\(f_{{\\omega}}.\\)</p>`
                        }
                    ]
                }
            },
            'item-023': {
                label: 'Graham sequence \\(G_{2}\\)',
                detail: {
                    title: 'The second term of the <a href="https://googology.fandom.com/wiki/Graham\'s_number">Graham sequence</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(G_{2}=3\\uparrow{}^{G_{1}}3,\\) meaning that \\(G_{1}\\) arrows are placed between the two 3s.</p>`
                        }
                    ]
                }
            },
            'item-024': {
                label: 'Graham sequence \\(G_{3}\\)',
                detail: {
                    title: 'The third term of the <a href="https://googology.fandom.com/wiki/Graham\'s_number">Graham sequence</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(G_{3}=3\\uparrow{}^{G_{2}}3,\\) meaning that \\(G_{2}\\) arrows are placed between the two 3s.</p>`
                        }
                    ]
                }
            },
            'item-025': {
                label: '\\(f_{{\\omega}+1}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}+1}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+1}(10)=f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(10)))))))))).\\]`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def f(n,a): # f_a(n)
    if a == 0:
        return n + 1
    else:
        x = n
        for i in range(n):
            x = f(x,a - 1)
        return x

def f_w(n): # f_w(n) = f_n(n)
    return f(n,n)

n = 64
x = n
for i in range(n):
    x = f_w(x)
print(x) # x = f_(w+1)(64), slightly larger than Graham's number`
                        }
                    ]
                }
            },
            'item-026': {
                label: 'Graham\'s number',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Graham\'s_number">Graham\'s number</a> \\((G_{64})\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Define:</p>\\[\\begin{aligned}G_{1}&=3\\uparrow{}\\uparrow{}\\uparrow{}\\uparrow{}3,\\\\G_{2}&=3\\uparrow{}^{G_{1}}3,\\\\G_{3}&=3\\uparrow{}^{G_{2}}3,\\\\&\\ldots{}\\\\G_{64}&=3\\uparrow{}^{G_{63}}3.\\end{aligned}\\]<p>\\(G_{64}\\) is Graham's number.</p>`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def arr(a,b,k): # knuth_arrow, a ^(k) b
    if k == 1:
        return a**b
    else:
        if b == 1:
            return a
        else:
            return arr(a,arr(a,b-1,k),k-1)

G = 4
for i in range(64):
    G = arr(3,3,G)
print(G)`
                        }
                    ]
                }
            },
            'item-027': {
                label: '\\(f_{{\\omega}+1}(f_{{\\omega}+1}(n))\\)',
                detail: {
                    title: '\\(f_{{\\omega}+1}(f_{{\\omega}+1}(n))\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>This is the second iterate of \\(f_{{\\omega}+1}.\\)</p>`
                        }
                    ]
                }
            },
            'item-028': {
                label: '\\(G(G(n))\\)',
                detail: {
                    title: '\\(G(G(n))\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Nest the Graham-number function \\(G(n)\\) twice to obtain \\(GGn\\), or \\(G(G(n))\\).</p>`
                        }
                    ]
                }
            },
            'item-029': {
                label: '\\(f_{{\\omega}+2}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}+2}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+2}(10)=f_{{\\omega}+1}(f_{{\\omega}+1}(\\ldots{}f_{{\\omega}+1}(10)\\ldots{})).\\]`
                        }
                    ]
                }
            },
            'item-030': {
                label: 'Finite iteration of \\(G\\)',
                detail: {
                    title: 'Finite iteration of the generating function \\(G\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(GGGG\\ldots{}GGGn\\) (\\(n\\) copies of \\(G\\)).</p><p>At first glance, nesting \\(G\\) may seem to make the result extraordinarily large. In the FGH, however, it only adds 1 to the index and is equivalent to \\(f_{{\\omega}+2}(n).\\)</p>`
                        }
                    ]
                }
            },
            'item-031': {
                label: '\\(f_{{\\omega}+3}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}+3}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+3}(10)=f_{{\\omega}+2}(f_{{\\omega}+2}(\\ldots{}f_{{\\omega}+2}(10)\\ldots{})).\\]`
                        }
                    ]
                }
            },
            'item-032': {
                label: '\\(f_{{\\omega}+4}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}+4}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+4}(10)=f_{{\\omega}+3}(f_{{\\omega}+3}(\\ldots{}f_{{\\omega}+3}(10)\\ldots{})).\\]`
                        }
                    ]
                }
            },
            'item-033': {
                label: '\\(f_{{\\omega}\\cdot{}2}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}\\cdot{}2}(n)=f_{{\\omega}+n}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>When taking \\([n]\\) of \\({\\omega}\\cdot{}2\\), first write \\({\\omega}\\cdot{}2\\) as \\({\\omega}+{\\omega},\\) then take \\([n]\\) of the final \\({\\omega}:\\)</p><p>\\(({\\omega}\\cdot{}2)[n]=({\\omega}+{\\omega})[n]={\\omega}+n,\\)<br>not \\(({\\omega}\\cdot{}2)[n]=2n\\).</p><p>Therefore:</p>\\[\\begin{aligned}f_{{\\omega}\\cdot{}2}(10)&=f_{{\\omega}+10}(10)\\\\&=f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(10)))))))))).\\end{aligned}\\]`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def f1(n,a): # f_a(n)
    if a == 0:
        return n + 1
    else:
        x = n
        for i in range(n):
            x = f1(x,a - 1)
        return x
def f2(n,a): # f_(w+a)(n)
    if a == 0:
        return f1(n,n)
    else:
        x = n
        for i in range(n):
            x = f2(x,a - 1)
        return x
n = 10
print(f2(n,n))`
                        }
                    ]
                }
            },
            'item-034': {
                label: '\\(f_{{\\omega}\\cdot{}2+1}(n)\\)'
            },
            'item-035': {
                label: '\\(f_{{\\omega}\\cdot{}2+2}(n)\\)'
            },
            'item-036': {
                label: '\\(f_{{\\omega}\\cdot{}3}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}\\cdot{}3}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(({\\omega}\\cdot{}3)[n]=({\\omega}\\cdot{}2+{\\omega})[n]={\\omega}\\cdot{}2+n\\).</p><p>Therefore:</p>\\[\\begin{aligned}f_{{\\omega}\\cdot{}3}(10)&=f_{{\\omega}\\cdot{}2+{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}2+10}(10).\\end{aligned}\\]`
                        }
                    ]
                }
            },
            'item-037': {
                label: '“\\(\\operatorname{TERR}[3]\\)”',
                detail: {
                    title: '“\\(\\operatorname{TERR}[3]\\)” is not \\(\\operatorname{TREE}(3)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>This entry is a meme: “\\(\\operatorname{TERR}[3]\\)” is not a mathematical function, but a name derived from a misspelling.</strong></p><p>It comes from the Bilibili video <a href="https://www.bilibili.com/video/BV1X94y1n7D1/">BV1X94y1n7D1, “How much larger is \\(\\operatorname{TERR}[3]\\) than Graham's number?”</a>, posted by the creator “超级大钢球” on November 19, 2023. The video was intended to discuss \\(\\operatorname{TREE}(3)\\), but its analysis is unrelated to \\(\\operatorname{TREE}(3)\\), and it also misspells \\(\\operatorname{TREE}\\) as \\(\\operatorname{TERR}\\).</p><p>After an extended series of groundless constructions, the video ultimately produces a number at the \\(f_{{\\omega}\\cdot{}3}(187196)\\) level.</p><p>The number 187196 comes from \\(n(4)>A^{A(187196)}(1),\\) where \\(n\\) is the <a href="https://googology.fandom.com/wiki/Block_subsequence_theorem">Friedman \\(n\\) function</a>, \\(A\\) is the Ackermann function, and the superscript denotes function iteration.</p><p>Some content farms confuse this lower bound for \\(n(4)\\) with \\(\\operatorname{TREE}(3)\\) and frequently write the notation incorrectly. This has produced many purported lower bounds for \\(\\operatorname{TREE}(3)\\) containing “187196”; “\\(\\operatorname{TERR}[3]\\)” is one of the best-known examples.</p><p>The actual \\(\\operatorname{TREE}(3)\\) is slightly above the <a href="https://googology.fandom.com/wiki/Small_Veblen_ordinal">SVO</a> level. For analysis by @HypCos, see:</p><ul><li><a href="https://googology.fandom.com/wiki/User_blog:Hyp_cos/tree_function_and_TREE(3)">tree_function_and_\\(\\operatorname{TREE}(3)\\)</a>;</li><li><a href="https://www.zhihu.com/question/667616017/answer/13389602444">Expressing Graham's number, \\(\\operatorname{TREE}(3)\\), and \\(\\operatorname{SCG}(13)\\) with BMS</a>;</li><li><a href="https://www.zhihu.com/question/353941713/answer/885942447">Understanding the size of Graham's number and \\(\\operatorname{TREE}(3)\\) mathematically</a>.</li></ul>`
                        }
                    ]
                }
            },
            'item-038': {
                label: '\\(f_{{\\omega}\\cdot{}4}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}\\cdot{}4}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(({\\omega}\\cdot{}4)[n]=({\\omega}\\cdot{}3+{\\omega})[n]={\\omega}\\cdot{}3+n\\).</p><p>Therefore:</p>\\[\\begin{aligned}f_{{\\omega}\\cdot{}4}(10)&=f_{{\\omega}\\cdot{}3+{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}3+10}(10).\\end{aligned}\\]`
                        }
                    ]
                }
            },
            'item-039': {
                label: '\\(f_{{\\omega}\\cdot{}5}(n)\\)'
            },
            'item-040': {
                label: '\\(f_{{\\omega}^{2}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>: \\(f_{{\\omega}^{2}}(n)=f_{{\\omega}\\cdot{}n}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[\\begin{aligned}f_{{\\omega}^{2}}(10)&=f_{{\\omega}\\cdot{}{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}10}(10)\\\\&=f_{{\\omega}\\cdot{}9+{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}9+10}(10)\\\\&=f_{{\\omega}\\cdot{}9+9}(f_{{\\omega}\\cdot{}9+9}(\\ldots{}f_{{\\omega}\\cdot{}9+9}(10)\\ldots{})).\\end{aligned}\\]`
                        },
                        {
                            type: 'code',
                            language: 'python',
                            source: `def f(n,a,b): # f_(w*a+b)(n)
    if b == 0:
        if a == 0:
            return n + 1
        else:
            return f(n,a-1,n)
    else:
        x = n
        for i in range(n):
            x = f(x,a,b-1)
        return x
n = 10
print(f(n, n, 0))`
                        }
                    ]
                }
            }
        }
    });
}(window));
