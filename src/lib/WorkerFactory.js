"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSrcFromFunction = extractSrcFromFunction;
exports.createFromFunction = createFromFunction;
exports.urlFromString = urlFromString;
exports.createFromString = createFromString;
exports.requireUrl = requireUrl;
exports.requireMod = requireMod;
exports.create = create;
function extractSrcFromFunction(f, startMark, endMark) {
    startMark = startMark || /(.|\s)*WORKER[_]SRC[_]BEGIN\*\//;
    endMark = endMark || /\/\*WORKER[_]SRC[_]END(.|\s)*/;
    var src = ("" + f).replace(startMark, "").replace(endMark, "");
    return src;
}
function createFromFunction(f, startMark, endMark) {
    var src = this.extractSrcFromFunction(f, startMark, endMark);
    return this.createFromString(src);
}
function urlFromString(src) {
    return URL.createObjectURL(new Blob([src], { type: "text/javascript" }));
}
function createFromString(src) {
    var url = this.urlFromString(src);
    return new Worker(url);
}
function requireUrl(name) {
    return "worker.js?main=" + name;
}
function requireMod(name) {
    return new Worker(this.requireUrl(name));
}
function create(src) {
    if (typeof src === "string") {
        return this.require(src);
    }
    else if (typeof src === "function") {
        return this.createFromFunction(src);
    }
    throw new Error("Invaluid src type " + src);
}
