---
layout: tutorial.njk
title: How to deploy smart contract to the same address across networks
description:
    In this tutorial, I will show you how to deploy smart contract to the same
    address across multiple blockchain networks. The approach on this tutorial
    should work on any tools. I will use Foundry as a tool to deploy the smart
    contract.
date: Last Modified
publishedAt: 2022-04-12
tags:
    - post
    - tutorial
    - smart-contract
    - wallet-address
    - foundry
---

In this tutorial, I will show you how to deploy smart contract to the same
address across multiple blockchain networks. The approach on this tutorial
should work on any tools. I will use [Foundry][1] as a tool to deploy the smart
contract.

**TLDR**: Use one dedicated wallet that used only to deploy one smart contract.
This will get you the same contract address on every blockchain networks. This
approach is used by [Multicall3][2].

If you want to know how to do it using Foundry, you can follow the instruction
below.

### Deploy smart contract to the same address

The first step is to prepare one dedicated [wallet][3] to deploy one smart
contract across multiple chains:

In this tutorial I will use the following wallet address:

```text
0x000006b92fb31c6854e9f598f2d0096da4d02de0
```

Make sure you have send funds to your wallet deployment address and the wallet
address is a fresh address (never interact in the target blockchain network).

The next step is to setup Foundry. You can install foundry by following the
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

Next step is to deploy the smart contract. We will deploy the smart contract in
[`pyk/foundry-tutorial-same-address`][4] as the example.

Let's clone the project first:

```shell
git clone git@github.com:pyk/foundry-tutorial-same-address.git
cd foundry-tutorial-same-address/
forge update
```

Let’s deploy the smart contract to multiple blockchain networks!

Start from **Rinkeby**:

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

The contract is deployed [here][5].

Let's deploy to the next network: **Kovan**.

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

You may notice that the contract address on Rinkeby and Kovan is the same.

```text
0x01bb3f43c855b80dd82ad6468c378aae73decc84
```

Repeat the step on every networks and you will get the same address!

Easy right?

[1]: /questions/what-is-foundry/
[2]: https://github.com/mds1/multicall
[3]: /questions/what-is-wallet-address/
[4]: https://github.com/pyk/foundry-tutorial-same-address
[5]:
    https://rinkeby.etherscan.io/address/0x01bb3f43c855b80dd82ad6468c378aae73decc84
