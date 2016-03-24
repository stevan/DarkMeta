#!perl -w

foo();
foo(10, 20, 30);

foo ();
foo (30, @bar);

$foo->();
$foo->( 100, 20 * 30 );
