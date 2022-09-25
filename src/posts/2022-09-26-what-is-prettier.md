---
layout: post.njk
title: |
    What is Prettier?
description: |
    Prettier is a tool used by developers to check and fix the format of their
    code. It is an essential tool that you must use to write readable code with
    consistent formatting.
date: 2022-09-26
tags:
    - post
    - faq
    - prettier
permalink: /what-is-prettier/
---

[Prettier][1] is a tool used by developers to check and fix the format of their
code. It is an essential tool that you must use to write readable code with
consistent formatting.

Prettier transforms ugly code like this:

<!-- prettier-ignore-start -->
```html
<html>
<head>
<title>Prettier</title>
</head>
<body>
<h1>Hello from prettier</h1>
</body>
</html>
```
<!-- prettier-ignore-end -->

into readable code like this:

```html
<html>
    <head>
        <title>Prettier</title>
    </head>
    <body>
        <h1>Hello from prettier</h1>
    </body>
</html>
```

hence the name: _Prettier_.

### How to use Prettier

Prettier is a very popular tool and its supported by most of the code editor.

-   If you are using VSCode, you can install the [Prettier Extension][2].
-   If you are using vim, you can install [vim-prettier][3] plugin or using
    [ALE][4].

Here is the list of supported code editors and the plugin/extension that you
can install in order to use Prettier.

| Code editor        | Plugin/Extension                                |
| ------------------ | ----------------------------------------------- |
| Visual Studio Code | [Prettier - Code Formatter][2]                  |
| VIM                | [vim-prettier][3], [ALE][4] & [coc-prettier][5] |
| Sublime Text       | [JsPrettier][6]                                 |
| Visual Studio      | [Prettier Extension][7]                         |
| Atom               | [prettier-atom][8]                              |
| Emacs              | [prettier-emacs][9]                             |
| Espresso           | [espresso-prettier][10]                         |

Prettier is used by more than 4 million repositories on github alone, that's
very huge number of repositories!

[1]: https://prettier.io/
[2]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[3]: https://github.com/prettier/vim-prettier
[4]: https://github.com/dense-analysis/ale
[5]: https://github.com/neoclide/coc-prettier
[6]: https://packagecontrol.io/packages/JsPrettier
[7]: https://github.com/madskristensen/JavaScriptPrettier
[8]: https://github.com/prettier/prettier-atom
[9]: https://github.com/prettier/prettier-emacs
[10]: https://github.com/eablokker/espresso-prettier
