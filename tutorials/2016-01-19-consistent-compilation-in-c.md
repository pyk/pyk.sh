---
layout: tutorial.njk
title: How to write and compile POSIX compliant C program
description:
    In this quick tutorial, I will show you how to write and compile POSIX
    compliant C program. For TLDR, you need to use the following flags.
date: Last Modified
publishedAt: 2016-01-19
tags:
    - post
    - tutorial
    - c
---

In this quick tutorial, I will show you how to write and compile POSIX
compliant C program. For TLDR, you need to use the following flags:

```
clang-3.7 -std=c99 -pedantic -Wall -Werror -o yourprogram yourfile.c
```

If you want to learn more, feel free to continue below.

## POSIX compliant C program

Compiling C program using `-std` option will save me from a bunch of problems
about portability of my program. I use `C99` standart, since `C11` is not
widely implemented yet.

```shell
CC -std=c99 -pedantic -Wall -Werror -o program program.c
```

Sometimes I need a function definitions that are not specified in ISO C
standart. Such as `getaddrinfo`, `getnameinfo` and `freeaddrinfo` for socket
stuff. Those functions are specified in POSIX.1-2008 standart.

Naturally `-std=c99` option will force a system headers to only expose a
definitions that valid in ISO C99 standarts, and it's good. Compiling a program
that include a system header and use a functions that are not specified in the
standart will yield the following errors:

```shell
% CC=clang-3.7 make
clang-3.7 -std=c99 -pedantic -Wall -Werror -o hostinfo hostinfo.c
hostinfo.c:58:21: error: variable has incomplete type 'struct addrinfo'
    struct addrinfo hints, *addri;
                    ^
hostinfo.c:58:12: note: forward declaration of 'struct addrinfo'
    struct addrinfo hints, *addri;
           ^
hostinfo.c:62:18: error: implicit declaration of function 'getaddrinfo' is
      invalid in C99 [-Werror,-Wimplicit-function-declaration]
    int gairet = getaddrinfo(argv[1], NULL, &hints, &addri);
                 ^
hostinfo.c:64:40: error: implicit declaration of function 'gai_strerror' is
      invalid in C99 [-Werror,-Wimplicit-function-declaration]
        fprintf(stderr, "Error: %s\n", gai_strerror(gairet));
                                       ^
hostinfo.c:64:40: note: did you mean 'strerror'?
/usr/include/string.h:413:14: note: 'strerror' declared here
extern char *strerror (int __errnum) __THROW;
....
```

I need to define
[feature test macros](http://man7.org/linux/man-pages/man7/feature_test_macros.7.html)
for POSIX.1-2008 explicitly in order to tell compiler that I need a features
from POSIX.1-2008 standart:

```c
#define _POSIX_C_SOURCE 200809L
```

This macro causes header files to expose definitions corresponding to the
POSIX.1-2008 base specification (excluding the XSI extension) when program is
compiled.

Now, my program will consistently compiled in POSIX-compliant system.
