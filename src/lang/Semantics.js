"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = void 0;
exports.parse = parse;
exports.initClassDecls = initClassDecls;
const TonyuRuntime_1 = __importDefault(require("../runtime/TonyuRuntime"));
const R_1 = __importDefault(require("../lib/R"));
const TError_1 = __importDefault(require("../runtime/TError"));
const root_1 = __importDefault(require("../lib/root"));
const tonyu1_1 = require("./tonyu1");
const ObjectMatcher = require("./ObjectMatcher");
const OM = ObjectMatcher;
const parse_tonyu1_1 = __importDefault(require("./parse_tonyu1"));
const parse_tonyu2_1 = __importDefault(require("./parse_tonyu2"));
const assert_1 = __importDefault(require("../lib/assert"));
const cu = __importStar(require("./compiler"));
const Visitor_1 = require("./Visitor");
const context_1 = require("./context");
const parser_1 = require("./parser");
const NodeTypes_1 = require("./NodeTypes");
const CompilerTypes_1 = require("./CompilerTypes");
const compiler_1 = require("./compiler");
var ScopeTypes = cu.ScopeTypes;
//var genSt=cu.newScopeType;
var stype = cu.getScopeType;
var newScope = cu.newScope;
const SI = cu.ScopeInfos;
//var nc=cu.nullCheck;
var genSym = cu.genSym;
var annotation3 = cu.annotation;
var getMethod2 = cu.getMethod;
var getDependingClasses = cu.getDependingClasses;
var getParams = cu.getParams;
var JSNATIVES = { Array: ["a"], String: "a", Boolean: true, Number: 1, Object: {}, RegExp: /a/, Error: new Error("a"), Date: new Date(), Promise: Promise.resolve() };
function visitSub(node) {
    var t = this;
    if (!node || typeof node != "object")
        return;
    var es;
    if (node instanceof Array)
        es = node;
    else
        es = node[parser_1.SUBELEMENTS];
    if (!es) {
        es = [];
        for (var i in node) {
            es.push(node[i]);
        }
    }
    es.forEach((e) => t.visit(e));
}
function getSourceFile(klass) {
    return (0, assert_1.default)(klass.src && klass.src.tonyu, "File for " + klass.fullName + " not found.");
}
function parse(klass, options = {}) {
    const s = getSourceFile(klass); //.src.tonyu; //file object
    let node;
    if (klass.node && klass.nodeTimestamp == s.lastUpdate()) {
        node = klass.node;
    }
    if (!node) {
        //console.log("Parse "+s);
        if ((0, tonyu1_1.isTonyu1)(options)) {
            node = parse_tonyu1_1.default.parse(s);
        }
        else {
            node = parse_tonyu2_1.default.parse(s);
        }
        klass.nodeTimestamp = s.lastUpdate();
    }
    return node;
}
//-----------
function initClassDecls(klass, env) {
    // The main task of initClassDecls is resolve 'dependency', it calls before orderByInheritance
    var s = getSourceFile(klass); //file object
    klass.hasSemanticError = true;
    const srcFile = klass.src.tonyu; //file object  //S
    if (klass.src && klass.src.js) {
        // falsify on generateJS. if some class hasSemanticError, it remains true
        klass.jsNotUpToDate = true;
    }
    const node = parse(klass, env.options);
    var MAIN = { klass, name: "main", stmts: [], isMain: true, nowait: false }; //, klass:klass.fullName};
    // method := fiber | function
    const fields = {}, methods = { main: MAIN }, natives = {}, amds = {}, softRefClasses = {};
    klass.decls = { fields, methods, natives, amds, softRefClasses };
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，AMDモジュール変数
    //   extends/includes以外から参照してれるクラス の集まり．親クラスの宣言は含まない
    klass.node = node;
    function initMethods(program) {
        let spcn = env.options.compiler.defaultSuperClass;
        var pos = 0;
        var t = OM.match(program, { ext: { superclassName: { text: OM.N, pos: OM.P } } });
        if (t) {
            spcn = t.N;
            pos = t.P;
            if (spcn == "null")
                spcn = null;
        }
        klass.includes = [];
        t = OM.match(program, { incl: { includeClassNames: OM.C } });
        if (t) {
            t.C.forEach(function (i) {
                var n = i.text; /*ENVC*/
                var p = i.pos;
                var incc = env.classes[env.aliases[n] || n]; /*ENVC*/ //CFN env.classes[env.aliases[n]]
                if (!incc)
                    throw (0, TError_1.default)((0, R_1.default)("classIsUndefined", n), s, p);
                klass.includes.push(incc);
            });
        }
        if (spcn == "Array") {
            klass.superclass = { shortName: "Array", fullName: "Array", builtin: true };
        }
        else if (spcn) {
            var spc = env.classes[env.aliases[spcn] || spcn]; /*ENVC*/ //CFN env.classes[env.aliases[spcn]]
            if (!spc) {
                throw (0, TError_1.default)((0, R_1.default)("superClassIsUndefined", spcn), s, pos);
            }
            klass.superclass = spc;
        }
        else {
            delete klass.superclass;
        }
        klass.directives = {};
        //--
        function addField(name, node = undefined) {
            node = node || name;
            fields[name + ""] = {
                node: node,
                klass: klass.fullName,
                name: name + "",
                pos: node.pos
            };
        }
        const ctx = (0, context_1.context)();
        var fieldsCollector = new Visitor_1.Visitor({
            varDecl: function (node) {
                addField(node.name, node);
            },
            varsDecl(node) {
                if (ctx.inBlockScope && (0, compiler_1.isBlockScopeDeclprefix)(node.declPrefix))
                    return;
                for (let d of node.decls) {
                    fieldsCollector.visit(d);
                }
            },
            nativeDecl: function (node) {
            },
            funcDecl: function (node) {
            },
            nonArrowfuncExpr: function (node) {
            },
            arrowfuncExpr: function (node) {
            },
            "catch": function (node) {
            },
            exprstmt: function (node) {
                if (node.expr.type === "literal") {
                    if (node.expr.text.match(/^.field strict.$/)) {
                        klass.directives.field_strict = true;
                    }
                    if (node.expr.text.match(/^.external waitable.$/)) {
                        klass.directives.external_waitable = true;
                    }
                }
            },
            "for": function (node) {
                ctx.enter({ inBlockScope: true }, () => fieldsCollector.def(node));
            },
            compound(node) {
                ctx.enter({ inBlockScope: true }, () => fieldsCollector.def(node));
            },
            "forin": function (node) {
                var isVar = node.isVar;
                if ((0, compiler_1.isNonBlockScopeDeclprefix)(isVar)) {
                    node.vars.forEach((v) => {
                        addField(v);
                    });
                }
            }
        });
        fieldsCollector.def = visitSub;
        fieldsCollector.visit(program.stmts);
        //-- end of fieldsCollector
        program.stmts.forEach(function (stmt) {
            if (stmt.type == "funcDecl") {
                var head = stmt.head;
                var ftype = "function";
                if (head.ftype) {
                    ftype = head.ftype.text;
                    //console.log("head.ftype:",stmt);
                }
                var name = head.name.text;
                if (methods.hasOwnProperty(name))
                    throw (0, TError_1.default)((0, R_1.default)("MethodAlreadyDeclared", name), srcFile, stmt.pos);
                var propHead = (head.params ? "" : head.setter ? "__setter__" : "__getter__");
                name = propHead + name;
                methods[name] = {
                    klass,
                    nowait: (!!head.nowait || propHead !== ""),
                    ftype,
                    name,
                    //klass: klass.fullName,
                    head,
                    //pos: head.pos,
                    stmts: stmt.body.stmts,
                    node: stmt
                };
            }
            else if (stmt.type == "nativeDecl") {
                natives[stmt.name.text] = stmt;
            }
            else {
                MAIN.stmts.push(stmt);
            }
        });
    }
    initMethods(node); // node=program
    //delete klass.hasSemanticError;
    // Why delete deleted? because decls.methods.params is still undef
} // of initClassDecls
function annotateSource2(klass, env) {
    // annotateSource2 is call after orderByInheritance
    klass.hasSemanticError = true;
    const srcFile = klass.src.tonyu; //file object  //S
    var srcCont = srcFile.text();
    function getSource(node) {
        return cu.getSource(srcCont, node);
    }
    //var traceTbl=env.traceTbl;
    // method := fiber | function
    const decls = klass.decls;
    const methods = decls.methods;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，モジュール変数の集まり．親クラスの宣言は含まない
    var ST = ScopeTypes;
    var topLevelScope = {};
    // ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
    //  キー： 変数名   値： ScopeTypesのいずれか
    const ctx = (0, context_1.context)();
    const debug = false;
    const othersMethodCallTmpl = {
        type: "postfix",
        left: {
            type: "postfix",
            left: OM.T,
            op: { type: "member", name: { text: OM.N } }
        },
        op: { type: "call", args: OM.A }
    };
    const memberAccessTmpl = {
        type: "postfix",
        left: OM.T,
        op: { type: "member", name: { text: OM.N } }
    };
    // These has same value but different purposes:
    //  myMethodCallTmpl: avoid using bounded field for normal method(); call
    //  fiberCallTmpl: detect fiber call
    const myMethodCallTmpl = {
        type: "postfix",
        left: { type: "varAccess", name: { text: OM.N } },
        op: { type: "call", args: OM.A }
    };
    const fiberCallTmpl = myMethodCallTmpl;
    const noRetFiberCallTmpl = {
        expr: fiberCallTmpl
    };
    const retFiberCallTmpl = {
        expr: {
            type: "infix",
            op: OM.O,
            left: OM.L,
            right: fiberCallTmpl
        }
    };
    const otherFiberCallTmpl = {
        type: "postfix",
        left: OM.T({
            type: "postfix",
            left: OM.O,
            op: { type: "member", name: { text: OM.N } }
        }),
        op: { type: "call", args: OM.A }
    };
    /*
    const noRetOtherFiberCallTmpl={
        expr: otherFiberCallTmpl
    };
    const retOtherFiberCallTmpl={
        expr: {
            type: "infix",
            op: OM.P,
            left: OM.L,
            right: otherFiberCallTmpl
        }
    };*/
    function external_waitable_enabled() {
        return env.options.compiler.external_waitable || klass.directives.external_waitable;
    }
    const noRetSuperFiberCallTmpl = {
        expr: OM.S({ type: "superExpr", params: { args: OM.A } })
    };
    const retSuperFiberCallTmpl = {
        expr: {
            type: "infix",
            op: OM.O,
            left: OM.L,
            right: OM.S({ type: "superExpr", params: { args: OM.A } })
        }
    };
    klass.annotation = {};
    function annotation(node, aobj = undefined) {
        return annotation3(klass.annotation, node, aobj);
    }
    function initTopLevelScope2(klass) {
        if (klass.builtin)
            return;
        var s = topLevelScope;
        var decls = klass.decls;
        if (!decls) {
            console.log("DECLNUL", klass);
        }
        for (let i in decls.fields) {
            const info = decls.fields[i];
            s[i] = new SI.FIELD(klass, i, info);
            if (info.node) {
                annotation(info.node, { /*fieldInfo: info,*/ scopeInfo: s[i] });
            }
        }
        for (let i in decls.methods) {
            const info = decls.methods[i];
            var r = TonyuRuntime_1.default.klass.propReg.exec(i);
            if (r) {
                const name = r[2];
                let p;
                if (s[name] && s[name].type === ScopeTypes.PROP) {
                    p = s[name];
                }
                else {
                    p = new SI.PROP(klass.fullName, name);
                    s[name] = p;
                }
                if (r[1] === "get") {
                    p.getter = info;
                }
                else if (r[1] === "set") {
                    p.setter = info;
                }
                else {
                    throw new Error(`${r[1]} is neither get or set: ${name}`);
                }
            }
            else {
                s[i] = new SI.METHOD(klass.fullName, i, info);
            }
            if (info.node) {
                annotation(info.node, { funcInfo: info });
            }
        }
    }
    function initTopLevelScope() {
        var s = topLevelScope;
        getDependingClasses(klass).forEach(initTopLevelScope2);
        var decls = klass.decls; // Do not inherit parents' natives
        if (!(0, tonyu1_1.isTonyu1)(env.options)) {
            for (let i in JSNATIVES) {
                s[i] = new SI.NATIVE("native::" + i, { class: root_1.default[i], sampleValue: JSNATIVES[i] });
            }
        }
        for (let i in env.aliases) { /*ENVC*/ //CFN  env.classes->env.aliases
            var fullName = env.aliases[i];
            s[i] = new SI.CLASS(i, fullName, env.classes[fullName]);
        }
        for (let i in decls.natives) {
            s[i] = new SI.NATIVE("native::" + i, { class: root_1.default[i] });
        }
    }
    function inheritSuperMethod() {
        var d = getDependingClasses(klass);
        for (var n in klass.decls.methods) {
            var m2 = klass.decls.methods[n];
            for (let k of d) {
                var m = k.decls.methods[n];
                if (m && m.nowait) {
                    m2.nowait = true;
                }
            }
        }
    }
    function getMethod(name) {
        return getMethod2(klass, name);
    }
    function getSuperMethod(name) {
        for (let c of getDependingClasses(klass)) {
            if (c === klass)
                continue;
            const r = getMethod2(c, name);
            if (r)
                return r;
        }
        //return getMethod2(klass,name);
    }
    function isFiberMethod(name) {
        return stype(ctx.scope[name]) == ST.METHOD &&
            !getMethod(name).nowait;
    }
    function checkLVal(node) {
        if ((0, NodeTypes_1.isVarAccess)(node) ||
            (0, NodeTypes_1.isPostfix)(node) && (node.op.type == "member" || node.op.type == "arrayElem")) {
            if (node.type == "varAccess") {
                annotation(node, { noBind: true });
            }
            return true;
        }
        //console.log("LVal",node);
        throw (0, TError_1.default)((0, R_1.default)("invalidLeftValue", getSource(node)), srcFile, node.pos);
    }
    function prohibitGlobalNameOnBlockScopeDecl(v) {
        var isg = v.text.match(/^\$/);
        if (isg)
            throw (0, TError_1.default)((0, R_1.default)("CannotUseGlobalVariableInLetOrConst"), srcFile, v.pos);
    }
    function getScopeInfo(node) {
        const n = node + "";
        const si = ctx.scope[n];
        const t = stype(si);
        if (!t) {
            /*if (env.amdPaths && env.amdPaths[n]) {
                //t=ST.MODULE;
                klass.decls.amds[n]=env.amdPaths[n];
                topLevelScope[n]=new SI.MODULE(n);
                //console.log(n,"is module");
            } else {*/
            var isg = n.match(/^\$/);
            if (env.options.compiler.field_strict || klass.directives.field_strict) {
                if (!isg)
                    throw (0, TError_1.default)((0, R_1.default)("fieldDeclarationRequired", n), srcFile, node.pos);
            }
            if (isg) {
                topLevelScope[n] = new SI.GLOBAL(n);
            }
            else {
                //opt.klass=klass.name;
                const fi = {
                    klass,
                    name: n
                };
                if (!klass.decls.fields[n]) {
                    klass.decls.fields[n] = fi;
                }
                else {
                    Object.assign(klass.decls.fields[n], fi); //si;
                }
                //console.log("Implicit field declaration:", n, klass.decls.fields[n]);
                topLevelScope[n] = new SI.FIELD(klass, n, klass.decls.fields[n]);
            }
            //}
            return topLevelScope[n];
            //var opt:any={name:n};
            /*if (t==ST.FIELD) {
                opt.klass=klass.name;
                klass.decls.fields[n]=klass.decls.fields[n]||{};
                Object.assign(klass.decls.fields[n],{
                    klass:klass.fullName,
                    name:n
                });//si;
            }*/
            //topLevelScope[n]=si;//genSt(t,opt);
        }
        if (t == ST.CLASS) {
            klass.decls.softRefClasses[n] = si;
        }
        return si;
    }
    // locals are only var, not let or const. see collectBlockScopedVardecl
    var localsCollector = new Visitor_1.Visitor({
        varDecl: function (node) {
            if (ctx.isMain) {
                annotation(node, { varInMain: true });
                annotation(node, { declaringClass: klass });
                //console.log("var in main",node.name.text);
            }
            else {
                //if (node.name.text==="nonvar") throw new Error("WHY1!!!");
                ctx.locals.varDecls[node.name.text] = node;
                //console.log("DeclaringFunc of ",node.name.text,ctx.finfo);
                annotation(node, { declaringFunc: ctx.finfo });
            }
        },
        varsDecl(node) {
            if ((0, compiler_1.isBlockScopeDeclprefix)(node.declPrefix))
                return;
            for (let d of node.decls) {
                localsCollector.visit(d);
            }
        },
        funcDecl: function (node) {
            ctx.locals.subFuncDecls[node.head.name.text] = node;
            //initParamsLocals(node);??
        },
        nonArrowfuncExpr: function (node) {
            //initParamsLocals(node);??
        },
        arroFuncExpr: function (node) {
            //initParamsLocals(node);??
        },
        "catch": function (node) {
            ctx.locals.varDecls[node.name.text] = node;
        },
        exprstmt: function (node) {
        },
        "forin": function (node) {
            var isVar = node.isVar;
            node.vars.forEach(function (v) {
                if ((0, compiler_1.isNonBlockScopeDeclprefix)(isVar)) {
                    if (ctx.isMain) {
                        annotation(v, { varInMain: true });
                        annotation(v, { declaringClass: klass });
                    }
                    else {
                        //if (v.text==="nonvar") throw new Error("WHY2!!!");
                        ctx.locals.varDecls[v.text] = v; //node??;
                        annotation(v, { declaringFunc: ctx.finfo });
                    }
                }
            });
            /*var n=`_it_${Object.keys(ctx.locals.varDecls).length}`;//genSym("_it_");
            annotation(node, {iterName:n});
            ctx.locals.varDecls[n]=node;// ??*/
        }
    });
    localsCollector.def = visitSub; //S
    function collectLocals(node) {
        var locals = { varDecls: {}, subFuncDecls: {} };
        ctx.enter({ locals }, function () {
            localsCollector.visit(node);
        });
        return locals;
    }
    function annotateParents(path, data) {
        path.forEach(function (n) {
            annotation(n, data);
        });
    }
    /*function fiberCallRequired(path: TNode[]) {//S
        if (ctx.method) ctx.method.fiberCallRequired=true;
        annotateParents(path, {fiberCallRequired:true} );
    }*/
    var varAccessesAnnotator = new Visitor_1.Visitor({
        varAccess: function (node) {
            var si = getScopeInfo(node.name);
            annotation(node, { scopeInfo: si });
        },
        funcDecl: function (node) {
        },
        nonArrowFuncExpr: function (node) {
            annotateNonArrowSubFuncExpr(node);
        },
        arrowFuncExpr: function (node) {
            annotateArrowFuncExpr(node);
        },
        objlit: function (node) {
            var t = this;
            var dup = {};
            node.elems.forEach(function (e) {
                const kn = (e.key.type == "literal") ?
                    e.key.text.substring(1, e.key.text.length - 1) :
                    e.key.text;
                if (dup.hasOwnProperty(kn)) {
                    throw (0, TError_1.default)((0, R_1.default)("duplicateKeyInObjectLiteral", kn), srcFile, e.pos);
                }
                dup[kn] = 1;
                //console.log("objlit",e.key.text);
                t.visit(e);
            });
        },
        jsonElem: function (node) {
            if (node.value) {
                this.visit(node.value);
            }
            else {
                if (node.key.type == "literal") {
                    throw (0, TError_1.default)((0, R_1.default)("cannotUseStringLiteralAsAShorthandOfObjectValue"), srcFile, node.pos);
                }
                var si = getScopeInfo(node.key);
                annotation(node, { scopeInfo: si });
            }
        },
        "do": function (node) {
            var t = this;
            ctx.enter({ brkable: true, contable: true }, function () {
                t.def(node);
            });
        },
        "switch": function (node) {
            var t = this;
            if (node.isToken)
                return;
            ctx.enter({ inBlockScope: true }, () => {
                const ns = newScope(ctx.scope);
                let stmts = [];
                //console.log("node.cases",node);
                for (let c of node.cases) {
                    stmts = [...stmts, ...c.stmts];
                }
                if (node.defs) {
                    stmts = [...stmts, ...node.defs.stmts];
                }
                collectBlockScopedVardecl(stmts, ns);
                ctx.enter({ scope: ns, brkable: true }, function () {
                    t.def(node);
                });
            });
        },
        "while": function (node) {
            var t = this;
            ctx.enter({ brkable: true, contable: true }, function () {
                t.def(node);
            });
            //fiberCallRequired(this.path);//option
        },
        "for": function (node) {
            var t = this;
            if (node.isToken)
                return;
            ctx.enter({ inBlockScope: true }, () => {
                const ns = newScope(ctx.scope);
                if (node.inFor.type === "normalFor") {
                    collectBlockScopedVardecl([node.inFor.init], ns);
                }
                else {
                    if ((0, compiler_1.isBlockScopeDeclprefix)(node.inFor.isVar)) {
                        for (let v of node.inFor.vars) {
                            //prohibitNonBlockScopeDeclConflict(ctx.finfo, v)
                            prohibitGlobalNameOnBlockScopeDecl(v);
                            ns[v.text] = new SI.LOCAL(ctx.finfo, true);
                        }
                    }
                }
                ctx.enter({ scope: ns, brkable: true, contable: true }, function () {
                    t.def(node);
                });
            });
        },
        "forin": function (node) {
            node.vars.forEach(function (v) {
                var si = getScopeInfo(v);
                annotation(v, { scopeInfo: si });
            });
            this.visit(node.set);
        },
        compound(node) {
            ctx.enter({ inBlockScope: true }, () => {
                const ns = newScope(ctx.scope);
                collectBlockScopedVardecl(node.stmts, ns);
                ctx.enter({ scope: ns }, () => {
                    for (let stmt of node.stmts)
                        this.visit(stmt);
                });
            });
        },
        ifWait: function (node) {
            var TH = "_thread";
            var t = this;
            var ns = newScope(ctx.scope);
            ns[TH] = new SI.THVAR(); //genSt(ST.THVAR);
            ctx.enter({ scope: ns }, function () {
                t.visit(node.then);
            });
            if (node._else) {
                t.visit(node._else);
            }
            //fiberCallRequired(this.path);
        },
        "try": function (node) {
            //ctx.finfo.useTry=true;
            this.def(node);
        },
        "return": function (node) {
            var t;
            if (!ctx.noWait) {
                if (node.value && (t = OM.match(node.value, fiberCallTmpl)) &&
                    isFiberMethod(t.N)) {
                    annotation(node.value, { fiberCall: t });
                    //fiberCallRequired(this.path);
                }
                //annotateParents(this.path,{hasReturn:true});
            }
            this.visit(node.value);
        },
        "break": function (node) {
            if (!ctx.brkable)
                throw (0, TError_1.default)((0, R_1.default)("breakShouldBeUsedInIterationOrSwitchStatement"), srcFile, node.pos);
            if (!ctx.noWait)
                annotateParents(this.path, { hasJump: true });
        },
        "continue": function (node) {
            if (!ctx.contable)
                throw (0, TError_1.default)((0, R_1.default)("continueShouldBeUsedInIterationStatement"), srcFile, node.pos);
            if (!ctx.noWait)
                annotateParents(this.path, { hasJump: true });
        },
        "reservedConst": function (node) {
            if (node.text == "arguments") {
                ctx.finfo.useArgs = true;
            }
        },
        postfix: function (node) {
            var t;
            function match(node, tmpl) {
                t = OM.match(node, tmpl);
                return t;
            }
            this.visit(node.left);
            this.visit(node.op);
            if (match(node, myMethodCallTmpl)) {
                const si = annotation(node.left).scopeInfo;
                annotation(node, { myMethodCall: { name: t.N, args: t.A, scopeInfo: si } });
            }
            else if (match(node, othersMethodCallTmpl)) {
                annotation(node, { othersMethodCall: { target: t.T, name: t.N, args: t.A } });
            }
            else if (match(node, memberAccessTmpl)) {
                annotation(node, { memberAccess: { target: t.T, name: t.N } });
            }
        },
        infix: function (node) {
            var opn = node.op.text;
            if (opn == "=" || opn == "+=" || opn == "-=" || opn == "*=" || opn == "/=" || opn == "%=") {
                checkLVal(node.left);
            }
            this.def(node);
        },
        exprstmt: function (node) {
            var t, m;
            if (node.expr.type === "objlit") {
                throw (0, TError_1.default)((0, R_1.default)("cannotUseObjectLiteralAsTheExpressionOfStatement"), srcFile, node.pos);
            }
            const path = this.path.slice();
            /*if (klass.fullName==="user.Main") {
                console.dir(node,{depth:null});
            }*/
            if (!ctx.noWait &&
                (t = OM.match(node, noRetFiberCallTmpl)) &&
                isFiberMethod(t.N)) {
                t.type = "noRet";
                annotation(node, { fiberCall: t });
                //fiberCallRequired(this.path);
            }
            else if (!ctx.noWait &&
                (t = OM.match(node, retFiberCallTmpl)) &&
                isFiberMethod(t.N)) {
                t.type = "ret";
                annotation(node, { fiberCall: t });
                //fiberCallRequired(this.path);
                /*} else if (!ctx.noWait && external_waitable_enabled() &&
                        (t=OM.match(node,noRetOtherFiberCallTmpl))) {
                    //console.log("noRetOtherFiberCallTmpl", t);
                    t.type="noRetOther";
                    //t.fiberCallRequired_lazy=()=>fiberCallRequired(path);
                    annotation(node, {otherFiberCall:t});
                } else if (!ctx.noWait && external_waitable_enabled() &&
                        (t=OM.match(node,retOtherFiberCallTmpl))) {
                    t.type="retOther";
                    //t.fiberCallRequired_lazy=()=>fiberCallRequired(path);
                    annotation(node, {otherFiberCall:t});*/
            }
            else if (!ctx.noWait &&
                (t = OM.match(node, noRetSuperFiberCallTmpl)) &&
                t.S.name) {
                const m = getSuperMethod(t.S.name.text);
                if (!m) {
                    throw (0, TError_1.default)((0, R_1.default)("undefinedSuperMethod", t.S.name.text), srcFile, node.pos);
                    //throw new Error(R("undefinedSuperMethod",t.S.name.text));
                }
                if (!m.nowait) {
                    t.type = "noRetSuper";
                    t.superclass = klass.superclass;
                    annotation(node, { fiberCall: t });
                    //fiberCallRequired(this.path);
                }
            }
            else if (!ctx.noWait &&
                (t = OM.match(node, retSuperFiberCallTmpl)) &&
                t.S.name) {
                if (!klass.superclass) {
                    throw new Error((0, R_1.default)("Class {1} has no superclass", klass.shortName));
                }
                m = getSuperMethod(t.S.name.text);
                if (!m) {
                    throw (0, TError_1.default)((0, R_1.default)("undefinedSuperMethod", t.S.name.text), srcFile, node.pos);
                    //throw new Error(R("undefinedSuperMethod",t.S.name.text));
                }
                if (!m.nowait) {
                    t.type = "retSuper";
                    t.superclass = klass.superclass;
                    annotation(node, { fiberCall: t });
                    //fiberCallRequired(this.path);
                }
            }
            this.visit(node.expr);
        },
        varDecl: function (node) {
            let t;
            const path = this.path.slice();
            if (!ctx.noWait &&
                (t = OM.match(node.value, fiberCallTmpl)) &&
                isFiberMethod(t.N)) {
                t.type = "varDecl";
                annotation(node, { fiberCall: t });
                //fiberCallRequired(this.path);
            }
            if (!ctx.noWait && external_waitable_enabled() &&
                (t = OM.match(node.value, otherFiberCallTmpl))) {
                t.type = "varDecl";
                //t.fiberCallRequired_lazy=()=>fiberCallRequired(path);
                annotation(node, { otherFiberCall: t });
            }
            this.visit(node.value);
            this.visit(node.typeDecl);
        },
        namedTypeExpr: function (node) {
            resolveNamedType(node);
        },
        arrayTypeExpr(node) {
            //console.log("ARRATYTPEEXPR",node);
            resolveArrayType(node);
        },
        unionTypeExpr(node) {
            resolveUnionType(node);
        }
    });
    varAccessesAnnotator.def = visitSub; //S
    function resolveType(node) {
        if ((0, NodeTypes_1.isNamedTypeExpr)(node))
            return resolveNamedType(node);
        else if ((0, NodeTypes_1.isArrayTypeExpr)(node))
            return resolveArrayType(node);
        else if ((0, NodeTypes_1.isUnionTypeExpr)(node))
            return resolveUnionType(node);
    }
    function resolveUnionType(node) {
        let left = resolveType(node.left);
        let right = resolveType(node.right);
        let candidates;
        if ((0, CompilerTypes_1.isUnionType)(left) && (0, CompilerTypes_1.isUnionType)(right)) {
            candidates = [...left.candidates, ...right.candidates];
        }
        else if ((0, CompilerTypes_1.isUnionType)(left)) {
            candidates = [...left.candidates, right];
        }
        else if ((0, CompilerTypes_1.isUnionType)(right)) {
            candidates = [left, ...right.candidates];
        }
        else {
            candidates = [left, right];
        }
        const resolvedType = { candidates };
        annotation(node, { resolvedType });
        return resolvedType;
    }
    function resolveArrayType(node) {
        const et = resolveType(node.element);
        //console.log("ET",et);
        const rt = { element: et };
        if (rt)
            annotation(node, { resolvedType: rt });
        return rt;
    }
    function resolveNamedType(node) {
        const si = getScopeInfo(node.name);
        const resolvedType = (si instanceof SI.NATIVE) ? si.value :
            (si instanceof SI.CLASS) ? si.info : undefined;
        if (resolvedType) {
            annotation(node, { resolvedType });
        }
        else if (env.options.compiler.typeCheck) {
            console.log("typeNotFound: topLevelScope", topLevelScope, si, env.classes);
            throw (0, TError_1.default)((0, R_1.default)("typeNotFound", node.name), srcFile, node.pos);
        }
        return resolvedType;
    }
    function annotateVarAccesses(node, scope) {
        //const ns=newScope(scope);
        /* ^ this occurs this:
        \f() {
            let x=5;
            \sub() {
                console.log(x);//10??
            }
            sub();
        } x=10;f();
        */
        collectBlockScopedVardecl(node, scope);
        ctx.enter({ scope }, function () {
            varAccessesAnnotator.visit(node);
        });
    }
    function copyLocals(finfo, scope) {
        const locals = finfo.locals;
        for (var i in locals.varDecls) {
            //console.log("LocalVar ",i,"declared by ",finfo);
            var si = new SI.LOCAL(finfo, false);
            scope[i] = si;
            annotation(locals.varDecls[i], { scopeInfo: si });
        }
        for (let i in locals.subFuncDecls) {
            const si = new SI.LOCAL(finfo, false);
            scope[i] = si;
            annotation(locals.subFuncDecls[i], { scopeInfo: si });
        }
    }
    function resolveTypesOfParams(params) {
        return params.map((param, i) => {
            if (param.typeDecl) {
                //console.log("restype",param);
                return resolveType(param.typeDecl.vtype);
            }
            return null;
        });
    }
    function initParamsLocals(f) {
        //console.log("IS_MAIN", f, f.name, f.isMain);
        ctx.enter({ isMain: f.isMain, finfo: f }, function () {
            if ((0, CompilerTypes_1.isNonArrowFuncInfo)(f)) {
                f.locals = collectLocals(f.stmts);
            }
            f.params = getParams(f);
        });
        //if (!f.params) throw new Error("f.params is not inited");
        f.paramTypes = resolveTypesOfParams(f.params);
        //console.log("F_PARAMTYPES", f.name, f.paramTypes);
    }
    function declaredAsNonBlockScope(finfo, name) {
        if (finfo.params.some(p => p.name.text === name.text))
            return true;
        if ((0, CompilerTypes_1.isNonArrowFuncInfo)(finfo)) {
            if (finfo.locals && finfo.locals.varDecls[name.text])
                return true;
        }
        return false;
    }
    function prohibitNonBlockScopeDeclConflict(finfo, name) {
        const ism = ctx.finfo.isMain;
        if (!ism && declaredAsNonBlockScope(ctx.finfo, name)) {
            throw (0, TError_1.default)((0, R_1.default)("blockScopedVarDeclConflict", name.text), srcFile, name.pos);
        }
    }
    function collectBlockScopedVardecl(stmts, scope) {
        const dupcheck = new Set();
        for (let stmt of stmts) {
            if (stmt.type === "varsDecl" && (0, compiler_1.isBlockScopeDeclprefix)(stmt.declPrefix)) {
                const ism = ctx.finfo.isMain;
                //console.log("blockscope",ctx,ism);
                if (ism && !ctx.inBlockScope)
                    annotation(stmt, { varInMain: true });
                for (const d of stmt.decls) {
                    prohibitNonBlockScopeDeclConflict(ctx.finfo, d.name);
                    prohibitGlobalNameOnBlockScopeDecl(d.name);
                    if (ism && !ctx.inBlockScope) {
                        annotation(d, { varInMain: true });
                        annotation(d, { declaringClass: klass });
                    }
                    else {
                        const si = new SI.LOCAL(ctx.finfo, true);
                        if (dupcheck.has(d.name.text)) {
                            throw (0, TError_1.default)((0, R_1.default)("duplicateVarDecl", d.name.text), srcFile, d.pos);
                        }
                        dupcheck.add(d.name.text);
                        scope[d.name.text] = si;
                        annotation(d, { declaringFunc: ctx.finfo, scopeInfo: si });
                    }
                }
            }
        }
    }
    function annotateArrowFuncExpr(node) {
        var m, ps;
        m = OM.match(node, { params: { params: OM.P } });
        if (m) {
            ps = m.P;
        }
        else {
            ps = [];
        }
        //console.log("Arrow params ",ps, node);
        const finfo = { klass, retVal: node.retVal, nowait: true };
        var ns = newScope(ctx.scope);
        //var locals;
        ctx.enter({ finfo }, function () {
            ps.forEach(function (p) {
                var si = new SI.PARAM(finfo);
                annotation(p, { scopeInfo: si });
                ns[p.name.text] = si;
            });
            ctx.enter({ scope: ns }, () => varAccessesAnnotator.visit(node.retVal));
        });
        finfo.scope = ns;
        finfo.params = ps;
        finfo.paramTypes = resolveTypesOfParams(finfo.params);
        annotation(node, { funcInfo: finfo });
        return finfo;
    }
    function annotateNonArrowSubFuncExpr(node) {
        var m, ps;
        /*if (isArrowFuncExpr(node)) {
            return annotateArrowFuncExpr(node);
        }*/
        const body = node.body;
        var name = (node.head.name ? node.head.name.text : "anonymous_" + node.pos);
        m = OM.match(node, { head: { params: { params: OM.P } } });
        if (m) {
            ps = m.P;
        }
        else {
            ps = [];
        }
        var finfo = { klass, name, stmts: body.stmts, nowait: true };
        var ns = newScope(ctx.scope);
        //var locals;
        ctx.enter({ finfo }, function () {
            ps.forEach(function (p) {
                var si = new SI.PARAM(finfo);
                annotation(p, { scopeInfo: si });
                ns[p.name.text] = si;
            });
            finfo.locals = collectLocals(body);
            copyLocals(finfo, ns);
            annotateVarAccesses(body.stmts, ns);
        });
        finfo.scope = ns;
        //finfo.name=name;
        finfo.params = ps;
        //var res={scope:ns, locals:finfo.locals, name:name, params:ps};
        finfo.paramTypes = resolveTypesOfParams(finfo.params);
        //annotation(node,res);
        annotation(node, { funcInfo: finfo });
        annotateNonArrowSubFuncExprs(finfo.locals, ns);
        return finfo;
    }
    function annotateNonArrowSubFuncExprs(locals, scope) {
        ctx.enter({ scope }, function () {
            for (var n in locals.subFuncDecls) {
                annotateNonArrowSubFuncExpr(locals.subFuncDecls[n]);
            }
        });
    }
    function annotateMethodFiber(f) {
        var ns = newScope(ctx.scope);
        f.params.forEach((p, i) => {
            var si = new SI.PARAM(f);
            ns[p.name.text] = si;
            annotation(p, { scopeInfo: si, declaringFunc: f });
        });
        if (f.head && f.head.rtype) {
            const rt = resolveType(f.head.rtype.vtype);
            f.returnType = rt;
            //console.log("Annotated return type ", f, rt);
            //throw new Error("!");
        }
        copyLocals(f, ns);
        ctx.enter({ method: f, finfo: f, noWait: false }, function () {
            annotateVarAccesses(f.stmts, ns);
        });
        f.scope = ns;
        annotateNonArrowSubFuncExprs(f.locals, ns);
        return ns;
    }
    function annotateSource() {
        ctx.enter({ scope: topLevelScope }, function () {
            for (var name in methods) {
                if (debug)
                    console.log("anon method1", name);
                var method = methods[name];
                initParamsLocals(method); //MAINVAR
                annotateMethodFiber(method);
            }
        });
        (0, compiler_1.packAnnotation)(klass.annotation);
    }
    initTopLevelScope(); //S
    inheritSuperMethod(); //S
    annotateSource();
    delete klass.hasSemanticError;
} //B  end of annotateSource2
exports.annotate = annotateSource2;
