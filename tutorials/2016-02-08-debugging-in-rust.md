---
layout: tutorial.njk
title: How to use Debug trait in Rust
description:
    Rust programming language comes with traits called Debug as specified in
    fmt module. We can use this trait to display custom debug information from
    our struct.
date: Last Modified
publishedAt: 2016-02-08
tags:
    - post
    - tutorial
    - rust
---

In this quick tutorial, I will show you how to use Debug trait in Rust
programming language.

For the TLDR, here is how to use Debug trait in Rust:

{% raw %}

```rust
// 👇 Use built-in debug
#[derive(Debug)]
struct Node {
    index: i32,
    data: &'static str,
}

// 👇 Bring your own debugger
use std::fmt;

struct Node {
    index: i32,
    data: &'static str,
}

impl fmt::Debug for Node {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        return write!(f, "Node{{{},{:?}}}", self.index, self.data);
    }
}
```

{% endraw %}

If you want to learn more, feel free to continue below.

## How to use Debug in Rust

[Rust][rust] programming language comes with traits called [Debug][dbg] as
specified in [fmt][fmt] module. We can use this trait to display custom debug
information from our struct.

The usage is very straight forward, we just derive debug implementation via
`#[derive(Debug)]` above the struct. For example

```rust
#[derive(Debug)]
struct Node {
    index: i32,
    data: &'static str,
}
```

Then you can use `{:?}` argument type to request `Debug` traits from struct
`Node`.

```rust
let n1 = Node{index: 1, data: "Node 1"};
println!("Debug: {:?}", n1);
// Debug: Node { index: 1, data: "Node 1" }
```

Or we can use `{:#?}` argument type to pretty print the debug information

```rust
println!("Pretty: {:#?}", n1);
// Pretty: Node {
//     index: 1,
//     data: "Node 1"
// }
```

We can also implement `Debug` trait ourself, for example instead of
`Node {index: ..., data: ...}` format. Let's use `Node{index, data}` format.

The implementation available below

```rust
{% raw %}use std::fmt;

struct Node {
    index: i32,
    data: &'static str,
}

impl fmt::Debug for Node {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        return write!(f, "Node{{{},{:?}}}", self.index, self.data);
    }
}
{% endraw %}
```

Then we get our custom debug information

```rust
let n1 = Node{index: 1, data: "Node 1"};
println!("Debug: {:?}", n1);
// Debug: Node{1, "Node 1"}
```

_So nice!_

[rust]: https://rust-lang.org
[dbg]: https://doc.rust-lang.org/std/fmt/trait.Debug.html
[fmt]: https://doc.rust-lang.org/std/fmt/index.html
