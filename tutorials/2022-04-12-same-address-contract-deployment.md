---
layout: tutorial.njk
title: How to deploy smart contract to the same address using Foundry
description: |
    This is short tutorial on how to deploy smart contract to every networks
    on the same address. We will use similar approach used by Multicall3.
date: 2022-04-12
tags:
    - post
    - tutorial
    - solidity
    - foundry
---

This is short tutorial on how to deploy smart contract to every networks on the
same address. We will use similar approach used by
[Multicall3](https://github.com/mds1/multicall).

Here is the step by step:

1. Prepare new wallet dedicated for the contract deployment.
2. Deploy the contract to all networks.
3. DONE

Let’s get started!

**Note**: You can use [profanity](https://github.com/johguse/profanity) to get
vanity wallet address. Only use this wallet for deployment only.

### Wallet Preparation

In this tutorial I will use the following wallet address:

```text
0x000006b92fb31c6854e9f598f2d0096da4d02de0
```

Make sure:

-   You have send funds to the wallet deployment address
-   The wallet address is a fresh address

### Install Foundry

Install foundry by following the
[official guide](https://github.com/gakonst/foundry#installation).

Here is `forge` version that I use for this tutorial:

```shell
✦ forge --version
forge 0.2.0 (8517446 2022-04-12T12:36:16.992513+00:00)
```

You can get the latest version using the following command:

```shell
foundryup -b master
```

### Deploy & Verify

We will use the following
[Foundry project](https://github.com/pyk/foundry-tutorial-same-address).

Clone & setup the project:

```shell
git clone git@github.com:pyk/foundry-tutorial-same-address.git
cd foundry-tutorial-same-address/
forge update
```

Let’s deploy on each network!

### Rinkeby

Deploy the contract:

```shell
forge create --chain=rinkeby \
    --rpc-url <RPC_URL> \
    --optimize \
    --optimize-runs 200 \
    --private-key <PRIVATE_KEY> \
    src/SameAddress.sol:SameAddress
```

Result:

```shell
Deployer: 0x000006b92fb31c6854e9f598f2d0096da4d02de0
Deployed to: 0x01bb3f43c855b80dd82ad6468c378aae73decc84
Transaction hash: 0xebc4514fb6f6247d19dec887bfb1717afbd899ca0be5cc619add9ef8ed4b6423
```

Verify the contract:

```shell
forge verify-contract --chain-id=rinkeby \
    --compiler-version v0.8.13+commit.abaa5c0e \
    --num-of-optimizations 200 \
    0x01bb3f43c855b80dd82ad6468c378aae73decc84 \
    src/SameAddress.sol:SameAddress \
    <ETHERSCAN_API_KEY>
```

The contract is deployed
[here](https://rinkeby.etherscan.io/address/0x01bb3f43c855b80dd82ad6468c378aae73decc84).

### Kovan

Deploy contract:

```shell
forge create --chain=kovan \
    --rpc-url <RPC_URL> \
    --optimize \
    --optimize-runs 200 \
    --private-key <PRIVATE_KEY> \
    src/SameAddress.sol:SameAddress
```

Result:

```text
Deployer: 0x000006b92fb31c6854e9f598f2d0096da4d02de0
Deployed to: 0x01bb3f43c855b80dd82ad6468c378aae73decc84
Transaction hash: 0x2ca4cfbf9ee2af877cd50efec49b36f6b5b092d7272a2af4149faa12322a17e8
```

Verify the contract similar to Rinkeby above.

### Results

You may notice that the contract address on Rinkeby and Kovan is the same.

```text
0x01bb3f43c855b80dd82ad6468c378aae73decc84
```

Repeat the step on every networks and you will get the same address!
