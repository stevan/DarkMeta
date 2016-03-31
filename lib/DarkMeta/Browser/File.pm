package DarkMeta::Browser::File;

use strict;
use warnings;

use Carp         qw[ confess ];
use Scalar::Util qw[ blessed ];

sub new {
    my ($class, $file) = @_;

    (blessed $file && $file->isa('Path::Class::File'))
        || confess 'You must pass in an instance of Path::Class::File';

    bless { file  => $file } => $class;
}

sub source { scalar $_[0]->{file}->slurp    }
sub path   { scalar $_[0]->{file}->relative }

1;

__END__
