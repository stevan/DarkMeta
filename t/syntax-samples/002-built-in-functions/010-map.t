#!perl -w

map { $_ * 2 } @ARGV;
map {
    $_ * 2
} @ARGV;

map $_ * 2, @ARGV;
map ($_ * 2), @ARGV;

