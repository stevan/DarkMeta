#!perl -w

local $x;
local $x = 5;
local $x ||= 10;
local ();
local ($x, $y);
local ($x, $y) = (1, 0);

