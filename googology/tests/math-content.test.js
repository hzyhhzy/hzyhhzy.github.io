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
    `locales/${locale}/items-082-122.js`
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
