---
layout: topics/id.njk
pagination:
    data: collections
    size: 1
    alias: tag
    filter:
        - all
        - post
        - posts
        - tagList
    addAllPagesToCollections: true
eleventyComputed:
    title: Tagged "{{ tag }}"
permalink: /topics/{{ tag | slugify }}/
---
