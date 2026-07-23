(function createMathRenderer(global) {
    'use strict';

    var DELIMITERS = Object.freeze([
        Object.freeze({
            left: '\\[',
            right: '\\]',
            display: true
        }),
        Object.freeze({
            left: '\\(',
            right: '\\)',
            display: false
        })
    ]);
    var IGNORED_TAGS = Object.freeze([
        'script',
        'noscript',
        'style',
        'textarea',
        'pre',
        'code',
        'option'
    ]);
    var IGNORED_CLASSES = Object.freeze([
        'katex',
        'no-math'
    ]);

    function readSource(firstArgument, substitutions) {
        if (
            firstArgument &&
            Array.isArray(firstArgument.raw)
        ) {
            return String.raw.apply(
                String,
                [firstArgument].concat(substitutions)
            );
        }

        return String(firstArgument || '');
    }

    function delimit(left, right, firstArgument, substitutions) {
        return left +
            readSource(firstArgument, substitutions).trim() +
            right;
    }

    function inline(firstArgument) {
        return delimit(
            '\\(',
            '\\)',
            firstArgument,
            Array.prototype.slice.call(arguments, 1)
        );
    }

    function display(firstArgument) {
        return delimit(
            '\\[',
            '\\]',
            firstArgument,
            Array.prototype.slice.call(arguments, 1)
        );
    }

    function render(root) {
        if (
            !root ||
            typeof global.renderMathInElement !== 'function'
        ) {
            return false;
        }

        global.renderMathInElement(root, {
            delimiters: DELIMITERS,
            ignoredTags: IGNORED_TAGS,
            ignoredClasses: IGNORED_CLASSES,
            throwOnError: false,
            strict: 'warn',
            trust: false,
            output: 'htmlAndMathml'
        });
        return true;
    }

    global.GoogologyMath = Object.freeze({
        delimiters: DELIMITERS,
        ignoredTags: IGNORED_TAGS,
        ignoredClasses: IGNORED_CLASSES,
        inline: inline,
        display: display,
        render: render
    });
}(globalThis));
