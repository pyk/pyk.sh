---
layout: question.njk
title: What is Wallet Address?
description:
    Wallet Address is a public unique identifier of a cryptocurrency wallet.
    Wallet Address is used to receive cryptocurrency asset on a blockchain
    networks.
date: Last Modified
publishedAt: 2022-09-29
tags:
    - post
    - faq
    - wallet-address
---

Wallet Address is a public unique identifier of a cryptocurrency wallet. Wallet
Address is used to receive cryptocurrency asset on a blockchain networks.

Here is the example of wallet address:

```shell
0x000006b92fb31c6854e9f598f2d0096da4d02de0
```

Wallet is a pair of public key (the wallet address) and private key. One wallet
address can only be accessed by one private key while multiple wallet address
may derived from one private key.

Most commonly used cryptographic algorithm to create new wallet is [ECDSA][1],
an elliptic curve digital signature algorithm. This cryptographic algorithm is
used by Ethereum to ensure that funds can only be spent by their owners. It's
the preferred method for creating public and private keys.

[1]: https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm
