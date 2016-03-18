#!perl -w

=pod

TODO

- Don't forget the computed gotos.

=cut

sub bar {
    print "In bar";
    goto \&bar;
}


FOO:
print "Got to Foo";
goto FOO;


