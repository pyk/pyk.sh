---
layout: tutorial.njk
title: How to use printf without shooting yourself in the foot
description:
    printf is essential functions for every c programmers. You need to learn
    the basic behavior of printf in order to use it safely.
date: Last Modified
publishedAt: 2016-06-05
tags:
    - post
    - tutorial
    - c
---

In this short tutorial, I will show you how to use [`printf`][1] properly
without shooting yourself in the foot.

For the TL;DR, the correct way to use `printf` is to **always** define a format
string explicitly:

```c
char *value = "string %d";
printf("%s", value);
```

You can enable `-Wformat=2 -Werror` flag in compilation to warn you from using
`printf` incorrectly at runtime.

To understand the problem, lets start from the basic first!

### Problem

printf is a library function that sends formatted output to stdout. You can use
printf to print out any value to the terminal console.

`printf` prototype is defined below:

```c
int printf(const char *format, ...);
```

`printf` takes parametes defined below:

| Parameter | Description                                                                                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`  | This is the string that contains the text to be written to stdout.                                                                                                                                       |
| `...`     | Depending on the format string, the function may expect a sequence of additional arguments, each containing one value to be inserted instead of each `%`-tag specified in the format parameter (if any). |

`format` can optionally contain embedded format tags that are replaced by the
values specified in subsequent additional arguments and formatted as requested.

By default, C compiler is doesn't care if you use `printf` correctly or not.
The following **unsafe** code will compile succesfully without warning or
error:

```c
#include <stdio.h>

int
main()
{
    char *a = "string";
    printf(a);
}
```

```shell
# gcc version 4.9.2
gcc printf_unsafe.c
./a.out
string
```

The code above seems safe, but it give us unpredictable consequences if `a`
contains placeholder that there are no argument to be formatted. It is possible
that it will print a private value from memory.

```c
#include <stdio.h>

int
main()
{
    char *a = "string %d";
    printf(a);
}
```

```shell
# gcc version 4.9.2
gcc printf_unsafe.c
./a.out
string 927983944
```

### Solution

So, the correct way to use `printf` is **always** define a format string
explicitly:

```c
#include <stdio.h>

int
main()
{
    char *a = "string %d";
    printf("%s", a);
}
```

```shell
# gcc version 4.9.2
gcc printf_safe.c
./a.out
string %d
```

Compiling the unsafe code with `-Wformat=2 -Werror` flag will prevent you from
using `printf` incorrectly at runtime.

```shell
# gcc version 4.9.2
gcc printf_unsafe.c -Wformat=2 -Werror
printf_unsafe.c: In function ‘main’:
printf_unsafe.c:7:2: error: format not a string literal and no format arguments [-Werror=format-security]
    printf(a);
    ^
cc1: all warnings being treated as errors
```

That's it folks! Happy hacking!

[1]: /questions/what-is-printf-in-c/
