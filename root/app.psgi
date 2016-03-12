#!perl

use strict;
use warnings;

use Plack;
use Plack::Builder;
use Plack::Middleware::Static;

use DarkMeta::Browser;

builder {
    enable 'Plack::Middleware::Static' => (
        path => qr{^/(images|js|css)/},
        root => './root/static/'
    );

    DarkMeta::Browser->new(
        root => '/Users/slittle/Projects/work/main',
        tmpl => 'root/tmpl/code.tmpl'
    );
};
