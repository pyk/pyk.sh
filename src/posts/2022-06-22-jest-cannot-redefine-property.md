---
layout: post.njk
title: |
    Jest: Cannot redefine property
description: |
    Ok, recently I have encountered this problem when writing tests for Risedle
    Interface. This happen whtn you try to mock some function like this.
date: 2022-06-22
permalink: /jest-cannot-redefine-property/
tags:
    - post
    - jest
---

Ok, recently I have encountered this problem when writing tests for
[Risedle](https://risedle.com/) Interface:

```shell
  ● <FuseLeveragedTokenIcon /> › Given symbol and light color mode › should render correct image

    TypeError: Cannot redefine property: useColorMode
        at Function.defineProperty (<anonymous>)
```

This happen when you try to mock some function like this:

```typescript
// Imports
import * as chakra from "@chakra-ui/react";

// Mock
const useColorModeMock = jest.spyOn(chakra, "useColorMode");
useColorModeMock.mockReturnValue({ colorMode: "light" });
```

Some npm packages like chakra-ui will raise TypeError: Cannot redefine property
when you run the test. Someone have encountered the same problem but it seems
he/she doesn’t find the solution.

The solution is quite simple actually. You can use barrel imports to solve this
problem.

So, the first step is to create new file to import and re-export function that
you want to mock. For example:

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
// Imports
import * as chakra from "./chakra";

// Mock
const useColorModeMock = jest.spyOn(chakra, "useColorMode");
useColorModeMock.mockReturnValue({ colorMode: "light" });
```

Problem solved ✅
