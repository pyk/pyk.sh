---
layout: post.njk
title: |
    Scala on Debian
description: |
    Currently i'm trying to  dig deeper on Scala world. I leave a note here
    on how to setup Scala on debian.
date: 2016-04-09
permalink: /scala-on-debian/
tags:
    - post
    - scala
---

Just dig deeper on [Scala](http://www.scala-lang.org/) world. I leave a note
here on how to setup Scala on debian.

Choose Scala version [here](http://www.scala-lang.org/download/all.html), I use
[Scala 2.12.0-M3](http://www.scala-lang.org/download/2.12.0-M3.html) one. Grab
the download link of debian package.

```text
http://downloads.lightbend.com/scala/2.12.0-M3/scala-2.12.0-M3.deb
```

And now, setup using the following command:

```shell
wget http://downloads.lightbend.com/scala/2.12.0-M3/scala-2.12.0-M3.deb
sudo dpkg -i scala-2.12.0-M3.deb
```

Try it, make sure it works

```shell
% scala
Welcome to Scala 2.12.0-M3 (Java HotSpot(TM) 64-Bit Server VM, Java 1.8.0_72).
Type in expressions for evaluation. Or try :help.

scala> 2 + 2
res0: Int = 4
```
