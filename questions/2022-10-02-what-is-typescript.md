---
layout: question.njk
title: What is TypeScript?
description:
    TypeScript is a strongly typed programming language that builds on
    JavaScript, giving you better tooling at any scale. Writing secure and
    maintainable JavaScript codebase is very hard, TypeScript is created to
    helps developer to write secure and maintainable JavaScript codebase.
date: Last Modified
publishedAt: 2022-10-02
tags:
    - post
    - faq
    - typescript
    - ecmascript
    - commonjs
---

[TypeScript][1] is a strongly typed programming language that builds on
JavaScript, giving you better tooling at any scale. Writing secure and
maintainable JavaScript codebase is very hard, TypeScript is created to helps
developer to write secure and maintainable JavaScript codebase.

Here is example of TypeScript code:

```typescript
type Result = "pass" | "fail";

function verify(result: Result) {
    if (result === "pass") {
        console.log("Passed");
    } else {
        console.log("Failed");
    }
}
```

If you pass any string other than `"pass"` and `"fail"` to the `verify`
function, the code above won’t compile.

If you are JavaScript developer, it’s recommended to write the codebase in
TypeScript instead of JavaScript. You can write one codebase and target
multiple JavaScript standards like [ECMAScript][2] and [CommonJS][3]. So you
don’t need to worry about specific JavaScript standard.

You can also write one program that can run on the server and browser using
TypeScript. If you don’t use TypeScript you need to write multple JavaScript
code that conform with different JavaScript standard.

If you want to learn more about TypeScript, go to the [TypeScript Handbook][4].

[1]: https://www.typescriptlang.org/
[2]: /questions/what-is-ecmascript-es/
[3]: /questions/what-is-commonjs-cjs/
[4]: https://www.typescriptlang.org/docs/handbook/intro.html
