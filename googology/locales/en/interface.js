(function registerEnglishInterface(global) {
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
        code: 'en',
        name: 'English',
        direction: 'ltr'
    });

    i18n.registerMessages('en', {
        ui: {
            documentTitle: 'Googology Scale',
            title: 'Googology Scale',
            language: 'Language',
            modalLabel: 'Content details',
            modalClose: 'Close details',
            filters: {
                label: 'Content filters',
                all: 'Show all',
                info: 'Only entries with explanations',
                code: 'Only entries with code',
                zoomVisibility: 'Hide by zoom automatically',
                manualLevel: 'Visible level: {level} (0–3)'
            },
            view: {
                label: 'View controls',
                zoom: 'Zoom: ',
                hint: 'Scroll to zoom / drag to pan',
                reset: 'Back to start',
                zoomIn: 'Zoom in',
                zoomOut: 'Zoom out'
            }
        },
        branches: {
            'branch-1': {
                text: 'Y sequences and variants',
                detail: document('Y sequences and variants', [
                    html(
                        '<p>A matrix-system extension developed by several googologists to explore growth beyond BMS.</p>'
                    )
                ])
            },
            'branch-2': {
                text: 'Laver-table constructions',
                detail: document('Laver-table constructions', [
                    html(
                        '<p>Originating in large-cardinal axioms in set theory, these constructions are closely related to the combinatorial properties of finite algebraic structures and have a highly distinctive growth rate.</p>'
                    )
                ])
            },
            'branch-3': {
                text: 'PTO series',
                detail: document('Proof-theoretic ordinal (PTO) series', [
                    html(
                        '<p>A scale for measuring the “strength” of mathematical systems. From ZFC to systems with various large-cardinal axioms, the corresponding growth rates are the fastest currently known.</p>'
                    )
                ])
            },
            'branch-4': {
                text: 'Unstudied content',
                detail: document('Unstudied content', [
                    html(
                        '<p>Definitions in large-number research that have not yet been fully formalized or analyzed in depth.</p>'
                    )
                ])
            }
        },
        axisSegments: {
            'axis-00': {
                text: 'The physical world',
                detail: document('The physical world', [
                    html(
                        '<p>Below \\(10^{100}.\\) Numbers connected with the physical world, or even the universe as a whole, do not usually exceed this range.</p>'
                    )
                ])
            },
            'axis-01': {
                text: 'Hyperoperations',
                detail: document('Hyperoperations', [
                    html(
                        '<p>Far beyond every number encountered in the physical world, yet obtainable algorithmically through simple iteration.</p>'
                    )
                ])
            },
            'axis-02': {
                text: 'Basic FGH',
                detail: document('Basic FGH', [
                    html(
                        '<p>Combining fast-growing hierarchies with ordinals makes it possible to describe extremely complex function nesting and construct still larger numbers.</p>'
                    )
                ])
            },
            'axis-03': {
                text: '\\(\\varphi\\)-functions and OCFs',
                detail: document('\\(\\varphi\\)-functions and OCFs', [
                    html(
                        '<p>This region introduces the <a href="' + links.veblen +
                        '">Veblen \\(\\varphi\\)-function</a> and <a href="' + links.ocf +
                        '">ordinal collapsing functions (OCFs)</a> to represent larger ordinals.</p>'
                    )
                ])
            },
            'axis-04': {
                text: 'Extended OCFs',
                detail: document('Extended OCFs', [
                    html(
                        '<p>OCFs are extended by introducing larger cardinals such as \\(I\\), \\(M\\), and \\(K\\) to build stronger ordinal systems. ' +
                        'Because large-cardinal OCF rules are so convoluted, they have now largely been abandoned and replaced by BMS.</p>'
                    )
                ])
            },
            'axis-05': {
                text: 'BMS',
                detail: document(
                    '<a href="' + links.bms +
                    '">BMS (Bashicu Matrix System)</a>',
                    [
                        html(
                            '<p>BMS is extremely strong while having relatively simple rules, so it has become the most common yardstick in googology.</p>'
                        )
                    ]
                )
            },
            'axis-06': {
                text: 'Unknown frontier',
                detail: document('Entering the unknown', [
                    html(
                        '<p>This is the current research frontier. The subject is extremely difficult and little is known about it. ' +
                        'Many entries cannot yet be compared, and most lack rigorous termination proofs.</p>' +
                        '<p>This page separates different kinds of notation into branches; the ordering between branches is currently unknown.</p>'
                    )
                ])
            },
            'axis-07': {
                text: 'Uncomputable large numbers',
                detail: document('Uncomputable large numbers', [
                    html(
                        '<p>Uncomputable large numbers exceed every computable function. They cannot be represented by program code, ' +
                        'and most follow an idea like “the largest number expressible in \\(N\\) characters of some language,” so relatively few people are interested in them.</p>'
                    )
                ])
            }
        },
        axisSubSegments: {
            'subaxis-00': {
                text: 'Everyday numbers',
                detail: document('Everyday numbers', [
                    html(
                        '<p>Roughly \\(0\\) through \\(10^{10}\\), covering most numbers encountered in everyday life.</p>'
                    )
                ])
            },
            'subaxis-01': {
                text: 'Astronomical numbers',
                detail: document('Astronomical numbers', [
                    html(
                        '<p>Roughly \\(10^{10}\\) through \\(10^{100},\\) including numbers commonly used in astronomy, physics, and computing.</p>'
                    )
                ])
            },
            'subaxis-02': {
                text: 'Exponential explosion',
                detail: document('Exponential explosion', [
                    html(
                        '<p>From \\(10^{100}\\) to \\(10\\uparrow{}\\uparrow{}10.\\) This range includes large numbers with mathematical or physical significance, ' +
                        'such as the number of Go positions and Poincaré recurrence times. Beyond it, numbers have almost no practical significance.</p>'
                    )
                ])
            },
            'subaxis-03': {
                text: 'Hyperoperations',
                detail: document('Hyperoperations', [
                    html(
                        '<p>The beginning of “large numbers.” From here on, numbers have lost all practical significance and become a purely mathematical game.</p>' +
                        '<p>The best-known notation here is <a href="' + links.arrows +
                        '">Knuth’s up-arrow notation</a>. It repeatedly nests operations to produce fourth-, fifth-, and ultimately \\(n\\)th-level operations.</p>'
                    )
                ])
            },
            'subaxis-04': {
                text: 'Function nesting',
                detail: document('Function nesting', [
                    html(
                        '<p>The elementary stage of “large numbers.” This region introduces diagonalization: functions are nested, ' +
                        'and the number of nestings is itself used as a parameter for further nesting.</p>' +
                        '<p>Nesting with the iteration count as a parameter reaches the famous ' +
                        '<a href="' + links.graham + '">Graham’s number</a>. Continuing the process, ' +
                        'and repeatedly nesting the nesting count itself, eventually reaches the level of ' +
                        '\\(f_{{\\omega}^{2}}(n).\\)</p>' +
                        '<p>At that point a more systematic method is needed: the ' +
                        '<a href="' + links.fgh + '">fast-growing hierarchy</a>.</p>'
                    )
                ])
            },
            'subaxis-05': {
                text: 'FGH and ordinals',
                detail: document('FGH and ordinals', [
                    html(
                        '<p>The introductory stage of “large numbers.” This region introduces the ' +
                        '<a href="' + links.fgh + '">fast-growing hierarchy</a> and ordinals.</p>' +
                        '<p>Introducing \\(\\omega\\) and its addition, multiplication, and exponentiation operations alongside an FGH enables many levels of function nesting. ' +
                        'Eventually every power construction with \\(\\omega\\) is exhausted at ' +
                        '\\(\\omega^{\\omega^{\\omega^{\\ldots^{\\omega}}}}\\), and a new symbol is needed.</p>' +
                        '<p>This limit is called <a href="' + links.epsilon0 +
                        '">\\(\\varepsilon_0\\)</a>, an important landmark.</p>' +
                        '<p>A simple piecewise function called a <a href="' +
                        links.pseudoFusible + '">pseudo-fusible number</a> can construct a number at this level:</p>' +
                        '<ul><li>\\(f(x)=-x,\\quad x\\lt 0\\)</li>' +
                        '<li>\\(f(x)=0.5\\times f(x-f(x-1)),\\quad x\\ge 0\\)</li></ul>' +
                        '<p>Then \\(1/f(n)\\) is an \\(\\varepsilon_0\\)-level large number.</p>' +
                        '<p>Besides expressions containing \\(\\omega\\), ordinals in this region are often written with ' +
                        '<a href="' + links.prss +
                        '">PrSS (Primitive Sequence System)</a>. ' +
                        'PrSS is friendlier to program implementations; its program definition is shown below.</p>'
                    ),
                    code('python', prssSource, 'Python · PrSS')
                ])
            },
            'subaxis-06': {
                text: '\\(\\varphi\\)-functions',
                detail: document(
                    '\\(\\varepsilon_0\\) to \\(\\Gamma_0\\): \\(\\varphi\\)-functions',
                    [
                        html(
                            '<p>The intermediate stage of “large numbers.” The most common tool in this segment is the ' +
                            '<a href="' + links.veblen +
                            '">Veblen \\(\\varphi\\)-function</a>, which is similar to hyperoperations on \\(\\omega\\).</p>' +
                            '<p>Let \\(\\varepsilon_0=\\omega^{\\omega^{\\omega^{\\ldots^{\\omega}}}}\\), ' +
                            'then let \\(\\varepsilon_1=\\varepsilon_0^{\\varepsilon_0^{\\varepsilon_0^{\\ldots}}}\\).</p>' +
                            '<p>One may also set ' +
                            '\\(\\varepsilon_1=\\omega^{\\omega^{\\omega^{\\ldots^{\\varepsilon_0+1}}}}\\). ' +
                            'Although this is not exactly the same in an FGH, the gap is extremely small. ' +
                            'The top of the tower cannot be \\(\\varepsilon_0\\) itself, because it disappears in the first expansion and gives nothing beyond \\(\\varepsilon_0\\).</p>' +
                            '<p>As an empirical rule, mathematically equal ordinals such as \\(\\varepsilon_0\\) and ' +
                            '\\(\\omega^{\\varepsilon_0}\\) need not be exactly equal in an FGH, but are very likely to be close.</p>' +
                            '<p>Let \\(\\varepsilon_2=\\varepsilon_1^{\\varepsilon_1^{\\varepsilon_1^{\\ldots}}}\\), ' +
                            'then continue with \\(\\varepsilon_3\\), \\(\\varepsilon_\\omega\\), ' +
                            '\\(\\varepsilon_{\\varepsilon_0}\\), and so on.</p>' +
                            '<p>Next let \\(\\zeta_0=\\varepsilon_{\\varepsilon_{\\varepsilon_{\\ldots}}}\\), ' +
                            'then continue with \\(\\zeta_1\\), \\(\\zeta_\\omega\\), ' +
                            '\\(\\zeta_{\\zeta_0}\\), and so on; after that let ' +
                            '\\(\\eta_0=\\zeta_{\\zeta_{\\zeta_{\\ldots}}}\\).</p>' +
                            '<p>Nesting the same process \\(n\\) times is written \\(\\varphi(n,0)\\), ' +
                            'followed by \\(\\varphi(\\omega,0)\\), \\(\\varphi(\\omega+1,0)\\), ' +
                            '\\(\\varphi(\\varphi(\\omega,0),0)\\), and so on. ' +
                            'The infinite nesting of \\(\\varphi\\) is written \\(\\Gamma_0\\).</p>'
                        )
                    ]
                )
            },
            'subaxis-07': {
                text: 'Multivariate \\(\\varphi\\) and OCFs',
                detail: document(
                    '\\(\\Gamma_0\\) to BO: multivariate \\(\\varphi\\) and OCFs',
                    [
                        html(
                            '<p>The most common tools in this segment are multivariate and ordinal-arity extensions of the ' +
                            '<a href="' + links.veblen + '">Veblen \\(\\varphi\\)-function</a>, together with ' +
                            '<a href="' + links.ocf + '">ordinal collapsing functions</a>.</p>' +
                            '<p>The limit of the two-variable Veblen function is \\(\\Gamma_0\\). ' +
                            'Three-, four-, and eventually \\(n\\)-variable \\(\\varphi\\)-functions then reach the ' +
                            '<a href="' + links.svo + '">small Veblen ordinal (SVO)</a>.</p>' +
                            '<p>The famous tree and <a href="' + links.tree +
                            '">TREE</a> functions lie nearby: \\(\\operatorname{tree}(n)\\) and \\(\\operatorname{TREE}(3)\\) are almost at the SVO level, ' +
                            'while \\(\\operatorname{TREE}(n)\\) is slightly larger.</p>' +
                            '<p>Ordinal-arity \\(\\varphi\\) continues to the <a href="' + links.lvo +
                            '">large Veblen ordinal (LVO)</a>. Beyond that, OCFs—usually combinations of \\(\\Psi\\) and \\(\\Omega\\)—are commonly used.</p>' +
                            '<p>Multivariate extensions of \\(\\varphi\\) have much more complicated rules than OCFs, so beyond \\(\\Gamma_0\\), ' +
                            'people more often use OCFs or program-friendly notations such as <a href="' +
                            links.bms + '">BMS</a>.</p>'
                        )
                    ]
                )
            },
            'subaxis-08': {
                text: 'Simple extensions of \\(\\Psi\\)',
                detail: document('BO to EBO: simple extensions of \\(\\Psi\\)', [
                    html(
                        '<p>The advanced stage of “large numbers,” where the difficulty increases sharply. ' +
                        'The most common systems here are the <a href="' + links.extendedBuchholz +
                        '">extended Buchholz function</a> and <a href="' + links.bms +
                        '">BMS</a>.</p>' +
                        '<p>The well-known SCG and SSCG functions lie slightly above BO. They are currently conjectured to fall between ' +
                        '\\(\\Psi(\\Omega_\\omega\\times\\omega)\\) and \\(\\Psi(\\Omega_\\omega^\\omega)\\), corresponding in BMS to the interval from ' +
                        '\\((0,0,0)(1,1,1)(2,0,0)\\) through \\((0,0,0)(1,1,1)(2,1,0)(3,0,0)\\). No exact result is currently known.</p>'
                    )
                ])
            },
            'subaxis-09': {
                text: 'Large-cardinal \\(\\Psi\\)',
                detail: document('EBO to SSO: large-cardinal \\(\\Psi\\)', [
                    html(
                        '<p>Introducing large cardinals such as \\(I\\), \\(M\\), and \\(K\\) into \\(\\Psi\\) makes the definitions extremely complicated and disorderly, and relevant references are difficult to find.</p>' +
                        '<p>Compared with <a href="' + links.bms +
                        '">BMS</a>, however, the increase in strength is negligible: even using every available letter barely reaches \\((0,0,0)(1,1,1)(2,2,0)\\).</p>' +
                        '<p>Large-cardinal \\(\\Psi\\) is consequently used very little today, with BMS expressions usually used instead.</p>'
                    )
                ])
            },
            'subaxis-10': {
                text: '[TODO: choose a suitable name]',
                detail: document('[TODO: choose a suitable name]', [
                    html(
                        '<p>[TODO: add a description for this range.]</p>'
                    )
                ])
            },
            'subaxis-11': {
                text: 'BMS-dominated range',
                detail: document(
                    '<a href="' + links.bms + '">BMS</a>-dominated range',
                    [
                        html(
                            '<p>There is not much other content between this point and the BMS limit \\((0,0,0,\\ldots{})(1,1,1,\\ldots{}).\\) ' +
                            'Without BMS or a similar structure, few notations can reach the BMS expression \\((0,0,0)(1,1,1)(2,2,2)\\).</p>'
                        )
                    ]
                )
            }
        }
    });
}(globalThis));
