---
layout: tutorial.njk
title: How to create ECMAScript and CommonJS library with TypeScript
description:
    In this tutorial, I will show you how to create ECMAScript Module (ESM) and
    CommonJS (CJS) library with TypeScript programming languages.
date: Last Modified
publishedAt: 2022-10-02
tags:
    - post
    - tutorial
    - ecmascript
    - commonjs
    - typescript
---

In this tutorial, I will show you how to create [ECMAScript Module (ESM)][1]
and [CommonJS][2] library with [TypeScript Programming Languages][3].

## TLDR

You need to update your `package.json` and TypeScript configuration file to
support both ECMAScript and CommonJS.

Start from your `package.json`, add the following new fields (or update the
existing fields):

```json
{
    "source": "src/index.ts",
    "main": "dist/cjs/index.js",
    "types": "dist/cjs/index.d.ts",
    "scripts": {
        "build:esm": "tsc -p tsconfig.esm.json",
        "build:cjs": "tsc -p tsconfig.cjs.json"
    },
    "exports": {
        ".": {
            "import": {
                "types": "./dist/esm/index.d.ts",
                "default": "./dist/esm/index.js"
            },
            "require": {
                "types": "./dist/cjs/index.d.ts",
                "default": "./dist/cjs/index.js"
            }
        }
    }
}
```

For the TypeScript configuration file, you need to create two TypeScript
configuration files to target ECMAScript and CommonJS.

First, create new file `tsconfig.base.json` with the following content:

```json
{
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "Base",
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

Then create new file `tsconfig.esm.json` with the following content:

```json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "lib": ["ES2020", "DOM"],
        "module": "ES2022",
        "target": "ES6",
        "outDir": "dist/esm"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

Then create new file `tsconfig.cjs.json` with the following content:

```json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "lib": ["ES2020", "DOM"],
        "module": "CommonJS",
        "target": "ES6",
        "outDir": "dist/cjs"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

Now you can run the following command to build your ECMAScript and CommonJS
library:

```bash
# 👇 for npm user
npm run build:esm
npm run build:cjs

# 👇 for pnpm user
pnpm build:esm
pnpm build:cjs
```

Done.

If you want to learn more, then feel free to continue below.

## Brief overview

ECMAScript and CommonJS are JavaScript standard. ECMASCript is designed for the
JavaScript that run in the client-side (web browsers) while CommonJS is
designed for the JavaScript that run in the server-side. On recent development
of Node.js and Deno, the implementation brings ECMAScript to the server-side.

If you are writing JavaScript library, supporting both standards (ECMAScript
and CommonJS) is very tedious task. It’s better to write your library in
TypeScript then compile it to multiple JavaScript standards.

So how to create ECMAScript and CommonJS library with typescript?

## Create ECMAScript and CommonJs library with Typescript

We will start from scratch, create new project with the following command:

```bash
# 👇 for npm user
npm init -y

# 👇 for pnpm user
pnpm init
```

Update your `package.json` to include the following fields:

```json
{
    "source": "src/index.ts",
    "main": "dist/cjs/index.js",
    "types": "dist/cjs/index.d.ts",
    "scripts": {
        "build:esm": "tsc -p tsconfig.esm.json",
        "build:cjs": "tsc -p tsconfig.cjs.json"
    },
    "exports": {
        ".": {
            "import": {
                "types": "./dist/esm/index.d.ts",
                "default": "./dist/esm/index.js"
            },
            "require": {
                "types": "./dist/cjs/index.d.ts",
                "default": "./dist/cjs/index.js"
            }
        }
    }
}
```

Install the TypeScript compiler as development dependencies:

```bash
# 👇 for npm user
npm install --save-dev --save-exact typescript

# 👇 for pnpm user
pnpm add --save-dev --save-exact typescript
```

Create new file `src/index.ts`, for the demo purpose we will use the following
content:

```bash
function hello(): string {
    return "Hello from CommonJS and ECMAScript";
}

export default hello;
```

Then we need to create new file `tsconfig.base.json` as our base TypeScript
configuration file that used to target both ECMAScript and CommonJS library:

```bash
{
    "$schema": "https://json.schemastore.org/tsconfig",
    "display": "Base",
    "compilerOptions": {
        "declaration": true,
        "declarationMap": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "isolatedModules": true,
        "moduleResolution": "node",
        "skipLibCheck": true,
        "strict": true,
        "allowJs": true,
    },
    "exclude": ["node_modules"]
}
```

We will use the following compiler options as the base configurations:

-   `declaration` is set to `true`. This will generate `.d.ts` files for every
    TypeScript or JavaScript file inside your project.
-   `declarationMap` is set to `true`. This will generates a source map for
    `.d.ts` files which map back to the original `.ts` source file. This will
    allow editors such as VS Code to go to the original `.ts` file when using
    features like _Go to Definition_.
-   `esModuleInterop` is set to `true`. This will allow you to import and build
    a javascript module that conform multiple javascript standards such as
    CommonJS and ECMAScript.
-   `forceConsistentCasingInFileNames` is set to `true`. This will tell
    TypeScript compiler to report an error if a program tries to include a file
    by a casing different from the casing on disk.
-   `isolatedModules` is set to `true`. This will tell TypeScript compiler to
    report an error if you write certain code that can’t be correctly
    interpreted by a single-file transpilation process.
-   `moduleResolution` is set to `"node"` . This will tell TypeScript compiler
    to use Node.js module resolution strategy.
-   `skipLibCheck` is set to `true`. Skip type checking of declaration files.
-   `strict` is set to `true`. This will enables a wide range of type checking
    behavior that results in stronger guarantees of program correctness.
-   `allowJS` is set to `true`. This will tell TypeScript compiler to use `.js`
    and `.jsx` too instead of just `.ts` and `.tsx` files.

Next step is to create compiler options to target ECMAScript and compiler
options to target CommonJS.

Create new file `tsconfig.esm.json` with the following content:

```json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "lib": ["ES2020", "DOM"],
        "module": "ES2022",
        "target": "ES6",
        "outDir": "dist/esm"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

Then create new file `tsconfig.cjs.json` with the following content:

```json
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": {
        "lib": ["ES2020", "DOM"],
        "module": "CommonJS",
        "target": "ES6",
        "outDir": "dist/cjs"
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

In these two files, we use the following compiler options:

-   `lib` is set to `["ES2020", "DOM"]` it’s mean that we will have access to
    modern ECMAScript features such as `Array` or `Map`. You can update this
    based on your project.
-   `module` is set to `"ES2022"` for ECMAScript library output and
    `"CommonJS"` for CommonJS output.
-   `target` is set to `"ES6"`. `ES6` is an ECMAScript standard that widely
    supported by ECMAScript engines both on client-side (browsers) or
    server-side (Node and Deno).
-   `outDir` is the output directly. It is set to `dist/esm` for ECMAScript
    library and `dist/cjs` for the CommonJS library.

Now we can compile our TypeScript project using the following command:

```bash
# 👇 for npm user
npm run build:esm
npm run build:cjs

# 👇 for pnpm user
pnpm build:esm
pnpm build:cjs
```

This will output the following files:

```jsx
// ✦ cat dist/esm/index.js
function hello() {
    return "Hello from CommonJS and ECMAScript";
}
export default hello;
```

```jsx
// ✦ cat dist/cjs/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hello() {
    return "Hello from CommonJS and ECMAScript";
}
exports.default = hello;
```

Now you can publish it:

```bash
# 👇 for npm user
npm publish

# 👇 for pnpm user
pnpm publish
```

Your npm package will be available as CommonJS (via `require`) and ECMAScript
module (via `import`).

Congrats, now you have create ECMAScript and CommonJS library with one
TypeScript codebase!

[1]: /questions/what-is-ecmascript-es/
[2]: /questions/what-is-commonjs-cjs/
[3]: /questions/what-is-typescript/
