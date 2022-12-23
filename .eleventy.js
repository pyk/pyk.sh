const dayjs = require("dayjs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const schema = require("@quasibit/eleventy-plugin-schema");
const { DateTime } = require("luxon");
const eleventyGoogleFonts = require("eleventy-google-fonts");

// Markdowns
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItTOC = require("markdown-it-toc-done-right");

const highlight = require("./highlight");
console.log("DEBUG: highlight", highlight);

module.exports = function (eleventyConfig) {
    /*************************************************************************
     * Ignore files
     ************************************************************************/
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("drafts");

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
     * Formats a unix using dayjs's conventions.
     * Docs: https://day.js.org/docs/en/display/format
     * Usage: {{ unixTimestamp | parseUnixMilisecondToISO8601 }}
     */
    const parseUnixMilisecondToISO8601 = (unix) => dayjs(unix).toISOString();
    eleventyConfig.addFilter(
        "parseUnixMilisecondToISO8601",
        parseUnixMilisecondToISO8601
    );

    /**
     * Format a date base on iso8601
     */
    eleventyConfig.addFilter("iso8601", (date) => {
        return DateTime.fromJSDate(date, { zone: "utc" }).toISO();
    });

    /**
     * Formats a unix milisecond to ago
     */
    eleventyConfig.addFilter("parseUnixMilisecondsToAgo", (unix) => {
        const relativeTime = require("dayjs/plugin/relativeTime");
        dayjs.extend(relativeTime);
        return dayjs(unix).fromNow();
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
     * Web3 filter.
     *
     * Usage:
     *
     * {%- set web3Projects = collections.project | web3 | latest | reverse -%}
     */
    eleventyConfig.addNunjucksFilter("web3", function (collection = []) {
        const featured = collection.filter((c) => c.data.web3);
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

    /**
     * Convert raw markdown to html string
     *
     * Usage:
     * {{ note.data.content | renderAsMarkdown | safe }}
     */
    eleventyConfig.addFilter("renderAsMarkdown", function (rawMarkdown) {
        console.log("DEBUG: IS THIS EXECUTED? BEOFRE MDD");
        const md = require("markdown-it")({
            html: true, // Enable HTML tags in source
            xhtmlOut: false, // Use '/' to close single tags (<br />).
            breaks: false, // Convert '\n' in paragraphs into <br>
            langPrefix: "",
            linkify: true, // Autoconvert URL-like text to links
            typographer: true,
            highlight: function (code, lang) {
                const result = highlight.render(code, lang);
                console.log("RESULT:", result);
                return result;
            },
        });

        // Remove frontmatter from the body
        md.use(require("markdown-it-front-matter"), () => {});

        // Add Anchor
        const anchor = require("markdown-it-anchor");
        md.use(anchor, {
            permalink: anchor.permalink.ariaHidden({
                placement: "before",
                symbol: '<i class="fa fa-link" aria-hidden="true"></i>',
            }),
        });

        // Twemoji
        md.use(require("markdown-it-emoji"));
        const twemoji = require("twemoji");
        md.renderer.rules.emoji = function (token, idx) {
            return twemoji.parse(token[idx].content);
        };

        // Prism
        // md.use(require("markdown-it-prism"));
        // md.use(require("markdown-it-highlightjs"));

        // TOC
        md.use(require("markdown-it-toc-done-right"), {
            placeholder: "\\[TOC\\]",
            listType: "ul",
        });

        // Task List
        md.use(require("markdown-it-task-lists"));

        return md.render(rawMarkdown);
    });

    /*************************************************************************
     * Plugins
     ************************************************************************/
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(schema);
    eleventyConfig.addPlugin(eleventyGoogleFonts);

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
                permalinkAfter: false,
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
