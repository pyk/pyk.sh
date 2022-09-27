---
layout: post.njk
title: How to create shareable or reusable prettier configuration
description:
    In this tutorial, I will show you how to create a shareable or reusable
    prettier configuration that you can use on multiple projects without need
    to copy-paste your configuration file. If you use prettier on multiple
    projects, this post is for you.
date: 2022-09-26
tags:
    - post
    - tutorial
    - prettier
permalink: "/tutorials/{{ title | slugify }}/"
---

**Note**: Full source code is available on [github][3].

In this tutorial, I will show you how to create a shareable or reusable
prettier configuration that you can use on multiple projects without need to
copy-paste your configuration file.

If you use prettier on multiple projects, this post is for you. After read this
post you will be able to manage prettier configuration for all of your projects
in one place to save time, versioning your config file and stay consistent
across projects.

In this post we will review the basic first about prettier and then we will
create a shareable or reusable prettier configuration from scratch and
distribute it as npm package. Feel free to skip the introduction section.

### Brief overview

[Prettier][2] is a tool used by developers to check and fix the format of their
code. It is an essential tool that you must use to write readable code with
consistent formatting.

Prettier is the most popular code formatter tool and supported by wide-variety
of code editors. You can customize the formatting results based on your
personal or team preferences.

These are most widely used the options that you can customize:

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

### Shareable Prettier Configuration

Let's create shareable prettier configuration and distribute it as npm package.
You can access the finished version [here][3].

First, create new project by running the following command:

```shell
# npm
npm init -y

# pnpm
pnpm init
```

For example:

```shell
✦ pnpm init
Wrote to /Users/pyk/github/pyk/prettier-config/package.json

{
  "name": "prettier-config",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Then update the `package.json` like the following:

```json
{
    "name": "@pyk/prettier-config",
    "version": "1.0.0",
    "description": "pyk's personal prettier config",
    "main": "index.js",
    "license": "MIT",
    "homepage": "https://pyk.sh/create-shareable-prettier-configuration/",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/pyk/prettier-config.git"
    },
    "bugs": {
        "url": "https://github.com/pyk/prettier-config/issues"
    },
    "author": {
        "name": "pyk",
        "email": "gm@pyk.sh",
        "url": "https://github.com/pyk"
    },
    "keywords": ["prettier", "prettier-config"],
    "publishConfig": {
        "access": "public"
    },
    "scripts": {
        "prettier:check": "prettier --check ."
    },
    "prettier": "./index.js",
    "devDependencies": {
        "prettier": "2.7.1"
    }
}
```

Don't forget to update the `name`, `description`, `homepage`, `repository.url`,
`bugs.url` and the `author`. Feel free to skip the `devDependencies` and
`scripts` fields, it is optional.

You can set your sharebale prettier configuration as private npm package by
removing the `publishConfig` field.

Next step is to create `index.js` file with the following content:

```js
// index.js
module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    proseWrap: "always",
    printWidth: 79,
    useTabs: false,
    bracketSpacing: true,
    overrides: [
        {
            files: ["*.yml", "*.yaml"],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
```

Feel free to customize the options based on your preferences. See full
available options [here][4].

The last step is to publish it to npm using the following command:

```shell
# npm
npm publish

# pnpm
pnpm publish
```

For example:

```shell
✦ pnpm publish
npm notice
npm notice 📦  @pyk/prettier-config@1.0.0
npm notice === Tarball Contents ===
npm notice 348B index.js
npm notice 753B package.json
npm notice === Tarball Details ===
npm notice name:          @pyk/prettier-config
npm notice version:       1.0.0
npm notice filename:      @pyk/prettier-config-1.0.0.tgz
npm notice package size:  618 B
npm notice unpacked size: 1.1 kB
npm notice shasum:        c224f4bb7211476dcfc1b130a9022f259e35aba0
npm notice integrity:     sha512-ZdrJfj3ISnGvI[...]99pn3FGGgs1kg==
npm notice total files:   2
npm notice
npm notice Publishing to https://registry.npmjs.org/
+ @pyk/prettier-config@1.0.0
npm notice
npm notice New minor version of npm available! 8.15.0 -> 8.19.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.19.2
npm notice Run npm install -g npm@8.19.2 to update!
npm notice
```

To use your shareable prettier config:

1. Install your prettier-config as dev dependencies
2. Set `"prettier": "your-package-name"` in your other `package.json` project

For example:

```shell
# npm
npm install --save-dev --save-exact prettier @pyk/prettier-config

# pnpm
pnpm add --save-dev --save-exact prettier @pyk/prettier-config
```

Then update the `package.json`:

```json
{
    "name": "your-project",
    "scripts": {
        "prettier:check": "prettier --check .",
        "prettier:write": "prettier --write ."
    },
    "prettier": "@pyk/prettier-config",
    "devDependencies": {
        "prettier": "2.7.1",
        "@pyk/prettier-config": "1.0.0"
    }
}
```

Your code editor should be automatically use the prettier configuration. If you
have some Continuous Integration pipeline or git hooks, you can use the
following command to check and fix your code format:

```shell
# npm
npm run prettier:check
npm run prettier:write

# npm
pnpm prettier:check
pnpm prettier:write
```

Enjoy and happy hacking!

[1]: /topics/how-to/
[2]: /what-is-prettier/
[3]: https://github.com/pyk/prettier-config
[4]: https://prettier.io/docs/en/options.html
[5]: https://pyk.sh/create-shareable-prettier-configuration/
