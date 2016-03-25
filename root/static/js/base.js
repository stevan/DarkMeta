
var DarkMeta;

DarkMeta = {
    Utils : {
        'package_to_url' : function (name) {
            return '/lib/' + name.split('::').join('/') + '.pm';
        },
        'fully_qualified_sub_to_url' : function (name) {
            var parts   = name.split('::');
            var subname = parts.pop();
            return DarkMeta.Utils.package_to_url( parts.join('::') ) + '#' + subname;
        },
        'built_in_sub_to_url' : function (name) {
            return '<a class="perldoc-link" target="_blank" href="http://perldoc.perl.org/functions/' + name + '.html">' + name + '</a>';
        }
    }
};

$(function () {

    $('.fully-qualified-sub-name').each(function (i, e) {
        var name = $(e).text();
        var link = DarkMeta.Utils.fully_qualified_sub_to_url( name );
        $(e).html('<a class="sub-link" href="' + link + '">' + name + '</a>');
    });

    $('.sub > .sub-name').each(function (i, e) {
        var name = $(e).text();
        $(e).html('<a class="sub-anchor" name="code:sub:' + name + '" href="#code:sub:' + name + '">' + name + '</a>');
    });

    var package_linker = function (i, e) { var name = $(e).text(); $(e).html('<a class="package-link" href="' + DarkMeta.Utils.package_to_url( name ) + '">' + name + '</a>') };

    $('.package-usage     > .package-name').each(package_linker);
    $('.class-method-call > .package-name').each(package_linker);

    var perldoc_linker = function (i, e) { $(e).html( DarkMeta.Utils.built_in_sub_to_url( $(e).text() ) ) };

    $('.built-in-sub').each(perldoc_linker);
    $('.keyword'     ).each(perldoc_linker);
    $('.statement'   ).each(perldoc_linker);

    // add in the line numbers ...
    var source    = $('#source > code').html();
    var lines     = source.split("\n");
    var max_width = (lines.length + "").length;
    var numbered = lines.map(
        function (line, i) {
            var line_num = (i + 1) + "";
            var padding  = (new Array( max_width - line_num.length + 1 )).join(" ");
            return "<span><span class='line-number'>" + padding + "<a class='line-number-anchor' name='source:line:" + line_num + "' href='#source:line:" + line_num + "'>" + line_num + "</a></span>" + line + "</span>";
        }
    );

    $('#source').html( numbered.join("\n") );
});

