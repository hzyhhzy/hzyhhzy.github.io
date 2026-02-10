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
        <h3>python</h3>
        <code>print(1000)</code>
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
        value: 0.75, label: '10<sup>30</sup>', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>Googol = 10<sup>30</sup></h2>
        <p>一百万亿亿亿</p>
        <h3>python</h3>
        <code>print(10**30)</code>
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
        value: 1.25, label: '10<sup>10<sup>100</sup></sup>', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10<sup>10<sup>100</sup></sup></h2>
        <p>又名Googolplex</p>
        <h3>python</h3>
        <code>print(10**(10**100))</code>
    `
    },
    { 
        value: 1.5, label: '10↑↑10', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>10↑↑10 = 10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10<sup>10</sup></sup></sup></sup></sup></sup></sup></sup></sup></h2>

        <p>它的位数的位数的位数的位数的位数的位数的位数的位数是100亿零1</p>
        <h3>python</h3>
        <code>result = 10<br>for _ in range(9):<br>    result = 10 ** result<br>print(result)</code>
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
        value: 2, label: 'f<sub>&omega;</sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;</sub>(n)</h2>
        <p>它的增长速度相当于Ackermann函数。<br>
        序数层FGH(Fast-growing hierarchy)的开端
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
print(f(n,n))`
    },
    { 
        value: 2.1, label: 'f<sub>&omega;+1</sub>(n)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;+1</sub>(n)</h2>
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
        value: 2.25, label: 'f<sub>&omega;*2</sub>(n)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;*2</sub>(n)</h2>
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
        value: 2.5, label: 'f<sub>&omega;<sup>2</sup></sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;<sup>2</sup></sub>(n)</h2>
        <p>f<sub>&omega;<sup>2</sup></sub>(10)=
        <br>f<sub>&omega;*&omega;</sub>(10)=
        <br>f<sub>&omega;*10;</sub>(10)=
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
        value: 2.75, label: 'f<sub>&omega;<sup>&omega;</sup></sub>(n)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&omega;<sup>&omega;</sup></sub>(n)</h2>
        <p>f<sub>&omega;<sup>&omega;</sup></sub>(10)=
        <br>f<sub>&omega;<sup>10</sup></sub>(10)=
        <br>f<sub>&omega;<sup>9</sup>*10</sub>(10)=
        <br>f<sub>&omega;<sup>9</sup>*9+&omega;<sup>9</sup></sub>(10)=
        <br>...
        </p>
        <h3>python</h3>
<code>TODO</code>
`
    
    },
    { 
        value: 3, label: 'f<sub>&epsilon;<sub>0</sub></sub>(n)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>f<sub>&epsilon;<sub>0</sub></sub>(n)</h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 3.25, label: '&zeta;<sub>0</sub>', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&Zeta;<sub>0</sub></h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 3.5, label: '&Gamma;<sub>0</sub>', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&Gamma;<sub>0</sub></h2>
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
        value: 3.7, label: '&phi;(&omega;@&omega;)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&phi;(&omega;@&omega;)</h2>
        <p>TREE在这里</p>
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
        value: 3.85, label: '&psi;(&Omega;<sub>2</sub>)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&psi;(&Omega;<sub>2</sub>)</h2>
        <p>(待补充)</p>
    `
    },
    { 
        value: 4, label: '&psi;(&Omega;<sub>&omega;</sub>)', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>Buchholz ordinal (BO) = &psi;(&Omega;<sub>&omega;</sub>)</h2>
        <p>TODO</p>
    `
    },
    { 
        value: 4.1, label: '&psi;(&Omega;<sub>&omega;+1</sub>)', zoomLevel: 2, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>TFB = &psi;(&Omega;<sub>&omega;+1</sub>)</h2>
        <p>也可以写作&psi;(&epsilon;<sub>&Omega;<sub>&omega;</sub>+1</sub>)
        <br>Buchholz hydra的极限
        </p>
    `
    },
    { 
        value: 4.25, label: '&psi;(I)', zoomLevel: 1, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>&psi;(I)</h2>
        <p>先随便填点</p>
    `
    },
    { 
        value: 4.5, label: 'TODO:写什么合适？', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>TODO</h2>
        <p>TODO</p>
    `
    },
    { 
        value: 5, label: 'SSO', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>BMS:(0,0,0)(1,1,1)(2,2,0)</h2>
        <p>TODO。</p>
    `
    },
    { 
        value: 5, label: 'BMS:(0,0,0)(1,1,1)(2,2,0)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
        detail: `
        <h2>BMS:(0,0,0)(1,1,1)(2,2,0)</h2>
        <p>TODO。</p>
    `
    },
    { 
        value: 5.5, label: 'LRO', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>BMS:(0,0,0)(1,1,1)(2,2,2)</h2>
        <p>TODO。</p>
    `
    },
    { 
        value: 5.5, label: 'BMS:(0,0,0)(1,1,1)(2,2,2)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
        detail: `
        <h2>BMS:(0,0,0)(1,1,1)(2,2,2)</h2>
        <p>TODO。</p>
    `
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
        value: 6, label: 'BMS极限', zoomLevel: 0, side: 'top', level: 0, branch: 0,
        detail: `
        <h2>Bashicu Matrix System (BMS) 的极限</h2>
        <p>TODO</p>
    `
    },
    { 
        value: 6, label: 'BMS:(0,0,0,...)(1,1,1,...)', zoomLevel: 1, side: 'top', level: 1, branch: 0,
    },
    { 
        value: 6, label: 'Y:(1,3)', zoomLevel: 1, side: 'top', level: 2, branch: 0,
    },
    
    { 
        value: 2, label: 'Ackermann函数', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>Ackermann函数</h2>
        <p>一个递归函数，其增长速度非常快。</p>
    `
    },
    { 
        value: 2.1, label: '葛立恒数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>葛立恒数</h2>
        <p>来自于拉姆齐理论，曾经作为数学证明中出现的最大数字被载入吉尼斯世界纪录。</p>
        <h3>python</h3>
    <code>
    def arr(a,b,k): # knuth_arrow, a ^(k) b
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
        value: 3, label: 'Goodstein函数', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>Goodstein函数</h2>
        <p>一种递归函数，其增长速度非常快。</p>
    `
    },
    { 
        value: 3, label: '伪燃烧数', zoomLevel: 0, side: 'bottom', level: 1, branch: 0,
        detail: `
        <h2>特殊的递归定义</h2>
        <p>"燃烧数"的一个下界，定义极为简单却有&epsilon;<sub>0</sub>级的增长速度。</p>
        <h3>python</h3>
<code>def f(x):
    if(x < 0):
        return -x
    else:
        return f(x-f(x-1))/2
n = 10
print(1/f(10))</code>
    `
    },
    
    { 
        value: 3.66, label: 'TREE(3)', zoomLevel: 0, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>TREE(3)</h2>
        <p>来自于 Kruskal 树定理。虽然其定义很简单，但它的大小远超葛立恒数，甚至在 FGH 中也处于极高的位置。</p>
    `
    },
    { 
        value: 3.7, label: 'TREE(n)', zoomLevel: 2, side: 'bottom', level: 0, branch: 0,
        detail: `
        <h2>TREE 函数</h2>
        <p>TREE(1)=1, TREE(2)=3, 而 TREE(3) 已经无法用常规语言描述其巨大。</p>
    `
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