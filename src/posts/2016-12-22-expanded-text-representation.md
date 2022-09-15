---
layout: post.njk
title: |
    Expanded Text Representation
description: |
    Last night, I read a paper titled Similarity Measures for Short Segments
    of Text (Metzler et al., 2007). This paper is focus on how to compute the
    similarity between query (short text) and document.
date: 2016-12-22
permalink: /expanded-text-representation/
tags:
    - post
    - nlp
---

Last night, I read a paper titled Similarity Measures for Short Segments of
Text (Metzler et al., 2007). This paper is focus on how to compute the
similarity between query (short text) and document. I want to highlight one of
the ideas of text representation that used by the authors: Expanded text
representation.

The idea of this representation is to enrich the short text representation
using external source of information. For example given a short text segment:
`casual blouse`. We can create new expanded text representation with
concatenating relevant snippet from the search engine results/or wikipedia:

```text
women’s casual and dressy tops and blouses. great selection of women’s tops and
blouses. offered in the latest styles and materials from tunics, tanks,
camisoles and poncho shirts and blouses. button-down and casual shirts. women’s
shirts and blouses in a variety of styles that are perfect for work or weekend
blouses for women, cute, casual and dressya.
```

As we see, this expanded representation contains a number of contextually
relevant terms, such as `women`, `style`, and `top` that are not present in the
original representation.

The most important thing is we can use this expanded representation to solve a
contextual problem.
