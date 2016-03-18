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


    'regex': [
        // m/.../
        /\b(?:m|qr)\s*([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[msixpodualngc]*/,

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

        // ----------------------------------------------------------
        // NOTE:
        // # WTF Perl, this is stupid!
        // ----------------------------------------------------------
        // m a...a
        ///\b(?:m|qr)\s+([a-zA-Z0-9])(?:[^\\]|\\.)*?\1[msixpodualngc]*/,
        // s a...a...a
        //{
        //    pattern: /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:[^\\]|\\[\s\S])*?\2(?:[^\\]|\\[\s\S])*?\2[msixpodualngcer]*/,
        //    lookbehind: true
        //},
        // ----------------------------------------------------------

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


    'filehandle': {
        // <>, <FOO>, _
        pattern: /<(?![<=])\S*>|\b_\b/,
        alias: 'symbol'
    },

    'function': {
        pattern: /sub [A-Za-z0-9_]+/i,
        inside: {
            keyword: /sub/,
            'sub-name': /[A-Za-z0-9_]+/
        }
    },

    'perl-version-usage': {
        pattern: /use v?[0-9_.]+/,
        inside: {
            keyword: /use/,
            vstring: /v\d+(\.\d+)*|\d+(\.\d+){2,}/,
            version: /[0-9_.]+/
        }
    },

    'vstring': {
        // v1.2, 1.2.3
        pattern: /v\d+(\.\d+)*|\d+(\.\d+){2,}/,
        alias: 'string'
    },

    'package-usage': {
        pattern: /(use|no|require) [A-Za-z0-9_:]+/,
        inside: {
            keyword: /use|no/,
            'built-in-function': /require/,
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

    'statements': /\b(else|elsif|for|foreach|given|if|unless|until|when|while)\b/,
    'keyword': /\b(break|continue|do|goto|last|local|my|next|no|our|package|redo|return|state|sub|use)\b/,
    'built-in-function': /\b(abs|accept|alarm|atan|bind|binmode|bless|caller|chdir|chmod|chomp|chop|chown|chr|chroot|close|closedir|connect|cos|crypt|dbmclose|dbmopen|defined|delete|die|dump|each|eof|eval|evalbytes|exec|exists|exit|exp|fc|fctnl|fileno|flock|fork|format|formline|getc|getlogin|getpeername|getpgrp|getppid|getpriority|glob|gmtime|grep|hex|import|index|int|ioctl|join|keys|kill|lc|lcfirst|length|link|listen|localtime|lock|log|lstat|map|mkdir|oct|open|opendir|ord|pack|pipe|pop|pos|print|printf|prototype|push|quotemeta|rand|read|readdir|readline|readlink|readpipe|recv|ref|rename|require|reset|rewinddir|rindex|rmdir|say|scalar|seek|seekdir|select|send|shift|shutdown|sin|sleep|socket|socketpair|sort|splice|split|sprintf|sgrt|srand|stat|study|substr|symlink|syscall|sysopen|sysread|sysseek|system|syswrite|tell|telldir|tie|tied|time|times|truncate|uc|ucfirst|umask|unlink|unpack|unshift|untie|utime|values|vec|wait|waitpid|wantarray|warn|write)\b/,
    'number': /\b-?(0x[\dA-Fa-f](_?[\dA-Fa-f])*|0b[01](_?[01])*|(\d(_?\d)*)?\.?\d(_?\d)*([Ee][+-]?\d+)?)\b/,
    'undef' : /\b(undef)\b/,
    'markers' : /\b__(PACKAGE|FILE|LINE|SUB|DATA|END)__\b/,
    'phases' : /\b(BEGIN|INIT|CHECK|UNICHECK|END)\b/,

    'class-method-call': {
        pattern: /\b([A-Za-z0-9_]+\:\:)+[A-Za-z0-9_]+\-\>[A-Za-z0-9_]+/,
        inside: {
            'package-name' : /([A-Za-z0-9_]+\:\:)+[A-Za-z0-9_]+/,
            'method-name' : /[A-Za-z0-9_]+/
        }
    },
    'super-method-call': {
        pattern: /\-\>SUPER\:\:[A-Za-z0-9_]+/,
        inside: {
            'super-method-name' : /SUPER\:\:[A-Za-z0-9_]+/
        }
    },
    'next-method-call': {
        pattern: /\-\>next::method/
    },
    'method-call': {
        pattern: /\-\>[A-Za-z0-9_]+/,
        inside: {
            'method-name' : /[A-Za-z0-9_]+/
        }
    },
    'fully-qualified-function-call': {
        pattern: /\b([A-Za-z0-9_]+\:\:)+[A-Za-z0-9_]+\(/,
        inside: {
            'fully-qualified-function-name' : /([A-Za-z0-9_]+\:\:)+[A-Za-z0-9_]+/
        }
    },
    'function-call': {
        pattern: /[A-Za-z0-9_]+\(/,
        inside: {
            'function-name' : /[A-Za-z0-9_]+/
        }
    },

    'operator': /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    'punctuation': /[{}[\];(),:]/,
};
