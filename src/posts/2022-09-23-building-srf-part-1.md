---
layout: post.njk
title: |
    Building SRF, Part 1
description: |
    SRF is a Speedy React Framework
date: 2022-09-23
tags:
    - post
    - srf
permalink: /building-srf-part-1/
---

Ok, I'm sick of using slow and bloated React web framework. I want to build
react-based framework that use all modern features of react. I will called it
**SRF**, a speedy react framework.

Here is the basic features of **SRF**:

-   Just-in-time rendering on the edge
-   Zero runtime overhead
-   No configuration necessary
-   TypeScript support out of the box
-   Can be deployed to any serverless platforms
-   File-system Routing
-   API routing

### Motivation

I want to do the following:

1. Create new file `pages/page.tsx`
2. Run `srf dev` for local development
3. Run `srf deploy` to deploy my react apps

### The Basic

Let's start from the basic first and focus deployment on Cloudflare Workers.
Once we implement 2 deployments we will get the pattern and we can generalize
the process.

In order to deploy to cloudflare workers, we need once compiled JavaScript file
and deploy it using the following command:

```shell
wrangler publish index.js --compatibility-date 2022-09-23 --name=cf-worker-rsc
```

So, the first problem is how we convert the following structure into one giant
`index.js` file?

```shell
example-app/
├─ pages/
│  ├─ page.tsx
```

We are going to try to use
[esbuild](https://esbuild.github.io/getting-started/#your-first-bundle) to do
this.

Let's start from the basic implementation:

```typescript
// build.ts
import { build } from "esbuild";

async function main() {
    await build({
        entryPoints: ["pages/page.tsx"],
        bundle: true,
        outfile: ".srf/worker.js",
    });
}

main();
```

This build script will generate the following file:

```js
// worker.js
"use strict";
(() => {
    // pages/page.tsx
    function RootPage() {
        return /* @__PURE__ */ React.createElement(
            "html",
            null,
            /* @__PURE__ */ React.createElement(
                "head",
                null,
                /* @__PURE__ */ React.createElement("title", null, "Edger POC")
            ),
            /* @__PURE__ */ React.createElement(
                "body",
                null,
                /* @__PURE__ */ React.createElement(
                    "header",
                    null,
                    "This is header"
                ),
                /* @__PURE__ */ React.createElement(
                    "main",
                    null,
                    "This is main"
                ),
                /* @__PURE__ */ React.createElement(
                    "footer",
                    null,
                    "This is footer"
                )
            )
        );
    }
})();
```

as you can see esbuild can load and transform `tsx` file to plain javascript
without hassle.

Now we have another problem, the Cloudflare Worker is expected to have the
following javascript file:

```js
export default {
    async fetch(request) {
        return new Response("Hello World!");
    },
};
```

how do we combine the `pages/page.tsx` and the file above?

Do we need to create new file? can we create new typescript file
programmatically?

_To be continue_
