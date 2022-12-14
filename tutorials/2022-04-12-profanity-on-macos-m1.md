---
layout: tutorial.njk
title: How to generate vanity wallet address on macOS M1
description:
    Please don't use profanity to generate your wallet address. If you have any
    funds inside wallet that generated by vanity please move it ASAP. There is
    vulnerability that allows hacker to get private key of the wallet.
date: Last Modified
publishedAt: 2022-04-12
tags:
    - post
    - tutorial
    - wallet-address
    - smart-contract
---

**Update**: Please don't use profanity to generate your wallet address. If you
have any funds inside wallet that generated by vanity please move it ASAP.
There is [vulnerability][2] that allows hacker to get private key of the
wallet.

In this quick tutorial, I will show you how to generate vanity [wallet
address][2] using [profanity][3] on your macOS M1. Let's get started!

First thing first, make sure you have enabled Rosetta in your favourite
terminal.

Next step clone the profanity repo:

```shell
git clone https://github.com/johguse/profanity.git
cd profanity/
```

Build the `profanity(1)`:

```shell
make
```

Double check the build:

```shell
$ ./profanity.x64

usage: ./profanity [OPTIONS]

  Basic modes:
    --benchmark             Run without any scoring, a benchmark.
    --zeros                 Score on zeros anywhere in hash.
    --letters               Score on letters anywhere in hash.
    --numbers               Score on numbers anywhere in hash.
    --mirror                Score on mirroring from center.
    --leading-doubles       Score on hashes leading with hexadecimal pairs

  Modes with arguments:
    --leading <single hex>  Score on hashes leading with given hex character.
    --matching <hex string> Score on hashes matching given hex string.

  Advanced modes:
    --contract              Instead of account address, score the contract
                            address created by the account's zeroth transaction.
    --leading-range         Scores on hashes leading with characters within
                            given range.
    --range                 Scores on hashes having characters within given
                            range anywhere.

  Range:
    -m, --min <0-15>        Set range minimum (inclusive), 0 is '0' 15 is 'f'.
    -M, --max <0-15>        Set range maximum (inclusive), 0 is '0' 15 is 'f'.

  Device control:
    -s, --skip <index>      Skip device given by index.
    -n, --no-cache          Don't load cached pre-compiled version of kernel.

  Tweaking:
    -w, --work <size>       Set OpenCL local work size. [default = 64]
    -W, --work-max <size>   Set OpenCL maximum work size. [default = -i * -I]
    -i, --inverse-size      Set size of modular inverses to calculate in one
                            work item. [default = 255]
    -I, --inverse-multiple  Set how many above work items will run in
                            parallell. [default = 16384]

  Examples:
    ./profanity --leading f
    ./profanity --matching dead
    ./profanity --matching badXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXbad
    ./profanity --leading-range -m 0 -M 1
    ./profanity --leading-range -m 10 -M 12
    ./profanity --range -m 0 -M 1
    ./profanity --contract --leading 0

  About:
    profanity is a vanity address generator for Ethereum that utilizes
    computing power from GPUs using OpenCL.

    Author: Johan Gustafsson <profanity@johgu.se>
    Beer donations: 0x000dead000ae1c8e8ac27103e4ff65f42a4e9203

  Disclaimer:
    Always verify that a private key generated by this program corresponds to
    the public key printed by importing it to a wallet of your choice. This
    program like any software might contain bugs and it does by design cut
    corners to improve overall performance.

```

Then you can use profanity to get the vanity wallet address:

```shell
$ ./profanity.x64 --matching badXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXbad
```

DONE.

[1]:
    https://blog.1inch.io/a-vulnerability-disclosed-in-profanity-an-ethereum-vanity-address-tool-68ed7455fc8c
[2]: /questions/what-is-wallet-address/
[3]: https://github.com/johguse/profanity
