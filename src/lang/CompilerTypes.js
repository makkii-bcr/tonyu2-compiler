"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFileDest = isFileDest;
exports.isMemoryDest = isMemoryDest;
exports.isNonArrowFuncInfo = isNonArrowFuncInfo;
exports.isArrowFuncInfo = isArrowFuncInfo;
exports.isArrayType = isArrayType;
exports.isNativeClass = isNativeClass;
exports.isMeta = isMeta;
exports.isMethodType = isMethodType;
exports.isUnionType = isUnionType;
function isFileDest(d) {
    return d.file;
}
function isMemoryDest(d) {
    return d.memory;
}
function isNonArrowFuncInfo(f) {
    return f.stmts;
}
function isArrowFuncInfo(f) {
    return f.retVal;
}
function isArrayType(klass) {
    return klass.element;
}
function isNativeClass(klass) {
    return klass.class;
}
function isMeta(klass) {
    return klass.decls;
}
function isMethodType(klass) {
    return klass.method;
}
function isUnionType(klass) {
    return klass.candidates;
}
