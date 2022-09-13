module.exports = function (eleventyConfig) {
    // Copy all files inside public directory
    eleventyConfig.addPassthroughCopy({ public: "/" });

    // We can use this inside template {% etag %}
    eleventyConfig.addShortcode("etag", function () {
        return String(Date.now());
    });

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
