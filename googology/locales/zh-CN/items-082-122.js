(function registerItems082To122(global) {
    'use strict';

    function unreviewedNotice() {
        return {
            type: 'note',
            html: `<p>该内容由gpt6-astra完成，且暂时未经过人工审核，不保证正确性</p>`,
        };
    }

    global.GoogologyI18n.registerMessages('zh-CN', {
        items: {
            'item-082': {
                label: '\\({\\Gamma}_{0}\\)',
                detail: {
                    title: '\\({\\Gamma}_{0}\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>在本站接下来采用的有限元 Veblen 约定中，\\({\\Gamma}_{0}=\\varphi(1,0,0)\\)。等价地，它是函数 \\(\\alpha\\mapsto\\varphi_{\\alpha}(0)\\) 的最小正不动点。</p><p>若 \\(\\gamma_0=1\\)、\\(\\gamma_{n+1}=\\varphi_{\\gamma_n}(0)\\)，则\\[{\\Gamma}_{0}=\\sup_{n\\lt{}\\omega}\\gamma_n.\\]它通常称为 Feferman–Schütte 序数，是 Veblen 固定点层级中的重要节点。</p><p><strong>来源：</strong><a href="https://arxiv.org/abs/2205.11017">Bufetov、Nivasch、Pakhomov，《Generalized fusible numbers and their ordinals》，§3.2</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-083': {
                label: '\\({\\varphi}(1,0,1)\\)',
                detail: {
                    title: '\\({\\varphi}(1,0,1)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>这是三元 Veblen 函数的一个值。固定前两个参数 \\((1,0)\\) 后，最后一个参数依次枚举这一层级的值；由于 \\(\\varphi(1,0,0)={\\Gamma}_{0}\\)，\\(\\varphi(1,0,1)\\) 是把末参数从 \\(0\\) 提升到 \\(1\\) 后得到的下一个索引值。</p><p>这里的“下一个”不是序数后继：一般而言，\\(\\varphi(1,0,1)\\neq {\\Gamma}_{0}+1\\)，而是同一正规函数所枚举的下一个固定点层级值。</p><p><strong>记号约定与来源：</strong><a href="https://arxiv.org/abs/2205.11017">Bufetov、Nivasch、Pakhomov，《Generalized fusible numbers and their ordinals》，§3.2</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-084': {
                label: '\\({\\varphi}(1,0,0,0)\\)',
                detail: {
                    title: '\\({\\varphi}(1,0,0,0)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(\\varphi(1,0,0,0)\\) 使用四元 Veblen 函数。与三元表达式 \\(\\varphi(1,0,0)={\\Gamma}_{0}\\) 相比，新增的参数位置把共同不动点构造再推进一层；末尾全取 \\(0\\) 表示这一四元层级的第一个新闭包点。</p><p>有限元 Veblen 函数按元数递归定义：增加一个参数位置，就枚举由较低元数和较早参数值产生的函数的共同不动点。</p><p><strong>记号约定与来源：</strong><a href="https://arxiv.org/abs/2205.11017">Bufetov、Nivasch、Pakhomov，《Generalized fusible numbers and their ordinals》，§3.2</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-085': {
                label: 'SVO',
                detail: {
                    title: 'SVO',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>SVO 是 small Veblen ordinal（小 Veblen 序数）的缩写。它是从 \\(0\\) 出发，反复使用序数加法以及任意有限元 Veblen 函数仍不能达到的最小序数；也就是所有有限元 Veblen 层级共同的闭包界。</p><p>直观地说，\\(\\varphi(1,0,0)\\)、\\(\\varphi(1,0,0,0)\\) 等表达式会随着参数个数增加而进入越来越高的层级，SVO 位于全部有限参数个数的构造之上。</p><p><strong>来源：</strong><a href="https://arxiv.org/abs/2205.11017">Bufetov、Nivasch、Pakhomov，《Generalized fusible numbers and their ordinals》，§3.2</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-086': {
                label: '\\(\\operatorname{tree}(n)\\)',
                detail: {
                    title: '\\(\\operatorname{tree}(n)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(\\operatorname{tree}(n)\\) 是 \\(\\operatorname{TREE}\\) 的弱化版本，其中节点只有一种颜色；在大数尺度上，二者非常接近。</p>`,
                        },
                    ],
                },
            },
            'item-087': {
                label: '\\(\\operatorname{TREE}(3)\\)',
                detail: {
                    title: '\\(\\operatorname{TREE}(3)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>定义。</strong>按照 Friedman 的定义，考虑顶点标号取自 \\(\\{1,2,3\\}\\) 的有限非空根树；兄弟节点之间没有顺序，标号可以重复。\\(\\operatorname{TREE}(3)\\) 是满足下列条件的树序列 \\(T_1,\\ldots,T_m\\) 的最大可能长度 \\(m\\)：第 \\(i\\) 棵树 \\(T_i\\) 至多有 \\(i\\) 个顶点，并且对任意 \\(i\\lt{}j\\)，都不存在从 \\(T_i\\) 到 \\(T_j\\) 的保标号、保下确界的同胚嵌入。对根树而言，保下确界等价于保持最低公共祖先关系；一条边可以映射成一条路径，但不同的源分支必须进入不同的目标分支。</p><p><strong>为什么理论穷举会终止。</strong>在第 \\(i\\) 个位置，至多 \\(i\\) 个顶点的三标号根树只有有限多棵，因此所有合法序列前缀构成一棵有限分支树。若任意长度的合法序列都存在，König 引理就会给出一条无限分支，也就是一个无限坏序列；这与 Kruskal 树定理矛盾。因此下面的广度优先穷举最终一定遇到空的下一层，并返回最长长度。这个结论只说明算法在无界资源的理想模型中终止，并不表示现实计算机能够完成它。</p><p><strong>正式来源：</strong><a href="https://fomarchive.ugent.be/2006-March/010279.html">Harvey Friedman, “273: Sigma01/optimal/size”</a> 给出了 \\(\\operatorname{TREE}(k)\\) 的原始定义；<a href="https://www.ams.org/tran/1960-095-02/S0002-9947-1960-0111704-1/S0002-9947-1960-0111704-1.pdf">J. B. Kruskal, “Well-quasi-ordering, the Tree Theorem, and Vázsonyi’s Conjecture” (1960)</a> 是保证穷举终止所用树定理的原论文。</p>`,
                        },
                        {
                            type: 'code',
                            language: 'python',
                            display: 'dialog',
                            title: '三标号 TREE 的理论穷举程序',
                            openLabel: '查看理论穷举程序',
                            closeLabel: '关闭程序',
                            source: `from functools import cache
from itertools import permutations, product


# 一棵树的规范表示为：
#     (根标号, 已排序的子树元组)
# 对子树排序会消除兄弟节点的次序。

def valid_parent_array(parent):
    """判断 parent[1:] 是否描述了一棵以顶点 0 为根的树。"""
    for start in range(1, len(parent)):
        seen = set()
        vertex = start

        while vertex != 0:
            if vertex in seen:
                return False
            seen.add(vertex)
            vertex = parent[vertex]

    return True


def canonical_tree(parent, labels):
    """丢弃顶点编号，返回无序根树的规范表示。"""
    children = [[] for _ in parent]

    for vertex in range(1, len(parent)):
        children[parent[vertex]].append(vertex)

    def build(vertex):
        return (
            labels[vertex],
            tuple(sorted(build(child) for child in children[vertex])),
        )

    return build(0)


@cache
def trees_of_size(number_of_labels, size):
    """枚举恰有 size 个顶点的全部非空无序带标号根树。"""
    result = set()

    # 顶点 0 是根；其他每个顶点都选择一个父节点。
    for tail in product(range(size), repeat=size - 1):
        parent = (-1,) + tail

        if not valid_parent_array(parent):
            continue

        # 标号可以任意选择并重复。
        for labels in product(range(number_of_labels), repeat=size):
            result.add(canonical_tree(parent, labels))

    return tuple(sorted(result))


@cache
def embeds(source, target):
    """判断是否存在保标号、保下确界的同胚嵌入。"""
    source_label, source_children = source
    target_label, target_children = target

    # dive：源树的根映射到目标树根的下方。
    if any(embeds(source, child) for child in target_children):
        return True

    # couple：两棵树的根相配。
    if source_label != target_label:
        return False

    if len(source_children) > len(target_children):
        return False

    # 把源分支单射地分配给目标分支。
    return any(
        all(
            embeds(source_child, target_children[target_index])
            for source_child, target_index
            in zip(source_children, target_indices)
        )
        for target_indices in permutations(
            range(len(target_children)),
            len(source_children),
        )
    )


def TREE(number_of_labels):
    """逐层枚举所有坏序列并返回 TREE(number_of_labels)。"""
    if number_of_labels < 1:
        raise ValueError("number_of_labels 必须是正整数")

    # frontier 包含长度恰为 depth 的全部合法序列。
    frontier = {()}
    depth = 0

    while frontier:
        index = depth + 1

        # 第 index 棵树可以有 1 至 index 个顶点。
        candidates = tuple(
            tree
            for size in range(1, index + 1)
            for tree in trees_of_size(number_of_labels, size)
        )

        next_frontier = set()

        for sequence in frontier:
            for candidate in candidates:
                # 只禁止较早的树嵌入较晚的树。
                if all(
                    not embeds(earlier, candidate)
                    for earlier in sequence
                ):
                    next_frontier.add(sequence + (candidate,))

        # 长度 depth 可行，而长度 depth + 1 不可行。
        if not next_frontier:
            return depth

        frontier = next_frontier
        depth += 1


assert TREE(1) == 1
assert TREE(2) == 3

print(TREE(3))`,
                        },
                        {
                            type: 'html',
                            html: `<p>\\(\\operatorname{TREE}(3)\\) 略高于 SVO 层级。HypCos 对 \\(\\operatorname{tree}\\) 函数和 \\(\\operatorname{TREE}(3)\\) 做过进一步分析，可参阅以下资料：</p><ul><li><a href="https://googology.fandom.com/wiki/User_blog:Hyp_cos/tree_function_and_TREE(3)">\\(\\operatorname{tree}\\) function and \\(\\operatorname{TREE}(3)\\)</a></li><li><a href="https://www.zhihu.com/question/667616017/answer/13389602444">知乎：葛立恒数、\\(\\operatorname{TREE}(3)\\) 与 \\(\\operatorname{SCG}(13)\\) 如何用 BMS 表示？</a></li><li><a href="https://www.zhihu.com/question/353941713/answer/885942447">知乎：葛立恒数、\\(\\operatorname{tree}(3)\\) 等数为何如此巨大？</a></li></ul>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-088': {
                label: '\\({\\varphi}({\\omega}@{\\omega})\\)',
                detail: {
                    title: '\\({\\varphi}({\\omega}@{\\omega})\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(\\operatorname{TREE}\\) 函数位于这一层级。不过，这里并不是标志性节点；除了 \\(\\operatorname{TREE}\\) 函数，这里没有其他内容。</p>`,
                        },
                    ],
                },
            },
            'item-089': {
                label: '\\(\\operatorname{TREE}(n)\\)',
                detail: {
                    title: '\\(\\operatorname{TREE}\\) 函数',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>\\(\\operatorname{TREE}(1)=1\\)，\\(\\operatorname{TREE}(2)=3\\)；从 \\(\\operatorname{TREE}(3)\\) 开始，其数值便已远超通常的大数记法所能直观表达的范围。</p>`,
                        },
                    ],
                },
            },
            'item-090': {
                label: 'LVO',
                detail: {
                    title: 'LVO',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>LVO 即 large Veblen ordinal（大 Veblen 序数）。它把 Veblen 构造推广到超限参数位置，同时要求每个表达式仅有有限多个非零参数；LVO 是这些有限支撑、超限位置 Veblen 运算的闭包界。在 Veblen 的原始体系中，它也称为 \\(E(0)\\) 或 great Veblen number。</p><p>由于这一扩展包含任意有限元 Veblen 层级，LVO 位于 SVO 之上。</p><p><strong>来源：</strong><a href="https://doi.org/10.1090/S0002-9947-1908-1500814-9">Oswald Veblen，《Continuous Increasing Functions of Finite and Transfinite Ordinals》（1908）</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-091': {
                label: '\\(\\mathrm{BHO}={\\psi}({\\Omega}_{2})\\)',
                detail: {
                    title: '\\(\\mathrm{BHO}={\\psi}({\\Omega}_{2})\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Bachmann–Howard 序数由序数坍缩构造得到：先在闭包运算中引入辅助的 \\(\\Omega\\) 层级，再由 \\(\\psi\\) 将所得结构坍缩回可数序数。在本站采用的 Buchholz 约定中，\\(\\psi\\) 表示 \\(\\psi_0\\)，并写作\\[\\mathrm{BHO}=\\psi_0(\\Omega_2).\\]</p><p>辅助符号 \\(\\Omega_n\\) 是递归闭包构造的脚手架；\\(\\psi_0\\) 最终返回的值仍是可数序数。</p><p><strong>来源：</strong><a href="https://doi.org/10.1016/0168-0072(86)90052-7">Wilfried Buchholz，《A new system of proof-theoretic ordinal functions》（1986）</a>（<a href="https://epub.ub.uni-muenchen.de/3841/1/3841.pdf">开放 PDF</a>）。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-092': {
                label: '\\(\\mathrm{BO}={\\psi}({\\Omega}_{{\\omega}})\\)',
                detail: {
                    title: 'Buchholz ordinal（\\(\\mathrm{BO}={\\psi}({\\Omega}_{{\\omega}})\\)）',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>BMS 表示：</strong>\\((0,0,0)(1,1,1)=(0,0)(1,1)(2,2)(3,3)\\ldots\\)</p><p>在同一 Buchholz 约定下，令\\[\\Omega_\\omega=\\sup_{1\\leq n\\lt{}\\omega}\\Omega_n.\\]本站所称 Buchholz ordinal 为\\[\\mathrm{BO}:=\\psi_0(\\Omega_\\omega)=\\sup_{1\\leq n\\lt{}\\omega}\\psi_0(\\Omega_n).\\]因此，它是所有有限 \\(\\Omega_n\\) 坍缩层级的可数极限。与上一条相同，标题里简写的 \\(\\psi\\) 表示 \\(\\psi_0\\)；\\(\\Omega_\\omega\\) 中的 \\(\\omega\\) 是下标而不是指数。</p><p><strong>来源：</strong><a href="https://doi.org/10.1016/0168-0072(86)90052-7">Wilfried Buchholz，《A new system of proof-theoretic ordinal functions》（1986）</a>（<a href="https://epub.ub.uni-muenchen.de/3841/1/3841.pdf">开放 PDF</a>）。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-093': {
                label: '\\(\\mathrm{BMS}:(0,0,0)(1,1,1)\\)',
            },
            'item-094': {
                label: '\\(\\mathrm{TFB}={\\psi}({\\Omega}_{{\\omega}+1})\\)',
                detail: {
                    title: '\\(\\mathrm{TFB}={\\psi}({\\Omega}_{{\\omega}+1})\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>也可写作 \\({\\psi}({\\varepsilon}_{{\\Omega}_{{\\omega}}+1})\\)。此处的 TFB 表示 Buchholz hydra 的极限。</p>`,
                        },
                    ],
                },
            },
            'item-095': {
                label: 'EBO',
                detail: {
                    title: 'EBO（Extended Buchholz ordinal）',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>BMS 表示：</strong>\\((0,0,0)(1,1,1)(2,1,1)(3,1,0)(2,0,0)\\)</p><p>这里的 EBO 指 <a href="https://googology.fandom.com/wiki/Extended_Buchholz's_function">Extended Buchholz's function</a> 的极限。</p>`,
                        },
                    ],
                },
            },
            'item-096': {
                label: '\\(\\mathrm{BMS}:(0,0,0)(1,1,1)(2,1,1)(3,1,0)(2,0,0)\\)',
            },
            'item-097': {
                label: 'SSO',
                detail: {
                    title: 'SSO（Small Stegert ordinal，非正式名称）',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>BMS 表示：</strong>\\((0,0,0)(1,1,1)(2,2,0)\\)</p><p>SSO 是此处采用的常见非正式名称；同一缩写有时也指其他序数。需要精确指代时，建议直接使用上述 BMS 表达式。</p>`,
                        },
                    ],
                },
            },
            'item-098': {
                label: '\\(\\mathrm{BMS}:(0,0,0)(1,1,1)(2,2,0)\\)',
            },
            'item-099': {
                label: 'LRO',
                detail: {
                    title: 'LRO（Large Rathjen ordinal，非正式名称）',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>BMS 表示：</strong>\\((0,0,0)(1,1,1)(2,2,2)\\)</p><p>LRO 是此处采用的常见非正式名称；同一缩写有时也指其他序数。需要精确指代时，建议直接使用上述 BMS 表达式。</p>`,
                        },
                    ],
                },
            },
            'item-100': {
                label: '\\(\\mathrm{BMS}:(0,0,0)(1,1,1)(2,2,2)\\)',
            },
            'item-101': {
                label: '三行 BMS',
                detail: {
                    title: '三行 BMS',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>这里的“三行”指 BMS 矩阵的每一列都由三个自然数组成。在本页的尺度布局中，本条位于三行 BMS 区间的上端；紧随其后的四元列 \\((0,0,0,0)(1,1,1,1)\\) 开始四行 BMS 区间，因此本条也作为两个行数层级之间的过渡标记。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-102': {
                label: '\\(\\mathrm{BMS}:(0,0,0,0)(1,1,1,1)\\)',
            },
            'item-103': {
                label: "\\(\\boldsymbol{\\lim(\\mathbf{BMS})}\\) · SHO",
                detail: {
                    title: "BMS 极限（SHO）",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>Bashicu Matrix System（BMS）用自然数矩阵表示序数，展开时依据父关系复制并增加坏部。允许任意有限行数后得到的整个标准域极限，在大数社区中常称为 SHO（Small Hydra Ordinal）。</p><p>SHO 是沿用的社区历史名称，不按字面将它等同于某个特定九头蛇游戏的序数。BMS 的良序性已有证明；矩阵行数增加会进入新的阶段，这里取所有有限行数的整体极限。</p><p><strong>来源：</strong><a href=\"https://github.com/EgoFakeFantasy/BMS-Well-Ordering-Lean\">BMS 良序形式化与原论文来源</a>；<a href=\"https://github.com/Phyrion1343/1Y-Well-Ordering-Lean\">0-Y／BMS 对应与标准域良序证明</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-105': {
                label: '\\(Y:(1,3)\\)',
            },
            'item-106': {
                label: '\\(\\operatorname{SCG}(n)\\)',
                detail: {
                    title: '\\(\\operatorname{SCG}\\) 函数',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>一个有限无向图若每个顶点的度数都不超过 \\(3\\)，就称为 subcubic graph。SSCG 使用没有自环和重边的 simple subcubic graphs；SCG 则允许自环和重边，两者都不要求图连通。</p><p><strong>定义。</strong>固定 \\(k\\in\\mathbb N\\)，考虑序列 \\(G_1,\\ldots,G_N\\)，其中 \\(|V(G_i)|\\leq i+k\\)，并且不存在 \\(i\\lt j\\) 使 \\(G_i\\) 可同胚嵌入 \\(G_j\\)。这里“可同胚嵌入”是指 \\(G_i\\) 的某个边细分同构于 \\(G_j\\) 的一个子图。\\(\\operatorname{SCG}(k)\\) 是这类 subcubic graph 序列的最大长度；若只允许简单图，所得函数就是 \\(\\operatorname{SSCG}(k)\\)。因此 \\[\\operatorname{SCG}(k)\\geq\\operatorname{SSCG}(k).\\]</p><p>有限 subcubic graphs 在可同胚嵌入下构成良拟序，所以不存在无限长的上述“坏序列”。另一方面，在给定顶点数上界时只有有限多个同构类型；对坏序列组成的有限分支树应用 König 引理，便得到每个 \\(k\\) 对应的有限最大长度。</p><p>Friedman 证明，\\(\\operatorname{SSCG}(13)\\) 已大于任何满足下述条件的空白纸带 Turing machine 的停机时间：其停机性在 \\(\\Pi^1_1\\text{-}\\mathrm{CA}_0\\) 中能由不超过 \\(2^{[2000]}\\) 个符号的证明给出，其中 \\(2^{[r]}\\) 表示高度为 \\(r\\) 的 \\(2\\) 的指数塔。随后他去掉“简单图”限制，将同一结果重述为 \\(\\operatorname{SCG}(13)\\)，并指出相比之下 \\(\\operatorname{TREE}(3)\\) 小到可以忽略。</p><p><strong>来源：</strong><a href="https://fomarchive.ugent.be/2006-April/010305.html">Harvey M. Friedman，FOM #274《Subcubic Graph Numbers》</a>；<a href="https://fomarchive.ugent.be/2006-April/010362.html">Harvey M. Friedman，FOM #279《Subcubic Graph Numbers/restated》</a>；<a href="https://doi.org/10.1090/conm/065/891251">Friedman、Robertson、Seymour，《The Metamathematics of the Graph Minor Theorem》</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-107': {
                label: "\\(Y:(1,4)\\)",
                detail: {
                    title: "\\(Y:(1,4)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>这里是各种 BMS 扩展的坟墓。</p><p>\\((1,4)\\) 是 Y 标准种子 \\((1,m)\\)、\\(m\\ge2\\) 中的一个固定种子，表示整个 Y 极限以下的一个阶段。标准 Y 序列按通常的数列字典序比较；第二项满足 \\(3\\lt4\\)，所以\\[Y(1,3,4,3)\\lt Y(1,4).\\]左边更长的尾部不会改变第二项已经决定的次序。</p><p><strong>来源：</strong><a href=\"https://github.com/Phyrion1343/1Y-Well-Ordering-Lean\">Y 标准生成域、字典序与良序证明</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-108': {
                label: "\\(\\lim(Y)\\)",
                detail: {
                    title: "\\(\\lim(Y)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>Y 序列由 Yukito 提出。它把有限自然数序列展开成带祖先关系的差分山脉，再按末端结构复制、调整并还原为数列。这里取标准种子 \\((1,m)\\)、\\(m\\ge2\\) 所生成的整个序数系统的极限。</p><p>2026 年 9 月 11 日，@Phyrion 公布了 Y 序列的良序证明；随后 @test_alpha0 将证明所用的公理体系降至 \\(KP_\\omega+\\text{“}\\omega_1\\text{ 存在”}\\)。这使 Y 的具体展开规则接上了弱集合论中的良序分析。</p><p><strong>来源：</strong><a href=\"https://github.com/Phyrion1343/1Y-Well-Ordering-Lean\">Y 良序证明与形式化</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/README.zh-CN.md\">进展记录</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/well-ordering.zh-CN.md\">弱集合论内的证明</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-109': {
                label: "\\(\\lim(\\omega\\text{-}Y)\\)",
                detail: {
                    title: "\\(\\lim(\\omega\\text{-}Y)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>\\(\\omega\\)-Y 将 Y 的山脉构造推进到任意有限层数。本条采用 NER 中 omega-Y 的 weak magma 版本，标示整个标准域的极限。</p><p>该系统已有 \\(KP_\\omega+\\text{“}\\omega_1\\text{ 存在”}\\) 下的良序证明。列图版本 CWY2 把相同结构写成父地址和有限词组成的列；已收录的对应证明给出 CWY2 与 \\(\\omega\\)-Y 标准域的序同构，并保持基本列逐项展开。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/notations/CWY2/definition.zh-CN.md\">CWY2 定义及所引 \\(\\omega\\)-Y 良序原稿</a>；<a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/proofs/paper/cwy2-equivalence.zh-CN.md\">CWY2／\\(\\omega\\)-Y 等价证明</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-111': {
                label: "iBLP",
                detail: {
                    title: "iBLP：Infinite Basic Laver Patterns",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>@test_alpha0 的基本 Laver 模式（BLP）用有限行与步长记录初等嵌入临界点间的关系；HypCos 在此基础上把 modify 步骤改成无限展开，形成 iBLP。NER 将其收录为 DEN2（IBLP），现行规则包含标记补全。</p><p>大数社区持续分析它与 BMS、Y 和 \\(\\omega\\)-Y 的联系；2026 年的分析表已把具体 iBLP 项的下界推进到 Y 序列极限。另有在 \\(\\mathrm{ZFC}+I_3\\) 下证明一个指定六行标准根的展开终止的工作。</p><p><strong>来源：</strong><a href=\"https://arxiv.org/abs/2501.06733v5\">@test_alpha0，《Notes on Laver Tables》</a>；<a href=\"https://github.com/QiRenrui/basic-laver-pattern/blob/main/laver-tables-background.md\">BLP／iBLP 背景与进展</a>；<a href=\"https://github.com/QiRenrui/basic-laver-pattern/blob/main/IBLP_wellfoundedness_en.pdf\">指定 iBLP 根在 \\(I_3\\) 下的良基性证明</a>；<a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">NER 展开器</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-112': {
                label: 'Laver Table \\(q(5)\\)',
                detail: {
                    title: 'Laver Table \\(q(5)\\)',
                    sections: [
                        {
                            type: 'html',
                            html: `<p><strong>下界。</strong>@test_alpha0 提出的基本 Laver 模式（BLP）给出了 \\(q(5)\\) 的一个极小下界。相关论文严格证明了这一 BLP 导出的下界超过 \\(\\varepsilon_0\\) 级大数。</p><p>大数社区中对 BLP／iBLP 的进一步分析认为，它们远超 BMS，甚至远超 \\(\\omega\\)-Y 序列级别。</p><p><strong>来源：</strong><a href="https://arxiv.org/abs/2501.06733v5">@test_alpha0，《Notes on Laver Tables》（Basic Laver Patterns 相关结果）</a>。</p>`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-113': {
                label: 'Laver Table',
                detail: {
                    title: 'Laver Table',
                    sections: [
                        {
                            type: 'html',
                            html: `<p>Laver Table 是集合论中研究的一类特殊有限代数结构。第 \\(n\\) 张 Laver Table \\(A_n\\) 的底集为 \\(\\{1,\\ldots,2^n\\}\\)，其运算由下列递归唯一确定：\\[2^n\\star_n b=b,\\qquad a\\star_n1=a+1,\\]\\[a\\star_n(b+1)=(a\\star_n b)\\star_n(a+1)\\qquad(a,b\\lt{}2^n).\\]该运算满足左自分配律\\[a\\star_n(b\\star_n c)=(a\\star_n b)\\star_n(a\\star_n c).\\]</p><p>对每个 \\(a\\)，序列 \\(a\\star_n1,a\\star_n2,\\ldots\\) 周期重复。它的最小周期是 \\(2\\) 的幂；一个周期内的值严格递增，最后到达 \\(2^n\\)。自然的模 \\(2^n\\) 投影 \\(A_{n+1}\\to A_n\\) 是同态。</p><p>记 \\(\\pi_k(1)\\) 为 \\(A_k\\) 第一行的最小周期，并定义\\[q(n)=\\min\\{k\\in\\mathbb N\\mid\\pi_k(1)=2^n\\}.\\]因此 \\(q(n)\\) 是第一行周期首次成为 \\(2^n\\) 的最小表编号，相应代数 \\(A_{q(n)}\\) 的阶数为 \\(2^{q(n)}\\)。下面的程序按 \\(k=0,1,2,\\ldots\\) 完整构造各张 Laver Table 并检查第一行；它能验证 \\(q(0),\\ldots,q(4)=(0,2,3,5,9)\\)，也在不计时间与内存开销的意义下给出了计算一般 \\(q(n)\\) 的穷举过程。在 \\(I_3\\) 假设下，Laver 的周期无界定理保证对每个 \\(n\\) 搜索最终终止。</p><p><strong>来源：</strong><a href="https://arxiv.org/abs/math/9503204">Randall Dougherty，《Critical points in an algebra of elementary embeddings, II》，§2 与 Proposition 2.5</a>；<a href="https://arxiv.org/abs/1810.00548">Philippe Biane，《Laver tables and combinatorics》，§§2–3、§7.2</a>。</p>`,
                        },
                        {
                            type: 'code',
                            language: 'python',
                            display: 'dialog',
                            title: '穷举 Laver Table 的 \\(q(n)\\)',
                            openLabel: '查看 \\(q(n)\\) 穷举程序',
                            closeLabel: '关闭程序',
                            source: `def laver_table(k):
    """按照递归定义构造第 k 张完整 Laver Table。"""
    size = 1 << k
    table = [[0] * (size + 1) for _ in range(size + 1)]

    # 最后一行满足 2^k ⋆ b = b。
    for b in range(1, size + 1):
        table[size][b] = b

    # 右侧所需的行编号严格大于 a，因此已经构造完成。
    for a in range(size - 1, 0, -1):
        table[a][1] = a + 1
        for b in range(1, size):
            table[a][b + 1] = table[table[a][b]][a + 1]

    return table


def first_row_period(k):
    """返回 A_k 第一行的最小周期。"""
    table = laver_table(k)
    size = 1 << k

    # 一个周期严格递增，并在末尾首次到达 2^k。
    return next(
        period
        for period in range(1, size + 1)
        if table[1][period] == size
    )


def q(n):
    """搜索第一行周期首次成为 2^n 的最小表编号。"""
    if n < 0:
        raise ValueError("n 必须是非负整数")

    target_period = 1 << n
    k = 0

    while first_row_period(k) != target_period:
        k += 1

    return k


assert [q(n) for n in range(5)] == [0, 2, 3, 5, 9]

requested_n = int(input("n = "))
print(f"q({requested_n}) = {q(requested_n)}")`,
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-114': {
                label: "LTY",
                detail: {
                    title: "LTY（Laver Table yarn）",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>LTY 是 Laver Table yarn 的缩写，也称“洛天依”，由 @test_alpha0 提出。它把一族初等嵌入生成的临界点序列交织成一个次序。</p><p>若 \\(\\gamma_{i,r}\\) 是第 \\(i\\) 个嵌入生成的第 \\(r\\) 个临界点，就按这些临界点的实际大小比较整数对 \\((i,r)\\)，得到良预序 \\(LTY_{\\vec j}\\)。论文利用可计算的递增嵌入族，使这个临界点次序也具有可计算表示；其中用于定义 \\(F_1\\) 的构造在 \\(I_2\\) 假设下给出相应良预序与 \\(F_1\\) 的全定义性。</p><p><strong>来源：</strong><a href=\"https://arxiv.org/html/2501.06733v5#S4\">@test_alpha0，《Notes on Laver Tables》，§4</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-115': {
                label: "\\(\\operatorname{PTO}(Z_3)\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(Z_3)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>\\(Z_3\\) 是三阶算术：除了自然数和自然数集合，还允许讨论自然数集合的集合，并配有相应的概括原则。</p><p>\\(\\operatorname{PTO}(T)\\) 表示理论 \\(T\\) 的证明论序数，用来衡量它能证明良序的可计算次序所达到的高度。这里从具体记号的极限转向公理体系的证明能力。</p><p><strong>相关资料：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/girard-oracle-bridge.zh-CN.md\">有限高阶算术与有类型程序的联系</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-116': {
                label: "\\(\\operatorname{PTO}(Z_\\omega)\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(Z_\\omega)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>\\(Z_\\omega\\) 汇集所有有限阶的高阶算术：在自然数之上不断增加集合类型，而每个具体公式只使用有限多阶。\\(\\operatorname{PTO}(Z_\\omega)\\) 标示这些有限阶理论共同达到的证明论高度。</p><p>有类型程序的归约为这一层级提供了另一种入口。附近的 Loader 数通过程序枚举和正规化制造巨大整数；DQDN 则把有类型查询程序的下降过程变成可逐项展开的图列记号。</p><p><strong>来源：</strong><a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy/blob/main/research/dqdn/girard-oracle-bridge.zh-CN.md\">DQDN 的 Girard／查询桥与 \\(Z_\\omega\\) 下界</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-117': {
                label: "Loader 数",
                detail: {
                    title: "Loader 数",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>Ralph Loader 的程序赢得了 2001 年 Bignum Bakeoff。比赛要求用至多 \\(512\\) 个非空白 C 字符生成尽可能大的整数，并把整数类型理想化为没有位数上限。</p><p>其核心过程 \\(D(x)\\) 枚举编码不超过 \\(x\\) 的候选程序，筛选构造演算（Calculus of Constructions，CoC）中类型正确的项，把它们正规化，再将结果编码汇总。最终输出是从 \\(99\\) 开始对 \\(D\\) 连续迭代五次：\\[D^{\\circ5}(99)=D(D(D(D(D(99))))).\\]CoC 中类型正确的项具有强正规化性质，这让程序可以系统地搜集极其强大的终止计算。</p><p><strong>来源：</strong><a href=\"https://djm.cc/bignum-results.txt\">Bignum Bakeoff 官方结果、程序与分析（loader.c）</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-118': {
                label: "\\(\\operatorname{PTO}(\\mathrm{ZFC})\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(\\mathrm{ZFC})\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>ZFC 是含选择公理的 Zermelo–Fraenkel 集合论。\\(\\operatorname{PTO}(\\mathrm{ZFC})\\) 在这里表示其证明论序数：把 ZFC 能证明良序的可计算次序放在一起，考察它们的序型上确界。</p><p>这个节点从集合论的证明能力来指定高度，不依赖选定某一种矩阵或序列展开器。横轴以它作为较强理论的参照。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-119': {
                label: "\\(\\operatorname{PTO}(\\mathrm{ZFC}+I_0)\\)",
                detail: {
                    title: "\\(\\operatorname{PTO}(\\mathrm{ZFC}+I_0)\\)",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>\\(I_0\\) 是秩入秩大基数假设：存在非平凡初等嵌入\\[j:L(V_{\\lambda+1})\\longrightarrow L(V_{\\lambda+1}),\\qquad\\operatorname{crit}(j)\\lt\\lambda.\\]在 ZFC 上加入这一假设，得到这里标示的更强理论。</p><p>Laver Table 一线同样研究初等嵌入及其临界点，但使用具体组合规则和相应的大基数假设展开分析。</p><p><strong>相关资料：</strong><a href=\"https://arxiv.org/html/2501.06733v5\">@test_alpha0，《Notes on Laver Tables》：秩入秩背景与临界点结构</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-120': {
                label: "Friedman 的有限组合原理",
                detail: {
                    title: "Friedman 的有限组合原理",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>这一支收集 Harvey Friedman 从有限组合数学出发研究强公理的工作。除树与图的坏序列外，主要方向还包括有限函数的回归性质、布尔关系理论，以及序不变图中的自由集与极大团。</p><p>“序不变”指关系只依赖各坐标的相对大小，而不依赖坐标的具体取值。给这些看似简单的关系加上有限选择、平移或极大性要求，可以得到与强集合论原则相连的命题；相应的有限界又成为大数问题的来源。</p><p><strong>继续阅读：</strong><a href=\"https://arxiv.org/abs/math/9811187\">《Finite functions and the necessary use of large cardinals》</a>；<a href=\"https://u.osu.edu/friedman.8/foundational-adventures/boolean-relation-theory-book/\">《Boolean Relation Theory and Incompleteness》</a>；<a href=\"https://fomarchive.ugent.be/2014-July/018027.html\">《Order Invariant Graphs and Incompleteness》</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-121': {
                label: "\\(\\operatorname{BB}(n)\\)",
                detail: {
                    title: "忙碌海狸函数（Busy Beaver）",
                    sections: [
                        {
                            type: 'html',
                            html: "<p>固定两符号、空白纸带的确定型图灵机，计数 \\(n\\) 个非停机状态。忙碌海狸函数常用两种约定：\\(\\Sigma(n)\\) 是停机时纸带上最多能留下的 \\(1\\) 的数量；\\(S(n)\\) 是停机前最多能执行的步数。本页以 \\(S(n)\\) 作为 \\(\\operatorname{BB}(n)\\)。</p><p>只取最终停机的机器，因而每个参数都给出有限整数；但整个函数不可计算，而且最终超过每个全可计算函数。横轴在此处断开，转入不可计算增长。</p><p><strong>来源：</strong><a href=\"https://doi.org/10.1002/j.1538-7305.1962.tb00480.x\">Tibor Radó，《On Non-Computable Functions》（1962）</a>。</p>",
                        },
                        unreviewedNotice(),
                    ],
                },
            },
            'item-122': {
                label: '\\(\\operatorname{Rayo}(n)\\)',
                detail: {
                    title: '拉约数（Rayo’s number）',
                    sections: [
                        {
                            type: 'html',
                            html: `
                                <p>\\(\\operatorname{Rayo}(n)\\) 是严格大于下列所有自然数的最小自然数：可以用少于 \\(n\\) 个符号的一阶集合论公式唯一刻画的自然数。</p>
                                <p>这里的“唯一刻画”通过满足关系 \\(\\operatorname{Sat}\\) 形式化，而 \\(\\operatorname{Sat}\\) 本身用二阶集合论定义。因此，这个构造使用二阶集合论来描述一阶集合论公式的语义，并不是使用二阶算术语言。</p>
                                <p>2007 年“大数决斗”中取 \\(n=10^{100}\\)；\\(\\operatorname{Rayo}(10^{100})\\) 通常称为拉约数。</p>
                            `,
                        },
                    ],
                },
            },
        },
    });
})(globalThis);
