const dayjs = require("dayjs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const schema = require("@quasibit/eleventy-plugin-schema");
const { DateTime } = require("luxon");

// Markdowns
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItTOC = require("markdown-it-toc-done-right");

module.exports = function (eleventyConfig) {
    // Copy all files inside public directory
    eleventyConfig.addPassthroughCopy({ public: "/" });

    // We can use this inside template {% etag %}
    eleventyConfig.addShortcode("etag", function () {
        return String(Date.now());
    });

    /*************************************************************************
     * Collections
     ************************************************************************/

    /*************************************************************************
     * Filters
     ************************************************************************/

    /**
     * Formats a date using dayjs's conventions.
     * Docs: https://day.js.org/docs/en/display/format
     * Usage: {{ date | formatDate: "DD/MM/YY"}}
     */
    const formatDate = (date, format) => dayjs(date).format(format);
    eleventyConfig.addFilter("formatDate", formatDate);

    /**
     * Format a date base on iso8601
     */
    eleventyConfig.addFilter("iso8601", (date) => {
        return DateTime.fromJSDate(date, { zone: "utc" }).toISO();
    });

    /**
     * Limit element of array up to max.
     *
     * Usage: {{ collections.post | limit(5) }}
     */
    const limit = (arr, max) => arr.slice(0, max);
    eleventyConfig.addFilter("limit", limit);

    /**
     * Latest tags filter.
     *
     * Usage:
     *
     * {%- set latestProjects = collections.project | latest -%}
     */
    eleventyConfig.addNunjucksFilter("latest", function (collection = []) {
        const latest = collection.sort((a, b) => {
            if (a.data.publishedAt > b.data.publishedAt) return -1;
            return 1;
        });
        return latest;
    });

    /**
     * Featured filter.
     *
     * Usage:
     *
     * {%- set featuredProjects = collections.project | featured | latest -%}
     */
    eleventyConfig.addNunjucksFilter("featured", function (collection = []) {
        const featured = collection.filter((c) => c.data.featured);
        return featured;
    });

    /**
     * Related tags filter.
     *
     * Usage:
     *
     * {%- set relatedPosts = collections.all | related -%}
     */
    eleventyConfig.addNunjucksFilter("related", function (collection = []) {
        const { tags, page } = this.ctx;
        return collection.filter((post) => {
            const filteredTags = post.data.tags?.filter(
                (tag) => !["post", "tutorial", "project", "faq"].includes(tag)
            );
            return (
                post.url !== page.url &&
                filteredTags.some((tag) => tags.includes(tag))
            );
        });
    });

    /*************************************************************************
     * Plugins
     ************************************************************************/
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(schema);

    /*************************************************************************
     * Libraries
     ************************************************************************/
    const markdownItOptions = {
        html: true,
        linkify: true,
    };
    eleventyConfig.setLibrary(
        "md",
        markdownIt(markdownItOptions)
            .use(markdownItAnchor, {
                permalink: true,
                permalinkAfter: true,
                permalinkSymbol: "#",
            })
            .use(markdownItAttrs)
            .use(markdownItTOC)
    );

    return {
        dir: {
            output: "_site",
        },
    };
};
