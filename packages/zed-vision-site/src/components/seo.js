"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.SEO = void 0;
var React = require("react");
var gatsby_1 = require("gatsby");
var react_helmet_1 = require("react-helmet");
var SEO = function (_a) {
    var _b = _a.description, description = _b === void 0 ? "" : _b, _c = _a.lang, lang = _c === void 0 ? "en" : _c, _d = _a.meta, meta = _d === void 0 ? [] : _d, title = _a.title;
    var site = gatsby_1.useStaticQuery(gatsby_1.graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      query {\n        site {\n          siteMetadata {\n            title\n            description\n            social {\n              twitter\n            }\n          }\n        }\n      }\n    "], ["\n      query {\n        site {\n          siteMetadata {\n            title\n            description\n            social {\n              twitter\n            }\n          }\n        }\n      }\n    "])))).site;
    var metaDescription = description || site.siteMetadata.description;
    return (React.createElement(react_helmet_1.Helmet, { htmlAttributes: {
            lang: lang
        }, title: title, titleTemplate: "%s | " + site.siteMetadata.title, meta: [
            {
                name: "description",
                content: metaDescription
            },
            {
                property: "og:title",
                content: title
            },
            {
                property: "og:description",
                content: metaDescription
            },
            {
                property: "og:type",
                content: "website"
            },
            {
                name: "twitter:card",
                content: "summary"
            },
            {
                name: "twitter:creator",
                content: site.siteMetadata.social.twitter
            },
            {
                name: "twitter:title",
                content: title
            },
            {
                name: "twitter:description",
                content: metaDescription
            },
        ].concat(meta) }));
};
exports.SEO = SEO;
var templateObject_1;
