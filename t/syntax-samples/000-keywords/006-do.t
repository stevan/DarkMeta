#!perl -w

=pod

TODO

- Don't forget all the strange forms of `do`

=cut

sub bar { print 'bar' }

do &bar;

do {
    print 'baz';
};

do 'some-file.t';
