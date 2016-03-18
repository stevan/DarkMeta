#!perl -w

my $x;
my $x = 5;
my $x ||= 10;
my ();
my ($x, $y);
my ($x, $y) = (1, 0);

# even combine them
my ($x, our $y);
