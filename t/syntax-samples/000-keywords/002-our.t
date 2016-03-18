#!perl -w

our $x;
our $x = 5;
our $x ||= 10;
our ();
our ($x, $y);
our ($x, $y) = (1, 0);

# even combine them
our ($x, my $y);
