const branchNames = {
    "1": { 
        "text": "Y序列以及变种", 
        "detail": "<h2>Y 序列及其变种</h2><p>由多个 googologist 共同开发的矩阵系统扩展，旨在探索 BMS 之后的增长极限。</p>"
    },
    "2": { 
        "text": "Laver table相关", 
        "detail": "<h2>Laver Table 相关</h2><p>源自集合论中的大基数公理，与有限代数结构的组合性质密切相关，其增长速度非常独特。</p>"
    },
    "3": { 
        "text": "PTO系列", 
        "detail": "<h2>证明论序数 (PTO) 系列</h2><p>衡量数学系统“强度”的标尺。从 ZFC 到带有各种大基数公理的系统，其对应的增长率是目前已知最快的。</p>"
    },
    "4": { 
        "text": "未被研究的内容", 
        "detail": "<h2>未被研究的内容</h2><p>大数研究领域中尚未被完全形式化或缺乏深入分析的定义。</p>"
    }
};

const axisSegments = [
    { 
        "start": 0, "end": 1, "text": "现实世界", "bg": "#ADD8E6", "color": "#000",
        "detail": "<h2>现实世界</h2><p>小于 10<sup>100</sup>。现实世界甚至宇宙相关的数字，通常不会超过这个范围。</p>"
    },
    { 
        "start": 1, "end": 2, "text": "超运算", "bg": "#87CEEB", "color": "#000",
        "detail": "<h2>超运算</h2><p>远离了现实世界的一切数字。算法上通过简单的迭代即可获得。</p>"
    },
    { 
        "start": 2, "end": 3, "text": "基础FGH", "bg": "#90EE90", "color": "#000",
        "detail": "<h2>基础FGH</h2><p>使用FGH与序数结合，可以表示极为复杂的函数嵌套，从而构造更大的数。</p>"
    },
    { 
        "start": 3, "end": 4, "text": "φ函数与OCF", "bg": "#FFD700", "color": "#000",
        "detail": 
        `<h2>φ函数与OCF</h2>
        <p>引入了<a href="https://googology.fandom.com/wiki/Veblen_function">Veblen &phi;函数</a>和<a href="https://googology.fandom.com/wiki/Ordinal_collapsing_function">OCF (ordinal collapsing function)</a>，用来表示更大的序数</p>`
    },
    { 
        "start": 4, "end": 5, "text": "扩展OCF", "bg": "#FF6000", "color": "#000",
        "detail": "<h2>扩展 OCF</h2><p>对OCF进行扩展，引入更大的基数（如I、M、K等）来构造更强的序数系统。但大基数OCF因为规则混乱，已经基本上被放弃，被BMS取代</p>"
    },
    { 
        "start": 5, "end": 6.0, "text": "BMS", "bg": "#C00000", "color": "#fff",
        "detail": `<h2><a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS (Bashicu matrix system)</a></h2>
        <p>BMS的强度极高，且规则较为简单，因此已经成为googology中最常用的标尺。</p>

        `
    },
    { 
        "start": 6.0, "end": 6.75, "text": "前沿未知领域", "bg": "#000", "color": "#fff",
        "detail": "<h2>进入未知领域</h2><h4>目前的研究前沿。难度巨大，人们对它们所知甚少，很多内容之间暂时无法比较大小，大部分也缺乏严格的停机性证明。本网页把不同类型的记号划分成不同分支，不同分支之间的大小顺序暂时未知。</h4>"
    },
    {
        "start": 9.5, "end": 12.0, "text": "不可计算大数", "bg": "#666", "color": "#fff",
        "detail": "<h2>不可计算大数</h2><p>不可计算大数大于一切可计算函数。但是因为不可计算大数不可能用程序代码来表示，且原理大多类似于”某种语言用N个字符能表达的最大的数“，所以感兴趣的人较少。</p>"
    }
];

const axisSubSegments = [
    // 0-1 现实世界 (C0: #ADD8E6)
    // 0.0-0.5: C(-1):#FFFFFF & C0:#ADD8E6 (1:3) -> #C2E2EC
    { "start": 0.0, "end": 0.5, "text": "日常数字", "bg": "#C2E2EC", "color": "#000",
         "detail": "<h2>日常数字</h2><p>从 0 到 10<sup>10</sup> 左右的范围。包含了人类日常生活中能接触到的绝大部分数字。</p>" 
        },
    // 0.5-1.0: C0:#ADD8E6 & C1:#87CEEB (3:1) -> #A4D6E7
    { "start": 0.5, "end": 1.0, "text": "天文数字", "bg": "#A4D6E7", "color": "#000", 
         "detail": 
         `<h2>天文数字</h2>
         <p>从 10<sup>10</sup> 到 10<sup>100</sup> 左右的范围。包含了天文、物理、计算机等领域中常用的数字。</p>
         `
        },
    
    // 1-2 超运算 (C1: #87CEEB)
    // 1.0-1.5: C0:#ADD8E6 & C1:#87CEEB (1:3) -> #91D1EA
    { "start": 1.0, "end": 1.5, "text": "指数爆炸", "bg": "#91D1EA", "color": "#000", 
         "detail": 
         `<h2>指数爆炸</h2>
         <p>从 10<sup>100</sup> 到 10↑↑10 。包含围棋状态数、庞加莱回归时间等具有数学或者物理意义的大数。在这之后的数字几乎没有任何的现实意义</p>
         `
        },
    // 1.5-2.0: C1:#87CEEB & C2:#90EE90 (3:1) -> #89D6D4
    { "start": 1.5, "end": 2.0, "text": "超运算", "bg": "#89D6D4", "color": "#000", 
         "detail": 
         `<h2>超运算</h2>
         <h4>”大数“的开端。从这里开始，数字已经失去了任何的现实意义，变成了纯粹的数学游戏。</h4>
         <h4>这里最有名的记号是<a href="https://googology.fandom.com/wiki/Arrow_notation">高德纳箭头(Knuth's up-arrow)</a></h4>
         <p>原理是将运算不断嵌套，得到4级、5级、...n级运算。</p>
         </p>
         `
        },
    
    // 2-3 基础FGH (C2: #90EE90)
    // 2.0-2.5: C1:#87CEEB & C2:#90EE90 (1:3) -> #8EE6A7
    { "start": 2.0, "end": 2.5, "text": "函数嵌套", "bg": "#8EE6A7", "color": "#000", 
         "detail": 
         `<h2>函数嵌套</h2>
         <h4>”大数“的初级。引入”对角化“，不仅嵌套函数，还把嵌套的次数作为参数进一步嵌套。</h4>
         <p>把嵌套的次数作为参数进行嵌套，就到达了著名的<a href="https://googology.fandom.com/wiki/Graham's_number">葛立恒数</a></p>
         <p>然后再嵌套、再嵌套...</p>
         <p>然后再把嵌套的次数进行嵌套、再嵌套、再嵌套...</p>
         <p>然后再把嵌套的次数进行嵌套、再嵌套、再嵌套...</p>
         <p>终于，我们来到了f<sub>&omega;<sup>2</sup></sub>(n)级别</p>
         <h4>该引入更系统化的方法了：<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a></h4>
         `
        },
    // 2.5-3.0: C2:#90EE90 & C3:#FFD700 (3:1) -> #ACE86C
    { "start": 2.5, "end": 3.0, "text": "FGH与序数", "bg": "#ACE86C", "color": "#000", 
        "detail": 
        `<h2>FGH与序数</h2>
        <h4>”大数“的入门。引入<a href="https://googology.fandom.com/wiki/Fast-growing_hierarchy">FGH</a>与序数</h4>
        <p>引入”&omega;“与它的加、乘、幂运算，配合FGH可以实现非常多层级的函数嵌套。</p>
        <p>最终，穷尽了所有&omega;的幂运算，到达&omega;<sup>&omega;<sup>&omega;<sup>...<sup>&omega;</sup></sup></sup></sup></sup>，需要引入新的符号了<p>
        <h4>这个极限称为<a href="https://googology.fandom.com/wiki/%CE%95%E2%82%80">&epsilon;<sub>0</sub></a>，是非常重要的节点</h4>
        <p>一个很简单的分段函数（称为<a href="https://www.zhihu.com/question/36464952/answer/2912411355">伪燃烧数</a>）就可以构造出来这个级别的数字：</p>
        <ul>
            <li>f(x) = -x , x < 0</li>
            <li>f(x) = 0.5 * f(x - f(x - 1))  , x ≥ 0</li>
        </ul>
        则1/f(n)是&epsilon;<sub>0</sub>级的大数
        <h4>描述这一段的序数，除了直接用带&omega;的式子，也经常用<a href="https://googology.fandom.com/wiki/Primitive_sequence_number">PrSS (Primitive sequence system)</a>这种序数记号。PrSS对写程序更友好，以下是PrSS的程序定义。</h4>
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

initial_ordinal=PrSS([0,1,2,3,4]) # [0,1,2,3,4] = ω^ω^ω^ω
g = HH(initial_ordinal, 100) 
print(g)</code>
         `
        },
    // 3-4 OCF (C3: #FFD700)
    // 3.0-3.5: C2:#90EE90 & C3:#FFD700 (1:3) -> #E3DD24
    { "start": 3.0, "end": 3.5, "text": "φ函数", "bg": "#E3DD24", "color": "#000", 
         "detail": 
         `<h2>&epsilon;<sub>0</sub> ~ &Gamma;<sub>0</sub>：φ函数</h2>
         <h4>”大数“的中级。这段最常见的是<a href="https://googology.fandom.com/wiki/Veblen_function">Veblen &phi;函数</a>，类似&omega;的超运算</h4>
         <p>记&epsilon;<sub>0</sub>=&omega;<sup>&omega;<sup>&omega;<sup>...<sup>&omega;</sup></sup></sup></sup></sup></p>
         <p>记&epsilon;<sub>1</sub>=&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub><sup>...<sup>&epsilon;<sub>0</sub></sup></sup></sup></sup></sup></p>
         <h4>注：也可以令&epsilon;<sub>1</sub>=&omega;<sup>&omega;<sup>&omega;<sup>...<sup>&epsilon;<sub>0</sub>+1</sup></sup></sup></sup></sup>，与&epsilon;<sub>1</sub>=&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub><sup>&epsilon;<sub>0</sub><sup>...<sup>&epsilon;<sub>0</sub></sup></sup></sup></sup></sup>相比，虽然在FGH上不完全一样，但是差距极小。（可以自己试着推导一下为什么差距小）</h4>
         <h4>但不可以&omega;<sup>&omega;<sup>&omega;<sup>...<sup>&epsilon;<sub>0</sub></sup></sup></sup></sup></sup>，因为指数塔顶端的&epsilon;<sub>0</sub>第一次展开就消失了，因此与&epsilon;<sub>0</sub>没区别</h4>
         <h4>经验性的结论：数学上相等的序数（例如&epsilon;<sub>0</sub>与&omega;<sup>&epsilon;<sub>0</sub></sup>），在FGH上不一定完全相等但大概率非常接近</h4>
         <p>记&epsilon;<sub>2</sub>=&epsilon;<sub>1</sub><sup>&epsilon;<sub>1</sub><sup>&epsilon;<sub>1</sub><sup>...<sup>&epsilon;<sub>1</sub></sup></sup></sup></sup></sup></p>
         <p>然后&epsilon;<sub>3</sub>、&epsilon;<sub>&omega;</sub>、&epsilon;<sub>&epsilon;<sub>0</sub></sub>...</p>
         <p>然后令&zeta;<sub>0</sub>=&epsilon;<sub>&epsilon;<sub>&epsilon;<sub>...</sub></sub></sub>...</p>
         <p>然后&zeta;<sub>1</sub>、&zeta;<sub>&omega;</sub>、&zeta;<sub>&zeta;<sub>0</sub></sub>...</p>
         <p>然后令&eta;<sub>0</sub>=&zeta;<sub>&zeta;<sub>&zeta;<sub>...</sub></sub></sub>...</p>
         <p>类似的过程嵌套n次记为&phi;(n,0)</p>
         <p>然后&phi;(&omega;,0)、&phi;(&omega;+1,0)、&phi;(&phi;(&omega;,0),0)  （这里省略了非常多的细节）</p>
         <p>最后把无限嵌套的&phi;记作&Gamma;<sub>0</sub></p>
         
         `
        },
    // 3.5-4.0: C3:#FFD700 & C4:#FF6000 (3:1) -> #FFB900
    { "start": 3.5, "end": 4.0, "text": "多元φ与OCF", "bg": "#FFB900", "color": "#000", "detail": `

         <h2>&Gamma;<sub>0</sub> ~ BO：多元&phi;与OCF</h2>
         <h4>这段最常见的是<a href="https://googology.fandom.com/wiki/Veblen_function">Veblen函数&phi;</a>的多元与序数元扩展，以及<a href="https://googology.fandom.com/wiki/Ordinal_collapsing_function">OCF (ordinal collapsing function)</a></h4>
         <p>二元<a href="https://googology.fandom.com/wiki/Veblen_function">Veblen函数&phi;</a>的极限是&Gamma;<sub>0</sub></p>
         <p>然后三元&phi;，四元，...n元，到达<a href="https://googology.fandom.com/wiki/Small_Veblen_ordinal">SVO (Small Veblen ordinal)</a></p>
         <h4>大名鼎鼎的tree和<a href="https://googology.fandom.com/wiki/TREE_sequence">TREE</a>就在这附近。(tree(n)和TREE(3)几乎等于SVO级别，TREE(n)略大一点)</h4>
         <p>然后序数元&phi;到达<a href="https://googology.fandom.com/wiki/Large_Veblen_ordinal">LVO (Large Veblen ordinal)</a></p>
         <h4>在这之后通常使用各类OCF(形式上多为&Psi;与&Omega;的组合)</h4>
         <p>&phi;的多元扩展的规则相比OCF复杂很多，所以习惯上&Gamma;<sub>0</sub>以后人们更常用OCF或者一些便于编程的记号例如<a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS (Bashicu matrix system)</a></p>
` },
    
    // 4-5 扩展OCF (C4: #FF6000)
    // 4.0-4.5: C3:#FFD700 & C4:#FF6000 (1:3) -> #FF7E00
    { "start": 4.0, "end": 4.5, "text": "Ψ的简单扩展", "bg": "#FF7E00", "color": "#000", "detail": `

         <h2>BO ~ EBO：Ψ的简单扩展</h2>
         <h4>”大数“的高级，从这里开始难度显著增加。这段最常见的是扩展OCF：<a href="https://googology.fandom.com/wiki/Extended_Buchholz's_function">Extended Buchholz's function</a>，与<a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS (Bashicu matrix system)</a></h4>
         <h4>大名鼎鼎的SCG/SSCG函数在略大于BO的位置。目前推测介于&Psi;(&Omega;<sub>&omega;</sub>*&omega;)与&Psi;(&Omega;<sub>&omega;</sub><sup>&omega;</sup>)之间 (BMS:(0,0,0)(1,1,1)(2,0,0)到(0,0,0)(1,1,1)(2,1,0)(3,0,0))，暂无精确结论</h4>
` },
    // 4.5-5.0: C4:#FF6000 & C5:#C00000 (3:1) -> #EF4800
    { "start": 4.5, "end": 5.0, "text": "大基数Ψ", "bg": "#EF4800", "color": "#000", 
        "detail": 
         `<h2>EBO ~ SSO：大基数Ψ</h2>
         <h4>在Ψ中引入I、M、K等大基数，定义变得非常复杂与混乱，相关资料也不易查找<h4>
         <h4>然而与<a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS</a>相比，强度的提升幅度微乎其微。用尽所有字母也很难到(0,0,0)(1,1,1)(2,2,0)</h4>
         <h4>因此目前大基数Ψ的使用已经非常少了，通常使用BMS表达式</h4>
         `
        },
    
    // 5-6 BMS (C5: #C00000)
    // 5.0-5.5: C4:#FF6000 & C5:#C00000 (1:3) -> #D01800
    { "start": 5.0, "end": 5.5, "text": "这段叫啥合适？", "bg": "#D01800", "color": "#fff", 
        "detail": 
         `<h2>TODO</h2>
         <h4></h4>
         `
        },
    // 5.5-6.0: C5:#C00000 & C6:#000000 (3:1) -> #900000
    { "start": 5.5, "end": 6.0, "text": "BMS的独角戏", "bg": "#900000", "color": "#fff", 
        "detail": 
         `<h2><a href="https://googology.fandom.com/wiki/Bashicu_matrix_system">BMS</a>的独角戏</h2>
         <h4>从这里到BMS极限(0,0,0,...)(1,1,1,...)之前并没有太多内容。不借助BMS或者类似结构，很少有记号可以到达BMS的(0,0,0)(1,1,1)(2,2,2)。</h4>
         `
        },
];
