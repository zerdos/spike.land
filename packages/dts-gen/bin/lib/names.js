"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDTName = void 0;
function getDTName(s) {
    if (s.indexOf('@') === 0 && s.indexOf('/') !== -1) {
        // we have a scoped module, e.g. @bla/foo
        // which should be converted to   bla__foo
        s = s.substr(1).replace('/', '__');
    }
    return s;
}
exports.getDTName = getDTName;
