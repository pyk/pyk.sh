---
layout: question.njk
title: What is ECMAScript (ES)?
description:
    ECMAScript (ES) is a JavaScript standard intended to ensure
    the interoperability of web pages across different web browsers.
date: Last Modified
publishedAt: 2022-10-02
tags:
    - post
    - faq
    - ecmascript
---

**ECMAScript (ES)** is a JavaScript standard intended to ensure
the interoperability of web pages across different web browsers.

ECMAScript is commonly used for client-side scripting on the Web, and it is
increasingly being used for writing server-side applications and services
using Node.js, Deno and other frameworks.

A few examples of the standard is how to define a variable, create new module,
import other module:

```typescript
// 👇 Import module
import module from "mymodule";

// 👇 Define variable
const n = 12;

// 👇 Export modules
export default n;
```

These are the example of the ECMAScript implementation or commonly referred as
ECMAScript Engine:

| Implementation | Description                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| SpiderMonkey   | A JavaScript engine in Mozilla Gecko applications, including Firefox                                     |
| JavaScriptCore | A JavaScript interpreter and JIT that used in the WebKit project and applications such as Safari         |
| V8             | A JavaScript engine used in Google Chrome and other Chromium-based browsers, Node.js, Deno, and `V8.NET` |

You can learn more about ECMAScript here:

1. [ECMAScript][1]
2. [List of ECMAScript engines][2]

[1]: https://en.wikipedia.org/wiki/ECMAScript
[2]: https://en.wikipedia.org/wiki/List_of_ECMAScript_engines
