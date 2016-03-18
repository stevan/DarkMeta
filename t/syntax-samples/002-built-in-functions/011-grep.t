#!perl -w

grep { $_ * 2 } @ARGV;
grep {
    $_ * 2
} @ARGV;

grep $_ * 2, @ARGV;
grep ($_ * 2), @ARGV;


