---
layout: tutorial.njk
title: How to fix Cannot redefine property "x" TypeError in Jest
description:
    The "Cannot redefine property" error occurs when you are trying to mock a
    function that directly exported in the package. To fix the error, we can
    explicitly mock the package or use barrel approach.
date: Last Modified
publishedAt: 2022-06-22
tags:
    - post
    - tutorial
    - barrel-imports
    - jest
---

In this short tutorial, I will show you how to fix "TypeError: Cannot redefine
property x" error in the [Jest][1] test.

For the TLDR, you can use two approachs to solve the error.

The first one is using `jest.mock` like the following:

```typescript
import yourModule from "@/path/to/yourModule";

// 👇 mock the module
jest.mock("@/path/to/yourModule");
```

The second one is using [barrel imports][2]. Suppose you want to test some
module that depends on the `@chakra-ui/react`. You can create new file then
re-export the function first:

```typescript
// chakra.ts
import { useColorMode } from "@chakra-ui/react";

const chakra = {
    // 👇 Re-export function that you want to mock
    useColorMode,
};

export default chakra;
```

Then mock the function via your new file instead of `@chakra-ui/react`:

```typescript
// your.spec.ts
import chakra from "./chakra";

const useColorModeMock = jest.spyOn(chakra, "useColorMode");
useColorModeMock.mockReturnValue({ colorMode: "light" });
```

If you want to understand why this is happen, feel free to continue to the next
section.

### Problem

The "TypeError: Cannot redefine property: x" error occurs when you are trying
to mock a function that directly exported in the package. To fix the error, we
can explicitly mock the package or use barrel approach.

Here is the example of error that I got. Recently I have encountered this
problem when writing tests for [Risedle][3] Interface:

```shell
  ● <FuseLeveragedTokenIcon /> › Given symbol and light color mode › should render correct image

    TypeError: Cannot redefine property: useColorMode
        at Function.defineProperty (<anonymous>)
```

This happen when you try to mock some function like this:

```typescript
import chakra from "@chakra-ui/react";

const useColorModeMock = jest.spyOn(chakra, "useColorMode");
useColorModeMock.mockReturnValue({ colorMode: "light" });
```

Some npm packages like `@chakra-ui/react` will raise TypeError: Cannot redefine
property when you run the test.

So, how to fix the "TypeError: Cannot redefine property: x" error?

### Solution

The solution is quite simple actually. We have two options here. The first
option is to use `jest.mock` and the second option is to use barrel imports to
fix this error.

The first one is using `jest.mock` like the following:

```typescript
import yourModule from "@/path/to/yourModule";

// 👇 mock the module
jest.mock("@/path/to/yourModule");
```

The second one is using [barrel imports][2]. Suppose you want to test some
module that depends on the `@chakra-ui/react`. You can create new file then
re-export the function first:

```typescript
// chakra.ts
import { useColorMode } from "@chakra-ui/react";

const chakra = {
    useColorMode,
};

export default chakra;
```

Then import it to your test file:

```typescript
// 👇 Use your barrel file
import chakra from "./chakra";

const useColorModeMock = jest.spyOn(chakra, "useColorMode");
useColorModeMock.mockReturnValue({ colorMode: "light" });
```

Problem solved ✅

[1]: /questions/what-is-jest/
[2]: /questions/what-is-barrel-imports-in-typescript/
[3]: https://risedle.com
