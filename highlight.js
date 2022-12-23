const hljs = require("highlight.js");

function parseFenceCodeParams(lang) {
    const attrMatch = lang.match(/{(.*)}/);
    const params = {};
    if (attrMatch && attrMatch.length >= 2) {
        const attrs = attrMatch[1];
        const paraMatch = attrs.match(
            /([#.](\S+?)\s)|((\S+?)\s*=\s*("(.+?)"|'(.+?)'|\[[^\]]*\]|\{[}]*\}|(\S+)))/g
        );
        paraMatch &&
            paraMatch.forEach((param) => {
                param = param.trim();
                if (param[0] === "#") {
                    params.id = param.slice(1);
                } else if (param[0] === ".") {
                    if (params.class) params.class = [];
                    params.class = params.class.concat(param.slice(1));
                } else {
                    const offset = param.indexOf("=");
                    const id = param.substring(0, offset).trim().toLowerCase();
                    let val = param.substring(offset + 1).trim();
                    const valStart = val[0];
                    const valEnd = val[val.length - 1];
                    if (
                        ['"', "'"].indexOf(valStart) !== -1 &&
                        ['"', "'"].indexOf(valEnd) !== -1 &&
                        valStart === valEnd
                    ) {
                        val = val.substring(1, val.length - 1);
                    }
                    if (id === "class") {
                        if (params.class) params.class = [];
                        params.class = params.class.concat(val);
                    } else {
                        params[id] = val;
                    }
                }
            });
    }
    return params;
}

function serializeParamToAttribute(params) {
    if (Object.getOwnPropertyNames(params).length === 0) {
        return "";
    } else {
        return ` data-params="${JSON.stringify(params)}"`;
    }
}

const fenceCodeAlias = {
    sequence: "sequence-diagram",
    flow: "flow-chart",
    graphviz: "graphviz",
    mermaid: "mermaid",
    abc: "abc",
    vega: "vega",
    geo: "geo",
    fretboard: "fretboard_instance",
    markmap: "markmap",
};

function highlightRender(code, lang) {
    if (!lang || /no(-?)highlight|plain|text/.test(lang)) {
        return;
    }

    const params = parseFenceCodeParams(lang);
    const attr = serializeParamToAttribute(params);
    lang = lang.split(/\s+/g)[0];

    // code = escapeHTML(code);

    const langAlias = fenceCodeAlias[lang];
    if (langAlias) {
        return `<div class="${langAlias} raw"${attr}>${code}</div>`;
    }

    const result = {
        value: code,
    };

    // Highlight code
    if (lang) {
        const langWithoutParams = lang.split("=")[0];
        if (hljs.getLanguage(langWithoutParams)) {
            try {
                result.value = hljs.highlight(result.value, {
                    language: langWithoutParams,
                }).value;
                console.log("LANG PARSED ", langWithoutParams);
                console.log("HIHHH", result.value);
            } catch (__) {}
        }
    }
    // Add line number
    const showlinenumbers = /=$|=\d+$|=\+$/.test(lang);
    if (showlinenumbers) {
        let startnumber = 1;
        const matches = lang.match(/=(\d+)$/);
        if (matches) {
            startnumber = parseInt(matches[1]);
        }
        const lines = result.value.split("\n");
        const linenumbers = [];
        for (let i = 0; i < lines.length - 1; i++) {
            linenumbers[i] = `<span data-linenumber='${
                startnumber + i
            }'></span>`;
        }
        const continuelinenumber = /=\+$/.test(lang);
        const linegutter = `<div class='gutter linenumber${
            continuelinenumber ? " continue" : ""
        }'>${linenumbers.join("\n")}</div>`;
        result.value = `<div class='wrapper'>${linegutter}<div class='code'>${result.value}</div></div>`;
    }
    return result.value;
}

module.exports = {
    render: (code, lang) => highlightRender(code, lang),
};
