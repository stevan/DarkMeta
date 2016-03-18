#!perl -w

=pod

TODO

- test the various loop controls
    - break|continue|last|next|redo

=cut

until (1) { print "bar" }

print "foo" until 1;
