const items = [
    { 
        value: 0, label: '1', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>1</h2>
        <p>万物之始，googology 的起点。</p>
        <h3>python</h3>
        <code>print(1)</code>
    `
    },
    { 
        value: 0.25, label: '1000', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>1000</h2>
    `
    },
    { 
        value: 0.45, label: '地球人数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>目前地球的人口数量约为80亿人</h2>
    `
    },
    { 
        value: 0.5, label: '10<sup>10</sup>', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10<sup>10</sup> = 1000000000</h2>
        <p>一百亿、10 billion</p>
        <h3>python</h3>
        <code>print(10**10)</code>
    `
    },
    { 
        value: 0.55, label: '大模型参数量', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>目前主流大语言模型(LLM)的参数量为10<sup>11</sup>~10<sup>13</sup></h2>
    `
    },
    { 
        value: 0.6, label: '电脑每秒运算次数', zoomLevel: 1, side: 'bottom', level: 2, branch: 0,
        detail: `
        <h2>目前主流家用电脑显卡的每秒运算次数为10<sup>13</sup>~10<sup>15</sup>(10 Tflops ~ 1000 Tflops)</h2>
    `
    },
    { 
        value: 0.7, label: '阿伏伽德罗常数', zoomLevel: 1, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>阿伏伽德罗常数N<sub>A</sub>≈6.022×10<sup>23</sup>，大约是1克氢气的原子数</h2>
    `
    },
    { 
        value: 0.75, label: '10<sup>30</sup>', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10<sup>30</sup></h2>
        <p>一百万亿亿亿</p>
        <p>目前全世界所有计算机的总运算次数的量级在这附近</p>
    `
    },
    { 
        value: 0.95, label: '宇宙原子数', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>可观测宇宙的原子的数量约10<sup>78</sup>到10<sup>82</sup></h2>
        <p>
        以下是粗略的计算<br>
        1kg氢大约是1000N<sub>A</sub>≈6×10<sup>26</sup>个原子<br>
        太阳大约是2×10<sup>30</sup>kg，大约是10<sup>57</sup>个原子<br>
        银河系大约有10<sup>11</sup>个太阳，大约是10<sup>68</sup>个原子<br>
        整个可观测宇宙大约是10<sup>12</sup>个银河系<br>
        总共大约是10<sup>80</sup>个原子<br>
        </p>
    `
    },
    { 
        value: 1, label: '10<sup>100</sup>', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>Googol = 10<sup>100</sup></h2>
        <p>是 Googology 这个词的词源。</p>
        <h3>python</h3>
        <code>print(10**100)</code>
    `
    },
    { 
        value: 1.05, label: '围棋状态数', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>19×19的围棋状态数≈2.08×10<sup>170</sup></h2>
        <p>
        每个格子有黑、白、空三种情况，共19×19=361个格子，所以估算总状态数是3<sup>361</sup>≈10<sup>172</sup>量级<br>
        考虑到部分局面不合法，实际是2.08×10<sup>170</sup><br>
        详见<a href="https://zhuanlan.zhihu.com/p/34532047">https://zhuanlan.zhihu.com/p/34532047</a>
        </p>
    `
    },
    { 
        value: 1.25, label: '10<sup>10<sup>100</sup></sup>', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10<sup>10<sup>100</sup></sup></h2>
        <p>又名Googolplex</p>
        <h3>python</h3>
        <code>print(10**(10**100))</code>
    `
    },
    { 
        value: 1.35, label: '宇宙庞加莱回归时间', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>宇宙的庞加莱回归时间≈10<sup>10<sup>10<sup>50</sup></sup></sup>~10<sup>10<sup>10<sup>150</sup></sup></sup></h2>
        <p>对于这个量级，单位用普朗克时间还是年几乎没有差别</p>
    `
    },
    { 
        value: 1.5, label: '10↑↑10', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10↑↑10 = 10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup></h2>
        <p>从这里开始引入<a href="https://googology.fandom.com/wiki/Arrow_notation">高德纳箭头(Knuth's up-arrow)</a>符号。<br>
        这是超运算最常用的符号，↑表示指数，↑↑表示4级运算，↑↑↑表示5级运算...</p>
        
        <p>10↑↑10 = 10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup>，它的位数的位数的位数的位数的位数的位数的位数的位数是10000000001<br>
        <br>
        从这里开始，底数（↑前面的数字）变得毫无意义，大小只取决于↑后面的数字，以及↑的个数<br>
        容易证明：<br>
        1000000000↑↑n <br>
        < 10↑↑(n+1) <br>
        < 3↑↑(n+2) <br>
        < 2↑↑(n+4) <br>
        </p>
        <h3>python</h3>
        <code>result = 10<br>for _ in range(9):<br>    result = 10 ** result<br>print(result)</code>
    `
    },
    { 
        value: 1.6, label: '3↑↑↑3', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>3↑↑↑3 = 3↑↑(3↑↑3)</h2>
        <p>3↑↑↑3 <br>
        = 3↑↑(3↑↑3) <br>
        = 3↑↑(3<sup>3<sup>3</sup></sup>) <br>
        = 3↑↑(3<sup>27</sup>) <br>
        = 3↑↑7625597484987 <br>
        > 10↑↑7625597484986 <br>

    `
    },
    { 
        value: 1.75, label: '10↑↑↑10', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10↑↑↑10 = 10↑↑(10↑↑(10↑↑(10↑↑(10↑↑(10↑↑(10↑↑(10↑↑(10↑↑(10↑↑10)))))))))</h2>

        <p>10↑↑↑10的位数的位数的...(10↑↑↑9 - 1 个“的位数”)是11 <br>
        而10↑↑↑9的位数的位数的...(10↑↑↑8 - 1 个“的位数”)是11 <br>
        而10↑↑↑8的位数的位数的...(10↑↑↑7 - 1 个“的位数”)是11 <br>
        ....
        </p>
        <h3>python</h3>
        <code>TODO</code>
    `
    },

    { 
        value: 1.85, label: '葛立恒数G1', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a>的第一层: G1 = 3↑↑↑↑3</h2>
        <p>3↑↑↑↑3 <br>
        = 3↑↑↑(3↑↑↑3) <br>

    `
    },


//------------------------------------------------------------------------------------------------------------------------------------------
    { 
        value: 2, label: 'FGH: f<sub>&omega;</sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;</sub>(n) = f<sub>n</sub>(n) ≈ n↑(×n)n</h2>
        <p>
        <p>从这里开始，统一使用 FGH（<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">Fast-growing hierarchy</a>）来表示。</p>
        <h4>FGH 定义包含以下三条规则：</h4>
        <ul>
            <li><strong>规则 1（起点）：</strong> f<sub>0</sub>(n) = n + 1</li>
            <li><strong>规则 2（后继序数）：</strong> f<sub>&alpha;+1</sub>(n) = f<sub>&alpha;</sub><sup>○n</sup>(n)（即嵌套 n 层 f<sub>&alpha;</sub>）</li>
            <li><strong>规则 3（极限序数）：</strong> f<sub>&alpha;</sub>(n) = f<sub>&alpha;[n]</sub>(n)，其中 &alpha;[n] 为极限序数 &alpha; 的基本列第 n 项</li>
        </ul>

        <h4>由此可直接推出：</h4>
        <ul>
            <li>f<sub>1</sub>(n) = 2n</li>
            <li>f<sub>2</sub>(n) = n·2<sup>n</sup></li>
            <li>f<sub>3</sub>(n) 与 n↑↑n 同级</li>
            <li>f<sub>4</sub>(n) 与 n↑↑↑n 同级</li>
            <li>……</li>
        </ul>

        <h4>引入&omega;</h4>
        <p>令 &omega;[n] = n，则</p>
        <p>f<sub>&omega;</sub>(n) = f<sub>n</sub>(n)</p>
        </p>
        <h3>python</h3>
<code>def f(n,a):
    if a == 0:
        return n + 1
    else:
        x = n
        for i in range(n):
            x = f(x,a - 1)
        return x
n = 10
print(f(n,n))</code>
`
    },
    { 
        value: 2, label: 'HH: H<sub>&omega;<sup>&omega;</sup></sub>(n)', zoomLevel: 0, side: 'top', level: 1, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Hardy_hierarchy">HH</a> H<sub>&omega;<sup>&omega;</sup></sub>(n)</h2>
        <p>阅读以下内容前建议先了解FGH。</p>
        <p>HH（<a href="https://googology.fandom.com/wiki/Hardy_hierarchy">Hardy hierarchy</a>）是一种类似FGH的将序数转化为大数的函数。对于后继序数，舍弃了嵌套规则，改成了极为简单的"+1"。<br>
        Goodstein序列、TREE函数、SCG函数等大数的行为都类似某个序数上的HH，HH为我们分析这几个大数提供了工具。<br>
        </p>
        <h4>HH 定义包含以下三条规则：</h4>
        <ul>
            <li><strong>规则 1（起点）：</strong> H<sub>0</sub>(n) = n</li>
            <li><strong>规则 2（后继序数）：</strong> H<sub>&alpha;+1</sub>(n) = H<sub>&alpha;(n) + 1</li>
            <li><strong>规则 3（极限序数）：</strong> H<sub>&alpha;</sub>(n) = H<sub>&alpha;[n]</sub>(n)，其中 &alpha;[n] 为极限序数 &alpha; 的基本列第 n 项</li>
        </ul>
        <p>
        初期，HH远小于FGH，但到达&epsilon;<sub>0</sub>后，HH的增长速度就与FGH相当了。以下是粗略的证明<br>
        </p>

        <h3>定理：H<sub>&omega;<sup>&alpha;</sup></sub>(n) = f<sub>&alpha;</sub>(n)  注意是严格相等，不是约等于</h3>
        <ul>
            <li><strong>易证：H<sub>&alpha;+&beta;</sub>(n)=H<sub>&alpha;</sub>(H<sub>&beta;</sub>(n))</strong></li>
            <li><strong>则有：<br>
            H<sub>&omega;<sup>&alpha;+1</sup></sub>(n)<br>
            = H<sub>&omega;<sup>&alpha;</sup>*&omega;</sub>(n)<br>
            = H<sub>&omega;<sup>&alpha;</sup>*n</sub>(n)<br>
            = H<sub>&omega;<sup>&alpha;</sup></sub>(H<sub>&omega;<sup>&alpha;</sup></sub>(...(H<sub>&omega;<sup>&alpha;</sup></sub>(n)))) (n层)<br>
            = f<sub>&alpha;</sub>(f<sub>&alpha;</sub>(...(f<sub>&alpha;</sub>(n)))) (n层)<br>
            = f<sub>&alpha;+1</sub>(n)<br></strong>
            </li>
            <li><strong>归纳可得H<sub>&omega;<sup>&alpha;</sup></sub>(n) = f<sub>&alpha;</sub>(n)，此处不再赘述具体证明细节</strong></li>
        </ul>
        
        <h4>以下是一段计算H<sub>&omega;<sup>&omega;</sup></sub>(n)的python代码，用一个一维数组表示&omega;<sup>&omega;</sup>以下的序数</h4>
        <h3>python</h3>
<code>n = 10
a = [n] # a represents the ordinal = ω^a[0] + ω^a[1] + ... + ω^a[-1].
while(len(a) > 0): # Hardy hierarchy on ordinals .
    if a[-1] == 0: # a is a successor ordinal
        a.pop() # subtract 1
        n += 1
    else: # a is a limit ordinal
        v = a[-1]
        a.pop()
        a.extend([v-1,]*n)
print(n)</code>
`
    },
    { 
        value: 2, label: 'Ackermann函数', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>Ackermann函数</h2>
        <p><a href="https://googology.fandom.com/wiki/Ackermann_function">Ackermann函数</a> 是最早被发现的非原始递归函数之一。它的增长速度非常快。</p>
        <p>定义如下：</p>
        <ul>
            <li>A(0, n) = n + 1</li>
            <li>A(m, 0) = A(m-1, 1)</li>
            <li>A(m, n) = A(m-1, A(m, n-1))</li>
        </ul>
        <p>Ackermann函数的对角线 A(n, n) 的增长速度大约相当于 FGH 中的 f<sub>&omega;</sub>(n)。</p>
        <h3>Python</h3>
<code>
def A(m, n): # Ackermann function
    if m == 0:
        return n + 1
    elif n == 0:
        return A(m - 1, 1)
    else:
        return A(m - 1, A(m, n - 1))
n = 10
print(A(10, 10))</code>
    `
    },
    { 
        value: 2, label: '高德纳箭头', zoomLevel: 0, side: 'bottom', level: 2, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Arrow_notation">高德纳箭头(Knuth's up-arrow)</a>的极限 = n ↑↑...↑↑ n</h2>
        <p>这是超运算最常用的符号，于1976年由高德纳(Donald Knuth)提出，↑表示指数，↑↑表示4级运算，↑↑↑表示5级运算...</p>
        <p>定义如下(用↑<sup>k</sup>表示n个箭头)：</p>
        <ul>
            <li>a↑b = a<sup>b</sup></li>
            <li>a↑<sup>n</sup>1 = a</li>
            <li>a↑<sup>n+1</sup>b = a↑<sup>n</sup>(a↑<sup>n+1</sup>(b-1))</li>
        </ul>
        <h3>Python</h3>

<code>def arr(a,b,k): # knuth_arrow, a ^(k) b
    if k == 1:
        return a**b
    else:
        if b == 1:
            return a
        else:
            return arr(a,arr(a,b-1,k),k-1)

n = 100
print(n,n,n)</code>
    `
    },
    { 
        value: 2.05, label: 'f<sub>&omega;</sub>(f<sub>&omega;</sub>(n))', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;</sub>(f<sub>&omega;</sub>(n))</h2>
        把f<sub>&omega;</sub>(n)嵌套2层<br>
        f<sub>&omega;</sub>(f<sub>&omega;</sub>(n)) <br>
        = f<sub>&omega;</sub>(f<sub>n</sub>(n)) <br>
        = f<sub>f<sub>n</sub>(n)</sub>(f<sub>n</sub>(n)) <br>
        `
    },
    { 
        value: 2.075, label: 'f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(n)))', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(n)))</h2>
        把f<sub>&omega;</sub>(n)嵌套3层
        `
    },
    { 
        value: 2.03, label: '葛立恒数G2', zoomLevel: 2, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a>的第二层: G2 = 3↑<sup>G1</sup>3</h2>

    `
    },

    { 
        value: 2.06, label: '葛立恒数G3', zoomLevel: 3, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a>的第三层: G3 = 3↑<sup>G2</sup>3</h2>

    `
    },
    { 
        value: 2.1, label: 'f<sub>&omega;+1</sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;+1</sub>(n)</h2>
        <p>f<sub>&omega;+1</sub>(10)=
        <br>f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(f<sub>&omega;</sub>(10))))))))))
        </p>
        <h3>python</h3>
<code>def f(n,a): # f_a(n)
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
print(x) # x = f_(w+1)(64), 略大于葛立恒数
`
    },
    
    { 
        value: 2.1, label: '葛立恒数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a>（G64）</h2>
        <p>
        定义G1=3↑↑↑↑3<br>
        G2=3↑<sup>G1</sup>3<br>
        G3=3↑<sup>G2</sup>3<br>
        ...<br>
        G64=3↑<sup>G63</sup>3<br>
        则G64为葛立恒数
        </p>
        <h3>python</h3>
<code>def arr(a,b,k): # knuth_arrow, a ^(k) b
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
print(G)</code>

    `
    },
    { 
        value: 2.125, label: 'f<sub>&omega;+1</sub>(f<sub>&omega;+1</sub>(n))', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;+1</sub>(f<sub>&omega;+1</sub>(n))</h2>
        把f<sub>&omega;+1</sub>(n)嵌套2层<br>
        `
    },
    { 
        value: 2.125, label: '葛立恒数G(G(n))', zoomLevel: 3, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a>的G(n)嵌套2层，GGn</h2>

    `
    },
    { 
        value: 2.16, label: 'f<sub>&omega;+2</sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;+2</sub>(n)</h2>
        <p>f<sub>&omega;+2</sub>(10)=
        <br>f<sub>&omega;+1</sub>(f<sub>&omega;+1</sub>(...f<sub>&omega;+1</sub>(10)))
        </p>
`
    },
    
    { 
        value: 2.16, label: '葛立恒数G嵌套', zoomLevel: 2, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a>的G(n)嵌套</h2>
        <p>
        GGGG...GGGn（n个G）<br>
        新手可能觉得把G嵌套会很大。但在FGH上只是+1，与f<sub>&omega;+2</sub>(n)相当
        </p>

    `
    },
    { 
        value: 2.19, label: 'f<sub>&omega;+3</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;+3</sub>(n)</h2>
        <p>f<sub>&omega;+3</sub>(10)=
        <br>f<sub>&omega;+2</sub>(f<sub>&omega;+2</sub>(...f<sub>&omega;+2</sub>(10)))
        </p>
`
    },
    { 
        value: 2.22, label: 'f<sub>&omega;+4</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;+4</sub>(n)</h2>
        <p>f<sub>&omega;+4</sub>(10)=
        <br>f<sub>&omega;+3</sub>(f<sub>&omega;+3</sub>(...f<sub>&omega;+3</sub>(10)))
        </p>
`
    },
    { 
        value: 2.25, label: 'f<sub>&omega;*2</sub>(n)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;*2</sub>(n) = f<sub>&omega;+n</sub>(n)</h2>
        注意，对&omega;*2取[n]时，应当先将&omega;*2写成&omega;+&omega;，然后再对后面的&omega;取[n]<br>
        即(&omega;*2)[n]=(&omega;+&omega;)[n]=&omega;+n<br>
        而不是(&omega;*2)[n]=n*2<br>
        <br>
        <p>f<sub>&omega;*2</sub>(10)=
        <br>f<sub>&omega;+10</sub>(10)=
        <br>f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(f<sub>&omega;+9</sub>(10))))))))))
        </p>
        <h3>python</h3>
<code>def f1(n,a): # f_a(n)
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
    },
    { 
        value: 2.29, label: 'f<sub>&omega;*2+1</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.32, label: 'f<sub>&omega;*2+2</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.35, label: 'f<sub>&omega;*3</sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;*3</sub>(n)</h2>
        (&omega;*3)[n]=(&omega;*2+&omega;)[n]=&omega;*2+n<br>
        <br>
        <p>f<sub>&omega;*3</sub>(10)<br>
        = f<sub>&omega;*2+&omega;</sub>(10)<br>
        = f<sub>&omega;*2+10</sub>(10)<br>
        </p>
        `
    },
    { 
        value: 2.35, label: '”TERR[3]“', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>”TERR[3]“，注意不是TREE(3)</h2>
        <h4>注意这个词条是玩梗性质的，TERR[3]并不是某种数学上的函数，只是一个错误拼写的梗</h4>
        <p>来源是up主”超级大钢球“2023年11月19日在B站发布的视频<a href="https://www.bilibili.com/video/BV1X94y1n7D1/">BV1X94y1n7D1《TERR[3]究竟比葛立恒数大多少》</a></p>
        <p>视频的原意是TREE(3)，但up主在视频里的分析不仅与TREE(3)毫无关系，还把TREE打成了TERR。</p>
        <p>视频里经过大篇幅的胡乱构造，最终构造出了一个f<sub>&omega;*3</sub>(187196)级别的数字。</p>
        <p>注：“187196”这个数字的来源是n(4) > A<sup>A(187196)</sup>(1)，其中n是<a href="https://googology.fandom.com/wiki/Block_subsequence_theorem">Friedman n函数</a>，A是Ackermann函数，上标代表迭代。</p>
        <p>一些营销号把这个n(4)的下界与TREE(3)混淆，不仅如此还经常搞错格式，因此出现了各种各样带“187196”的TREE(3)下界。其中”TERR[3]“是最经典的之一。</p>
        <br>
        <h4>真正的TREE(3)略大于SVO级别，大数圈元老@HypCos给出了一些分析，见以下超链接 <br>
        <a href="https://googology.fandom.com/wiki/User_blog:Hyp_cos/tree_function_and_TREE(3)">tree_function_and_TREE(3)</a> <br>
        <a href="https://www.zhihu.com/question/667616017/answer/13389602444">知乎：葛立恒数，TREE（3），SCG（13）用BMS怎么表达？</a> <br>
        <a href="https://www.zhihu.com/question/353941713/answer/885942447">知乎：从数学原理上说一说，葛立恒数、tree(3) 等数为什么那么大？</a> <br>
        </h4>
    `
    },
    { 
        value: 2.41, label: 'f<sub>&omega;*4</sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;*4</sub>(n)</h2>
        (&omega;*4)[n]=(&omega;*3+&omega;)[n]=&omega;*3+n<br>
        <br>
        <p>f<sub>&omega;*4</sub>(10)<br>
        = f<sub>&omega;*3+&omega;</sub>(10)<br>
        = f<sub>&omega;*3+10</sub>(10)<br>
        </p>
        `
    },
    { 
        value: 2.45, label: 'f<sub>&omega;*5</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.5, label: 'f<sub>&omega;<sup>2</sup></sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>2</sup></sub>(n) = f<sub>&omega;*n</sub>(n)</h2>
        <p>f<sub>&omega;<sup>2</sup></sub>(10)=
        <br>f<sub>&omega;*&omega;</sub>(10)=
        <br>f<sub>&omega;*10</sub>(10)=
        <br>f<sub>&omega;*9+&omega;</sub>(10)=
        <br>f<sub>&omega;*9+10</sub>(10)=
        <br>f<sub>&omega;*9+9</sub>(f<sub>&omega;*9+9</sub>(...f<sub>&omega;*9+9</sub>(10)...))
        </p>
        
        <h3>python</h3>
<code>def f(n,a,b): # f_(w*a+b)(n)
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
print(f(n,n,0))`
    
    },
    { 
        value: 2.5, label: '3元Ackermann函数', zoomLevel: 1, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>3元Ackermann函数</h2>
        <p>3元Ackermann函数是经典Ackermann函数的推广。它通过增加一个参数来迭代函数的增长速度，最高可达f<sub>&omega;<sup>2</sup></sub>(n)。</p>
        <p>存在多种定义可以达到同样的增长率，以下是其中一种定义：</p>
        <ul>
            <li>A(0, b, c) = c + 1</li>
            <li>A(a, 0, c) = A(a-1, c, c)</li>
            <li>A(a, b, 0) = A(a, b-1, 1)</li>
            <li>A(a, b, c) = A(a, b-1, A(a, b, c-1))</li>
        </ul>
        <p>当 a=1 时，A(1, b, c) 就相当于普通的2元Ackermann函数 A(b, c)。</p>
        <p>当 a=2 时，A(2, b, c) 的增长速度达到f<sub>&omega;*2</sub>(n)。</p>
        <p>A(a, b, c)约等于f<sub>&omega;*a+b</sub>(n)。</p>
        <p>3元Ackermann函数的对角线 A(n, n, n) 的增长速度大约相当于 FGH 中的 f<sub>&omega;<sup>2</sup></sub>(n)。</p>
        <h3>Python</h3>
<code>def A3(a, b, c):
    if a == 0 :
        return c + 1
    elif b == 0:
        return A3(a - 1, c, c)
    elif c == 0:
        return A3(a, b - 1, 1)
    else:
        return A3(a, b - 1, A3(a, b, c - 1))
n = 100
print(A3(n, n, n))</code>
    `
    },
    { 
        value: 2.55, label: 'f<sub>&omega;<sup>2</sup>+&omega;</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>2</sup>+&omega;</sub>(n)</h2>
        <p>
        (&omega;<sup>2</sup>+&omega;)[n] = &omega;<sup>2</sup>+n<br>
        </p>
        `
    },
    { 
        value: 2.6, label: 'f<sub>&omega;<sup>2</sup>*2</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>2</sup>*2</sub>(n)</h2>
        <p>
        (&omega;<sup>2</sup>*2)[n] = (&omega;<sup>2</sup>+&omega;<sup>2</sup>)[n] = &omega;<sup>2</sup>+&omega;*n<br>
        </p>
        `
    },
    { 
        value: 2.65, label: 'f<sub>&omega;<sup>3</sup></sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>3</sup></sub>(n)</h2>
        <p>
        (&omega;<sup>3</sup>)[n]=(&omega;<sup>2</sup>*&omega;)[n]=&omega;<sup>2</sup>*n<br>
        </p>
        `
    },
    { 
        value: 2.7, label: 'f<sub>&omega;<sup>4</sup></sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>4</sup></sub>(n)</h2>
        <p>
        (&omega;<sup>4</sup>)[n]=(&omega;<sup>3</sup>*&omega;)[n]=&omega;<sup>3</sup>*n<br>
        </p>
        `
    },
    { 
        value: 2.75, label: 'f<sub>&omega;<sup>&omega;</sup></sub>(n)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>&omega;</sup></sub>(n)</h2>
        <p>f<sub>&omega;<sup>&omega;</sup></sub>(10)=
        <br>f<sub>&omega;<sup>10</sup></sub>(10)=
        <br>f<sub>&omega;<sup>9</sup>*10</sub>(10)=
        <br>f<sub>&omega;<sup>9</sup>*9+&omega;<sup>9</sup></sub>(10)=
        <br>...
        </p>
`
    
    },
    { 
        value: 2.75, label: '多元Ackermann函数', zoomLevel: 1, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>多元Ackermann函数</h2>
        <p>将Ackermann函数进一步扩展到n个变量，则增长率是f<sub>&omega;<sup>n-1</sup></sub>级别。</p>
        <p>因此最终的极限是f<sub>&omega;<sup>&omega;</sup></sub>，多元Ackermann函数无法表示增长率≥f<sub>&omega;<sup>&omega;</sup></sub>的函数</p>
        <p>多元Ackermann函数的详细定义较为繁琐，此处不展示代码。</p>
    `
    },
    { 
        value: 2.75, label: 'Friedman n函数', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Block_subsequence_theorem">Friedman n函数</a></h2>
        <p>定义此处不再赘述，可参考超链接或者搜索相关资料</br><p>
        <p>关于这个函数有个著名的乌龙：</p>
        <p>已有的结论是n(4) > A<sup>A(187196)</sup>(1)，其中A是Ackermann函数，上标代表迭代。</p>
        <p>有人说过”TREE(3)远大于n(4)“，于是A<sup>A(187196)</sup>(1)便成了TREE(3)的一个下界。</p>
        <p>然而真正的TREE(3)在<a href="https://googology.fandom.com/wiki/Small_Veblen_ordinal">SVO</a>级别，这个下界弱的离谱。</p>
        <p>后来人们把A<sup>A(187196)</sup>(1)或者一些其他带有”187196“的数戏称为"TERR(3)"，TERR的意思是TREE的错误拼写</p>
    `
    },
    { 
        value: 2.75, label: '字符串子序列函数', zoomLevel: 1, side: 'bottom', level: 2, branch: 0,
        detail: `
        <h2>字符串子序列函数</h2>
        <p>与<a href="https://googology.fandom.com/wiki/Block_subsequence_theorem">Friedman n函数</a>类似，大小也均为f<sub>&omega;<sup>&omega;</sup></sub>，但定义改成TREE函数的风格：</p>
        <ul>
            <li>每个字符串由n种字符构成</li>
            <li>现在有N个字符串，且满足以下条件：</li>
            <ul>
                <li>第i个字符串的长度不超过i</li>
                <li>若i<j，则第i个字符串不是第j个字符串的子序列</li>
                <li>此处的子序列定义为：字符串A是字符串B的子序列，当且仅当A可以通过删除B中的某些字符得到。</li>
            </ul>
            <li>给定一个n，问N的最大值是多少？</li>
            <li>这个定义等价于不允许树分叉的TREE函数，让n种节点的树退化成了n种字符的字符串</li>
        </ul>
        <p>每个字符串可以与&omega;<sup>&omega;<sup>n-1</sup></sup>以下的序数对应</p>
        <p>"第i个字符串的长度不超过i"对应<a href="https://googology.fandom.com/wiki/Hardy_hierarchy">HH(Hardy hierarchy)</a></p>
        <h4>因此n趋于&omega;时，N的增长率为H<sub>&omega;<sup>&omega;<sup>&omega;</sup></sup></sub> = f<sub>&omega;<sup>&omega;</sup></sub></h4>
    `
    },
    { 
        value: 2.78, label: 'f<sub>&omega;<sup>&omega;</sup>*2</sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.82, label: 'f<sub>&omega;<sup>&omega;+1</sup></sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a> f<sub>&omega;<sup>&omega;+1</sup></sub>(n)</h2>
        <p>
        (&omega;<sup>&omega;+1</sup>)[n]=(&omega;<sup>&omega;</sup>*&omega;)[n]=&omega;<sup>&omega;</sup>*n<br>
        </p>
        `
    },
    { 
        value: 2.85, label: 'f<sub>&omega;<sup>&omega;*2</sup></sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.88, label: 'f<sub>&omega;<sup>&omega;<sup>2</sup></sup></sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.91, label: 'f<sub>&omega;<sup>&omega;<sup>&omega;</sup></sup></sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.94, label: 'f<sub>&omega;<sup>&omega;<sup>&omega;<sup>&omega;</sup></sup></sup></sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 2.97, label: 'f<sub>&omega;<sup>&omega;<sup>&omega;<sup>&omega;<sup>&omega;</sup></sup></sup></sup></sub>(n)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3, label: '&epsilon;<sub>0</sub>', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&epsilon;<sub>0</sub>=&omega;<sup>&omega;<sup>&omega;<sup>...<sup>&omega;</sup></sup></sup></sup></sup> </h2>
        <p>
        从这里，HH追上了FGH。说明决定大小的不再是FGH本身的规则，而是序数本身，所以后续不再强调FGH，省略f<sub>&epsilon;<sub>0</sub></sub>(n)的表述，直接写&epsilon;<sub>0</sub><br>
        <a href="https://googology.fandom.com/wiki/%CE%95%E2%82%80">&epsilon;<sub>0</sub></a>是大数中非常重要的节点，有相当多种类的大数汇集在这个节点，只是知名度不及葛立恒数和TREE(3)<br>
        1. <a href="https://googology.fandom.com/wiki/Goodstein_sequence">古德斯坦(Goodstein)序列</a><br>
        2. <a href="https://googology.fandom.com/wiki/Fusible_number">燃烧数</a> 与 <a href="https://www.zhihu.com/question/36464952/answer/2912411355">伪燃烧数</a><br>
        3. <a href="https://googology.fandom.com/wiki/Kirby-Paris_hydra">九头蛇(Hydra)问题</a><br>
        4. <a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS的极限</a><br>
        5. <a href="https://en.wikipedia.org/wiki/Ordinal_analysis">PTO</a>(PA)（皮亚诺公理(PA)的证明论序数）<br>
        6. <a href="https://googology.fandom.com/wiki/Hardy_hierarchy">HH(Hardy hierarchy)</a>首次赶上<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>的位置<br>
        ...<br>
        
        <br>
        最简单的构造&epsilon;<sub>0</sub>级大数的代码基于伪燃烧数：
        </p>
<h3>python</h3>
<code>def f(x):
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2
n = 100
print(1/f(100))</code>
        <br>也可以基于序数记号的FGH或HH构造，以下以PrSS为例：<br>
<h3>python</h3>
<code>
class PrSS: # Primitive sequence system, can express ordinals < ε0
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
print(HH(initial_ordinal, n)) # Notice that HH(ε0[n]) is strictly equal to FGH(ε0[n-1])</code>
    `
    },
    
    { 
        value: 3, label: 'BMS:(0,0)(1,1)', zoomLevel: 0, side: 'top', level: 1, branch: 0,
        detail: `
        <h2>&epsilon;<sub>0</sub>的BMS表示为：(0,0)(1,1)</h2>
        <a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS (Bashicu matrix system)</a>是一种用于表示序数的记号，可以表示极为巨大的序数且规则较简单，因此广泛用于大序数的表示。<br>
        从这里开始，每一个序数会给出BMS表示。<br>
        
    `
    },
    { 
        value: 3, label: '&phi;(1,0)', zoomLevel: 0, side: 'top', level: 2, branch: 0,
        detail: `
        <h2>&epsilon;<sub>0</sub>的Veblen函数表示为：&phi;(1,0)</h2>
        <a href="https://googology.fandom.com/wiki/Veblen_function">Veblen函数</a>是一种用于表示序数的记号，记作&phi;，常用于表示&epsilon;<sub>0</sub>到LVO之间的序数。<br>
        从这里开始，每一个序数会给出Veblen函数表示，直到到达Veblen函数的极限。<br>
        <br>
        但是&phi;在&Gamma;<sub>0</sub>后规则较为复杂，建议使用<a href="https://googology.fandom.com/wiki/Ordinal_collapsing_function">序数坍缩函数（OCF）</a>例如<a href="https://googology.fandom.com/wiki/Buchholz%27s_function">Buchholz's OCF (简称BOCF)</a>。<br>
        或者直接使用<a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS (Bashicu matrix system)</a><br>
        
    `
    },
    
    { 
        value: 3, label: 'Goodstein序列', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Goodstein_sequence">Goodstein序列</a></h2>
        <p>Goodstein序列的定义此处不再赘述，可参考超链接或者搜索相关资料</br><p>
        <p>Goodstein序列的行为与&epsilon;<sub>0</sub>以下序数（&omega;构成的指数塔）的<a href="https://googology.fandom.com/wiki/Hardy_hierarchy">HH(Hardy hierarchy)</a>的行为完全相同。<br>
        具体来说，对于Goodstein(n)，将n转化为2的指数塔形式，然后把2全换成&omega;得到一个序数记为&alpha;，则有：<br>
        <h4>Goodstein(n) = H<sub>&alpha;</sub>(3) - 3</h4>
        <ul>
            <li>例如 4 = 2<sup>2</sup>，则&alpha; = &omega;<sup>&omega;</sup></li>
            <li><strong>Goodstein(4) </strong></li>
            <li>= H<sub>&omega;<sup>&omega;</sup></sub>(3) - 3</li>
            <li>= f<sub>&omega;</sub>(3) - 3</li>
            <li>= f<sub>3</sub>(3) - 3</li>
            <li>= f<sub>2</sub>(f<sub>2</sub>(f<sub>2</sub>(3))) - 3 , 已知f<sub>2</sub>(n) = n*2<sup>n</sup></li>
            <li><strong>= 3*2<sup>402653211</sup> - 3</strong></li>
        </ul>

        易得Goodstein(2↑↑n) = H<sub>&epsilon;<sub>0</sub>[n]</sub>(3) - 3 = f<sub>&epsilon;<sub>0</sub>[n-1]</sub>(3) - 3 <br>
        即Goodstein增长率与FGH的&epsilon;<sub>0</sub>几乎相同 (2↑↑n可以忽略不计)<br>
        <p>以下是计算Goodstein序列的python实现，原理是序数的Hardy hierarchy：</p>
        <h3>python</h3>
<code>
class PrSS: # Primitive sequence system, can express ordinals < ε0
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
print(g)</code>
        
    `
    },
    { 
        value: 3, label: '伪燃烧数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2><a href="https://www.zhihu.com/question/36464952/answer/2912411355">伪燃烧数</a>：已知最简单的构造&epsilon;<sub>0</sub>级大数的方法</h2>
        <p>是"<a href="https://googology.fandom.com/wiki/Fusible_number">燃烧数</a>"的一个下界，且在大数的尺度与它几乎一样大，均为&epsilon;<sub>0</sub>级。<br>
        定义由以下代码给出
        </p>
        
        <h3>python</h3>
<code>def f(x):
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2</code>

    <p>
        f(1)=1/8<br>
        f(2)=1/1024=2<sup>-10</sup><br>
        f(3)=2<sup>-1541023937</sup><br>
        1/f(4)是10↑↑5级别<em>（根据@Hypcos的分析，具体的数值以及消息来源需要补充）</em><br>
        @Hypcos猜测1/f(5)可能是Ackermann函数级别<em>（具体的消息来源需要补充）</em><br>
        <a href="https://lmcs.episciences.org/9850/pdf">已证明f(n)>f<sub>&epsilon;<sub>0</sub></sub>(n-7)</a>
    </p>
    `
    },
    { 
        value: 3, label: 'PrSS', zoomLevel: 0, side: 'bottom', level: 2, branch: 0,
        detail: `
        <h2><a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS (Primitive sequence system)</a>的极限</h2>
        <p>PrSS是一个序数记号，是表示&epsilon;<sub>0</sub>以下的序数的最简单的记号之一，易于编程实现。</p>
        <h4>定义如下：</h4>
        <ul>
            <li>PrSS的表达式是一个有限长自然数数列，且以0开头。例如(0,1,2,3), (0,1,2,1,2,0),等。</li>
            <li>序数0对应空序列</li>
            <li>后继序数规则：如果最后一个数字是0，则为后继序数。减1对应删掉最后的0。</li>
            <ul>
                <li>例如，(0,1,2,3,0) = (0,1,2,3) + 1。</li>
            </ul>
            <li>极限序数展开规则（[n]运算）：如果最后一个数字不是0，则为极限序数。展开规则如下：</li>
            <ul>
                <li>记最后一个数字是k，则找到离它最近的比它小的数（可以证明一定是k-1）</li>
                <li>删掉最后一个数字，然后让序列从k-1到结尾的部分重复n次</li>
                <li>例：(0,1,2,3,4)[3] 要删掉最后的4，然后要把(3)重复3遍， = (0,1,2,3,3,3)</li>
                <li>(0,1,2,3,2)[3] 要删掉最后的2，然后要把(1,2,3)重复3遍， = (0,1,2,3,1,2,3,1,2,3)</li>
                <li>(0,1,2,1,0,1,1)[5] 要删掉最后的1，然后要把(0,1)重复5遍， = (0,1,2,1,0,1,0,1,0,1,0,1,0,1)</li>
            </ul>
        </ul>
        <p>有了以上规则，则可以套用FGH或者HH来构造大数。</p>
        <h4>以下是一些序数与PrSS表达式的例子：</h4>
        <ul>
            <li>() = 0</li>
            <li>(0) = 1</li>
            <li>(0,0) = 2</li>
            <li>(0,1) = &omega;，因为(0,1)[n] = (0,0,0...共n个0) = n</li>
            <li>(0,1,0) = &omega;+1</li>
            <li>(0,1,0,0) = &omega;+2</li>
            <li>(0,1,0,1) = &omega;*2，因为(0,1,0,1)[n] = (0,1,0,0...) = &omega;+n</li>
            <li>(0,1,1) = &omega;*&omega; = &omega;<sup>2</sup>，因为(0,1,1)[n] = (0,1,0,1,0,1...) = &omega;*n</li>
            <li>(0,1,2) = &omega;<sup>&omega;</sup></li>
            <li>(0,1,2,3) = &omega;<sup>&omega;<sup>&omega;</sup></sup></li>
            <li>(0,1,2,3,...,n) = &epsilon;<sub>0</sub>[n]</li>
            <li><strong>不严格地说，&omega;的指数塔是一个树状结构（有时候会称为hydra），PrSS每个数字代表hydra上每个节点的层数</strong></li>
        </ul>


        <p>以下是PrSS的python实现：</p>
        <h3>python</h3>
<code>class PrSS: # Primitive sequence system, can express ordinals < ε0
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
            self.s = self.s + copy_part * (n - 1)</code>
        
    `
    },
    { 
        value: 3, label: '九头蛇游戏', zoomLevel: 0, side: 'bottom', level: 3, branch: 0,
        detail: `
        <h2><a href="https://en.wikipedia.org/wiki/Hydra_game">九头蛇(Hydra)游戏</a></h2>
        <p>定义与分析此处不再赘述，参考上面超链接，或者<a href="https://googology.fandom.com/wiki/Kirby-Paris_hydra">Kirby-Paris hydra</a></p>
        <h4>注意到<a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS</a>的每个数字恰好能和九头蛇上每个节点的层数对应，且砍蛇头的规则”第n步复制n遍“与<a href="https://googology.fandom.com/wiki/Hardy_hierarchy">HH(Hardy hierarchy)</a>几乎相同</h4>
        <h4>因此砍完九头蛇的步数显然是&epsilon;<sub>0</sub>级。</h4>
    `
    },
    { 
        value: 3.03, label: '&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub></sup>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.05, label: '&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub></sup></sup>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.07, label: '&epsilon;<sub>1</sub>', zoomLevel: 2, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.09, label: '&epsilon;<sub>1</sub><sup>&epsilon;<sub>1</sub></sup>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.11, label: '&epsilon;<sub>2</sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.13, label: '&epsilon;<sub>&omega;</sub>', zoomLevel: 2, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.15, label: '&epsilon;<sub>&omega;+1</sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.17, label: '&epsilon;<sub>&epsilon;<sub>0</sub></sub>', zoomLevel: 2, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.19, label: '&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>0</sub></sub></sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.21, label: '&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>0</sub></sub></sub></sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.23, label: '&zeta;<sub>0</sub>', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&zeta;<sub>0</sub>=&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>...</sub></sub></sub></sub></sub></h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 3.25, label: '&epsilon;<sub>&zeta;<sub>0</sub>+1</sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.27, label: '&epsilon;<sub>&epsilon;<sub>&zeta;<sub>0</sub>+1</sub></sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.29, label: '&zeta;<sub>1</sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.31, label: '&zeta;<sub>&zeta;<sub>0</sub></sub>', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.33, label: '&eta;<sub>0</sub>', zoomLevel: 2, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.35, label: '&phi;(4,0)', zoomLevel: 3, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.37, label: '&phi;(&omega;,0)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
    },
    { 
        value: 3.5, label: '&Gamma;<sub>0</sub>', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&Gamma;<sub>0</sub></h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 3.55, label: '&phi;(1,0,1)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&phi;(1,0,0)</h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 3.6, label: '&phi;(1,0,0,0)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&phi;(1,0,0,0)</h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 3.65, label: 'SVO', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>SVO</h2>
        <p>(待补充)</p>
    `
    },
    
    { 
        value: 3.65, label: 'tree(n)', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>tree(n)</h2>
        <p>
        tree(n)是弱化版的TREE，只有单色节点<br>
        但在大数尺度上它与TREE很接近
        </p>
    `
    },
    { 
        value: 3.66, label: 'TREE(3)', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>TREE(3)</h2>
        <h4>TREE(3)略大于SVO级别，大数圈元老@HypCos给出了一些分析，见以下超链接 <br>
        <a href="https://googology.fandom.com/wiki/User_blog:Hyp_cos/tree_function_and_TREE(3)">tree_function_and_TREE(3)</a> <br>
        <a href="https://www.zhihu.com/question/667616017/answer/13389602444">知乎：葛立恒数，TREE（3），SCG（13）用BMS怎么表达？</a> <br>
        <a href="https://www.zhihu.com/question/353941713/answer/885942447">知乎：从数学原理上说一说，葛立恒数、tree(3) 等数为什么那么大？</a> <br>
        </h4>
        
    `
    },

    { 
        value: 3.7, label: '&phi;(&omega;@&omega;)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&phi;(&omega;@&omega;)</h2>
        <p>TREE在这里<br>
        但这里并不是标志性节点。这里除了TREE函数，啥都没有。
        </p>
    `
    },
    { 
        value: 3.7, label: 'TREE(n)', zoomLevel: 1, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>TREE 函数</h2>
        <p>TREE(1)=1, TREE(2)=3, 而 TREE(3) 已经无法用常规语言描述其巨大。</p>
    `
    },
    { 
        value: 3.75, label: 'LVO', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>LVO</h2>
        <p>(待补充)</p>

    `
    },
    { 
        value: 3.85, label: 'BHO=&psi;(&Omega;<sub>2</sub>)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&psi;(&Omega;<sub>2</sub>)</h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 4, label: 'BO=&psi;(&Omega;<sub>&omega;</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>Buchholz ordinal (BO) = &psi;(&Omega;<sub>&omega;</sub>)</h2>
        <h2>BMS:(0,0,0)(1,1,1) = (0,0)(1,1)(2,2)(3,3)...</h2>
        <p>TODO</p>
    `
    },
    { 
        value: 4, label: 'BMS:(0,0,0)(1,1,1)', zoomLevel: 0, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 4.25, label: 'TFB = &psi;(&Omega;<sub>&omega;+1</sub>)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>TFB = &psi;(&Omega;<sub>&omega;+1</sub>)</h2>

        <p>也可以写作&psi;(&epsilon;<sub>&Omega;<sub>&omega;</sub>+1</sub>)
        <br>Buchholz hydra的极限
        </p>
    `
    },
    { 
        value: 4.5, label: 'EBO', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>EBO: Extended Buchholz ordinal</h2>
        <h2>BMS:(0,0,0)(1,1,1)(2,1,1)(3,1,0)(2,0,0)</h2>
        <p><a href="https://googology.fandom.com/wiki/Extended_Buchholz's_function">Extended Buchholz's function</a> 的极限</p>
    `
    },
    { 
        value: 4.5, label: 'BMS:(0,0,0)(1,1,1)(2,1,1)(3,1,0)(2,0,0)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 5, label: 'SSO', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>(非正式名字) SSO: Small Stegert ordinal</h2>
        <h2>BMS:(0,0,0)(1,1,1)(2,2,0)</h2>
        <h4>此处采用最常见的命名。但有些时候同样的名字也会被用来表示不同的序数，所以建议使用BMS表达式。</h4>
    `
    },
    { 
        value: 5, label: 'BMS:(0,0,0)(1,1,1)(2,2,0)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 5.5, label: 'LRO', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>(非正式名字) LRO: Large Rathjen Ordinal</h2>
        <h2>BMS:(0,0,0)(1,1,1)(2,2,2)</h2>
        <h4>此处采用最常见的命名。但有些时候同样的名字也会被用来表示不同的序数，所以建议使用BMS表达式。</h4>
    `
    },
    { 
        value: 5.5, label: 'BMS:(0,0,0)(1,1,1)(2,2,2)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 5.75, label: '3行BMS', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>TODO</h2>
        <p>TODO。</p>
    `
    },
    { 
        value: 5.75, label: 'BMS:(0,0,0,0)(1,1,1,1)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 6, label: 'SHO', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>SHO: BMS的极限</h2>
        <h4>"SHO"(Small Hydra Ordinal)通常用来表示<a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">Bashicu Matrix System (BMS)</a>的极限</h4>
        <p>注：SHO(Small Hydra Ordinal)这个名字显然更适合&epsilon;<sub>0</sub>，因为&epsilon;<sub>0</sub>对应最简单的hydra，而BMS与hydra的关系并不明显。但不知为何，"SHO"阴差阳错地被用来表示BMS的极限，且目前大数圈已经习惯了这个名字。</p>
    `
    },
    { 
        value: 6, label: 'BMS:(0,0,0,...)(1,1,1,...)', zoomLevel: 0, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 6, label: 'Y:(1,3)', zoomLevel: 0, side: 'top', level: 2, branch: 0,
    },
    
    
    { 
        value: 4.05, label: 'SCG(n)', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>SCG 函数</h2>
        <p>另一个著名的大数</p>
    `
    },
    // 分支 1 示例
    { 
        value: 7.25 + 0.0, label: 'Y:(1,4)', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `
        <h2>Y:(1,4)</h2>
        <p>各种BMS扩展的坟墓</p>
    `
    },
    { 
        value: 7.25 + 0.5, label: 'Y序列极限', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `
        <h2>Y序列极限</h2>
        <p>Yukito发明的基于数列阶差的序数表示法</p>
    `
    },
    { 
        value: 7.25 + 1.0, label: '&omega;-Y序列极限', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `
        <h2>&omega;-Y 序列极限</h2>
        <p>Y 序列的进一步扩展。</p>
    `
    },
    { 
        value: 7.25 + 1.5, label: '各种扩展Y序列的大饼', zoomLevel: 0, side: 'top', level: 0, branch: 1,
        detail: `
        <h2>各种扩展Y序列的大饼</h2>
        <p>目前很少有严格定义</p>
    `
    },
    // 分支 2 示例
    { 
        value: 7.25 + 0, label: 'iBLP极限', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `
        <h2>iBLP 极限</h2>
        <p>Infinite Basic Laver Patterns 作者为@test_alpha0</p>
    `
    },
    { 
        value: 7.25 + 0.5, label: 'Laver table q(5)', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `
        <h2>Laver table q(5)</h2>
        <p>Laver table 周期开始变成2<sup>5</sup>的点
        <br>q(0)=0, q(1)=2, q(2)=3, q(3)=5, q(4)=9
        <br>而q(5)很可能大于目前所有已有序数记号的极限（根据@test_alpha0的分析）
        </p>
        <h3>python</h3>
<code>def lt(x,y,M): # defination of Laver table
    if y==0:
        return (x+1) % (2**M)
    else:
        return lt(lt(x,y-1,M),x,M)
M = 1
while lt(1, 15, M) == 0: 
    # 15 = 2^(5-1)-1
    # This will hold true if lt(1,x)'s period <= 2^4
    # So it will break when M = q(5)
    M = M + 1
print(M)</code>
    `
    },
    { 
        value: 7.25 + 1.0, label: 'Laver table', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `
        <h2>Laver table</h2>
        <p>集合论中研究的一类特殊的有限代数结构。</p>
        <h3>python</h3>
<code>def lt(x,y,M): # defination of Laver table
    if y==0:
        return (x+1) % (2**M)
    else:
        return lt(lt(x,y-1,M),x,M)
N = 1000 
M = 1
while lt(1, 2**(N-1)-1, M) == 0: 
    M = M + 1
print(M) # M = q(N)</code>
    `
    },
    { 
        value: 7.25 + 1.5, label: 'LTY', zoomLevel: 0, side: 'top', level: 0, branch: 2,
        detail: `
        <h2>Laver table yarn，"洛天依"</h2>
        <p>Laver table yarn by @test_alpha0。</p>
    `
    },
    // 分支 4 示例
    { 
        value: 7.25 + 0, label: 'PTO(Z<sub>3</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 3,
        detail: `
        <h2>PTO(Z<sub>3</sub>)</h2>
        <p>PTO(Z<sub>2</sub>)大于等于BMS极限，PTO(Z<sub>3</sub>)可能再大一点。</p>

    `
    },
    { 
        value: 7.25 + 0.5, label: 'PTO(Z<sub>&omega;</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 3,
        detail: `
        <h2>PTO(Z<sub>&omega;</sub>)</h2>
        <p>更高级别的证明论序数。</p>
    `
    },
    { 
        value: 7.25 + 0.5, label: 'Loader数', zoomLevel: 0, side: 'bottom', level: 0, branch: 3,
        detail: `
        <h2>Loader 数</h2>
        <p>由程序生成的巨大数字。它的生成逻辑非常简洁但结果极其巨大。</p>
    `
    },
    { 
        value: 7.25 + 1.0, label: 'PTO(ZFC)', zoomLevel: 0, side: 'top', level: 0, branch: 3,
        detail: `
        <h2>PTO(ZFC)</h2>
        <p>现代数学标准公理系统 ZFC 的证明论序数。</p>
    `
    },
    { 
        value: 7.25 + 1.5, label: 'PTO(ZFC+I0)', zoomLevel: 0, side: 'top', level: 0, branch: 3,
        detail: `
        <h2>PTO(ZFC+I0)</h2>
        <p>带有大基数公理 I0 的 ZFC 系统的序数。</p>
    `
    },
    // 分支 3 示例
    { 
        value: 7.25 + 1, label: '(例如Friedman的那几个没人研究的，待补充)', zoomLevel: 0, side: 'bottom', level: 0, branch: 4,
        detail: `
        <h2>Harvey Friedman 的未定义项</h2>
        <p>这位伟大的数学家提出了许多增长极其迅速但尚未被 googologist 完全消化的概念。</p>
    `
    },
    {
        value: 10, label: 'BB(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>忙碌海狸函数 (Busy Beaver)</h2>
        <p>BB(n) 定义为在停机之前，拥有 n 个状态的图灵机所能打印的最大符号数。这是一个典型的不可计算函数，其增长速度远超任何可计算的序数系统。</p>
    `
    },
    {
        value: 11, label: 'Rayo(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>拉约数 (Rayo's Number)</h2>
        <p>Rayo(10<sup>100</sup>) 曾被认为是数学中定义过的最大大数。它使用二阶算术语言，定义为能被不超过指定数量符号定义的最小正整数。</p>
    `
    }
];