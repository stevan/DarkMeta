package DarkMeta::Browser::Dir;

use strict;
use warnings;

use Carp         qw[ confess ];
use Scalar::Util qw[ blessed ];

sub new {
    my ($class, $dir) = @_;

    (blessed $dir && $dir->isa('Path::Class::Dir'))
        || confess 'You must pass in an instance of Path::Class::Dir';

    bless { dir  => $dir } => $class;
}

sub path     { scalar $_[0]->{dir}->relative }
sub children { $_[0]->{dir}->children( no_hidden => 1 ) }

1;

__END__
