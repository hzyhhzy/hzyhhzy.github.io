(function registerBigNumberGolf(global) {
    'use strict';
    global.GoogologyI18n.registerMessages('zh-CN', {
        items: {
            'item-131': {
                label: '大数高尔夫',
                detail: {
                    title: '大数高尔夫：有限程序长度的最大输出',
                    sections: [
                        {
                            type: 'html',
                            html: '<p>用很短的程序输出尽可能大的数，可以看作大数版的 code golf。经典的 <a href="https://djm.cc/bignum-results.txt">Bignum Bakeoff</a> 比赛把 C 程序限制在不计空白的 \\(512\\) 个字符内，Loader 数就出自这场比赛。</p>' +
                                '<p>把语言换成 Python 或 JavaScript，也可以问：不超过 \\(n\\) 个字符的程序，最多能输出多大的自然数？固定语言及运行语义后，记这个最大值为\\[G_L(n)=\\max\\bigl(\\{0\\}\\cup\\{m:|p|\\le n,\\ p\\Downarrow_L m\\}\\bigr).\\]这里 \\(p\\Downarrow_L m\\) 表示无输入程序最终停机，并输出自然数 \\(m\\)。本词条按 ASCII 源代码字符计长（含空白），使用无限时间、内存和整数精度的理想模型；不允许外部数据、随机数或额外的预言机。</p>' +
                                '<p>这就是程序长度版的 Busy Beaver 问题。对于 Python、JavaScript 这类能用固定解释器互相模拟的语言，源程序编码只带来线性长度开销，因而有形如\\[G_{L_1}(n)\\le G_{L_2}(an+b)\\]的双向比较，其中常数只依赖语言和编码。若统一成最优二进制程序描述，最大输出与最大停机时间可在长度参数上相差一个常数后互相夹住。</p>' +
                                '<p>这里的常数修正作用于<strong>程序长度参数</strong>，不是说最大输出值只差常数倍。旁边的 \\(\\operatorname{BB}(n)\\) 按 Turing machine 的状态数计量，转换时还要算状态表的编码开销；两者放在同一区域表示同属 Busy Beaver 型增长。</p>' +
                                '<p><strong>来源：</strong><a href="https://www.djm.cc/dmoews.html">David Moews 的 Bignum Bakeoff 档案</a>；Mikhail Andreev，<a href="https://arxiv.org/abs/1703.05170"><cite>Busy beavers and Kolmogorov complexity</cite></a>。</p>'
                        },
                        { type: 'note', html: '该内容由gpt6-astra完成，且暂时未经过人工审核，不保证正确性' }
                    ]
                }
            }
        }
    });
})(globalThis);
