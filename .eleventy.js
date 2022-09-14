const dayjs = require("dayjs");

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

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
