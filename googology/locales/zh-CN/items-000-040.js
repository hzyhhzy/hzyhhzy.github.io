(function (global) {
    'use strict';

    global.GoogologyI18n.registerMessages('zh-CN', {
        items: {
            'item-000': {
                label: '\\(1\\)',
                detail: {
                    title: '\\(1\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>万物之始，也是 Googology 的起点。</p>`
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
                label: '地球人口',
                detail: {
                    title: '目前地球人口约为 80 亿',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>目前地球的人口数量约为 80 亿。</p>`
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
                            html: `<p>一百亿，即 10 billion。</p>`
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
                    label: '大模型参数量',
                detail: {
                    title: '主流大语言模型的参数量',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>目前主流大语言模型（LLM）的参数量为 \\(10^{11}\\)～\\(10^{13}\\)。</p>`
                        }
                    ]
                }
            },
            'item-005': {
                    label: '电脑每秒运算次数',
                detail: {
                    title: '主流家用显卡每秒运算 \\(10^{13}\\)～\\(10^{15}\\) 次',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>目前主流家用电脑显卡的运算速度约为 10～1000 TFLOP/s。</p>`
                        }
                    ]
                }
            },
            'item-006': {
                label: '阿伏伽德罗常数',
                detail: {
                    title: '阿伏伽德罗常数 \\(N_{A}\\approx 6.022\\times 10^{23}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>这个数大约等于 1 克氢气所含的原子数。</p>`
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
                            html: `<p>中文读作“一百万亿亿亿”。</p><p>目前全世界所有计算机的总运算次数就在这一数量级附近。</p>`
                        }
                    ]
                }
            },
            'item-008': {
                label: '可观测宇宙中的原子数',
                detail: {
                    title: '可观测宇宙中的原子数约为 \\(10^{78}\\)～\\(10^{82}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>以下是一种粗略估算：</p><ul><li>1 千克氢约含 \\(1000N_{A}\\approx 6\\times 10^{26}\\) 个原子；</li><li>太阳质量约为 \\(2\\times 10^{30}\\) 千克，约含 \\(10^{57}\\) 个原子；</li><li>银河系约有 \\(10^{11}\\) 个太阳，约含 \\(10^{68}\\) 个原子；</li><li>整个可观测宇宙约有 \\(10^{12}\\) 个银河系。</li></ul><p>总计约为 \\(10^{80}\\) 个原子。</p>`
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
                            html: `<p>“Googology”一词由“googol”衍生而来。</p>`
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
                label: '围棋合法局面数',
                detail: {
                    title: '\\(19\\times 19\\) 围棋的合法局面数约为 \\(2.08\\times 10^{170}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>棋盘有 361 个交叉点，每个点可粗略分为黑、白、空三种状态，因此所有着色情形共有 \\(3^{361}\\)，约为 \\(10^{172}\\)。排除不合法局面后，合法局面数约为 \\(2.08\\times 10^{170}\\)。</p><p>参考：<a href="https://zhuanlan.zhihu.com/p/34532047">围棋状态数说明</a>。</p>`
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
                            html: `<p>这个数称为 googolplex，即 10 的 googol 次方。</p>`
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
                label: '宇宙的庞加莱回归时间',
                detail: {
                    title: '宇宙的庞加莱回归时间',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>宇宙的庞加莱回归时间约为 \\(10^{10^{10^{50}}}\\)～\\(10^{10^{10^{150}}}\\)。在这个量级上，单位使用普朗克时间还是年几乎没有差别。</p>`
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
                            html: `<p>这里开始使用<a href="https://googology.fandom.com/wiki/Arrow_notation">高德纳上箭头记号（Knuth's up-arrow notation）</a>。这是最常用的超运算符号：\\(\\uparrow{}\\) 表示指数，\\(\\uparrow{}\\uparrow{}\\) 表示四级运算，\\(\\uparrow{}\\uparrow{}\\uparrow{}\\) 表示五级运算，依此类推。</p><p>\\(10\\uparrow{}\\uparrow{}10\\) 是由 10 构成、高度为 10 的幂塔。对它连续取八次“十进制位数”，结果为 \\(10{,}000{,}000{,}001\\)。</p><p>从这里开始，底数（箭头前的数字）变得毫无意义；数的大小只取决于箭头后的数字以及箭头的个数。容易证明：</p>\\[\\begin{aligned}1{,}000{,}000{,}000\\uparrow{}\\uparrow{}n&\\lt 10\\uparrow{}\\uparrow{}(n+1)\\\\&\\lt 3\\uparrow{}\\uparrow{}(n+2)\\\\&\\lt 2\\uparrow{}\\uparrow{}(n+4)\\end{aligned}\\]`
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
                            html: `<p>\\(10\\uparrow{}\\uparrow{}\\uparrow{}10=10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}(10\\uparrow{}\\uparrow{}10)))))))))\\)。</p><p>对 \\(10\\uparrow{}\\uparrow{}\\uparrow{}10\\) 连续取 \\(10\\uparrow{}\\uparrow{}\\uparrow{}9-1\\) 次“十进制位数”，结果是 11；对 \\(10\\uparrow{}\\uparrow{}\\uparrow{}9\\) 连续取 \\(10\\uparrow{}\\uparrow{}\\uparrow{}8-1\\) 次，结果也是 11；对 \\(10\\uparrow{}\\uparrow{}\\uparrow{}8\\) 连续取 \\(10\\uparrow{}\\uparrow{}\\uparrow{}7-1\\) 次，结果仍是 11；依此类推。</p>`
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
                label: '葛立恒数 \\(G_{1}\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Graham\'s_number">葛立恒数</a>序列的第一项：\\(G_{1}=3\\uparrow{}\\uparrow{}\\uparrow{}\\uparrow{}3\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>根据上箭头的递归定义：</p><p>\\(3\\uparrow{}\\uparrow{}\\uparrow{}\\uparrow{}3=3\\uparrow{}\\uparrow{}\\uparrow{}(3\\uparrow{}\\uparrow{}\\uparrow{}3)\\)。</p>`
                        }
                    ]
                }
            },
            'item-017': {
                label: 'FGH：\\(f_{{\\omega}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">快速增长层级（FGH）</a>：\\(f_{{\\omega}}(n)=f_{n}(n)\\approx n\\uparrow{}(\\times{}n)n\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>从这里开始，统一使用快速增长层级（fast-growing hierarchy，FGH）表示大数。</p><h3>FGH 的三条定义规则</h3><ul><li><strong>起点：</strong>\\(f_{0}(n)=n+1\\)。</li><li><strong>后继序数：</strong>\\(f_{{\\alpha}+1}(n)=f_{{\\alpha}}^{n}(n)\\)，即把 \\(f_{{\\alpha}}\\) 嵌套 \\(n\\) 层。</li><li><strong>极限序数：</strong>\\(f_{{\\alpha}}(n)=f_{{\\alpha}[n]}(n)\\)，其中 \\({\\alpha}[n]\\) 是极限序数 \\({\\alpha}\\) 的基本列第 \\(n\\) 项。</li></ul><h3>由此可直接推出</h3><ul><li>\\(f_{1}(n)=2n\\)；</li><li>\\(f_{2}(n)=n\\cdot 2^{n}\\)；</li><li>\\(f_{3}(n)\\) 与 \\(n\\uparrow{}\\uparrow{}n\\) 同级；</li><li>\\(f_{4}(n)\\) 与 \\(n\\uparrow{}\\uparrow{}\\uparrow{}n\\) 同级；</li><li>\\(\\ldots{}\\)</li></ul><h3>引入 \\({\\omega}\\)</h3><p>令 \\({\\omega}[n]=n\\)，则 \\(f_{{\\omega}}(n)=f_{n}(n)\\)。</p>`
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
                label: 'HH：\\(H_{{\\omega}^{{\\omega}}}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy 层级（HH）</a>：\\(H_{{\\omega}^{{\\omega}}}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>建议先阅读 FGH 条目。Hardy 层级（HH）同样把序数转换为大数；对于后继序数，它舍弃嵌套规则，改用简单的“\\(+1\\)”。Goodstein 序列、\\(\\operatorname{TREE}\\) 函数和 \\(\\operatorname{SCG}\\) 函数等大数的行为都类似某个序数上的 HH，因此 HH 为分析这些大数提供了工具。</p><h3>HH 的三条定义规则</h3><ul><li><strong>起点：</strong>\\(H_{0}(n)=n\\)。</li><li><strong>后继序数：</strong>\\(H_{{\\alpha}+1}(n)=H_{{\\alpha}}(n)+1\\)。</li><li><strong>极限序数：</strong>\\(H_{{\\alpha}}(n)=H_{{\\alpha}[n]}(n)\\)，其中 \\({\\alpha}[n]\\) 是极限序数 \\({\\alpha}\\) 的基本列第 \\(n\\) 项。</li></ul><p>在初期，HH 远小于 FGH；但到达 \\({\\varepsilon}_{0}\\) 后，HH 的增长速度便与 FGH 相当。下面给出粗略证明。</p><h3>定理：\\(H_{{\\omega}^{{\\alpha}}}(n)=f_{{\\alpha}}(n)\\)</h3><p>这里是严格相等，而不是约等于。</p><ul><li>容易证明 \\(H_{{\\alpha}+{\\beta}}(n)=H_{{\\alpha}}(H_{{\\beta}}(n))\\)。</li><li>因此：\\[\\begin{aligned}H_{{\\omega}^{{\\alpha}+1}}(n)&=H_{{\\omega}^{{\\alpha}}\\cdot{}{\\omega}}(n)\\\\&=H_{{\\omega}^{{\\alpha}}\\cdot{}n}(n)\\\\&=H_{{\\omega}^{{\\alpha}}}(H_{{\\omega}^{{\\alpha}}}(\\ldots{}H_{{\\omega}^{{\\alpha}}}(n)\\ldots{}))&& (\\text{嵌套 }n\\text{ 层})\\\\&=f_{{\\alpha}}(f_{{\\alpha}}(\\ldots{}f_{{\\alpha}}(n)\\ldots{}))&& (\\text{嵌套 }n\\text{ 层})\\\\&=f_{{\\alpha}+1}(n)\\end{aligned}\\]。</li><li>归纳可得 \\(H_{{\\omega}^{{\\alpha}}}(n)=f_{{\\alpha}}(n)\\)，具体证明细节从略。</li></ul><p>以下程序用一维数组表示小于 \\({\\omega}^{{\\omega}}\\) 的序数，并计算 \\(H_{{\\omega}^{{\\omega}}}(n)\\)。</p>`
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
                label: 'Ackermann 函数',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Ackermann_function">Ackermann 函数</a>',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Ackermann 函数是最早被发现的非原始递归函数之一，增长速度非常快。</p><p>定义如下：</p>\\[\\begin{aligned}A(0,n)&=n+1,\\\\A(m,0)&=A(m-1,1),\\\\A(m,n)&=A(m-1,A(m,n-1)).\\end{aligned}\\]<p>Ackermann 函数的对角线 \\(A(n,n)\\) 的增长速度大约相当于 FGH 中的 \\(f_{{\\omega}}(n)\\)。</p>`
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
                label: '高德纳上箭头记号',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Arrow_notation">高德纳上箭头记号（Knuth\'s up-arrow notation）</a>的极限：\\(n\\uparrow{}\\uparrow{}\\ldots{}\\uparrow{}\\uparrow{}n\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>这是最常用的超运算符号，由 Donald Knuth 于 1976 年提出。\\(\\uparrow{}\\) 表示指数，\\(\\uparrow{}\\uparrow{}\\) 表示四级运算，\\(\\uparrow{}\\uparrow{}\\uparrow{}\\) 表示五级运算，依此类推。</p><p>用 \\(\\uparrow{}^{k}\\) 表示 \\(k\\) 个箭头，定义如下：</p><ul><li>\\(a\\uparrow{}b=a^{b}\\)；</li><li>\\(a\\uparrow{}^{n}1=a\\)；</li><li>\\(a\\uparrow{}^{n+1}b=a\\uparrow{}^{n}(a\\uparrow{}^{n+1}(b-1))\\)。</li></ul>`
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
                            html: `<p>这是 \\(f_{{\\omega}}\\) 的二重迭代。由于 \\(f_{{\\omega}}(n)=f_{n}(n)\\)，可写成：</p>\\[\\begin{aligned}f_{{\\omega}}(f_{{\\omega}}(n))&=f_{{\\omega}}(f_{n}(n))\\\\&=f_{f_{n}(n)}(f_{n}(n))\\end{aligned}\\]。`
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
                            html: `<p>这是 \\(f_{{\\omega}}\\) 的三重迭代。</p>`
                        }
                    ]
                }
            },
            'item-023': {
                label: '葛立恒数 \\(G_{2}\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Graham\'s_number">葛立恒数</a>序列的第二项',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(G_{2}=3\\uparrow{}^{G_{1}}3\\)，即在两个 3 之间使用 \\(G_{1}\\) 个箭头。</p>`
                        }
                    ]
                }
            },
            'item-024': {
                label: '葛立恒数 \\(G_{3}\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Graham\'s_number">葛立恒数</a>序列的第三项',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(G_{3}=3\\uparrow{}^{G_{2}}3\\)，即在两个 3 之间使用 \\(G_{2}\\) 个箭头。</p>`
                        }
                    ]
                }
            },
            'item-025': {
                label: '\\(f_{{\\omega}+1}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}+1}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+1}(10)=f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(f_{{\\omega}}(10))))))))))\\]。`
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
                label: '葛立恒数',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Graham\'s_number">葛立恒数</a>（\\(G_{64}\\)）',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>定义：</p>\\[\\begin{aligned}G_{1}&=3\\uparrow{}\\uparrow{}\\uparrow{}\\uparrow{}3,\\\\G_{2}&=3\\uparrow{}^{G_{1}}3,\\\\G_{3}&=3\\uparrow{}^{G_{2}}3,\\\\&\\ldots{}\\\\G_{64}&=3\\uparrow{}^{G_{63}}3\\end{aligned}\\]。<p>\\(G_{64}\\) 即葛立恒数。</p>`
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
                            html: `<p>这是 \\(f_{{\\omega}+1}\\) 的二重迭代。</p>`
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
                            html: `<p>把葛立恒数的 \\(G(n)\\) 嵌套两层，得到 \\(GGn\\)，即 \\(G(G(n))\\)。</p>`
                        }
                    ]
                }
            },
            'item-029': {
                label: '\\(f_{{\\omega}+2}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}+2}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+2}(10)=f_{{\\omega}+1}(f_{{\\omega}+1}(\\ldots{}f_{{\\omega}+1}(10)\\ldots{}))\\]。`
                        }
                    ]
                }
            },
            'item-030': {
                label: '\\(G\\) 的有限次嵌套',
                detail: {
                    title: '生成函数 \\(G\\) 的有限次嵌套',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(GGGG\\ldots{}GGGn\\)（共 \\(n\\) 个 \\(G\\)）。</p><p>直观上，嵌套 \\(G\\) 会产生极大的数；但在 FGH 中，这只相当于指标增加 1，与 \\(f_{{\\omega}+2}(n)\\) 相当。</p>`
                        }
                    ]
                }
            },
            'item-031': {
                label: '\\(f_{{\\omega}+3}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}+3}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+3}(10)=f_{{\\omega}+2}(f_{{\\omega}+2}(\\ldots{}f_{{\\omega}+2}(10)\\ldots{}))\\]。`
                        }
                    ]
                }
            },
            'item-032': {
                label: '\\(f_{{\\omega}+4}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}+4}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[f_{{\\omega}+4}(10)=f_{{\\omega}+3}(f_{{\\omega}+3}(\\ldots{}f_{{\\omega}+3}(10)\\ldots{}))\\]。`
                        }
                    ]
                }
            },
            'item-033': {
                label: '\\(f_{{\\omega}\\cdot{}2}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}\\cdot{}2}(n)=f_{{\\omega}+n}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>对 \\({\\omega}\\cdot{}2\\) 取 \\([n]\\) 时，应先写成 \\({\\omega}+{\\omega}\\)，再对后面的 \\({\\omega}\\) 取 \\([n]\\)：</p><p>\\(({\\omega}\\cdot{}2)[n]=({\\omega}+{\\omega})[n]={\\omega}+n\\)，<br>而不是 \\(({\\omega}\\cdot{}2)[n]=2n\\)。</p><p>因此：</p>\\[\\begin{aligned}f_{{\\omega}\\cdot{}2}(10)&=f_{{\\omega}+10}(10)\\\\&=f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(f_{{\\omega}+9}(10))))))))))\\end{aligned}\\]。`
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
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}\\cdot{}3}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(({\\omega}\\cdot{}3)[n]=({\\omega}\\cdot{}2+{\\omega})[n]={\\omega}\\cdot{}2+n\\)。</p><p>因此：</p>\\[\\begin{aligned}f_{{\\omega}\\cdot{}3}(10)&=f_{{\\omega}\\cdot{}2+{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}2+10}(10)\\end{aligned}\\]。`
                        }
                    ]
                }
            },
            'item-037': {
                label: '“\\(\\operatorname{TERR}[3]\\)”',
                detail: {
                    title: '“\\(\\operatorname{TERR}[3]\\)”：并非 \\(\\operatorname{TREE}(3)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>这个词条具有玩梗性质：“\\(\\operatorname{TERR}[3]\\)”不是数学函数，而是由错误拼写衍生出的称呼。</strong></p><p>它源于 UP 主“超级大钢球”于 2023 年 11 月 19 日发布的哔哩哔哩视频 <a href="https://www.bilibili.com/video/BV1X94y1n7D1/">BV1X94y1n7D1《\\(\\operatorname{TERR}[3]\\)究竟比葛立恒数大多少》</a>。视频原本意指 \\(\\operatorname{TREE}(3)\\)，但其中的分析与 \\(\\operatorname{TREE}(3)\\) 无关，并且把 \\(\\operatorname{TREE}\\) 误写成了 \\(\\operatorname{TERR}\\)。</p><p>视频经过大量缺乏依据的构造，最终得到一个 \\(f_{{\\omega}\\cdot{}3}(187196)\\) 级别的数。</p><p>数字 187196 来自 \\(n(4)>A^{A(187196)}(1)\\)，其中 \\(n\\) 是 <a href="https://googology.fandom.com/wiki/Block_subsequence_theorem">Friedman \\(n\\) 函数</a>，\\(A\\) 是 Ackermann 函数，上标表示函数迭代。</p><p>一些营销号把 \\(n(4)\\) 的这个下界与 \\(\\operatorname{TREE}(3)\\) 混淆，而且经常写错格式，于是出现了各种带有“187196”的所谓 \\(\\operatorname{TREE}(3)\\) 下界；“\\(\\operatorname{TERR}[3]\\)”是其中最典型的例子之一。</p><p>真正的 \\(\\operatorname{TREE}(3)\\) 略大于 <a href="https://googology.fandom.com/wiki/Small_Veblen_ordinal">SVO</a> 级别。关于这一点，可参考 @HypCos 的分析：</p><ul><li><a href="https://googology.fandom.com/wiki/User_blog:Hyp_cos/tree_function_and_TREE(3)">tree_function_and_\\(\\operatorname{TREE}(3)\\)</a>；</li><li><a href="https://www.zhihu.com/question/667616017/answer/13389602444">葛立恒数、\\(\\operatorname{TREE}(3)\\)、\\(\\operatorname{SCG}(13)\\) 如何用 BMS 表达？</a>；</li><li><a href="https://www.zhihu.com/question/353941713/answer/885942447">从数学原理理解葛立恒数与 \\(\\operatorname{TREE}(3)\\) 的大小</a>。</li></ul>`
                        }
                    ]
                }
            },
            'item-038': {
                label: '\\(f_{{\\omega}\\cdot{}4}(n)\\)',
                detail: {
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}\\cdot{}4}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(({\\omega}\\cdot{}4)[n]=({\\omega}\\cdot{}3+{\\omega})[n]={\\omega}\\cdot{}3+n\\)。</p><p>因此：</p>\\[\\begin{aligned}f_{{\\omega}\\cdot{}4}(10)&=f_{{\\omega}\\cdot{}3+{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}3+10}(10)\\end{aligned}\\]。`
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
                    title: '<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>：\\(f_{{\\omega}^{2}}(n)=f_{{\\omega}\\cdot{}n}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `\\[\\begin{aligned}f_{{\\omega}^{2}}(10)&=f_{{\\omega}\\cdot{}{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}10}(10)\\\\&=f_{{\\omega}\\cdot{}9+{\\omega}}(10)\\\\&=f_{{\\omega}\\cdot{}9+10}(10)\\\\&=f_{{\\omega}\\cdot{}9+9}(f_{{\\omega}\\cdot{}9+9}(\\ldots{}f_{{\\omega}\\cdot{}9+9}(10)\\ldots{}))\\end{aligned}\\]。`
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
