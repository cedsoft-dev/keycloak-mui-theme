"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

function parse(linkHeader) {
    if (!linkHeader)
        return {};
    const links = linkHeader.split(/,\s*</);
    return links.reduce((acc, link) => {
        const matcher = link.match(/<?([^>]*)>(.*)/);
        if (!matcher)
            return {};
        const linkUrl = matcher[1];
        const rel = matcher[2].match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
        if (rel) {
            acc[rel[2]] = linkUrl;
        }
        return acc;
    }, {});
}

exports.default = parse;
//# sourceMappingURL=ParseLink.js.map