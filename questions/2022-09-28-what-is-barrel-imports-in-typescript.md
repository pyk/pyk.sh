---
layout: question.njk
title: What is barrel imports in TypeScript?
description:
    Barrel is a technique to combine multiple public functions from multiple
    module into single convenient module. Barrel is commonly used by library
    authors to expose their functions and improve the DX (Developer
    Experience).
date: Last Modified
publishedAt: 2022-09-28
tags:
    - post
    - faq
    - typescript
    - barrel-imports
    - risedle-interface
---

Barrel is a technique to combine multiple public functions from multiple module
into single convenient module. Barrel is commonly used by library authors to
expose their functions and improve the DX (Developer Experience).

Suppose you have library that have the following modules:

```typescript
// yourlib/foo.ts
export class Foo {}

// yourlib/bar.ts
export class Bar {}

// yourlib/baz.ts
export class Baz {}
```

Without a barrel, your users would need three import statements:

```typescript
import { Foo } from "yourlib/foo";
import { Bar } from "yourlib/bar";
import { Baz } from "yourlib/baz";
```

To improve the developer experience, you can create new file `yourlib/index.ts`
and add barrel imports to it:

```typescript
// yourlib/index.ts
export * from "./foo";
export * from "./bar";
export * from "./baz";
```

Now your libary users can import what it needs from the barrel:

```typescript
import { Foo, Bar, Baz } from "yourlib";
```

You can also use named exports instead of exporting the whole module.

Suppose `yourlib/foo.ts` have the following functions:

```typescript
// yourlib/foo.ts

export function getName() {}
export function setName() {}
```

You can re-export the `foo` as their own module inside the `yourlib/index.ts`
file:

```typescript
import * as foo from "./foo";
export { foo };
```

Now your libary users can use `foo` module like the following:

```typescript
// 👇 import foo
import { foo } from "yourlib";

// 👇 use foo
foo.getName();
foo.setName();
```
