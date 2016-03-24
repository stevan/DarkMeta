var DarkMeta;

DarkMeta = {
    'package_to_url' : function (name) {
        return '/lib/' + name.split('::').join('/') + '.pm';
    },
    'fully_qualified_sub_to_url' : function (name) {
        var parts   = name.split('::');
        var subname = parts.pop();
        return DarkMeta.package_to_url( parts.join('::') ) + '#' + subname;
    },
    'built_in_sub_to_url' : function (name) {
        return '<a target="_blank" href="http://perldoc.perl.org/functions/' + name + '.html">' + name + '</a>';
    }
};

$(function () {

    $('.package-usage > .package-name').each(function (i, e) {
        var name = $(e).text();
        var link = DarkMeta.package_to_url( name );
        $(e).html('<a href="' + link + '">' + name + '</a>');
    });
        $(e).html('<a href="' + link + '">' + name + '</a>');
    });

    $('.sub > .sub-name').each(function (i, e) {
        var name = $(e).text();
        $(e).html('<a name="' + name + '">' + name + '</a>');
    });

    var perldoc_linker = function (i, e) { $(e).html( DarkMeta.built_in_sub_to_url( $(e).text() ) ) };

    $('.built-in-sub').each(perldoc_linker);
    $('.keyword'     ).each(perldoc_linker);
    $('.statement'   ).each(perldoc_linker);

});

// NOTE:
// This was taken from the metacpan page that shows the source,
// it is only here for reference and copying good stuff from.
// - SL
//
// $(function () {
//     // convert a string like "1,3-5,7" into an array [1,3,4,5,7]
//     function parseLines (lines) {
//         lines = lines.split(/\s*,\s*/);
//         var all_lines = [];
//         for (var i = 0; i < lines.length; i++) {
//             var line = lines[i];
//             var res = line.match(/^\s*(\d+)\s*(?:-\s*(\d+)\s*)?$/);
//             if (res) {
//                 var start = res[1]*1;
//                 var end = (res[2] || res[1])*1;
//                 if (start > end) {
//                     var swap = end;
//                     end = start;
//                     start = swap;
//                 }
//                 for (var l = start; l <= end; l++) {
//                     all_lines.push(l);
//                 }
//             }
//         }
//         return all_lines;
//     }
//     function findLines (el, lines) {
//         var selector = $.map(
//             parseLines(lines),
//             function (line) { return '.number' + line }
//         ).join(', ');
//         return el.find('.syntaxhighlighter .line').filter(selector);
//     }
//     var hashLines = /^#L(\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*)$/;
//     // Original is /\w+:\/\/[\w-.\/?%&=:@;#]*/g
//     // Allow tilde, disallow period or percent as last character, and a more
//     // restricted scheme
//     SyntaxHighlighter.regexLib['url'] = /[a-z][a-z0-9.+-]*:\/\/[\w-.\/?%&=:@;#~]*[\w-\/?&=:@;#~]/gi;
//     // https://metacpan.org/source/RWSTAUNER/Acme-Syntax-Examples-0.001/lib/Acme/Syntax/Examples.pm
//     // TODO: Might be easier to do the regexp on the plain string (before
//     // highlighting), gather up all the packages, then just linkify all
//     // references to the package name in the html after highlighting.
//     /**
//     * Turns all package names into metacpan.org links within <a/> tags.
//     * @param {String} code Input code.
//     * @return {String} Returns code with </a> tags.
//     */
//     function processPackages(code)
//     {
//         // This regexp is not great, but its good enough so far:
//         // Match (possible) quotes or q operators followed by: an html entity or punctuation (not a letter).
//         // Space should only be allowed after qw, but it probably doesn't hurt to match it.
//         // This is a lax re for html entity, but probably good enough.
//         var strip_delimiters = /((?:["']|q[qw]?(?:[^&a-z]|&#?[a-zA-Z0-9]+;))\s*)([A-Za-z0-9_\:]+)(.*)/;
//         // Wow, this regexp is hairy.
//         // We have to specifically match the "qw" followed by a non-letter or an html entity followed by a closing tag,
//         // because qw can have whitespace (newline) between the delimiter and the string(s).  Without this the delim is in $2
//         // and the "</code>" at the end matches only the delim.
//         // Without this the "qw" itself will be matched as the package.
//         // Note that this will only match the first arg in a qw.. trying to match a second string
//         // (again, possibly across a newline (which is  actually a new div))
//         // without knowing where to end (the closing delimiter) would be really difficult.
//         // See also the above comment about scanning the plain string and linkifying later.
//         code = code.replace(
//             /(<code class="p(?:er)?l keyword">(?:with|extends|use|no<\/code> <code class="p(?:er)?l plain">(?:parent|base|aliased|Mojo::Base))\s*<\/code>\s*<code class="p(?:er)?l string">(?:qw(?:[^&a-z]|&#?[a-zA-Z0-9]+;)<\/code>.+?<code class="p(?:er)?l string">)?)(.+?)(<\/code>)/g,
//             function(m,prefix,pkg,suffix)
//             {
//                 var match = null,
//                     mcpan_url
//                     ;
//                 if ( match = strip_delimiters.exec(pkg) )
//                 {
//                     prefix = prefix + match[1];
//                     pkg    = match[2];
//                     suffix = match[3] + suffix;
//                 }
//                 var pkg_path = pkg.split('::').join('/');
//                 mcpan_url = '<a href="/lib/' + pkg_path + '.pm">' + pkg + '</a>';
//                 return prefix + mcpan_url + suffix;
//             }
//         );
//         // Link our dependencies
//         return code.replace(/(<code class="p(?:er)?l keyword">(use|package|require|no)<\/code> <code class="p(?:er)?l plain">)([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)(.*?<\/code>)/g,
//             function (m,prefix,x,pkg,suffix) {
//                 return prefix + '<a href="/lib/' + pkg.split("::").join("/") + '.pm">' + pkg + '</a>' + suffix;
//             }
//         );
//     };
//     var getCodeLinesHtml = SyntaxHighlighter.Highlighter.prototype.getCodeLinesHtml;
//     SyntaxHighlighter.Highlighter.prototype.getCodeLinesHtml = function(html, lineNumbers) {
//       // the syntax highlighter has a bug that strips spaces from the first line.
//       // replace any leading whitespace with an entity, preventing that.
//       html = html.replace(/^ /, "&#32;");
//       html = html.replace(/^\t/, "&#9;");
//       html = getCodeLinesHtml.call(this, html, lineNumbers);
//       return processPackages(html);
//     };
//     var source = $("#source");
//     if (source.length) {
//         var lineMatch;
//         var packageMatch;
//         // avoid highlighting excessively large blocks of code as they will take
//         // too long, causing browsers to lag and offer to kill the script
//         if (source.html().length > 500000) {
//             source.children('code').removeClass();
//         }
//         // save highlighted lines in an attribute, to be used later
//         else if ( lineMatch = document.location.hash.match(hashLines) ) {
//             source.attr('data-line', lineMatch[1]);
//         }
//     }
//     $(".content pre > code").each(function(index, code) {
//         var pre = $(code).parent();
//         var config = {
//             'gutter'      : false,
//             'toolbar'     : false,
//             'quick-code'  : false,
//             'tab-size'    : 8
//         };
//         if (code.className) {
//             var res = code.className.match(/(?:\s|^)language-(\S+)/);
//             if (res) {
//                 config.brush = res[1];
//             }
//         }
//         if (!config.brush) {
//             return;
//         }
//         if (pre.hasClass('line-numbers')) {
//             config.gutter = true;
//         }
//         // starting line number can be provided by an attribute
//         var first_line = pre.attr('data-start');
//         if (first_line) {
//             config['first-line'] = first_line;
//         }
//         // highlighted lines can be provided by an attribute
//         var lines = pre.attr('data-line');
//         if (lines) {
//             config.highlight = parseLines(lines);
//         }
//         // highlighter strips leading blank lines, throwing off line numbers.
//         // add a blank line for the highlighter to strip
//         var html = $(code).html();
//         if (html.match(/^ *\n/)) {
//           $(code).html("\n " + html);
//         }
//         SyntaxHighlighter.highlight(config, code);
//     });
//     if (source.length) {
//         // on the source page, make line numbers into links
//         source.find('.syntaxhighlighter .gutter .line').each(function(i, el) {
//             var line = $(el);
//             var res;
//             if (res = line.attr('class').match(/(^|\s)number(\d+)(\s|$)/)) {
//                 var linenr = res[2];
//                 var id = 'L' + linenr;
//                 line.contents().wrap('<a href="#'+id+'" id="'+id+'"></a>');
//                 var link = line.children('a');
//                 link.click(function(e) {
//                     if (e.metaKey) {
//                         return false;
//                     }
//                     // normally the browser would update the url and scroll to
//                     // the the link.  instead, update the hash ourselves, but
//                     // unset the id first so it doesn't scroll
//                     e.preventDefault();
//                     var line = linenr;
//                     if (e.shiftKey && source.attr('data-line')) {
//                         var startLine = parseLines(source.attr('data-line'))[0];
//                         line = startLine < line ? startLine + '-' + line
//                                                 : line + '-' + startLine;
//                     }
//                     link.removeAttr('id');
//                     document.location.hash = '#L' + line;
//                     link.attr('id', id);
//                     source.attr('data-line', line);
//                 });
//             }
//         });
//         // the line ids are added by javascript, so the browser won't have
//         // scrolled to it.  also, highlight ranges don't correspond to exact
//         // ids.  do the initial scroll ourselves.
//         var res;
//         if (res = document.location.hash.match(/^(#L\d+)(-|,|$)/)) {
//             var el = $(res[1]);
//             $('html, body').scrollTop(el.offset().top);
//         }
//         // if someone changes the url hash manually, update the highlighted lines
//         $(window).on('hashchange', function() {
//             var lineMatch;
//             if (lineMatch = document.location.hash.match(hashLines) ) {
//                 source.attr('data-line', lineMatch[1]);
//                 source.find('.highlighted').removeClass('highlighted');
//                 var lines = findLines(source, lineMatch[1]);
//                 lines.addClass('highlighted');
//             }
//         });
//     }
// });
