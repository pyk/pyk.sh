---
layout: post.njk
title: |
    Whitespace Tokenizer in Rust
description: |
    Working with raw bytes is not easy as it seems, especially if you are
    working on UTF-8 encoded file. There is a fact about multi-bytes
    character that you should aware of.
date: 2016-12-26
permalink: /whitespace-tokenizer-in-rust/
tags:
    - post
    - rust
---

Working with raw bytes is not easy as it seems, especially if you are working
on UTF-8 encoded file. There is a fact about multi-bytes character that you
should aware of.

### Multi-bytes character

There are characters that represented by more than one bytes. For example,
character "Å" is composed by two bytes `195 133`. If you are assuming that
every character is one byte, you will treat byte `133` as a whitespace and
split the character "Å" into invalid UTF-8 token.

I found this UTF-8 byte-ranges are very useful:

```text
// 0 - 127 => Single-byte character
// 128 - 191 => Continuation bytes
// 194 - 244 => Leading bytes
// 192,193,245-255 => Invalid utf-8
```

This byte-ranges describe that if you encounter byte in range `0-127` you can
freely assume that that byte represent a single character. If byte is in range
`194-244`, it will followed by another bytes in range `128-191`. This two bytes
will represent a single character.

So, only split the token if the whitespace is a single-byte character.

### Whitespace tokenizer

Below is an example of whitespace tokenizer written in Rust.

```rust
// file: whitespace_tokenizer.rs
use std::env;
use std::process;
use std::fs::File;
use std::io::BufReader;
use std::io::Read;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        println!("Usage: {:?} file_name.txt", args[0]);
        process::exit(1);
    }

    // Access file
    let file_name: String = args[1].clone();
    let f: File = match File::open(file_name) {
        Ok(file) => file,
        Err(err) => {
            println!("Err: opening file: {:?}", err);
            process::exit(1);
        },
    };

    // Extract token that separated by whitespace from file
    let reader: BufReader<File> = BufReader::new(f);
    const MAX_BYTES: usize = 256;
    let mut bytes: Vec<u8> = Vec::with_capacity(MAX_BYTES);
    for res_byte in reader.bytes() {
        let byte: u8 = match res_byte {
            Ok(b) => b,
            Err(err) => {
                println!("Err: read bytes: {:?}", err);
                process::exit(1);
            },
        };

        // UTF-8 range
        // 0 - 127 => single-byte character
        // 128 - 191 => Continuation bytes
        // 194 - 244 => leading bytes
        // 192,193,245-255 => invalid utf-8
        match byte {
            // Handle single-byte character
            byte if (byte <= 127) => {
                let c: char = byte as char;
                if !c.is_whitespace() {
                    if bytes.len() == MAX_BYTES {
                        bytes.reserve(MAX_BYTES);
                    };
                    bytes.push(byte);
                } else {
                    // skip if bytes is empty
                    if bytes.len() == 0 { continue; };
                    let token: String;
                    token = match String::from_utf8(bytes.clone()) {
                        Ok(s) => s,
                        Err(err) => {
                            println!("Err: convert bytes to String: {:?}",
                                err);
                            bytes.clear();
                            continue;
                        },
                    };

                    println!("token: {:?}", token);
                    bytes.clear();
                }
            }
            // Just push the leading and continuation bytes to bytes buffer
            _ => {
                bytes.push(byte);
            }
        }
    }
}
```

Available on the
[gist](https://gist.github.com/pyk/fbdd72556a6c5ab347fa6565530abeb4#file-whitespace_tokenizer-rs).

Compile it to binary:

```shell
rustc whitespace_tokenizer.rs
```

Test it:

```shell
./whitespace_tokenizer file_name.txt
```
