---
layout: question.njk
title: What is printf in C?
description:
    printf is a library function that sends formatted output to stdout. You can
    use printf to print out any value to the terminal console.
date: Last Modified
publishedAt: 2022-09-28
tags:
    - post
    - faq
    - c
---

`printf` is a library function that sends formatted output to stdout. You can
use `printf` to print out any value to the terminal console.

### Declaration

The `printf` function is defined below:

```c
int printf(const char *format, ...)
```

If successful, `printf` will returns total number of characters written. On
failure, a negative number is returned.

### Parameters

`printf` takes parametes defined below:

| Parameter | Description                                                                                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`  | This is the string that contains the text to be written to stdout.                                                                                                                                       |
| `...`     | Depending on the format string, the function may expect a sequence of additional arguments, each containing one value to be inserted instead of each `%`-tag specified in the format parameter (if any). |

`format` can optionally contain embedded format tags that are replaced by the
values specified in subsequent additional arguments and formatted as requested.

Format tags prototype is:

```shell
 %[flags][width][.precision][length]specifier
```

which is explained below:

| Specifier | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `c`       | Print out character                                                   |
| `d`       | Print out signed decimal integer                                      |
| `e`       | Print out scientific notation (mantissa/exponent) using `e` character |
| `E`       | Print out sciEntific notation (mantissa/ExponEnt) using `E` charactEr |
| `f`       | Print out decimal floating point                                      |
| `g`       | Print out the shorter `%e` or `%f`                                    |
| `G`       | Print out the shorter `%E` or `%f`                                    |
| `i`       | Print out signed decimal integer                                      |
| `n`       | Print out nothing                                                     |
| `o`       | Print out signed octal                                                |
| `p`       | Print out pointer address                                             |
| `s`       | Print out string of characters                                        |
| `u`       | Print out unsigned decimal integer                                    |
| `x`       | Print out unsigned hexadecimal integer                                |
| `X`       | Print out unsigned hexadecimal integer (capital letters)              |

The `%` character can be escaped using `%%` double sign.

| Length | Description                                                                                                                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `h`    | The argument is interpreted as a short int or unsigned short int (only applies to integer specifiers: `%d`, `%i`, `%o`, `%u`, `%x` and `%X`)                                                                  |
| `I`    | The argument is interpreted as a long int or unsigned long int for integer specifiers (`%d`, `%i`, `%o`, `%u`, `%x` and `%X`), and as a wide character or wide character string for specifiers `%c` and `%s`. |
| `L`    | Print out scientific notation (mantissa/exponent) using `e` character                                                                                                                                         |

The following table show the `[.precision]` values:

| Precision | Description                                                                                                                                                                                                                                          |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.n`      | Where `n` is a number. For integer specifiers (`%d`, `%i`, `%o`, `%u`, `%x`, `%X`) − precision specifies the minimum number of digits to be written. If the value to be written is shorter than this number, the result is padded with leading zeros |
| `.*`      | The precision is not specified in the format string, but as an additional integer value argument preceding the argument that has to be formatted                                                                                                     |

The following table show the `[width]` values:

| Width | Description                                                                                                                                                                                                                 |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `n`   | Where `n` is a number. Minimum number of characters to be printed. If the value to be printed is shorter than this number, the result is padded with blank spaces. The value is not truncated even if the result is larger. |
| `*`   | The precision is not specified in the format string, but as an additional integer value argument preceding the argument that has to be formatted                                                                            |

The following table show the `[flags]` values:

| Flag      | Description                                                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-`       | Left-justify within the given field width; Right justification is the default (see width sub-specifier)                                                   |
| `+`       | Forces to precede the result with a plus or minus sign (+ or -) even for positive numbers. By default, only negative numbers are preceded with a `-` sign |
| `<space>` | If no sign is going to be written, a blank space is inserted before thevalue                                                                              |

### Examples

The following example shows the usage of the `printf` function:

```c
#include <stdio.h>

int
main()
{
    int n = 12;

    printf("specifier %%c input 'a', output %c\n", 'a');
    printf("specifier %%d input 'a', output %d\n", 'a');
    printf("specifier %%d input 12, output %d\n", 12);
    printf("specifier %%e input 12.000001, output %e\n", 12.000001);
    printf("specifier %%E input 12.000001, output %E\n", 12.000001);
    printf("specifier %%f input 12.000001, output %f\n", 12.000001);
    printf("specifier %%g input 12.000001, output %g\n", 12.000001);
    printf("specifier %%G input 12.000001, output %G\n", 12.000001);
    printf("specifier %%i input 12, output %i\n", 12);
    printf("specifier %%n input &n, output %n\n", &n);
    printf("specifier %%o input 12, output %o\n", 12);
    printf("specifier %%p input &n, output %p\n", &n);
    printf("specifier %%s input 'hello', output %s\n", "hello");
    printf("specifier %%u input 12, uutput %u\n", 12);
    printf("specifier %%x input 12, uutput %x\n", 12);
    printf("specifier %%X input 12, uutput %X\n", 12);
}
```

Output:

```shell
# gcc --version
# Apple clang version 13.1.6 (clang-1316.0.21.2.5)
# Target: x86_64-apple-darwin21.6.0
# Thread model: posix
gcc c_specifier.c
./a.out
specifier %c input 'a', output a
specifier %d input 'a', output 97
specifier %d input 12, output 12
specifier %e input 12.000001, output 1.200000e+01
specifier %E input 12.000001, output 1.200000E+01
specifier %f input 12.000001, output 12.000001
specifier %g input 12.000001, output 12
specifier %G input 12.000001, output 12
specifier %i input 12, output 12
specifier %n input &n, output
specifier %o input 12, output 14
specifier %p input &n, output 0x30510482c
specifier %s input 'hello', output hello
specifier %u input 12, uutput 12
specifier %x input 12, uutput c
specifier %X input 12, uutput C
```
