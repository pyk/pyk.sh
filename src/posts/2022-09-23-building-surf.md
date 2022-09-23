---
layout: post.njk
title: |
    Building Surf - A Speedy React Framework
description: |
    Ok, I'm sick of using slow and bloated React web framework. I want to build
    react-based framework that use all modern features of react. I will called it
    **Surf**, a speedy react framework.
date: 2022-09-23
tags:
    - post
    - surf
permalink: /building-surf-part-1/
---

Ok, I'm sick of using slow and bloated React web framework. I want to build
react-based framework that use all modern features of react. I will called it
**Surf**, a speedy react framework.

Here is the basic features of **Surf**:

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
2. Run `surf` for local development
3. Run `surf deploy` to deploy my react apps

### The Basic

Let's start from the basic first, shall we?

We need to know how to deploy Cloudlfare Workers, How to render React inside
Cloudflare Worker and so on.

**How to deploy Cloudflare Workers?**

In order to deploy serverless app to Cloudflare workers, we need to write
JavaScript file that response to some event, in this case a HTTP Request.

Suppose we have the following `index.js` file:

```js
// index.js
export default {
    async fetch(request) {
        return new Response("Hello World!");
    },
};
```

In order to deploy the this code to Clouflare Worker, we need to install
[wrangler](https://github.com/cloudflare/wrangler2) and use the following
command:

```shell
wrangler publish index.js --compatibility-date 2022-09-23 --name=cf-worker-rsc
```

For now we will focus to build Surf to be deployable on Cloudflare Workers.
Once we implement 2 deployments we will get the pattern and we can generalize
the process for all serverless or edge-function platforms.

Next basic question is, how to render React inside Cloudflare Workers?

**How to render React in Cloudflare Workers?**

Let's start by installing the dependencies: React and React DOM.

```shell
pnpm add --save-exact react@latest react-dom@latest
```

Once the dependencies installed, we can use
[renderToReadableStream](https://reactjs.org/docs/react-dom-server.html#rendertoreadablestream)
to render our react app.

Let's write some proof-of-concept:

```typescript
// src/entry.worker.ts
import React from "react";
import ReactDOMServer from "react-dom/server";

function Root() {
    return (
        <html>
            <head>
                <title>Hello world</title>
            </head>
            <body>
                <header>This is header</header>
                <main>This is main</main>
                <footer>This is footer</footer>
            </body>
        </html>
    );
}

export default {
    async fetch(request: Request): Promise<Response> {
        const stream = await ReactDOMServer.renderToReadableStream(<Root />);
        return new Response(stream);
    },
};
```

In order to make it to work, we need to create build file and add some
configuration:

```json
// node.tsconfig.json
{
    "extends": "@risedle/tsconfig/node.json",
    "compilerOptions": {
        "outDir": "dist"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

```json
// worker.tsconfig.json
{
    "compilerOptions": {
        "target": "esnext",
        "lib": ["esnext", "webworker"],
        "strict": true,
        "moduleResolution": "node",
        "skipLibCheck": true,
        "esModuleInterop": true,
        "types": ["@cloudflare/workers-types"]
    }
}
```

```typescript
// src/build.ts
import { build } from "esbuild";

async function main() {
    await build({
        bundle: true,
        format: "esm",
        mainFields: ["browser", "module", "main"],
        platform: "browser",
        target: "es2020",
        sourcemap: false,
        charset: "utf8",
        entryPoints: ["src/entry.worker.tsx"],
        outfile: ".surf/worker.js",
        tsconfig: "worker.tsconfig.json",
    });
}

main();
```

Add new script in the `package.json`:

```json
{
    "scripts": {
        "build": "tsc -p node.tsconfig.json"
    }
}
```

Run `pnpm build` to compile our build script to Node.js compatible script, then
run the script:

```shell
node dist/build.js
```

Now we can deploy our server-side rendered React apps to Cloudflare Workers
using the following command:

```shell
wrangler publish .surf/worker.js --compatibilty-date 2022-09-23 --compatibility-flag streams_enable_constructors --name=cf-worker-rsc
```

and viola! we have deployed our first server-side rendered React app to
cloudflare workers.

Next steps:

1. How to use dynamic imports in our `entry.server.tsx`?
2. How to get convert file-system Routing to Worker routes?
3. How to integrate Chakra UI?

_To be continue_
