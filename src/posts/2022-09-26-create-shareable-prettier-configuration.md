---
layout: post.njk
title: |
    How to create shareable or reusable prettier configuration
description: |
    In this post, I will show you how to create a shareable or reusable
    prettier configuration. If you use prettier on multiple projects, this
    post is for you.
date: 2022-09-26
tags:
    - post
    - how-to
    - prettier
permalink: /create-shareable-prettier-configuration/
---

**Note**: Feel free to access the [source code][3] on GitHub directly.

In this post, I will show you how to create a shareable or reusable prettier
configuration. If you use prettier on multiple projects, this post is for you.

You will be able to manage prettier configuration for all of your projects in
one place to save time and stay consistent across projects.

In this post we will review the basic first:

${toc}

Feel free to skip (1), (2) and (3) if you are comfortable with [prettier][2].

### What is Prettier?

[Prettier][2] is a tool used by developers to check and fix the format of their
code. It is an essential tool that you must use to write readable code with
consistent formatting.

Prettier is the most popular code formatter tool and supported by wide-variety
of code editors.

### What is Prettier configuration?

Prettier configuration is a list of rules that you can set in to get custom
formatting.

These are most widely used the rules that you can customize:

| Option           | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| `printWidth`     | Specify the line length that the printer will wrap on.                                      |
| `tabWidth`       | Specify the number of spaces per indentation-level.                                         |
| `useTabs`        | Indent lines with tabs instead of spaces.                                                   |
| `semi`           | Print semicolons at the ends of statements.                                                 |
| `singleQuote`    | Use single quotes instead of double quotes.                                                 |
| `trailingComma`  | Print trailing commas wherever possible in multi-line comma-separated syntactic structures. |
| `proseWrap`      | Wrap prose based on `printWidth`                                                            |
| `bracketSpacing` | Print spaces between brackets in object literals.                                           |

See full available options [here][4]

### How to customize prettier config?

### How to use shareable prettier config?

### How to create shareable prettier config?

[1]: /topics/how-to/
[2]: /what-is-prettier/
[3]: https://github.com/pyk/prettier-config
[4]: https://prettier.io/docs/en/options.html
