'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const katex = require('../lib/katex/katex.min.js');
const SOURCE_ROOT = path.join(__dirname, '..');
const LOCALES = ['zh-CN', 'en'];
const LOCALE_FILES = LOCALES.flatMap((locale) => [
    `locales/${locale}/interface.js`,
    `locales/${locale}/items-000-040.js`,
    `locales/${locale}/items-041-081.js`,
    `locales/${locale}/items-082-122.js`,
    `locales/${locale}/items-123-129.js`,
    `locales/${locale}/items-131.js`
]);
const LEGACY_MATH_PATTERN =
    /<\/?(?:sup|sub)>|&(?:omega|Omega|Gamma|epsilon|varepsilon|phi|psi|zeta|eta|alpha|beta|theta|xi|rho|tau|lambda|kappa|mu|nu|pi|Sigma|Pi|middot|times|uarr|rarr|le|ge|lt|gt|infin);/u;
const RAW_MATH_PATTERN =
    /[ωΩΓεφψΨζηαβθξρτλκμνπΣΠ×≈≤≥≠∈∉→⇒↦↑∞]/u;
const FORMULA_PATTERN =
    /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/gu;
const UNDELIMITED_ASCII_MATH_PATTERNS = Object.freeze([
    {
        description: 'an equals sign',
        pattern: /=/u
    },
    {
        description: 'a function-style expression',
        pattern: /\b[A-Za-z][A-Za-z0-9]*\([^()]*\)/u
    },
    {
        description: 'a fundamental-sequence or bracket expression',
        pattern: /(?:\b[A-Za-z][A-Za-z0-9]*|\))\s*\[[A-Za-z0-9]+\]|\[[A-Za-z]\]/u
    },
    {
        description: 'a BMS-style tuple sequence',
        pattern: /(?:\(\s*\d+(?:\s*,\s*\d+)+\s*\)){2,}/u
    },
    {
        description: 'an ASCII exponent',
        pattern: /\b[A-Za-z0-9})]+\s*\^\s*[A-Za-z0-9({-]+/u
    },
    {
        description: 'single-letter arithmetic',
        pattern: /\b[A-Za-z]\b\s*(?:\+|-|\*|\/)\s*(?:\b[A-Za-z]\b|\d+)/u
    }
]);

function runClassicScript(context, filename) {
    const source = fs.readFileSync(
        path.join(SOURCE_ROOT, filename),
        'utf8'
    );
    vm.runInContext(source, context, { filename });
}

function createMessages() {
    const context = vm.createContext({
        document: {
            documentElement: {
                lang: 'zh-CN',
                dir: 'ltr'
            }
        },
        navigator: { language: 'zh-CN' },
        localStorage: {
            getItem() {
                return null;
            },
            setItem() {}
        }
    });
    context.window = context;
    runClassicScript(context, 'i18n.js');
    LOCALE_FILES.forEach((filename) => {
        runClassicScript(context, filename);
    });
    context.GoogologyI18n.initialize({
        locale: 'zh-CN',
        fallbackLocale: 'zh-CN'
    });

    return Object.fromEntries(
        LOCALES.map((locale) => [
            locale,
            {
                guide: context.GoogologyI18n.get('guide', { locale }),
                items: context.GoogologyI18n.get('items', { locale }),
                branches: context.GoogologyI18n.get('branches', { locale }),
                axisSegments: context.GoogologyI18n.get(
                    'axisSegments',
                    { locale }
                ),
                axisSubSegments: context.GoogologyI18n.get(
                    'axisSubSegments',
                    { locale }
                )
            }
        ])
    );
}

function collectStrings(value, pathParts = [], result = []) {
    if (typeof value === 'string') {
        result.push({
            path: pathParts.join('.'),
            value
        });
        return result;
    }
    if (!value || typeof value !== 'object') {
        return result;
    }

    Object.entries(value).forEach(([key, child]) => {
        if (key === 'source' && value.type === 'code') {
            return;
        }
        collectStrings(child, pathParts.concat(key), result);
    });
    return result;
}

function extractFormulas(value) {
    const formulas = [];
    let match;

    FORMULA_PATTERN.lastIndex = 0;
    while ((match = FORMULA_PATTERN.exec(value)) !== null) {
        formulas.push({
            display: match[2] !== undefined,
            source: match[1] === undefined ? match[2] : match[1]
        });
    }
    return formulas;
}

function stripMathAndMarkup(value) {
    return value
        .replace(FORMULA_PATTERN, '')
        .replace(/<[^>]*>/gu, ' ')
        .replace(/\s+/gu, ' ')
        .trim();
}

const messages = createMessages();

function itemProse(locale, id) {
    return messages[locale].items[id].detail.sections
        .filter((section) => section.type !== 'code')
        .map((section) => section.html || '').join('\n');
}

function itemContent(locale, id) {
    const fields = messages[locale].items[id].detail.representations || [];
    return fields.map((field) => field.html).join('\n') + '\n' + itemProse(locale, id);
}

test('representation fields cover FGH, BMS and Y ranges with both boundary overlaps', () => {
    const geometryContext = vm.createContext({});
    runClassicScript(geometryContext, 'items.js');
    const geometry = vm.runInContext('items', geometryContext);
    for (const { id, value } of geometry.filter((item) => item.value >= 1.5 && item.value <= 7.5)) {
        for (const locale of LOCALES) {
            const fields = messages[locale].items[id].detail.representations;
            const labels = fields.map((field) => field.label).join(' ');
            assert.match(labels, locale === 'zh-CN' ? /常用表示/ : /Common representations/, locale + '.' + id);
            assert.equal(/FGH/.test(labels), value <= 3, id + ' FGH range');
            assert.equal(/BMS/.test(labels), value >= 3 && value <= 6, id + ' BMS range');
            assert.equal(fields.some((field) => /^Y[ -]/.test(field.label)), value >= 6, id + ' Y range');
        }
        const formulas = LOCALES.map((locale) => messages[locale].items[id].detail.representations
            .flatMap((field) => extractFormulas(field.html).map((formula) => formula.source.replace(/\\text\{[^}]*\}/g, '\\text{}'))));
        assert.deepEqual(formulas[0], formulas[1], id + ' representation formula parity');
    }
});

test('landmark aliases and matrices are separated from prose', () => {
    for (const locale of LOCALES) {
        const epsilon = messages[locale].items['item-057'].detail.representations;
        assert.equal(epsilon.length, 3);
        const bo = messages[locale].items['item-092'].detail.representations;
        assert.match(bo[0].html, /BO/);
        assert.ok(bo[0].html.includes(String.raw`\psi_0(\Omega_\omega)`));
        assert.ok(bo[1].html.includes('(0,0,0)(1,1,1)'));
        assert.ok(!itemProse(locale, 'item-092').includes('(0,0,0)(1,1,1)'));
        const sho = messages[locale].items['item-103'].detail.representations;
        assert.equal(sho.length, 3);
        assert.ok(sho[2].html.includes('Y(1,3)'));
        assert.ok(messages[locale].items['item-013'].detail.representations[1].html.includes(String.raw`\approx f_3(10)`));
    }
});

test('TREE and SCG retain their distinct ordinal placements and four SCG endpoints', () => {
    for (const locale of LOCALES) {
        const tree = itemContent(locale, 'item-088');
        assert.ok(tree.includes(String.raw`\vartheta(\Omega^\omega\cdot\omega)`));
        assert.ok(tree.includes('(0,0)(1,1)(2,1)(3,1)(4,0)(3,0)'));
        const scg = itemContent(locale, 'item-106');
        for (const matrix of [
            '(0,0,0)(1,1,1)',
            '(0,0,0)(1,1,1)(2,1,0)(3,0,0)(4,0,0)',
            '(0,0,0)(1,1,1)(2,0,0)',
            '(0,0,0)(1,1,1)(2,1,0)(3,0,0)'
        ]) assert.ok(scg.includes(matrix), locale + ': ' + matrix);
        assert.match(scg, locale === 'zh-CN' ? /非严格上下界（社区猜测）/ : /Conjectured bounds/);
    }
});

test('fusible estimates preserve the reciprocal, exponential layers and lowercase FGH', () => {
    for (const locale of LOCALES) {
        const prose = itemProse(locale, 'item-061');
        assert.ok(prose.includes(String.raw`f(4)\approx10^{-10^{10^{1.05\times10^{28}}}}`));
        assert.ok(prose.includes(String.raw`\frac{1}{f(5)}\approx f_\omega`));
        assert.ok(prose.includes(String.raw`\left(10^{10^{1.05\times10^{28}}}\right)`));
        assert.match(prose, /FGH/);
        assert.doesNotMatch(prose, /F_/);
    }
});

test('mountain candidates, DQDN encoding and displayed SRPD programs match the audited sources', () => {
    for (const locale of LOCALES) {
        const items = messages[locale].items;
        assert.ok(items['item-123'].detail.representations[1].html.includes('Y(1,3,4,2,5,8,10)'));
        assert.ok(items['item-124'].detail.representations[1].html.includes('Y(1,3,4,2,5,8,10,4,9,14,17,10)'));
        assert.match(items['item-124'].label, /S🎄O/);
        const code = items['item-124'].detail.sections.filter((section) => section.type === 'code');
        assert.equal(code.length, 2);
        assert.equal(code[0].source, fs.readFileSync(path.join(SOURCE_ROOT, 'programs/srpd-golf.js'), 'utf8').trim());
        assert.equal(code[1].source, fs.readFileSync(path.join(SOURCE_ROOT, 'programs/srpd-reference.cjs'), 'utf8').trim());
        assert.ok(code.every((section) => section.display === 'dialog'));
        const dqdn = itemProse(locale, 'item-129');
        assert.ok(dqdn.includes(String.raw`F_\omega`));
        assert.match(dqdn, /880/);
        assert.match(dqdn, /1079/);
        assert.doesNotMatch(dqdn, /CoC/);
    }
});

test('October 13 review decisions retain attribution, conjectures and the chosen conventions', () => {
    for (const locale of LOCALES) {
        const zh = locale === 'zh-CN';
        const items = messages[locale].items;
        assert.match(items['item-123'].detail.representations[1].html, zh ? /较可信的猜测/ : /well-supported conjecture/);
        assert.ok(items['item-123'].detail.representations[1].html.includes(String.raw`\lim(\mathrm{TBMS})=Y(1,3,4,2,5,8,10)`));
        assert.match(items['item-124'].detail.representations[1].html, /@最菜萌新/);
        assert.match(items['item-124'].detail.representations[1].html, zh ? /猜测/ : /Conjectured/);
        assert.match(itemProse(locale, 'item-124'), zh ? /已证明的对应/ : /proved correspondence/);
        const wy = itemProse(locale, 'item-109');
        assert.match(wy, /@Phyrion/);
        assert.match(wy, /@test_alpha0/);
        assert.match(wy, zh ? /各自独立/ : /independently/);
        assert.match(itemProse(locale, 'item-127'), zh ? /目前已知.*最弱/ : /weakest.*currently known/);
        assert.doesNotMatch(itemProse(locale, 'item-121'), /\\Sigma/);
        const tree = itemContent(locale, 'item-087');
        assert.match(tree, zh ? /略大于/ : /slightly above/);
        assert.doesNotMatch(tree, /\\beta/);
        const dqdn = itemProse(locale, 'item-129');
        assert.ok(dqdn.includes(String.raw`\sup_{k\lt\omega}\sum_{i=0}^{k}`));
        assert.ok(dqdn.includes(String.raw`1+\omega^{h(G(i))}`));
        assert.ok(dqdn.includes(String.raw`\ge\operatorname{PTO}(Z_\omega)`));
        const bms = itemProse(locale, 'item-130');
        assert.ok(bms.includes(String.raw`\lim(\mathrm{BMS}_{n-1})\le\operatorname{PTO}(\Pi^1_n\text{-}\mathrm{CA}_0)`));
        assert.ok(bms.includes(String.raw`\operatorname{PTO}(\Pi^1_n\text{-}\mathrm{CA}_0)=\lim(\mathrm{BMS}_{n+1})`));
        assert.match(bms, zh ? /猜测的精确对应/ : /conjectured exact correspondence/);
    }
});

test('local KaTeX assets required by the static page are vendored', () => {
    [
        'lib/katex/LICENSE',
        'lib/katex/katex.min.css',
        'lib/katex/katex.min.js',
        'lib/katex/contrib/auto-render.min.js',
        'lib/katex/fonts/KaTeX_Main-Regular.woff2'
    ].forEach((filename) => {
        assert.equal(
            fs.existsSync(path.join(SOURCE_ROOT, filename)),
            true,
            filename
        );
    });

    const indexHtml = fs.readFileSync(
        path.join(SOURCE_ROOT, 'index.html'),
        'utf8'
    );
    const loadOrder = [
        'lib/katex/katex.min.js',
        'lib/katex/contrib/auto-render.min.js',
        'math-renderer.js',
        'content-document.js',
        'scale-renderer.js',
        'app.js'
    ].map((filename) => {
        const index = indexHtml.indexOf(filename);
        assert.notEqual(index, -1, filename);
        return index;
    });

    assert.deepEqual(loadOrder, [...loadOrder].sort((left, right) =>
        left - right
    ));
    assert.match(
        indexHtml,
        /href="lib\/katex\/katex\.min\.css"/u
    );

    const katexCss = fs.readFileSync(
        path.join(SOURCE_ROOT, 'lib/katex/katex.min.css'),
        'utf8'
    );
    const fontFiles = Array.from(
        katexCss.matchAll(/url\((?:['"]?)(fonts\/[^)'"]+)/gu),
        (match) => match[1]
    );

    assert.equal(fontFiles.length > 40, true);
    fontFiles.forEach((filename) => {
        assert.equal(
            fs.existsSync(path.join(SOURCE_ROOT, 'lib/katex', filename)),
            true,
            filename
        );
    });
});

test('localized prose contains no legacy formula HTML or entities', () => {
    LOCALES.forEach((locale) => {
        collectStrings(messages[locale]).forEach((entry) => {
            assert.doesNotMatch(
                entry.value,
                LEGACY_MATH_PATTERN,
                `${locale}.${entry.path}`
            );
        });
    });
});

test('all localized LaTeX is delimited, nonempty, and accepted by KaTeX', () => {
    LOCALES.forEach((locale) => {
        const entries = collectStrings(messages[locale]);
        let formulaCount = 0;

        entries.forEach((entry) => {
            const formulas = extractFormulas(entry.value);
            const remainder = entry.value.replace(FORMULA_PATTERN, '');

            assert.doesNotMatch(
                remainder,
                /\\[\]()]/u,
                `${locale}.${entry.path} has unmatched delimiters`
            );
            assert.doesNotMatch(
                remainder,
                RAW_MATH_PATTERN,
                `${locale}.${entry.path} has raw math outside LaTeX`
            );

            formulas.forEach((formula, index) => {
                assert.notEqual(
                    formula.source.trim(),
                    '',
                    `${locale}.${entry.path}[${index}]`
                );
                assert.doesNotMatch(
                    formula.source,
                    /<[^>]+>/u,
                    `${locale}.${entry.path}[${index}] contains HTML`
                );
                assert.doesNotMatch(
                    formula.source,
                    /</u,
                    `${locale}.${entry.path}[${index}] contains a raw HTML-sensitive less-than sign`
                );
                assert.doesNotThrow(
                    () => katex.renderToString(formula.source, {
                        displayMode: formula.display,
                        throwOnError: true,
                        strict: 'error',
                        trust: false,
                        output: 'htmlAndMathml'
                    }),
                    `${locale}.${entry.path}[${index}]: ${formula.source}`
                );
            });
            formulaCount += formulas.length;
        });

        assert.equal(
            formulaCount > 150,
            true,
            `${locale} should contain the migrated formula corpus`
        );
    });
});

test('formula-like ASCII content cannot bypass the LaTeX renderer', () => {
    LOCALES.forEach((locale) => {
        collectStrings(messages[locale]).forEach((entry) => {
            const remainder = stripMathAndMarkup(entry.value);

            UNDELIMITED_ASCII_MATH_PATTERNS.forEach((candidate) => {
                assert.doesNotMatch(
                    remainder,
                    candidate.pattern,
                    `${locale}.${entry.path} contains ${candidate.description}`
                );
            });
        });
    });
});

test('both locales expose formulas in the same content fields', () => {
    const pathsByLocale = Object.fromEntries(
        LOCALES.map((locale) => [
            locale,
            collectStrings(messages[locale])
                .filter((entry) => extractFormulas(entry.value).length > 0)
                .map((entry) => entry.path)
                .sort()
        ])
    );

    assert.deepEqual(pathsByLocale.en, pathsByLocale['zh-CN']);
});
