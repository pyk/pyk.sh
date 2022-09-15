---
layout: post.njk
title: |
    How to install dapptools on macOS M1
description: |
    Installing dapptools is very daunting task, especially dealing with nix
    package manager. In this post I will show you how to install dapptools
    on macOS M1
date: 2022-03-19
permalink: /install-dapptools-on-macos/
tags:
    - post
    - dapptools
---

This is my personal note on how to install dapptools on macOS M1 machine.

### Requirements

Make sure you have enabled Rosetta on your macOS.

If you are using iTerm you can enabled it via the settings. Go to "Get Info"
then enable the Rosetta.

To double check, you can run the following command:

```shell
✦ uname -a
```

Make sure it shows `x86_64` at the end of the line, not `arm64`.

### Install nix 2.5

This is crucial step, most of the error is because dapptools doesn’t work well
with the latest version of nix.

You can install nix 2.5 by running the following command:

```shell
✦ sh <(curl -L https://releases.nixos.org/nix/nix-2.5.1/install)
```

Follow the instruction then wait the installation finished.

### Install dapptools

Run the following command to install dapptools:

```shell
curl https://dapp.tools/install | sh
```

DONE.

You should have dapptools installed.

```shell
✦ dapp --version
dapp 0.35.0
solc, the solidity compiler commandline interface
Version: 0.8.6+commit.11564f7e.Darwin.appleclang
hevm 0.49.0
```

### Common Errors

#### error: file 'REPEAT' was not found

Example:

```text
error: file 'REPEAT' was not found in the Nix search path (add it using $NIX_PATH or -I)

       at /nix/store/xgasnl190vw8a9qakqd4h8wv11xv1m63-env-manifest.nix:1:2734:
```

To fix this error, you need to edit the `.nix` file manually: Replace
`<REPEAT>` with `"REPEAT"`.
