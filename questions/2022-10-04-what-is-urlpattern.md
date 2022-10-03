---
layout: question.njk
title: What is URLPattern?
description:
    URLPattern is an experimental interface that available in the Web API. The
    interface can be utilized as route-matcher in the Web Worker environment.
date: Last Modified
publishedAt: 2022-10-04
tags:
    - post
    - faq
    - cloudflare-workers
---

**URLPattern** is an experimental interface that available in the Web API. The
interface can be utilized as route-matcher in the Web Worker environment.

You can use URLPattern like the following:

```typescript
const pattern = new URLPattern("/coins/:id");
const result = patten.exec("https://127.0.0.1:8787/coins/ok");
console.log("DEBUG: result", result);
```

The `result` will looks like the following:

```typescript
DEBUG: result {
  inputs: [ 'http://127.0.0.1:8787/coins/ok' ],
  pathname: { input: '/coins/ok', groups: { id: 'ok' } },
  protocol: { input: 'http', groups: { '0': 'http' } },
  username: { input: '', groups: { '0': '' } },
  password: { input: '', groups: { '0': '' } },
  hostname: { input: '127.0.0.1', groups: { '0': '127.0.0.1' } },
  port: { input: '8787', groups: { '0': '8787' } },
  search: { input: '', groups: { '0': '' } },
  hash: { input: '', groups: { '0': '' } }
}
```

The URLPattern object will matches URLs or parts of URLs against a pattern. The
pattern can contain capturing groups that extract parts of the matched URL.

More information about the syntax of patterns can be found on the API overview
page: [URL Pattern API][1].

[1]: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern
