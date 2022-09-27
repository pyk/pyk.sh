---
layout: tutorial.njk
title: How to enable fast hot reload for AWS Lambda development
description:
    This is my first time using AWS Lambda development tool. I use the
    following command to start the development server locally
date: 2020-04-26
tags:
    - post
    - tutorial
    - aws
---

This is myfirst time using AWS Lambda development tool.

I use the following command to start the development server locally:

```shell
sam local start-api
```

If you previously run build, the reload server will not work.

Use the following command to force AWS SAM use your local version, not a build
version:

```shell
sam local start-api -t template.yaml
```

If you changes your function, your server will be automatically reloaded.

By default, AWS SAM will pull docker image on every request. It will very slow.

Use the following command to speed up the local server:

```shell
sam local start-api -t template.yaml --skip-pull-image
```

This option `--skip-pull-image` will skip docker pulling image on every
request.

That's it. Now you have hot reload & fast local development server for AWS
Lambda.
