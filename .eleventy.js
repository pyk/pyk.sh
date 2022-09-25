const dayjs = require("dayjs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

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

    /**
     * Formats a date using dayjs's conventions.
     * Docs: https://day.js.org/docs/en/display/format
     * Usage: {{ date | formatDate: "DD/MM/YY"}}
     */
    const formatDate = (date, format) => dayjs(date).format(format);
    eleventyConfig.addFilter("formatDate", formatDate);

    /**
     * Get all tags
     *
     * Usage: {{ collections.tags }}
     */
    function filterTags(tags) {
        return (tags || []).filter(
            (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
        );
    }
    eleventyConfig.addFilter("filterTags", filterTags);

    eleventyConfig.addCollection("tags", function (collection) {
        let tagSet = new Set();
        collection.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        });

        return filterTags([...tagSet]);
    });

    /**
     * Group post by year
     *
     * Usage:
     * {%- for post in collections.postsByYear | reverse -%}'
     */
    eleventyConfig.addCollection("postsByYear", function (collection) {
        const posts = collection.getFilteredByTag("post");
        const yearCount = {};
        posts.forEach(function (post) {
            const year = post.date.getFullYear();
            if (year in yearCount) {
                yearCount[year] += 1;
            } else {
                yearCount[year] = 1;
            }
        });
        const yearTracker = {};
        const postsByYear = posts.reverse().map(function (post) {
            let year = undefined;
            let rowspan = undefined;
            const postYear = post.date.getFullYear();
            if (!(postYear in yearTracker)) {
                year = postYear;
                rowspan = yearCount[year];
                yearTracker[postYear] = 1;
            }
            post["year"] = year;
            post["rowspan"] = rowspan;
            return post;
        });
        return postsByYear;
    });

    /*************************************************************************
     * Plugins
     ************************************************************************/
    eleventyConfig.addPlugin(syntaxHighlight);

    /*************************************************************************
     * Libraries
     ************************************************************************/
    eleventyConfig.setLibrary(
        "md",
        markdownIt()
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
            input: "src",
            output: "_site",
        },
    };
};
