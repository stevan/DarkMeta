#!perl -w

Gorch::foo();
Gorch::foo(10, 20, 30);

Gorch::foo ();
Gorch::foo (30, @bar);

Bar::Baz::foo();
Bar::Baz::foo(10, 20, 30);

Bar::Baz::foo ();
Bar::Baz::foo (30, @bar);

DarkMeta::Browser::prepare_app('testing linkage');



