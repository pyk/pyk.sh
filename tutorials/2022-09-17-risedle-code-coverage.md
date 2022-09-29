---
layout: tutorial.njk
title: How to build you own code coverage report
description:
    Some people say that the code coverage is not imporant and it just slow
    down the development. The truth is higher code coverage increases your
    chances of finding bugs. And while code coverage doesn't guarantee
    perfection, you'll be significantly less effective without it.
date: Last Modified
publishedAt: 2022-09-17
tags:
    - post
    - tutorial
    - risedle-code-coverage
    - jest
---

Some people say that the code coverage is not important and it just slow down
the development. The truth is higher code coverage increases your chances of
finding bugs. And while code coverage doesn't guarantee perfection, you'll be
significantly less effective without it.

[Risedle Code Coverage](https://coverage.risedle.com) helps me to monitor our
code hygiene. This is to make sure that we don't ship any broken stuff to our
users.

### Motivation

[Risedle](https://risedle.com) is building a financial tools where there is no
place for buggy software. One of our main priority is to get at least 95% of
our code is covered and tested. The goal is to increase the chances of finding
bugs in our [codes](https://github.com/risedle/monorepo).

Previously we use [Codecov](https://app.codecov.io/github/risedle/monorepo) to
aggregate our coverage reports. Based on my experience, codecov's site is slow
as fuck. It's also a very hard to get which modules and lines that are not
tested yet.

We need a simpler tool to show our code coverage status for each project inside
the monorepo.

### The idea

Currently we use [Jest](https://jestjs.io/) as our test runner. Jest have
built-in code coverage report and able to generate html files for the coverage
report.

So, let's just use that instead of relying on third party tool!

### The implementation

First, we need to generate all coverage reports in one command.

Luckily we use [Turborepo](https://turborepo.org/) as our build systems. So
running tests and generate coverage reports for all projects is simply using
the following command:

```shell
turbo run test --no-cache
```

After that, we need to aggregate the coverage report to one deployable site.

In order to do that we will create the following script:

{%raw%}

```js
// coverage/build.js
// Collect coverage and list them in this folder
const glob = require("glob");
const fse = require("fs-extra");
const Mustache = require("mustache");

const index = `
<!doctype html>
<html>
<head>
    <title>Risedle Monorepo Coverage</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <ul>
        {{#sources}}
            <li>
                <a href="/{{{.}}}/index.html">
                    {{{.}}}
                </a>
            </li>
        {{/sources}}
    </ul>
</body>
</html>
`;

// options is optional
glob(
    "**/coverage/lcov-report",
    { ignore: "node_modules/**" },
    function (er, files) {
        files.forEach((srcDir) => {
            const destDir = "coverage/" + srcDir;
            fse.copySync(srcDir, destDir, { overwrite: true | false });
        });
        const output = Mustache.render(index, { sources: files });
        // With a callback:
        fse.outputFile("./coverage/index.html", output);
    }
);
```

{% endraw %}

Voila, we just need to run this via static-site deployment like
[Vercel](https://vercel.com/).

Live version is available at
[coverage.risedle.com](https://coverage.risedle.com).
