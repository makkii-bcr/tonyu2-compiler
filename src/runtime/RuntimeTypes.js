"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTonyuClass = isTonyuClass;
exports.isArrayTypeDigest = isArrayTypeDigest;
exports.isUnionTypeDigest = isUnionTypeDigest;
function isTonyuClass(v) {
    return typeof v === "function" && v.meta && !v.meta.isShim;
}
function isArrayTypeDigest(d) {
    return d.element;
}
function isUnionTypeDigest(d) {
    return d.union;
}
