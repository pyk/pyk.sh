---
layout: tutorial.njk
title: How to create shareable TypeScript configuration (tsconfig)
description:
    In this quick tutorial, I will show you how to create shareable and
    reusable TypeScript configuration tsconfig.json. Previously, we learn how
    to create ECMAScript and CommonJS library with TypeScript
date: Last Modified
publishedAt: 2022-10-03
tags:
    - post
    - tutorial
    - ecmascript
    - commonjs
    - typescript
---

**Note**: Full source code is available on [github][2].

In this quick tutorial, I will show you how to create shareable and reusable
TypeScript configuration (`tsconfig.json`).

Previously, we learn how to create [ECMAScript and CommonJS library with
TypeScript][1]. In that tutorial we create the following three files of
`tsconfig`:

1. `tsconfig.base.json` Our base TypeScript compiler options
2. `tsconfig.esm.json` Our ECMAScript library compiler options
3. `tsconfig.cjs.json` Our CommonJS library compiler options

If we want to create another ECMAScript and CommonJS library with TypeScript,
how to reuse our TypeScript configurations (`tsconfig` ) for other project?

## Create reusable tsconfig

In order to create reusable `tsconfig.json`, we need to publish and distribute
our TypeScript configuration files as NPM Package.

Follow the instructions below to publish your own tsconfig files and distribute
it as npm package.

Create directory `tsconfig` and initialize the project:

```bash
# 👇 for npm user
npm init -y

# 👇 for pnpm user
pnpm init
```

Update the `package.json` with the following content:

```bash
{
    "name": "@your-org/tsconfig",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT",
    "files": [
        "*.json"
    ],
    "homepage": "https://yourhomepage.com",
    "repository": {
        "type": "git",
        "url": "git+https://github.com/your/repo.git"
    },
    "bugs": {
        "url": "https://github.com/your/repo/issues"
    },
    "author": {
        "name": "your name",
        "email": "your email",
        "url": "your url"
    },
    "publishConfig": {
        "access": "public"
    }
}
```

Update the following fields with your own data:

1. `name` with your `@org/tsconfig` or `@npmaccount/tsconfig`. for example
   `@risedle/tsconfig` or `@pyk/tsconfig`
2. `homepage` with your homepage website.
3. `repository` and `bugs` with your public repository.
4. `author` with your public information.

Please note that in the `files` field we specify that we only upload `.json`
files inside the `tsconfig` directory. The next step is to create our
`tsconfig.json` files.

Create new file `base.json` with the following content:

```bash
{
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "Default",
    "compilerOptions": {
        "declaration": true,
        "declarationMap": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "moduleResolution": "node",
        "preserveWatchOutput": true,
        "skipLibCheck": true,
        "strict": true,
        "allowJs": true,
        "allowSyntheticDefaultImports": true
    },
    "exclude": ["node_modules"]
}
```

Create new file `esm.json` with the following content:

```bash
{
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "ESM Library",
    "extends": "./base.json",
    "compilerOptions": {
        "lib": ["ES2020", "DOM"],
        "module": "ES2022",
        "target": "ES6"
    }
}
```

Create new file `cjs.json` with the following content:

```bash
{
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "CommonJS Library",
    "extends": "./base.json",
    "compilerOptions": {
        "lib": ["ES2020", "DOM"],
        "module": "CommonJS",
        "target": "ES6"
    }
}
```

Feel free to add more files with different filename and compiler options.

Then we can publish our NPM Package with the following command:

```bash
# 👇 for npm user
npm publish

# 👇 for pnpm user
pnpm publish
```

To re-use our newly created shared tsconfig files, we can install it as
development dependencies and extends it in our `tsconfig` files.

For examples:

```bash
# 👇 for npm user
npm install --save-dev --save-exact @your-org/tsconfig

# 👇 for pnpm user
pnpm add --save-dev --save-exact @your-org/tsconfig
```

Then extends it in your `tsconfig.json` files:

```json
{
    "extends": "@your-org/tsconfig/your-file-name.json",
    "compilerOptions": {
        "outDir": "other/options"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

DONE!

Congrats, now you have your own shareable and reusable `tsconfig` files!

[1]: /tutorials/how-to-create-ecmascript-and-commonjs-library-with-typescript/
[2]: https://github.com/risedle/monorepo/tree/main/packages/tsconfig
