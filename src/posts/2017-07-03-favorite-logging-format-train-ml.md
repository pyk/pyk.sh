---
layout: post.njk
title: |
    My Favorite Logging Format For Training a Machine Learning Models
description: |
    My Favorite Logging Format For Training a Machine Learning Models. Why
    this is my favorite.
date: 2017-07-03
permalink: /favorite-logging-format-train-ml/
tags:
    - post
    - ml
---

```python
import logging

LOG_FORMAT = "%(asctime)s %(filename)s:%(lineno)d %(message)s"
logging.basicConfig(
    filename='training.log',
    level=logging.DEBUG,
    format=LOG_FORMAT
)
```

Why this is my favorite:

1. `%(asctime)s` helps me keep track of the time. I need to know when I run the
   training script and when the model is generated. This is very helpful if you
   are working with many projects/model.
2. `%(filename)s:%(lineno)d` this is very helpful when you are working with GPU
   stuff. Sometimes your training script just blow up and give you this most
   hated error message: `Segmentation fault (core dumped)`. The information of
   last executed file and line number will recorded here. So you don’t need to
   spend an hour of debugging.

If you are curious how the segfault looks like:

```shell
% THEANO_FLAGS=device=cuda0 python main.py
Using cuDNN version 6020 on context None
Mapped name None to device cuda0: GeForce GTX 1070 (0000:22:00.0)
Segmentation fault (core dumped)
```

So clueless right?

Here some output from the logger using the logging format above:

```text
2017-07-03 19:28:07,994 train.py:72 Start training
2017-07-03 19:28:07,994 train.py:74 Creating theano variables
2017-07-03 19:28:07,994 train.py:89 Get training and development set streams
2017-07-03 19:28:07,995 train.py:94 Get cost of the model
2017-07-03 19:28:08,692 model.py:306 Run cost of decoder
2017-07-03 19:28:08,692 model.py:311 Get the cost matrix
2017-07-03 19:28:08,693 SequenceGenerator.py:79 Run cost_matrix
2017-07-03 19:28:08,717 SequenceGenerator.py:98 Run the recurrent network
2017-07-03 19:28:08,718 attention.py:571 AttentionRecurrent.apply
2017-07-03 19:28:08,745 attention.py:520 AttentionRecurrent.do_apply
2017-07-03 19:28:08,745 attention.py:530 AttentionRecurrent.do_apply context_transition
2017-07-03 19:28:08,851 attention.py:532 AttentionRecurrent.do_apply take glimpse
2017-07-03 19:28:08,874 attention.py:539 AttentionRecurrent.do_apply compute current state
2017-07-03 19:28:08,883 attention.py:544 AttentionRecurrent.do_apply return current state
```

What's your favorite? let me know on the comment below :)
