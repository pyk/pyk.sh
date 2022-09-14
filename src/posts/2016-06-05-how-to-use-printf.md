---
layout: post.njk
title: "How to use printf"
description: Test
date: 2016-06-05
permalink: /how-to-use-printf/
tags:
    - post
    - c
---

`printf` prototype is defined like below:

```c
int printf(const char \*format, ...);
```

The first argument `const char *format` is a format string that contains
placeholders marked by `%` escape character.

By default, C compiler is doesn't care if you use `printf` correctly or not.
The following **unsafe** code will compile succesfully without warning or
error:

```c
#include <stdio.h>

int main() {
    char *a = "string";
    printf(a);
}
```

```sh
# gcc version 4.9.2

gcc printf_unsafe.c ./a.out string
```

The code above seems safe, but it give us unpredictable consequences if `a`
contains placeholder that there are no argument to be formatted. It is possible
that it will print a private value from memory.

```c
#include <stdio.h>

int main() {
    char *a = "string %d";
    printf(a);

}
```

```sh
# gcc version 4.9.2

gcc printf_unsafe.c ./a.out
string 927983944
```

So, the correct way to use `printf` is **always** define a format string
explicitly:

```c
#include <stdio.h>

int main() {
    char *a = "string %d";
    printf("%s", a);
}
```

```c
# gcc version 4.9.2

gcc printf_safe.c ./a.out
string %d
```

Compiling the unsafe code with `-Wformat=2 -Werror` flag will prevent you from
using `printf` incorrectly at runtime.

```sh
# gcc version 4.9.2

gcc printf_unsafe.c -Wformat=2 -Werror
printf_unsafe.c: In function ‘main’:
printf_unsafe.c:7:2: error: format not a string literal and no format arguments [-Werror=format-security]
    printf(a);
    ^
cc1: all warnings being treated as errors
```
