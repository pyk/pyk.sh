---
layout: tutorial.njk
title: How to get ETH wallet/contract balance with Ethers.js
description:
    In this quick tutorial, I will show you how to get ETH wallet/contact
    address balance with Ethers.js.
date: Last Modified
publishedAt: 2022-10-18
tags:
    - post
    - tutorial
    - typescript
    - ethers
    - eth
---

In this quick tutorial, I will show you how to get ETH wallet/contact address
balance with Ethers.js.

## TLDR

You can use `getBalance("address")` function in the `Provider` instance:

```tsx
// 👇 Get vitalik ETH wallet balance
const b = await provider.getBalance(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
);
```

If you want to learn from the basic feel free to continue read below.

## eth_getBalance

To get the ETH balance of specified wallet address or contract address, we need
to call the `eth_getBalance` RPC method. `eth_getbalance` will returns the
balance of the account of given address.

We can call the RPC directly via `curl` like the following:

```bash
curl --request POST \
  --url https://rpc.ankr.com/eth \
  --header 'Content-Type: application/json' \
  --data '{
	"jsonrpc": "2.0",
	"method": "eth_getBalance",
	"params": [
		"0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
		"latest"
	],
	"id": 1
}'
```

It will return the response like the following:

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x363629215413d16af2"
}
```

Where the result is an integer of the current balance in wei.

```bash
// 👇 Convert hex to decimal
0x363629215413d16af2 // 1000026867177402493682
```

To get the ETH amount we need to convert wei to eth by dividing it by 10^18:

```bash
// 👇 Convert wei to eth
1000026867177402493682 / 10^18 = 1000.02686718
```

So the end result that this wallet `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
own 1000,026 ETH.

As you can see, if you call the `eth_getBalance` RPC method directly, you need
to parse the HEX to decimal then converting wei to eth manually. We can use
ether.js to save the time.

So how to get the balance using ether.js?

## Get ETH balance with Ethers.js

First thing first, you need to initialize the provider:

```typescript
import { providers, utils } from "ethers";

// 👇 Initialize the provider
const provider = new providers.JsonRpcProvider("https://rpc.ankr.com/eth");
```

Call the `getBalance` function then format the result:

```typescript
// 👇 Get vitalik ETH balance
const wei = await provider.getBalance(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
);
// 👇 Convert wei to eth
const eth = utils.formatEther(wei);
console.log("ETH balance:", eth);
```

Done!
