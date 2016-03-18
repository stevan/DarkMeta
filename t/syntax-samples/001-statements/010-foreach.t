#!perl -w

=pod

TODO

- Don't forget to test `for` and `foreach`
- test the various loop controls
    - break|continue|last|next|redo

=cut

for ( my $i = 0; $i < 100; $i++ ) {
    print $i;
}

foreach my $i ( 0 .. 10 ) {
    print $i;
}
