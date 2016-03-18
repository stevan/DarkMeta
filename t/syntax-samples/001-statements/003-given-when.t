#!perl -w

use v5.10;

=pod

TODO

- Probably best to ignore smartmatch, but check if it works

=cut

given (10) {
    when (10) { print "is 10" }
    default { print "is not 10" }
}
