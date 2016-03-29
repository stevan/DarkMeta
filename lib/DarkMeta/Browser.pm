package DarkMeta::Browser;

use strict;
use warnings;

use parent 'Plack::App::Directory';

use Template;
use Path::Class ();
use Cwd         ();

sub prepare_app {
    my $self = shift;

    my $tmpl = Path::Class::File->new( Cwd::cwd(), $self->{tmpl} );

    (-e $tmpl && -f $tmpl)
        || die 'Could not find tmpl file (' . $tmpl . ')';

    my $dir = Path::Class::Dir->new( $self->{root} );

    (-e $dir && -d $dir)
        || die 'Could not find root directory (' . $dir . ')';

    $self->SUPER::prepare_app( @_ );
}

sub serve_path {
    my ($self, $env, $dir, $fullpath) = @_;

    #use Carp;
    #Carp::cluck join ' => ' => (
    #    env      => ($env      // 'undef'),
    #    dir      => ($dir      // 'undef'),
    #    fullpath => ($fullpath // 'undef')
    #);

    if (-d $dir) {
        return $self->SUPER::serve_path( $env, $dir );
    } else {
        my $file = $dir;

        my $code_file = Path::Class::File->new( $file )
            || return $self->return_403;
        my $code = $code_file->slurp;

        my %vars = (
            code => $code,
            path => $code_file->relative,
        );

        my $output = '';
        my $template = Template->new({ INCLUDE_PATH => Cwd::cwd() });
        $template->process( $self->{tmpl}, \%vars, \$output )
            || die $template->error();

        return [ 200, [ 'Content-Type' => 'text/html' ], [ $output ] ];
    }
}


1;

__END__

