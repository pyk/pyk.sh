---
layout: question.njk
title: What is CommonJS (CJS)?
description:
    CommonJS (CJS) is a JavaScript standard intended to ensure
    the interoperability of JavaScript server-side execution.
date: Last Modified
publishedAt: 2022-10-02
tags:
    - post
    - faq
    - commonjs
    - javascript-standard
---

**CommonJS (CJS)** is a JavaScript standard intended to ensure
the interoperability of JavaScript server-side execution.

CommonJS's module specification is widely used today, in particular for
server-side JavaScript programming with Node.js.

A few examples of the standard is how to define a variable, create new module,
import other module:

```javascript
// 👇 Import module
const fs = require("fs");

// 👇 Define variable
const n = 12;

// 👇 Export modules
module.exports = n;
```

The most popular CommonJs implementation is Node.js.

You can learn more about CommonJS [here][1].

[1]: https://en.wikipedia.org/wiki/CommonJS
