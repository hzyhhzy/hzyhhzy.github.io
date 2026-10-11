(function registerBigNumberGolf(global) {
    'use strict';
    global.GoogologyI18n.registerMessages('en', {
        items: {
            'item-131': {
                label: 'Big-number golf',
                detail: {
                    title: 'Big-number golf: maximum output at a fixed program length',
                    sections: [
                        {
                            type: 'html',
                            html: '<p>Producing the largest possible number with a short program is a big-number counterpart to code golf. The classic <a href="https://djm.cc/bignum-results.txt">Bignum Bakeoff</a> limited C programs to \\(512\\) non-whitespace characters; Loader’s number originated in that contest.</p>' +
                                '<p>For Python or JavaScript, ask instead: what is the largest natural number output by a program of at most \\(n\\) characters? Fix a language and its execution semantics, and define\\[G_L(n)=\\max\\bigl(\\{0\\}\\cup\\{m:|p|\\le n,\\ p\\Downarrow_L m\\}\\bigr).\\]Here \\(p\\Downarrow_L m\\) means that a program with no input halts and outputs the natural number \\(m\\). This entry counts ASCII source characters, including whitespace, and assumes unbounded time, memory and integer precision, with no external data, randomness or oracle.</p>' +
                                '<p>This is a program-length version of the Busy Beaver problem. Languages such as Python and JavaScript can simulate each other with a fixed interpreter and linear source-encoding overhead, yielding comparisons in both directions of the form\\[G_{L_1}(n)\\le G_{L_2}(an+b),\\]with constants depending only on the languages and encodings. For an optimal binary program description, maximum output and maximum halting time bound one another after a constant shift in the length argument.</p>' +
                                '<p>The constant correction concerns the <strong>program-length argument</strong>, not a constant ratio between output values. The adjacent \\(\\operatorname{BB}(n)\\) counts Turing-machine states, so a conversion must also account for encoding the transition table. The shared location represents Busy Beaver-type growth.</p>' +
                                '<p><strong>Sources:</strong> <a href="https://www.djm.cc/dmoews.html">David Moews’s Bignum Bakeoff archive</a>; Mikhail Andreev, <a href="https://arxiv.org/abs/1703.05170"><cite>Busy beavers and Kolmogorov complexity</cite></a>.</p>'
                        },
                        { type: 'note', html: 'This content was completed by gpt6-astra and has not yet been reviewed by a human; its correctness is not guaranteed.' }
                    ]
                }
            }
        }
    });
})(globalThis);
