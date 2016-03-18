#!perl -w

state $x;
state $x = 5;
state $x ||= 10;
state ();
state ($x, $y);
state ($x, $y) = (1, 0);

