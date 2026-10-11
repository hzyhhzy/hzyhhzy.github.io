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
        self.s = self.s[:root] + copy_part * n


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
            "documentTitle": "Googology Scale",
            "title": "Googology Scale",
            "language": "Language",
            "modalLabel": "Entry details",
            "modalClose": "Close details",
            "codeClose": "Close code",
            "codeOpen": "View program",
            "subtitle": "A map of numbers beyond imagination.",
            "home": "Back to the homepage",
            "explore": "Explore the scale",
            "search": "Search all entries",
            "searchPlaceholder": "Find a number, notation, or topic…",
            "directory": "Directory",
            "jump": "Explore",
            "guide": "Guide",
            "mapLabel": "Googology Scale: arrow keys to pan, plus and minus to zoom",
            "mapCaption": "Stages use equal spacing; branch x-positions are layout guides.",
            "edition": "Sources updated · 2026-10",
            "sources": "Source collection ↗",
            "copyLink": "Copy link",
            "copied": "Copied",
            "copyFallback": "Copy the entry link from the address bar",
            "mainAxis": "Main axis",
            "noResults": "No entries match. Try a shorter search, or choose All in display settings.",
            "resultCount": "{count} entries",
            "jumps": {
                "frontier": "Ordinal frontier",
                "start": "Numbers & hyperoperations",
                "epsilon": "Basic ordinals",
                "bms": "Mountain notation family",
                "pto": "Proof-theoretic ordinals",
                "laver": "Laver Table",
                "btbms": "Frontier notations",
                "friedman": "Other"
            },
            "filters": {
                "label": "Display",
                "all": "All",
                "info": "Explained",
                "code": "With code",
                "zoomVisibility": "Show detail as you zoom",
                "manualLevel": "Detail level: {level} (0–3)"
            },
            "view": {
                "label": "View controls",
                "zoom": "Zoom",
                "hint": "Drag to pan · Wheel to zoom · Shift + wheel to scroll branches",
                "reset": "Overview",
                "zoomIn": "Zoom in",
                "zoomOut": "Zoom out"
            }
        },
        guide: {
            "title": "Reading the map",
            "sections": [
                {
                    "type": "html",
                    "html": "<p>The main axis leads from everyday numbers through ordinal notations and proof-theoretic landmarks, then to Busy Beaver and Rayo. After \\(\\varepsilon_0\\), the major landmarks are equally spaced.</p><p>Drag the canvas or use the Explore menu. The directory searches both languages and includes entries hidden at the current zoom. Click an entry for its definition, references and programs; the link button gives it a shareable address.</p><p>The main axis continues horizontally. Three side paths collect Laver constructions, frontier notations, and other constructions. Their horizontal positions suggest a region for display, not an exact comparison with the main axis. Gaps indicate omitted distance. Ordinal notations, concrete large numbers and functions are displayed together as growth landmarks.</p><p>On a keyboard, focus the map and use the arrow keys, plus/minus, Home and End. On a touch screen, drag horizontally and swipe vertically to see the branches.</p>"
                },
                {
                    "type": "note",
                    "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                }
            ]
        },
        branches: {
            "branch-1": {
                "text": "Laver constructions",
                "detail": {
                    "title": "Laver constructions",
                    "sections": [
                        {
                            "type": "html",
                            "html": "<p>iBLP, Laver Table and LTY link finite combinatorial rules to elementary embeddings. Open the individual entries for their constructions and sources.</p>"
                        },
                        {
                            "type": "note",
                            "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                        }
                    ]
                }
            },
            "branch-2": {
                "text": "Frontier notations",
                "detail": {
                    "title": "Frontier notations",
                    "sections": [
                        {
                            "type": "html",
                            "html": "<p>This branch collects notations extending the current frontier. It currently features BTBMS; open the entry for its recursive row structure and NER implementation.</p>"
                        },
                        {
                            "type": "note",
                            "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                        }
                    ]
                }
            },
            "branch-3": {
                "text": "Other",
                "detail": {
                    "title": "Other",
                    "sections": [
                        {
                            "type": "html",
                            "html": "<p>Finite trees, graphs and other combinatorial objects can lead to termination principles of remarkable logical strength. This branch continues past the TREE and SCG landmarks on the earlier axis.</p>"
                        },
                        {
                            "type": "note",
                            "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                        }
                    ]
                }
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
            "text": "Extended collapsing functions",
            "detail": {
                "title": "Extended collapsing functions",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>Ordinal collapsing functions combine symbols for larger structures with collapse operations to describe countable ordinals. Extended Buchholz systems and BMS provide different ways to explore this stretch of the scale.</p><p>Continue to the highlighted BMS term \\((0,0,0)(1,1,1)(2,2,0)\\), then beyond fixed row counts to the BMS limit.</p>"
                    },
                    {
                        "type": "note",
                        "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                    }
                ]
            }
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
            "text": "Mountain notation family",
            "detail": {
                "title": "Mountain notation family",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>TBMS, SRPD, Y and \\(\\omega\\)-Y occupy this part of the map. Recent comparisons and well-ordering proofs connect these concrete expansion systems with weak set theory.</p><p>Follow the entries for the results, or explore their definitions in <a href=\"https://smilelee-lyx.github.io/ne-rewritten/\">NER</a> and the <a href=\"https://github.com/hzyhhzy/column-ordinal-notations-hzy\">source collection</a>.</p>"
                    },
                    {
                        "type": "note",
                        "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                    }
                ]
            }
        },
            'axis-07': {
            "text": "Beyond computable growth",
            "detail": {
                "title": "Busy Beaver and Rayo",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>The Busy Beaver function outgrows every total computable function. Rayo's construction chooses a number larger than all natural numbers uniquely specified in a fixed language within a fixed symbol budget. Individual values are finite natural numbers; the obstacle is a uniform algorithm for the function.</p>"
                    },
                    {
                        "type": "note",
                        "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                    }
                ]
            }
        },
            'axis-08': {
            "text": "Proof-theoretic ordinals"
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
            "text": "Large-cardinal collapse",
            "detail": {
                "title": "Beyond EBO",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>Further collapsing functions use symbols such as \\(I\\), \\(M\\) and \\(K\\). Their definitions depend on the chosen system. Here BMS matrix expressions give additional concrete landmarks on the way to \\((0,0,0)(1,1,1)(2,2,0)\\).</p>"
                    },
                    {
                        "type": "note",
                        "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                    }
                ]
            }
        },
            'subaxis-10': {
            "text": "Rows and ancestry",
            "detail": {
                "title": "Rows and ancestry in BMS",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>BMS uses finite matrices. Entries specify nested parent relations; expansion cuts off the final column and copies a selected block according to those relations. More rows allow deeper ancestry to influence copying.</p>"
                    },
                    {
                        "type": "note",
                        "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                    }
                ]
            }
        },
            'subaxis-11': {
            "text": "Toward the BMS limit",
            "detail": {
                "title": "Toward the BMS limit",
                "sections": [
                    {
                        "type": "html",
                        "html": "<p>The sequence of finite-row BMS systems leads to the full BMS limit. Transfinite extensions then allow the row structure itself to carry ordinal information; TBMS and Y-related systems are introduced in the next segment.</p>"
                    },
                    {
                        "type": "note",
                        "html": "This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed."
                    }
                ]
            }
        }
        }
    });
}(globalThis));
