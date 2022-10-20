---
layout: question.njk
title: What is Base Fee Per Gas in Ethereum Block?
description:
    What is Base Fee Per Gas in Ethereum Block? Base Fee Per Gas in Ethereum
    Block is a minimum gas price of the transaction that the user need to set
    in order to have their transaction to be included in the block.
date: Last Modified
publishedAt: 2022-10-20
tags:
    - post
    - faq
    - eth
---

**Base Fee Per Gas** in Ethereum Block is a minimum gas price of the
transaction that the user need to set in order to have their transaction to be
included in the block.

Let’s learn directly from an example transaction:

-   Let's say Alice has to pay Bob 1 ETH.
-   In the transaction, the gas limit is 21,000 units and the base fee is 10
    gwei.
-   Alice includes a tip of 2 gwei.
-   The total fee would now be: `units of gas used * (base fee + priority fee)`
     where the `base fee` is a value set by the protocol and the `priority fee`
     is a value set by the user as a tip to the validator.
-   `21,000 * (10 + 2) = 252,000 gwei` or 0.000252 ETH.
-   When Alice sends the money, 1.000252 ETH will be deducted from Alice's
    account.
-   Bob will be credited 1.0000 ETH.
-   Validator receives the tip of 0.000042 ETH.
-   Base fee of 0.00021 ETH is burned.
-   Additionally, Alice can also set a max fee (`maxFeePerGas`) for the
    transaction.
-   The difference between the max fee and the actual fee is refunded to Alice,
    i.e. `refund = max fee - (base fee + priority fee)`.
-   Alice can set a maximum amount to pay for the transaction to execute and
    not worry about overpaying "beyond" the base fee when the transaction is
    executed.

So the **Base Fee** is a **Reserve price** of one gas unit.

Here is an example of Ethereum Block after #12965000 (London Upgrade):

```json
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": {
		"baseFeePerGas": "0x8658e14eb",
		"difficulty": "0x0",
		"extraData": "0x496c6c756d696e61746520446d6f63726174697a6520447374726962757465",
		"gasLimit": "0x1c9c380",
		"gasUsed": "0xb35d8c",
		"hash": "0x3edc3dabe944eb2bd57103af7c79f4c3f3689c9a748c989131a099ae3bb361b5",
		"logsBloom": "0x9028c12254ad18d210abcd628114143152215402405001d21cc914928c7d1653a0044314408426408002202696586539332e01eeda80ab1c90300459afe824844640062460c184f86b08320c009d707c85c19a8c41c804e01040bc95ccf703a29ee43804220ea0434e92910158b50c61cc464866988d2668210852fa121a1b846220954700c7d556744d2d9203190b0c585948036b88a5d84528205c20b9a8219ec16b41c6987a6382e145c582840cfb48e3a905a5022d8260328793639220d0c748dcc6158088d300236203045c411e16452c5a821a1d124015a9221c31650070fab24c009306454865210a2a1d6cf44a4888ac040e1140048c291248630203",
		"miner": "0xdafea492d9c6733ae3d56b7ed1adb60692c98bc5",
		"mixHash": "0x101a4c68e3bdbe05b5598ddc779083ca7c95ab558c070d1b00fec7d7ea83dece",
		"nonce": "0x0000000000000000",
		"number": "0xf0dc60",
		"parentHash": "0x091359d5eb53ad5b93116101cb458819828b6ddfb33df7dafc6d2a2d2416c926",
		"receiptsRoot": "0x9a35e6c74a9e49799caa35cca07084e120b8920ae9ff6e7623d42f90872fef45",
		"sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
		"size": "0xbbfb",
		"stateRoot": "0xd61a768f9d34fe4a4da9f63ad2a6c12547e533b096d2bb7e69ad55778b27c247",
		"timestamp": "0x6350766b",
		"totalDifficulty": "0xc70d815d562d3cfa955",
    "transactions": [...]
		"transactionsRoot": "0x61969709118505d293c560496208a79d86d4df734969708113bc9884d5ef774c",
		"uncles": []
	}
}
```

The `transactions` field is omited for clarity.

As you can see the `baseFeePerGas` is `36063548651` wei or 36,063548651 gwei or
0,000000036063548651 ETH. If the user want to get their transaction is included
in those block, the user need to set the gas price to 37 gwei at mininum.

For example if the user want to send an ETH, which cost 21,000 unit of gas,
they need to pay the following amount of ETH:

```json
21,000 * 37 = 777000 gwei = 0,000777 ETH
```

## How the Base Fee is Determined?

The Base Fee per Gas is automatically determined by the Ethereum Protocol. The
base fee is calculated independently of the current block and is instead
determined by the blocks before it - making transaction fees more predictable
for users. When the block is mined this base fee is "burned", removing it from
circulation.

The base fee is calculated by a formula that compares the size of the previous
block (the amount of gas used for all the transactions) with the target size.
The base fee will increase by a maximum of 12.5% per block if the target block
size is exceeded.

You can get the exact formula on
[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559):

```python
if INITIAL_FORK_BLOCK_NUMBER == block.number:
        expected_base_fee_per_gas = INITIAL_BASE_FEE
    elif parent_gas_used == parent_gas_target:
        expected_base_fee_per_gas = parent_base_fee_per_gas
    elif parent_gas_used > parent_gas_target:
        gas_used_delta = parent_gas_used - parent_gas_target
        base_fee_per_gas_delta = max(parent_base_fee_per_gas * gas_used_delta // parent_gas_target // BASE_FEE_MAX_CHANGE_DENOMINATOR, 1)
        expected_base_fee_per_gas = parent_base_fee_per_gas + base_fee_per_gas_delta
    else:
        gas_used_delta = parent_gas_target - parent_gas_used
        base_fee_per_gas_delta = parent_base_fee_per_gas * gas_used_delta // parent_gas_target // BASE_FEE_MAX_CHANGE_DENOMINATOR
        expected_base_fee_per_gas = parent_base_fee_per_gas - base_fee_per_gas_delta
    assert expected_base_fee_per_gas == block.base_fee_per_gas, 'invalid block: base fee not correct'
```

## The Implication of Base Gas Fee to Ethereum Supply

By burning the base fee, Ethereum protocol can no longer guarantee a fixed
Ether supply. This could result in economic instability as the long term supply
of ETH will no longer be constant over time.

While a valid concern, it is difficult to quantify how much of an impact this
will have.

-   If more is burned on base fee than is generated in mining rewards then ETH
    will be **deflationary** and
-   if more is generated in mining rewards than is burned then ETH will be
    **inflationary**.

Since we cannot control user demand for block space, we cannot assert at the
moment whether ETH will end up inflationary or deflationary, so this change
causes the core developers to lose some control over Ether’s long term
quantity.
