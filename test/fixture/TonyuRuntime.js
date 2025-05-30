(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
const ja = {
    "MethodAlreadyDeclared": "メソッド{1}はすでに定義されています",
    typeNotFound: "型{1}が見つかりません",
    cannotCallNonFunctionType: "関数・メソッドでないので呼び出すことはできません",
    memberNotFoundInClass: "クラス{1}にフィールドまたはメソッド{2}が定義されていません",
    expected: "ここには{1}などが入ることが予想されます",
    superClassIsUndefined: "親クラス {1}は定義されていません",
    classIsUndefined: "クラス {1}は定義されていません",
    invalidLeftValue: "'{1}'は左辺には書けません．",
    fieldDeclarationRequired: "{1}は宣言されていません（フィールドの場合，明示的に宣言してください）．",
    duplicateKeyInObjectLiteral: "オブジェクトリテラルのキー名'{1}'が重複しています",
    cannotUseStringLiteralAsAShorthandOfObjectValue: "オブジェクトリテラルのパラメタに単独の文字列は使えません",
    breakShouldBeUsedInIterationOrSwitchStatement: "break； は繰り返しまたはswitch文の中で使います.",
    continueShouldBeUsedInIterationStatement: "continue； は繰り返しの中で使います.",
    cannotUseObjectLiteralAsTheExpressionOfStatement: "オブジェクトリテラル単独の式文は書けません．",
    undefinedMethod: "メソッド{1}はありません．",
    undefinedSuperMethod: "親クラスまたは参照モジュールにメソッド'{1}'がありません．",
    notAWaitableMethod: "メソッド{1}は待機可能メソッドではありません",
    circularDependencyDetected: "次のクラス間に循環参照があります: {1}",
    cannotWriteReturnInTryStatement: "現実装では、tryの中にreturnは書けません",
    cannotWriteBreakInTryStatement: "現実装では、tryの中にbreakは書けません",
    cannotWriteContinueInTryStatement: "現実装では、tryの中にcontinueは書けません",
    cannotWriteTwoOrMoreCatch: "現実装では、catch節1個のみをサポートしています",
    lexicalError: "文法エラー(Token)",
    parseError: "文法エラー",
    ambiguousClassName: "曖昧なクラス名： {1}.{2}, {3}",
    cannotInvokeMethod: "{1}(={2})のメソッド {3}を呼び出せません",
    notAMethod: "{1}{2}(={3})はメソッドではありません",
    notAFunction: "{1}は関数ではありません",
    uninitialized: "{1}(={2})は初期化されていなません",
    newIsRequiredOnInstanciate: "クラス名{1}はnewをつけて呼び出して下さい。",
    bootClassIsNotFound: "{1}というクラスはありません．",
    infiniteLoopDetected: "無限ループをストップしました。\n" +
        "   プロジェクト オプションで無限ループチェックの有無を設定できます。\n" +
        "   [参考]https://edit.tonyu.jp/doc/options.html\n",
    "blockScopedVarDeclConflict": "'{1}' は引数または'var'ですでに定義されています.",
    "duplicateVarDecl": "'{1}'が２回定義されています。",
};
const en = {
    "MethodAlreadyDeclared": "Method {1} is already defined",
    typeNotFound: "Type {1} is not found",
    cannotCallNonFunctionType: "Cannot call what is neither function or method.",
    memberNotFoundInClass: "No such field or method: {1}.{2}",
    "expected": "Expected: {1}",
    "superClassIsUndefined": "Super Class '{1}' is not defined", //親クラス {1}は定義されていません
    "classIsUndefined": "Class {1} is Undefined", //クラス {1}は定義されていません
    "invalidLeftValue": "{1} is not a valid Left Value", //'{1}'は左辺には書けません．
    "fieldDeclarationRequired": "'{1}' is not declared, If you have meant it is a Field, Declare Explicitly.", //{1}は宣言されていません（フィールドの場合，明示的に宣言してください）．
    "duplicateKeyInObjectLiteral": "Duplicate Key In Object Literal: {1}", //オブジェクトリテラルのキー名'{1}'が重複しています
    "cannotUseStringLiteralAsAShorthandOfObjectValue": "Cannot Use String Literal as a Shorthand of Object Value", //オブジェクトリテラルのパラメタに単独の文字列は使えません
    "breakShouldBeUsedInIterationOrSwitchStatement": "break; Should be Used In Iteration or switch Statement", //break； は 繰り返しまたはswitch文の中で使います.
    "continueShouldBeUsedInIterationStatement": "continue; Should be Used In Iteration Statement", //continue； は繰り返しの中で使います.
    "cannotUseObjectLiteralAsTheExpressionOfStatement": "Cannot Use Object Literal As The Expression Of Statement", //オブ ジェクトリテラル単独の式文は書けません．
    "undefinedMethod": "Undefined Method: '{1}'", //メソッド{1}はありません．
    undefinedSuperMethod: "Method '{1}' is defined in neigher superclass or including modules.",
    "notAWaitableMethod": "Not A Waitable Method: '{1}'", //メソッド{1}は待機可能メソッドではありません
    "circularDependencyDetected": "Circular Dependency Detected: {1}", //次のクラス間に循環参照があります: {1}
    "cannotWriteReturnInTryStatement": "Cannot Write Return In Try Statement", //現実装では、tryの中にreturnは書けません
    "cannotWriteBreakInTryStatement": "Cannot Write Break In Try Statement", //現実装では、tryの中にbreakは書けません
    "cannotWriteContinueInTryStatement": "Cannot Write Continue In Try Statement", //現実装では、tryの中にcontinueは書けま せん
    "cannotWriteTwoOrMoreCatch": "Cannot Write Two Or More Catch", //現実装では、catch節1個のみをサポートしています
    "lexicalError": "Lexical Error", //文法エラー(Token)
    "parseError": "Parse Error", //文法エラー
    "ambiguousClassName": "Ambiguous Class Name: {1}.{2} vs {3}", //曖昧なクラス名： {1}.{2}, {3}
    "cannotInvokeMethod": "Cannot Invoke Method {1}(={2}).{3}", //{1}(={2})のメソッド {3}を呼び出せません
    "notAMethod": "Not A Method: {1}{2}(={3})", //{1}{2}(={3})はメソッドではありません
    "notAFunction": "Not A Function: {1}", //{1}は関数ではありません
    "uninitialized": "Uninitialized: {1}(={2})", //{1}(={2})は初期化されていなません
    "newIsRequiredOnInstanciate": "new is required to Instanciate {1}", //クラス名{1}はnewをつけて呼び出して下さい。
    "bootClassIsNotFound": "Boot Class {1} Is Not Found", //{1}というクラスはありません．
    "infiniteLoopDetected": "Infinite Loop Detected",
    "blockScopedVarDeclConflict": "'{1}' is already declared as a parmeter or 'var' declaration.",
    "duplicateVarDecl": "'{1}' is declared twice.",
};
/*let buf="";
    for (let k of Object.keys(ja)) {
        buf+=`"${k}" : "${englishify(k)}", //${ja[k]}\n`;
    }
    console.log(buf);*/
let dict = en;
function R(name, ...params) {
    let mesg = dict[name];
    if (!mesg) {
        return englishify(name) + (params.length ? ": " + params.join(",") : "");
    }
    return buildMesg(mesg, ...params); //+"です！";
}
function buildMesg(...params) {
    var a = Array.prototype.slice.call(arguments);
    var format = a.shift();
    if (a.length === 1 && a[0] instanceof Array)
        a = a[0];
    var P = "vroijvowe0r324";
    format = format.replace(/\{([0-9])\}/g, P + "$1" + P);
    format = format.replace(new RegExp(P + "([0-9])" + P, "g"), function (_, n) {
        return a[parseInt(n) - 1] + "";
    });
    return format;
}
function englishify(name) {
    name = name.replace(/([A-Z])/g, " $1");
    name = name[0].toUpperCase() + name.substring(1);
    return name;
}
R.setLocale = locale => {
    if (locale === "ja")
        dict = ja;
    if (locale === "en")
        dict = en;
};
R.getLocale = () => {
    if (dict === en)
        return "en";
    return "ja";
};
R.dicts = { ja, en };
module.exports = R;
//module.exports=R;

},{}],2:[function(require,module,exports){
"use strict";
const Assertion = function (failMesg = "Assertion failed: ") {
    this.failMesg = flatten(failMesg);
};
var $a;
Assertion.prototype = {
    _regedType: {},
    registerType: function (name, t) {
        this._regedType[name] = t;
    },
    MODE_STRICT: "strict",
    MODE_DEFENSIVE: "defensive",
    MODE_BOOL: "bool",
    fail: function () {
        var a = $a(arguments);
        var value = a.shift();
        a = flatten(a);
        a = this.failMesg.concat(value).concat(a).concat(["mode", this._mode]);
        console.log.apply(console, a);
        if (this.isDefensive())
            return value;
        if (this.isBool())
            return false;
        throw new Error(a.join(" "));
    },
    subAssertion: function () {
        var a = $a(arguments);
        a = flatten(a);
        return new Assertion(this.failMesg.concat(a));
    },
    assert: function (t, failMesg) {
        if (!t)
            return this.fail(t, failMesg);
        return t;
    },
    eq: function (a, b) {
        if (a !== b)
            return this.fail(a, "!==", b);
        return this.isBool() ? true : a;
    },
    ne: function (a, b) {
        if (a === b)
            return this.fail(a, "===", b);
        return this.isBool() ? true : a;
    },
    isset: function (a, n) {
        if (a == null)
            return this.fail(a, (n || "") + " is null/undef");
        return this.isBool() ? true : a;
    },
    is: function (value, type) {
        var t = type, v = value;
        if (t == null) {
            return this.fail(value, "assert.is: type must be set");
            // return t; Why!!!!???? because is(args,[String,Number])
        }
        if (t._assert_func) {
            t._assert_func.apply(this, [v]);
            return this.isBool() ? true : value;
        }
        this.assert(value != null, [value, "should be ", t]);
        if (t instanceof Array || (typeof global == "object" && typeof global.Array == "function" && t instanceof global.Array)) {
            if (!value || typeof value.length != "number") {
                return this.fail(value, "should be array:");
            }
            var self = this;
            for (var i = 0; i < t.length; i++) {
                let na = self.subAssertion("failed at ", value, "[", i, "]: ");
                if (t[i] == null) {
                    console.log("WOW!7", v[i], t[i]);
                }
                na.is(v[i], t[i]);
            }
            return this.isBool() ? true : value;
        }
        if (t === String || t == "string") {
            this.assert(typeof (v) == "string", [v, "should be a string "]);
            return this.isBool() ? true : value;
        }
        if (t === Number || t == "number") {
            this.assert(typeof (v) == "number", [v, "should be a number"]);
            return this.isBool() ? true : value;
        }
        if (t instanceof RegExp || (typeof global == "object" && typeof global.RegExp == "function" && t instanceof global.RegExp)) {
            this.is(v, String);
            this.assert(t.exec(v), [v, "does not match to", t]);
            return this.isBool() ? true : value;
        }
        if (t === Function) {
            this.assert(typeof v == "function", [v, "should be a function"]);
            return this.isBool() ? true : value;
        }
        if (typeof t == "function") {
            this.assert((v instanceof t), [v, "should be ", t]);
            return this.isBool() ? true : value;
        }
        if (t && typeof t == "object") {
            for (var k in t) {
                let na = this.subAssertion("failed at ", value, ".", k, ":");
                na.is(value[k], t[k]);
            }
            return this.isBool() ? true : value;
        }
        if (typeof t == "string") {
            var ty = this._regedType[t];
            if (ty)
                return this.is(value, ty);
            //console.log("assertion Warning:","unregistered type:", t, "value:",value);
            return this.isBool() ? true : value;
        }
        return this.fail(value, "Invaild type: ", t);
    },
    ensureError: function (action, err) {
        try {
            action();
        }
        catch (e) {
            if (typeof err == "string") {
                assert(e + "" === err, action + " thrown an error " + e + " but expected:" + err);
            }
            console.log("Error thrown successfully: ", e.message);
            return;
        }
        this.fail(action, "should throw an error", err);
    },
    setMode: function (mode) {
        this._mode = mode;
    },
    isDefensive: function () {
        return this._mode === this.MODE_DEFENSIVE;
    },
    isBool: function () {
        return this._mode === this.MODE_BOOL;
    },
    isStrict: function () {
        return !this.isDefensive() && !this.isBool();
    }
};
$a = function (args) {
    var a = [];
    for (var i = 0; i < args.length; i++)
        a.push(args[i]);
    return a;
};
var top = new Assertion();
var assert = function () {
    try {
        return top.assert.apply(top, arguments);
    }
    catch (e) {
        throw new Error(e.message);
    }
};
["setMode", "isDefensive", "is", "isset", "ne", "eq", "ensureError"].forEach(function (m) {
    assert[m] = function () {
        try {
            return top[m].apply(top, arguments);
        }
        catch (e) {
            console.log(e.stack);
            //if (top.isDefensive()) return arguments[0];
            //if (top.isBool()) return false;
            throw new Error(e.message);
        }
    };
});
assert.fail = top.fail.bind(top);
assert.MODE_STRICT = top.MODE_STRICT;
assert.MODE_DEFENSIVE = top.MODE_DEFENSIVE;
assert.MODE_BOOL = top.MODE_BOOL;
assert.f = function (f) {
    return {
        _assert_func: f
    };
};
assert.opt = function (t) {
    return assert.f(function (v) {
        return v == null || v instanceof t;
    });
};
assert.and = function () {
    var types = $a(arguments);
    assert(types instanceof Array);
    return assert.f(function (value) {
        var t = this;
        for (var i = 0; i < types.length; i++) {
            t.is(value, types[i]);
        }
    });
};
function flatten(a) {
    if (a instanceof Array) {
        var res = [];
        a.forEach(function (e) {
            res = res.concat(flatten(e));
        });
        return res;
    }
    return [a];
}
function isArg(a) {
    return "length" in a && "caller" in a && "callee" in a;
}
module.exports = assert;

},{}],3:[function(require,module,exports){
"use strict";
const root = (function () {
    if (typeof window !== "undefined")
        return window;
    if (typeof self !== "undefined")
        return self;
    if (typeof global !== "undefined")
        return global;
    return (function () { return this; })();
})();
module.exports = root;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
function TError(message, src, pos, len = 0) {
    let rc;
    const extend = (dst, src) => { for (var k in src)
        dst[k] = src[k]; return dst; };
    if (typeof src == "string") {
        rc = TError.calcRowCol(src, pos);
        message += " at " + (rc.row) + ":" + (rc.col);
        return extend(new Error(message), {
            isTError: true,
            src: {
                path: function () { return "/"; },
                name: function () { return "unknown"; },
                text: function () { return src; }
            },
            pos, row: rc.row, col: rc.col, len,
            raise: function () {
                throw this;
            }
        });
    }
    let klass = null;
    if (src && src.src) {
        klass = src;
        src = klass.src.tonyu;
    }
    if (typeof src.name !== "function" || typeof src.text !== "function") {
        throw new Error("src=" + src + " should be file object");
    }
    const s = src.text();
    rc = TError.calcRowCol(s, pos);
    message += " at " + src.name() + ":" + rc.row + ":" + rc.col;
    return extend(new Error(message), {
        isTError: true,
        src, pos, row: rc.row, col: rc.col, len, klass,
        raise: function () {
            throw this;
        }
    });
}
;
TError.calcRowCol = function (text, pos) {
    const lines = text.split("\n");
    let pp = 0, row, col;
    /*
aaa\n
bb\n
cc!cc
pp = 4  7   11
row=2  pp=11  pos=9
lines[row].length=4
    */
    col = 0;
    for (row = 0; row < lines.length; row++) {
        const ppp = pp;
        pp += lines[row].length + 1;
        if (pp > pos) {
            col = pos - ppp;
            break;
        }
    }
    return { row: row + 1, col: col + 1 };
};
module.exports = TError;
//module.exports=TError;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IT = IT;
exports.IT2 = IT2;
//define(["Klass"], function (Klass) {
//var Klass=require("../lib/Klass");
const SYMIT = typeof Symbol !== "undefined" && Symbol.iterator;
class ArrayValueIterator {
    constructor(set) {
        this.set = set;
        this.i = 0;
    }
    next() {
        if (this.i >= this.set.length)
            return false;
        this[0] = this.set[this.i];
        this.i++;
        return true;
    }
}
class ArrayKeyValueIterator {
    constructor(set) {
        this.set = set;
        this.i = 0;
    }
    next() {
        if (this.i >= this.set.length)
            return false;
        this[0] = this.i;
        this[1] = this.set[this.i];
        this.i++;
        return true;
    }
}
class ObjectKeyIterator {
    constructor(set) {
        this.elems = [];
        for (var k in set) {
            this.elems.push(k);
        }
        this.i = 0;
    }
    next() {
        if (this.i >= this.elems.length)
            return false;
        this[0] = this.elems[this.i];
        this.i++;
        return true;
    }
}
class ObjectKeyValueIterator {
    constructor(set) {
        this.elems = [];
        for (var k in set) {
            this.elems.push([k, set[k]]);
        }
        this.i = 0;
    }
    next() {
        if (this.i >= this.elems.length)
            return false;
        this[0] = this.elems[this.i][0];
        this[1] = this.elems[this.i][1];
        this.i++;
        return true;
    }
}
class NativeIteratorWrapper {
    constructor(it) {
        this.i = 0;
        this.it = it;
    }
    next() {
        const { value, done } = this.it.next();
        if (done)
            return false;
        this[0] = value;
        return true;
    }
}
function isArray(obj) {
    return obj &&
        typeof (obj.slice) === "function" &&
        typeof (obj.forEach) === "function" &&
        typeof (obj.length) === "number";
}
function isObj(obj) {
    return obj && typeof obj === "object";
}
function IT(set, arity) {
    if (set && typeof set.tonyuIterator === "function") {
        // TODO: the prototype of class having tonyuIterator will iterate infinitively
        return set.tonyuIterator(arity);
    }
    else if (isArray(set)) {
        if (arity == 1) {
            return new ArrayValueIterator(set);
        }
        else {
            return new ArrayKeyValueIterator(set);
        }
    }
    else if (set && typeof set[SYMIT] === "function") {
        return new NativeIteratorWrapper(set[SYMIT]());
    }
    else if (isObj(set)) {
        if (arity == 1) {
            return new ObjectKeyIterator(set);
        }
        else {
            return new ObjectKeyValueIterator(set);
        }
    }
    else {
        console.log(set);
        throw new Error(set + " is not iterable");
    }
}
function IT2(set, arity) {
    const it = IT(set, arity);
    return function* () {
        while (it.next()) {
            const yielded = [];
            for (let i = 0; i < arity; i++) {
                yielded[i] = it[i];
            }
            yield yielded;
        }
    }();
}
//	module.exports=IT;
//   Tonyu.iterator=IT;
//	return IT;
//});

},{}],7:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const R_1 = __importDefault(require("../lib/R"));
const TonyuIterator_1 = require("./TonyuIterator");
const TonyuThread_1 = require("./TonyuThread");
const root_1 = __importDefault(require("../lib/root"));
const assert_1 = __importDefault(require("../lib/assert"));
const RuntimeTypes_1 = require("./RuntimeTypes");
const TError_1 = __importDefault(require("./TError"));
const reservedWords = [
    "abstract", "arguments", "await", "boolean", "break", "byte",
    "case", "catch", "char", "class", "const", "continue",
    "debugger", "default", "delete", "do", "double",
    "else", "enum", "eval", "export", "extends", "false",
    "final", "finally", "float", "for", "function", "goto",
    "if", "implements", "import", "in", "instanceof", "int",
    "interface", "let", "long", "native", "new", "null",
    "package", "private", "protected", "public", "return",
    "short", "static", "super", "switch", "synchronized",
    "this", "throw", "throws", "transient", "true", "try", "typeof",
    "var", "void", "volatile", "while", "with", "yield"
];
// old browser support
if (!root_1.default.performance) {
    root_1.default.performance = {};
}
if (!root_1.default.performance.now) {
    root_1.default.performance.now = function now() {
        return Date.now();
    };
}
function thread() {
    var t = new TonyuThread_1.TonyuThread(Tonyu);
    t.handleEx = handleEx;
    return t;
}
function timeout(t) {
    return new Promise(function (s) {
        setTimeout(s, t);
    });
}
/*function animationFrame() {
    return new Promise( function (f) {
        requestAnimationFrame(f);
    });
}*/
const propReg = /^__([gs]et)ter__(.*)$/;
const property = {
    isPropertyMethod(name) {
        return propReg.exec(name);
    },
    methodFor(type, name) {
        return `__${type}ter__${name}`;
    }
};
function handleEx(e) {
    Tonyu.onRuntimeError(e);
}
function addMeta(fn, m) {
    // why use addMeta?
    // because when compiled from source, additional info(src file) is contained.
    // k.meta={...} erases these info
    assert_1.default.is(arguments, [String, Object]);
    return extend(klass.getMeta(fn), m);
}
function getMeta(klass) {
    if ((0, RuntimeTypes_1.isTonyuClass)(klass))
        return klass.meta;
    return klass;
}
var klass = {
    addMeta,
    removeMeta(n) {
        delete classMetas[n];
    },
    removeMetaAll(ns) {
        ns += ".";
        for (let n in classMetas) {
            if (n.substring(0, ns.length) === ns)
                delete classMetas[n];
        }
    },
    getMeta(k) {
        if (typeof k == "function") {
            return k.meta;
        }
        else if (typeof k == "string") {
            var mm = classMetas[k];
            if (!mm)
                classMetas[k] = mm = {};
            return mm;
        }
    },
    ensureNamespace(top, nsp) {
        var keys = nsp.split(".");
        var o = top;
        var i;
        for (i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (!o[k])
                o[k] = {};
            o = o[k];
        }
        return o;
    },
    hasNamespace(top, nsp) {
        return nsp in top;
    },
    /*Function.prototype.constructor=function () {
        throw new Error("This method should not be called");
    };*/
    propReg,
    property,
    define(params) {
        // fullName, shortName,namspace, superclass, includes, methods:{name/fiber$name: func}, decls
        var parent = params.superclass;
        var includes = params.includes;
        var fullName = params.fullName;
        var shortName = params.shortName;
        var namespace = params.namespace;
        var methodsF = params.methods;
        var decls = params.decls;
        var nso = klass.ensureNamespace(Tonyu.classes, namespace);
        function addKlassAndNameToDecls(klass) {
            for (let name of Object.keys(decls.fields)) {
                Object.assign(klass.decls.fields[name], { name, klass });
            }
            for (let name of Object.keys(decls.methods)) {
                Object.assign(klass.decls.methods[name], { name, klass });
            }
        }
        //type ShimMeta=Meta & {isShim?:boolean, extenderFullName?:string};
        function chkmeta(m, ctx) {
            ctx = ctx || { path: [] };
            //if (ctx.isShim) return m;
            //ctx.path=ctx.path||[];
            ctx.path.push(m);
            if (m.isShim) {
                console.log("chkmeta::ctx", ctx);
                throw new Error("Shim found " + m.extenderFullName);
            }
            if (m.superclass)
                chkmeta(m.superclass, ctx);
            if (!m.includes) {
                console.log("chkmeta::ctx", ctx);
                throw new Error("includes not found");
            }
            m.includes.forEach(function (mod) {
                chkmeta(mod, ctx);
            });
            ctx.path.pop();
            return m;
        }
        function chkclass(c, ctx) {
            if (!c.prototype.hasOwnProperty("getClassInfo"))
                throw new Error("NO");
            if (!c.meta) {
                console.log("metanotfound", c);
                throw new Error("meta not found");
            }
            chkmeta(c.meta, ctx);
            return c;
        }
        function extender(_parent, ctx) {
            let parent = _parent;
            var isShim = !ctx.init;
            var includesRec = ctx.includesRec;
            if (includesRec[fullName])
                return parent;
            includesRec[fullName] = true;
            //console.log(ctx.initFullName, fullName);//,  includesRec[fullName],JSON.stringify(ctx));
            includes.forEach((m) => {
                parent = m.extendFrom(parent, extend(ctx, { init: false }));
            });
            var methods = typeof methodsF === "function" ? methodsF(parent) : methodsF;
            /*if (typeof Profiler!=="undefined") {
                Profiler.profile(methods, fullName);
            }*/
            var init = methods.initialize;
            delete methods.initialize;
            function exprWithName(name, expr, bindings) {
                const bnames = Object.keys(bindings);
                if (reservedWords.includes(name))
                    name = "_" + name;
                const f = new Function(...bnames, `const ${name}=${expr}; return ${name};`);
                return f(...bnames.map((k) => bindings[k]));
            }
            const chkT = (obj) => {
                if (!(obj instanceof res))
                    useNew(fullName);
            };
            const superInit = (init ? `init.apply(this,arguments);` :
                parent ? `parent.apply(this,arguments);` : "");
            const res = exprWithName(shortName, `function() {chkT(this);${superInit}}`, { chkT, init, parent });
            res.prototype = bless(parent, { constructor: res });
            if (isShim) {
                res.meta = { isShim: true, extenderFullName: fullName, func: res };
            }
            else {
                res.meta = addMeta(fullName, {
                    fullName, shortName, namespace, decls,
                    superclass: ctx.nonShimParent ? ctx.nonShimParent.meta : null,
                    includesRec,
                    includes: includes.map((c) => c.meta),
                    func: res
                });
            }
            // methods: res's own methods(no superclass/modules)
            //res.methods=methods;
            var prot = res.prototype;
            var props = {};
            //var propReg=klass.propReg;//^__([gs]et)ter__(.*)$/;
            //var k;
            for (let k in methods) {
                if (k.match(/^fiber\$/))
                    continue;
                prot[k] = methods[k];
                var fbk = "fiber$" + k;
                if (methods[fbk]) {
                    prot[fbk] = methods[fbk];
                    prot[fbk].methodInfo = prot[fbk].methodInfo || { name: k, klass: res, fiber: true };
                    prot[k].fiber = prot[fbk];
                }
                if (k !== "__dummy" && !prot[k]) {
                    console.log("WHY!", prot[k], prot, k);
                    throw new Error("WHY!" + k);
                }
                /*if (typeof methods[k]==="boolean") {
                    console.log(methods);
                    throw new Error(`${k} ${methods[k]}`);
                }*/
                if (k !== "__dummy") {
                    prot[k].methodInfo = prot[k].methodInfo || { name: k, klass: res };
                }
                // if profile...
                const r = property.isPropertyMethod(k);
                if (r) {
                    props[r[2]] = 1;
                    // __(r[1]g/setter)__r[2]
                    //props[r[2]]=props[r[2]]||{};
                    //props[r[2]][r[1]]=prot[k];
                }
            }
            prot.isTonyuObject = true;
            //console.log("Prots1",props);
            for (let k of Object.keys(props)) {
                const desc = {};
                for (let type of ["get", "set"]) {
                    const tter = prot[property.methodFor(type, k)];
                    if (tter) {
                        desc[type] = tter;
                    }
                }
                //console.log("Prots2",k, desc);
                Object.defineProperty(prot, k, desc);
            }
            prot.getClassInfo = function () {
                return res.meta;
            };
            if ((0, RuntimeTypes_1.isTonyuClass)(res))
                chkclass(res);
            return res; //chkclass(res,{isShim, init:false, includesRec:{}});
        }
        const res = extender(parent, {
            //isShim: false,
            init: true,
            //initFullName:fullName,
            includesRec: (parent ? extend({}, parent.meta.includesRec) : {}),
            nonShimParent: parent,
        });
        res.toString = () => { return `[class ${fullName}]`; };
        addKlassAndNameToDecls(res.meta);
        res.extendFrom = extender;
        //addMeta(fullName, res.meta);
        nso[shortName] = res;
        //outerRes=res;
        //console.log("defined", fullName, Tonyu.classes,Tonyu.ID);
        return chkclass(res); //,{isShim:false, init:false, includesRec:{}});
    },
    /*isSourceChanged(_k:Meta|TonyuClass) {
        const k:Meta=getMeta(_k);
        if (k.src && k.src.tonyu) {
            if (!k.nodeTimestamp) return true;
            return k.src.tonyu.lastUpdate()> k.nodeTimestamp;
        }
        return false;
    },
    shouldCompile(_k:Meta|TonyuClass) {
        const k:Meta=getMeta(_k);
        if (k.hasSemanticError) return true;
        if (klass.isSourceChanged(k)) return true;
        var dks=klass.getDependingClasses(k);
        for (var i=0 ; i<dks.length ;i++) {
            if (klass.shouldCompile(dks[i])) return true;
        }
    },*/
    getDependingClasses(_k) {
        const k = getMeta(_k);
        var res = [];
        if (k.superclass)
            res = [k.superclass];
        if (k.includes)
            res = res.concat(k.includes);
        return res;
    }
};
function bless(klass, val) {
    if (!klass)
        return extend({}, val);
    return extend(Object.create(klass.prototype), val);
    //return extend( new klass() , val);
}
function extend(dst, src) {
    if (src && typeof src == "object") {
        for (var i in src) {
            dst[i] = src[i];
        }
    }
    return dst;
}
//alert("init");
const globals = {};
var classes = {}; // classes.namespace.classname= function
var classMetas = {}; // classes.namespace.classname.meta ( or env.classes / ctx.classes)
function setGlobal(n, v) {
    globals[n] = v;
}
function getGlobal(n) {
    return globals[n];
}
function getClass(n) {
    //CFN: n.split(".")
    var ns = n.split(".");
    var res = classes;
    ns.forEach(function (na) {
        if (!res)
            return;
        res = res[na];
    });
    if (!res && ns.length == 1) {
        var found;
        for (var nn in classes) {
            var nr = classes[nn][n];
            if (nr) {
                if (!res) {
                    res = nr;
                    found = nn + "." + n;
                }
                else
                    throw new Error((0, R_1.default)("ambiguousClassName", nn, n, found));
            }
        }
    }
    return res;
    //if (res instanceof Function) return res;//classes[n];
    //throw new Error(`Not a class: ${n}`);
}
function bindFunc(t, meth) {
    if (typeof meth != "function")
        return meth;
    var res = function () {
        return meth.apply(t, arguments);
    };
    res.methodInfo = Tonyu.extend({ thiz: t }, meth.methodInfo || {});
    if (meth.fiber) {
        res.fiber = function fiber_func() {
            return meth.fiber.apply(t, arguments);
        };
        res.fiber.methodInfo = Tonyu.extend({ thiz: t }, meth.fiber.methodInfo || {});
    }
    return res;
}
function invokeMethod(t, name, args, objName) {
    if (!t)
        throw new Error((0, R_1.default)("cannotInvokeMethod", objName, t, name));
    var f = t[name];
    if (typeof f != "function")
        throw new Error((0, R_1.default)("notAMethod", (objName == "this" ? "" : objName + "."), name, f));
    return f.apply(t, args);
}
function callFunc(f, args, fName) {
    if (typeof f != "function")
        throw new Error((0, R_1.default)("notAFunction", fName));
    return f.apply({}, args);
}
function checkNonNull(v, name) {
    if (v != v || v == null)
        throw new Error((0, R_1.default)("uninitialized", name, v));
    return v;
}
function A(args) {
    var res = [];
    for (var i = 1; i < args.length; i++) {
        res[i - 1] = args[i];
    }
    return res;
}
function useNew(c) {
    throw new Error((0, R_1.default)("newIsRequiredOnInstanciate", c));
}
function not_a_tonyu_object(o) {
    console.log("Not a tonyu object: ", o);
    throw new Error(o + " is not a tonyu object");
}
function hasKey(k, obj) {
    return k in obj;
}
function run(bootClassName) {
    var bootClass = getClass(bootClassName);
    if (!(0, RuntimeTypes_1.isTonyuClass)(bootClass))
        throw new Error((0, R_1.default)("bootClassIsNotFound", bootClassName));
    Tonyu.runMode = true;
    var boot = new bootClass();
    //var th=thread();
    //th.apply(boot,"main");
    var TPR = Tonyu.globals.$currentProject || Tonyu.currentProject;
    if (TPR) {
        //TPR.runningThread=th;
        TPR.runningObj = boot;
    }
    //$LASTPOS=0;
    //th.steps();
}
var lastLoopCheck = root_1.default.performance.now();
var prevCheckLoopCalled;
function checkLoop() {
    var now = root_1.default.performance.now();
    if (now - lastLoopCheck > 1000) {
        resetLoopCheck(10000);
        throw new Error((0, R_1.default)("infiniteLoopDetected"));
    }
    prevCheckLoopCalled = now;
}
function resetLoopCheck(disableTime) {
    lastLoopCheck = root_1.default.performance.now() + (disableTime || 0);
}
function is(obj, klass) {
    if (typeof klass === "string") {
        return typeof obj === klass;
    }
    if (!obj)
        return false;
    if (!klass)
        return false;
    if (obj instanceof klass)
        return true;
    if (typeof obj.getClassInfo === "function" && (0, RuntimeTypes_1.isTonyuClass)(klass)) {
        return obj.getClassInfo().includesRec[klass.meta.fullName];
    }
    return false;
}
function load(options, definitions) {
    let myns = "user";
    if (options.compiler && options.compiler.namespace && options.compiler.dependingProjects) {
        myns = options.compiler.namespace;
        for (let dp of options.compiler.dependingProjects) {
            if (dp.namespace && !klass.hasNamespace(Tonyu.classes, dp.namespace)) {
                console.warn("Missing dependencies: ", dp.namespace, " is required from ", myns);
                Tonyu.loadEvent({ type: "missing", from: myns, to: dp.namespace });
            }
        }
    }
    try {
        definitions();
        Tonyu.loadEvent({ type: "success", namespace: myns, options });
    }
    catch (e) {
        Tonyu.loadEvent({ type: "error", namespace: myns, e, options });
        throw e;
    }
}
//setInterval(resetLoopCheck,16);
const Tonyu = {
    thread,
    supports_await: true,
    klass, bless, extend, messages: R_1.default, load, loadEvent: (e) => { },
    globals, classes, classMetas, setGlobal, getGlobal, getClass,
    timeout,
    bindFunc, not_a_tonyu_object, is,
    hasKey, invokeMethod, callFunc, checkNonNull,
    iterator: TonyuIterator_1.IT, iterator2: TonyuIterator_1.IT2, run, checkLoop, resetLoopCheck,
    currentProject: null,
    currentThread: null,
    runMode: false,
    onRuntimeError: (e) => {
        if (root_1.default.alert)
            root_1.default.alert("Error: " + e);
        console.log(e.stack);
        throw e;
    }, TError: TError_1.default,
    VERSION: 1560828115159, //EMBED_VERSION
    A, ID: Math.random()
};
//const TT=TonyuThreadF(Tonyu);
if (root_1.default.Tonyu) {
    console.error("Tonyu called twice!");
    throw new Error("Tonyu called twice!");
}
root_1.default.Tonyu = Tonyu;
module.exports = Tonyu;

},{"../lib/R":1,"../lib/assert":2,"../lib/root":3,"./RuntimeTypes":4,"./TError":5,"./TonyuIterator":6,"./TonyuThread":8}],8:[function(require,module,exports){
"use strict";
//	var Klass=require("../lib/Klass");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TonyuThread = void 0;
const R_1 = __importDefault(require("../lib/R"));
class KilledError extends Error {
}
//const SYM_Exception=Symbol("exception");
/*type Frame={
    prev?:Frame, func:Function,
};*/
//export= function TonyuThreadF(Tonyu) {
let idSeq = 1;
//try {window.cnts=cnts;}catch(e){}
class TonyuThread {
    constructor(Tonyu) {
        this.Tonyu = Tonyu;
        this.preempted = false;
        this.generator = null;
        this._isDead = false;
        //this._isAlive=true;
        //this.cnt=0;
        this._isWaiting = false;
        this.fSuspended = false;
        //this.tryStack=[];
        this.preemptionTime = Tonyu.globals.$preemptionTime || 5;
        this.onEndHandlers = [];
        this.onTerminateHandlers = [];
        this.id = idSeq++;
        this.age = 0; // inc if object pooled
    }
    isAlive() {
        return !this.isDead();
        //return this.frame!=null && this._isAlive;
    }
    isDead() {
        this._isDead = this._isDead || (!!this.termStatus) ||
            (this._threadGroup && (this._threadGroup.objectPoolAge != this.tGrpObjectPoolAge ||
                this._threadGroup.isDeadThreadGroup()));
        return this._isDead;
    }
    isDeadThreadGroup() {
        return this.isDead();
    }
    killThreadGroup() {
        this.kill();
    }
    setThreadGroup(g) {
        this._threadGroup = g;
        this.tGrpObjectPoolAge = g.objectPoolAge;
        //if (g) g.add(fb);
    }
    suspend() {
        this.fSuspended = true;
        //this.cnt=0;
    }
    apply(obj, methodName, args) {
        if (!args)
            args = [];
        let method;
        if (typeof methodName == "string") {
            method = obj["fiber$" + methodName];
            if (!method) {
                throw new Error((0, R_1.default)("undefinedMethod", methodName));
            }
        }
        if (typeof methodName == "function") {
            const fmethod = methodName;
            method = fmethod.fiber;
            if (!method) {
                var n = fmethod.methodInfo ? fmethod.methodInfo.name : fmethod.name;
                throw new Error((0, R_1.default)("notAWaitableMethod", n));
            }
        }
        args = [this].concat(args);
        this.generator = method.apply(obj, args);
    }
    notifyEnd(r) {
        this.onEndHandlers.forEach(function (e) {
            e(r);
        });
        this.notifyTermination({ status: "success", value: r });
    }
    notifyTermination(tst) {
        this.onTerminateHandlers.forEach((e) => e(tst));
    }
    on(type, f) {
        if (type === "end" || type === "success")
            this.onEndHandlers.push(f);
        if (type === "terminate") {
            this.onTerminateHandlers.push(f);
            if (this.handleEx)
                delete this.handleEx;
        }
    }
    promise() {
        switch (this.termStatus) {
            case "success":
                return Promise.resolve(this.retVal);
            case "exception":
                return Promise.reject(this.lastEx);
            case "killed":
                return Promise.reject(new KilledError(this.termStatus));
            default:
        }
        return new Promise((succ, err) => {
            this.on("terminate", (st) => {
                if (st.status === "success") {
                    succ(st.value);
                }
                else if (st.status === "exception") {
                    err(st.exception);
                }
                else {
                    err(new KilledError(st.status));
                }
            });
        });
    }
    then(succ, err) {
        if (err)
            return this.promise().then(succ, err);
        else
            return this.promise().then(succ);
    }
    fail(err) {
        return this.promise().then(e => e, err);
    }
    waitEvent(obj, eventSpec) {
        const fb = this;
        fb._isWaiting = true;
        fb.suspend();
        if (typeof obj.on !== "function")
            return;
        let h = obj.on(...eventSpec, (...args) => {
            fb.lastEvent = args;
            fb.retVal = args[0];
            h.remove();
            fb._isWaiting = false;
            fb.stepsLoop();
        });
    }
    isWaiting() {
        return this._isWaiting;
    }
    waitFor(j) {
        var fb = this;
        fb._isWaiting = true;
        fb.suspend();
        let p = j;
        if (p instanceof TonyuThread)
            p = p.promise();
        return Promise.resolve(p).then(function (r) {
            fb.retVal = r;
            fb.lastEx = null;
            fb._isWaiting = false;
            fb.stepsLoop();
        }).then(e => e, function (e) {
            e = fb.wrapError(e);
            fb.lastEx = e;
            fb._isWaiting = false;
            fb.stepsLoop();
        });
    }
    wrapError(e) {
        if (e instanceof Error)
            return e;
        var re = new Error(e);
        re.original = e;
        return re;
    }
    resume(retVal) {
        this.retVal = retVal;
        this.steps();
    }
    steps() {
        const fb = this;
        if (fb.isWaiting()) {
            throw new Error("Illegal state: Cannot step while awaiting.");
        }
        if (fb.isDead())
            return;
        const sv = this.Tonyu.currentThread;
        this.Tonyu.currentThread = fb;
        const lim = performance.now() + fb.preemptionTime;
        fb.preempted = false;
        fb.fSuspended = false;
        let awaited = null;
        try {
            while (performance.now() < lim && !this.fSuspended) {
                const n = this.generator.next();
                if (n.done) {
                    this.termStatus = "success";
                    this.retVal = n.value;
                    this.notifyEnd(this.retVal);
                    break;
                }
                if (n.value) {
                    awaited = n.value;
                    break;
                }
            }
            fb.preempted = (!awaited) && (!this.fSuspended) && this.isAlive();
        }
        catch (e) {
            return this.exception(e);
        }
        finally {
            this.Tonyu.currentThread = sv;
            if (awaited) {
                //console.log("AWAIT!", awaited);
                return this.waitFor(awaited);
            }
        }
    }
    exception(e) {
        this.termStatus = "exception";
        this.lastEx = e;
        this.kill();
        if (this.handleEx)
            this.handleEx(e);
        else
            this.notifyTermination({ status: "exception", exception: e });
    }
    stepsLoop() {
        var fb = this;
        fb.steps();
        if (fb.preempted) {
            setTimeout(function () {
                fb.stepsLoop();
            }, 0);
        }
    }
    kill() {
        var fb = this;
        fb._isDead = true;
        if (!fb.termStatus) {
            fb.termStatus = "killed";
            fb.notifyTermination({ status: "killed" });
        }
    }
    *await(p) {
        this.lastEx = null;
        yield p;
        if (this.lastEx)
            throw this.lastEx;
        return this.retVal;
    }
}
exports.TonyuThread = TonyuThread;

},{"../lib/R":1}]},{},[7]);
