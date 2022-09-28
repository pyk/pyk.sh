---
layout: question.njk
title: What is Jest?
description:
    Prettier is a tool used by developers to check and fix the format of their
    code. It is an essential tool that you must use to write readable code with
    consistent formatting.
date: Last Modified
publishedAt: 2022-09-28
tags:
    - post
    - faq
    - jest
---

[Jest][1] is test runner for JavaScript and TypeScript. You can use Jest to
write the unit test, spec file or integration test for your
JavaScript/TypeScript program.

Suppose you have the following TypeScript module:

```typescript
// add.ts
function add(a: number, b: number): number {
    return a + b;
}

export default add;
```

You can write the unit test to make sure that your function returns correctly:

```typescript
// add.spec.ts
import add from "./add";

describe("Given a equal to b", () => {
    it("Should return correct values", () => {
        const res = add(1, 1);
        expect(res).toBe(2);
    });
});

describe("Given a less than b", () => {
    it("Should return correct values", () => {
        const res = add(2, 3);
        expect(res).toBe(5);
    });
});

describe("Given a greater than b", () => {
    it("Should return correct values", () => {
        const res = add(3, 2);
        expect(res).toBe(5);
    });
});
```

Then you can use `jest` to run the unit test.

[1]: https://jestjs.io/
