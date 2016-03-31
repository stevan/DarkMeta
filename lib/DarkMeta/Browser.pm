package DarkMeta::Browser;

use strict;
use warnings;

use parent 'Plack::Component';

use Template;
use Path::Class ();

use Carp qw[ confess ];

use DarkMeta::Browser::File;
use DarkMeta::Browser::Dir;

use Plack::Request;
use Plack::Util::Accessor qw[
    tmpl_root
    code_root
];

sub new {
    my $class = shift;
    my $self  = $class->SUPER::new( @_ );

    my $code_root = Path::Class::Dir->new( $self->{code_root} );

    (-e $code_root && -d $code_root)
        || confess 'Could not find code-root directory (' . $code_root . ')';

    $self->{code_root} = $code_root;

    my $tmpl_root = Path::Class::Dir->new( $self->{tmpl_root} );

    (-e $tmpl_root && -d $tmpl_root)
        || confess 'Could not find tmpl-root directory (' . $tmpl_root . ')';

    $self->{tmpl_root} = $tmpl_root;

    return $self;
}

sub call {
    my $self = shift;
    my $r    = Plack::Request->new( shift );

    my $path = Path::Class::Dir->new( $self->{code_root}, $r->path );

    unless (-e $path) {
        return [ 404, [], [ 'Could not find path(' . $path->stringify . ')' ]];
    }
    else {
        my $output   = '';
        my $template = Template->new({ INCLUDE_PATH => $self->{tmpl_root} });

        if (-d $path) {
            $template->process(
                'dir.tmpl',
                {
                    dir => DarkMeta::Browser::Dir->new( $path )
                },
                \$output
            ) || confess $template->error();
        } else {
            $template->process(
                'file.tmpl',
                {
                    file => DarkMeta::Browser::File->new( Path::Class::File->new( $path ) )
                },
                \$output
            ) || confess $template->error();
        }

        return [ 200, [ 'Content-Type' => 'text/html' ], [ $output ] ];
    }
}


1;

__END__

