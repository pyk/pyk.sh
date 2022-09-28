---
layout: question.njk
title: What is Foundry?
description:
    Foundry is a development toolkit that helps developers to write, test and
    deploy Smart Contract that target Ethereum Virtual Machine (EVM).
date: Last Modified
publishedAt: 2022-09-28
tags:
    - post
    - faq
    - foundry
---

[Foundry][1] is a development toolkit that helps developers to write, test and
deploy [Smart Contract][2] that runs on top of Ethereum Virtual Machine (EVM).

Foundry distribute the following command line applications into single and
convenient package distrbution:

| CLI         | Description                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| `forge`     | Smart Contract dependency manager, test runner and deployer                                            |
| `cast`      | Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data |
| `anvil`     | Very fast local ethereum node, mainly used for testing                                                 |
| `foundryup` | Foundry installer                                                                                      |

You can get `foundryup` by running the following command:

```shell
curl -L https://foundry.paradigm.xyz | bash
```

Then run:

```shell
foundryup
```

To get the latest version of Foundry development toolkit.

[1]: https://github.com/foundry-rs/foundry
[2]: /questions/what-is-smart-contract/
