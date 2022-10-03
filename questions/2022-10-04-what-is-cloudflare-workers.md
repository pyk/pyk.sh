---
layout: question.njk
title: What are Cloudflare Workers?
description:
    Cloudflare Workers is platform for developers that provides a serverless
    execution environment. It allows you to create entirely new applications or
    augment existing ones without configuring or maintaining infrastructure.
date: Last Modified
publishedAt: 2022-10-04
tags:
    - post
    - faq
    - cloudflare-workers
---

Cloudflare Workers is platform for developers that provides a serverless
execution environment. It allows you to create entirely new applications or
augment existing ones without configuring or maintaining infrastructure.

For example, here is a simple Cloudflare Workers app that responds “Hello
World” to any HTTP request:

```tsx
export default {
    async fetch(request: Request): Promise<Response> {
        return new Response("Hello world");
    },
};
```

Cloudflare Workers is very powerful, you can even deploy Rust program to the
Cloudflare Workers via WASM.

You can learn more about Cloudflare Workers [here][1].

[1]: https://developers.cloudflare.com/workers/
