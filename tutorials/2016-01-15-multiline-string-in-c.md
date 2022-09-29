---
layout: tutorial.njk
title: How to write multiple lines string in C
description:
    In this quick tutorial, I will show you how to write multiple line string
    (multiline string) in C programming language.
date: Last Modified
publishedAt: 2016-01-15
tags:
    - post
    - tutorial
    - c
---

In this quick tutorial, I will show you how to write multiple line string
(multiline string) in C programming language.

There are two ways of splitting `char *` variable in mupltiple lines.

```c
// 👇 first approach
char *str1 = "line 1\n \
line 2";

// 👇 second approach
char *str2 = "line 1\n"
             "line 2";
```

I like the second one.

It can be useful for printing multple lines in C. Let's take a look redis
source code as an example. Instead of printing multiple lines string like this

```c
/* taken from: https://github.com/antirez/redis/blob/3.2/src/server.c#L3651-L3666 */
void usage(void) {
    fprintf(stderr,"Usage: ./redis-server [/path/to/redis.conf] [options]\n");
    fprintf(stderr,"       ./redis-server - (read config from stdin)\n");
    fprintf(stderr,"       ./redis-server -v or --version\n");
    fprintf(stderr,"       ./redis-server -h or --help\n");
    fprintf(stderr,"       ./redis-server --test-memory <megabytes>\n\n");
    fprintf(stderr,"Examples:\n");
    fprintf(stderr,"       ./redis-server (run the server with default conf)\n");
    fprintf(stderr,"       ./redis-server /etc/redis/6379.conf\n");
    fprintf(stderr,"       ./redis-server --port 7777\n");
    fprintf(stderr,"       ./redis-server --port 7777 --slaveof 127.0.0.1 8888\n");
    fprintf(stderr,"       ./redis-server /etc/myredis.conf --loglevel verbose\n\n");
    fprintf(stderr,"Sentinel mode:\n");
    fprintf(stderr,"       ./redis-server /etc/sentinel.conf --sentinel\n");
    exit(1);
}
```

I like to write the code like this one

```c
/* Alternative version of https://github.com/antirez/redis/blob/3.2/src/server.c#L3651-L3666 */
void usage(void) {
    fprintf(stderr,
    "Usage: ./redis-server [/path/to/redis.conf] [options]\n"
    "       ./redis-server - (read config from stdin)\n"
    "       ./redis-server -v or --version\n"
    "       ./redis-server -h or --help\n"
    "       ./redis-server --test-memory <megabytes>\n\n"
    "Examples:\n"
    "       ./redis-server (run the server with default conf)\n"
    "       ./redis-server /etc/redis/6379.conf\n"
    "       ./redis-server --port 7777\n"
    "       ./redis-server --port 7777 --slaveof 127.0.0.1 8888\n"
    "       ./redis-server /etc/myredis.conf --loglevel verbose\n\n"
    "Sentinel mode:\n"
    "       ./redis-server /etc/sentinel.conf --sentinel\n");
    exit(1);
}
```

less typing FTW.

**Update 2022**: [Gist](https://gist.github.com/pyk/f13134a1a33b1634fde0) is no
longer embedded
