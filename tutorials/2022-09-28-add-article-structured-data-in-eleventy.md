---
layout: tutorial.njk
title: How to add article schema markup in eleventy blog
description:
    In this tutorial, I will show you how to add Article Schema Markup on your
    Eleventy blog. The goal is to explicitly tell search engine like Google
    what your content is about. For example, that it's a blog posting, who the
    author is, or what the title of the blog post is.
date: Last Modified
publishedAt: 2022-09-28
tags:
    - post
    - tutorial
    - blog
    - eleventy
---

In this tutorial, I will show you how to add [Article Schema Markup][1] on your
[Eleventy][2] blog. The goal is to explicitly tell search engine like Google
what your content is about. For example, that it's a blog posting, who the
author is, or what the title of the blog post is.

We will start by reviewing the basic information about Eleventy and Article
Schema Markup first and then we will add Article Schema Markup in your Eleventy
blog.

If you are familiar with Eleventy and Article Schema Markup, feel free to go
straight to the tutorial section.

### Brief overview

Eleventy is a static HTML and CSS [website generator][3] that runs in Node.js
environment. It is optimized for speed, ease of use, and configurability.
Eleventy takes a directory with content and templates and renders them into a
full HTML website.

Eleventy is the most efficient way to build a website since you can deploy your
website anywhere that support static site hosting. You can focus entirely on
creating a content rather than dealing with hosting.

Suppose that you have created your blog and now the first thing you need to do
is to make sure that search engine can understand your content. We can use
Article Schema Markup to tell search engine like Google about our content.

Adding Article structured data to your website or blog pages can help search
engine like Google to understand more about the web page and show better title
text, images, and date information for the article in search results.

So, how to add Article Schema Markup in your eleventy blog?

### Add structured data schema to Eleventy blog

To add Article Schema Markup in our Eleventy blog, we will use
[`eleventy-plugin-schema`][4] community plugin. This plugin will helps us to
generate JSON-LD structured data that search engine like Google can understand.

The first step is to install the dependencies:

```shell
# npm
npm install --save-exact @quasibit/eleventy-plugin-schema

# pnpm
pnpm add --save-exact @quasibit/eleventy-plugin-schema
```

The next step is to add the `eleventy-plugin-schema` plugin and `toISO8601`
filter to your Evelenty configuration:

```js
// .eleventy.js
const schema = require("@quasibit/eleventy-plugin-schema");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(schema);

    // Filters
    eleventyConfig.addFilter("toISO8601", (date) => {
        return DateTime.fromJSDate(date, { zone: "utc" }).toISO();
    });
};
```

Then we need to add the following shared data in our base layout (e.g.
`_includes/base.njk`):

<!-- prettier-ignore-start -->
{% raw %}
```nunjucks
---
meta:
  language: en-US
  site:
    name: Site Title
    description: Site Description
    url: https://site.com
    logo:
      src: https://site.com/image.png
      width: 1000
      height: 1000
  author:
    name: Your name
  image:
    src: https://site.com/image.png
eleventyComputed:
  meta:
    url: "site.com/{{ page.url }}"
    title: "{{ title }}"
    description: "{{ description }}"
    published: "{% if publishedAt %}{{ publishedAt | toISO8601 }}{% endif %}"
    modified: "{{ page.date | toISO8601 }}"
---
<!doctype html>
<html lang="en">

<head>
    <!-- NOTE: add this line to your <head> -->
    {%- jsonLdScript meta, type, tags -%}
</head>
```
{% endraw %}
<!-- prettier-ignore-end -->

Last step we need to use the following data in our page:

<!-- prettier-ignore-start -->
{% raw %}
```nunjucks
---
type: page
title: My page
description: My page description
---
your content here
```
{% endraw %}
<!-- prettier-ignore-end -->

and the following data to our blog post:

<!-- prettier-ignore-start -->
{% raw %}
```nunjucks
---
type: post
title: My post
description: My post description
date: Last Modified
publishedAt: 2022-09-28
---
your content here
```
{% endraw %}
<!-- prettier-ignore-end -->

Now each page and blog post will automatically generate the following data
inside the `<head>`:

```html
<head>
    {%- jsonLdScript meta, type, tags -%}
</head>
```

Done!

We can verify the schema markup via [Rich Result Test][5].

[1]: /questions/what-is-article-schema-markup/
[2]: /questions/what-is-eleventy/
[3]: /questions/what-is-static-site-generator/
[4]: https://github.com/quasibit/eleventy-plugin-schema
[5]: https://search.google.com/test/rich-results
