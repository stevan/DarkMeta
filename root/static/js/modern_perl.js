Prism.languages.modern_perl = {
    'comment': [
        {
            // POD
            pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m,
            lookbehind: true
        },
        {
            pattern: /(^|[^\\$])#.*/,
            lookbehind: true
        }
    ],
    // TODO Could be nice to handle Heredoc too.
    'string': [
        // q/.../
        /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,

        // q a...a
        /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\1/,

        // q(...)
        /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/,

        // q{...}
        /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/,

        // q[...]
        /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/,

        // q<...>
        /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/,

        // "...", `...`
        /("|`)(?:[^\\]|\\[\s\S])*?\1/,

        // '...'
        // FIXME Multi-line single-quoted strings are not supported as they would break variables containing '
        /'(?:[^'\\\r\n]|\\.)*'/
    ],
    'regex': [
        // m/.../
        /\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[msixpodualngc]*/,

        // m a...a
        /\b(?:m|qr)\s+([a-zA-Z0-9])(?:[^\\]|\\.)*?\1[msixpodualngc]*/,

        // m(...)
        /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,

        // m{...}
        /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,

        // m[...]
        /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,

        // m<...>
        /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,

        // The lookbehinds prevent -s from breaking
        // FIXME We don't handle change of separator like s(...)[...]
        // s/.../.../
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
            lookbehind: true
        },

        // s a...a...a
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
            lookbehind: true
        },

        // s(...)(...)
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
            lookbehind: true
        },

        // s{...}{...}
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
            lookbehind: true
        },

        // s[...][...]
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
            lookbehind: true
        },

        // s<...><...>
        {
            pattern: /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
            lookbehind: true
        },

        // /.../
        // The look-ahead tries to prevent two divisions on
        // the same line from being highlighted as regex.
        // This does not support multi-line regex.
        /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/
    ],

    // FIXME Not sure about the handling of ::, ', and #
    'variable': [
        // ${^POSTMATCH}
        /[&*$@%]\{\^[A-Z]+\}/,
        // $^V
        /[&*$@%]\^[A-Z_]/,
        // ${...}
        /[&*$@%]#?(?=\{)/,
        // $foo
        /[&*$@%]#?((::)*'?(?!\d)[\w$]+)+(::)*/i,
        // $1
        /[&*$@%]\d+/,
        // $_, @_, %!
        // The negative lookahead prevents from breaking the %= operator
        /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/
    ],
    'filehandle': {
        // <>, <FOO>, _
        pattern: /<(?![<=])\S*>|\b_\b/,
        alias: 'symbol'
    },
    'vstring': {
        // v1.2, 1.2.3
        pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/,
        alias: 'string'
    },
    'function': {
        pattern: /sub [A-Za-z0-9_]+/i,
        inside: {
            keyword: /sub/,
            'sub-name': /[A-Za-z0-9_]+/
        }
    },
    'perl-version-usage': {
        pattern: /use [0-9_.]+/,
        inside: {
            keyword: /use/,
            version: /[0-9_.]+/
        }
    },
    'package-usage': {
        pattern: /(use|no|require) [A-Za-z0-9_:]+/,
        inside: {
            keyword: /use|no|require/,
            'package-name' : /[A-Za-z0-9_:]+/
        }
    },
    'package-declr': {
        pattern: /package [A-Za-z0-9_:]+/,
        inside: {
            keyword: /package/,
            'package-name' : /[A-Za-z0-9_:]+/
        }
    },
    /*
     * I originally thought this was a good idea,
     * but now I am less convinced, so I am commenting
     * it out for the moment.
     *
     * My line of thinking is that if we include this
     * package detection then we should also detect
     * fully qualified functions and packages without
     * semicolons in it. Given that, we should also support
     * linking directly to those function/method definitions
     * which gets a little more complex.

    'class-method-call': {
        pattern: /([A-Za-z0-9_]+\:\:)+[A-Za-z0-9_]+\-\>/,
        inside: {
            'package-name' : /[A-Za-z0-9_:]+/
        }
    },
    */
    'keyword': /\b(any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|no|our|package|print|redo|require|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    'number': /\b-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)\b/,
    'operator': /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    'punctuation': /[{}[\];(),:]/
};
