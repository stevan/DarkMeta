#!perl -w

unless ( 1 ) {
    unless ( 2 ) {
        4 unless 5;
        6 unless !7;
    } else {
        unless (8) {
            9;
        }
    }
}
