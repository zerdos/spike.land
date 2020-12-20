"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.pageQuery = void 0;
var React = require("react");
var gatsby_1 = require("gatsby");
var bio_1 = require("../components/bio");
var layout_1 = require("../components/layout");
var seo_1 = require("../components/seo");
var typography_1 = require("../components/utils/typography");
var gatsby_plugin_mdx_1 = require("gatsby-plugin-mdx");
var styled_1 = require("@emotion/styled");
var CodeBox_1 = require("../components/codeBox/CodeBox");
var react_1 = require("@mdx-js/react");
var components = {
    pre: function PreComp(props) {
        return React.createElement("div", __assign({}, props));
    },
    code: CodeBox_1.CodeBox
};
var StyledHeader = styled_1["default"].h1(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: ", ";\n  margin-bottom: 0;\n"], ["\n  margin-top: ", ";\n  margin-bottom: 0;\n"])), typography_1.rhythm(1));
var _a = typography_1.scale(1 / 5), fontSize = _a.fontSize, lineHeight = _a.lineHeight;
var StyledDate = styled_1["default"].p(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: ", ";\n  line-height: ", ";\n  display: block;\n  margin-bottom: ", ";\n"], ["\n  font-size: ", ";\n  line-height: ", ";\n  display: block;\n  margin-bottom: ", ";\n"])), fontSize, lineHeight, typography_1.rhythm(1));
var Hr = styled_1["default"].hr(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin-bottom: ", ";\n"], ["\n  margin-bottom: ", ";\n"])), typography_1.rhythm(1));
var BlogPostTemplate = function (_a) {
    var data = _a.data, pageContext = _a.pageContext;
    var post = data.mdx;
    var previous = pageContext.previous, next = pageContext.next;
    var BlogPost = function () {
        return React.createElement(react_1.MDXProvider, { components: components },
            React.createElement(gatsby_plugin_mdx_1.MDXRenderer, null, post.body));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(layout_1.Layout, null,
            React.createElement(seo_1.SEO, { title: post.frontmatter.title, description: post.frontmatter.description || post.excerpt }),
            React.createElement("header", null,
                React.createElement(StyledHeader, null, post.frontmatter.title),
                React.createElement(StyledDate, null, post.frontmatter.date)),
            React.createElement(BlogPost, null),
            React.createElement(Hr, null),
            React.createElement("footer", null,
                React.createElement(bio_1.Bio, null)),
            React.createElement("nav", null,
                React.createElement("ul", null,
                    previous && (React.createElement("li", null,
                        React.createElement(gatsby_1.Link, { to: previous.fields.slug, rel: "prev" },
                            "\u2190 ",
                            previous.frontmatter.title))),
                    next && (React.createElement("li", null,
                        React.createElement(gatsby_1.Link, { to: next.fields.slug, rel: "next" },
                            next.frontmatter.title,
                            " \u2192"))))))));
};
exports["default"] = BlogPostTemplate;
exports.pageQuery = gatsby_1.graphql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  query BlogPostBySlug($slug: String!) {\n    site {\n      siteMetadata {\n        title\n      }\n    }\n    mdx(fields: { slug: { eq: $slug } }) {\n      excerpt(pruneLength: 160)\n      body\n      frontmatter {\n        title\n        date(formatString: \"MMMM DD, YYYY\")\n        description\n      }\n    }\n  }\n"], ["\n  query BlogPostBySlug($slug: String!) {\n    site {\n      siteMetadata {\n        title\n      }\n    }\n    mdx(fields: { slug: { eq: $slug } }) {\n      excerpt(pruneLength: 160)\n      body\n      frontmatter {\n        title\n        date(formatString: \"MMMM DD, YYYY\")\n        description\n      }\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
