---
layout: tutorial.njk
title: How to allocate, copy and concat buffer in C
description:
    In this quick tutorial, I will show you how to allocate new buffer and copy
    source buffer to target buffer in C programming language.
date: Last Modified
publishedAt: 2015-12-14
tags:
    - post
    - tutorial
    - c
---

In this quick tutorial, I will show you how to allocate new buffer and copy
source buffer to target buffer in C programming language.

**TLDR**:

```c
// 👇 Allocate new buffer
char *buff = (char *)calloc(LEN, sizeof(char));


// 👇 Copy source buffer to target buffer
char buff[6];
strncpy(buff, "helllo is extra hello", sizeof(buff) - 1);
buff[sizeof(buff) - 1] = '\0';
```

If you want to learn more about the basic of buffer in C programming languge,
continue below.

## Brief overview

Buffer or String in C is represented as an array of `char` terminated by null
character `\0`.

```c
char buff[6] = {'h', 'e', 'l', 'l', 'o', '\0'};

/* or */
char *buff = "hello"; /* \0 implicitly appended */

/* or */
char buff[] = "hello";
```

Null character is not the part of `buff` length but it does requires a memory
space.

The problem is in the function for handling a string operation like allocation
`malloc`, copy `strcpy(dest, src)` and concatination `strcat(dest, src)` is
performed in unsafe way.

`malloc` only allocate memory for us without initialize it which potentially
have a garbage values (a values from previous operation that are not cleared).
Where `strcpy` and `strcat` is assume that `dest` is big enough which lead us
buffer overflow problem if the `src` is larger than `dest`.

So how to safely allocate and copy buffer in C programming language?

## Solution

Use calloc instead of `malloc` to allocate new buffer:

```c
char *buff = (char *)calloc(LEN, sizeof(char));
```

`calloc` will allocate `LEN` contiguos block of memory with size
`sizeof(char)`bytes for each block and initialize it to zero. This will make
sure that `buff` is not contains any garbage values or sensitive information
from the previous operation.

Use `strncpy` and `terminate` to copy source buffer to target buffer:

```c
char buff[6];
strncpy(buff, "helllo is extra hello", sizeof(buff) - 1);
buff[sizeof(buff) - 1] = '\0';
```

`strncpy` is copy all the first `sizeof(buff) - 1` from `src`. This help us
prevent buffer overflow and corrupting the heap.

Use `strncat` to concat two or more buffers:

```c
char path[11];
char fname = "hello";
char *ext = ".txt";
strncat(path, fname, sizeof(path) - strlen(fname) - 1);
strncat(path, ext, sizeof(path) - strlen(ext) - 1);
```

This will make sure that the concat operation is not write to more than
allocated memory for `path` buffer.

That's it.
