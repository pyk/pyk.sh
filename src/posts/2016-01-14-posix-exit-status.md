---
layout: post.njk
title: |
    POSIX Exit Status
description: |
    Returning the right exit status for success or failure opreation in the
    program is critical. Especially if you are working on low-level hardware.
date: 2016-01-14
permalink: /posix-exit-status/
tags:
    - post
    - c
---

Returning the right exit status for success or failure opreation in the program
is critical. Especially if you are working on low-level hardware.

In
[POSIX-compliant](https://en.wikipedia.org/wiki/POSIX#POSIX-oriented_operating_systems)
systems, there are 2 exit codes. `0` indicate a success and `1` indicate a
failures.

I use `{0,1}` instead of a macro `{EXIT_SUCCESS, EXIT_FAILURE}` that defined in
`stdlib.h` because it's the same things and it's less type for me.
