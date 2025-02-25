"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrefix = isPrefix;
exports.isPostfix = isPostfix;
exports.isInfix = isInfix;
exports.isTrifix = isTrifix;
exports.isArrayElem = isArrayElem;
exports.isArgList = isArgList;
exports.isMember = isMember;
exports.isParenExpr = isParenExpr;
exports.isVarAccess = isVarAccess;
exports.isFuncExprArg = isFuncExprArg;
exports.isObjlitArg = isObjlitArg;
exports.isCall = isCall;
exports.isScall = isScall;
exports.isNewExpr = isNewExpr;
exports.isSuperExpr = isSuperExpr;
exports.isExprstmt = isExprstmt;
exports.isCompound = isCompound;
exports.isReturn = isReturn;
exports.isIf = isIf;
exports.isForin = isForin;
exports.isNormalFor = isNormalFor;
exports.isFor = isFor;
exports.isWhile = isWhile;
exports.isDo = isDo;
exports.isCase = isCase;
exports.isDefault = isDefault;
exports.isSwitch = isSwitch;
exports.isBreak = isBreak;
exports.isContinue = isContinue;
exports.isFinally = isFinally;
exports.isCatch = isCatch;
exports.isTry = isTry;
exports.isThrow = isThrow;
exports.isArrayTypeExpr = isArrayTypeExpr;
exports.isNamedTypeExpr = isNamedTypeExpr;
exports.isUnionTypeExpr = isUnionTypeExpr;
exports.isTypeDecl = isTypeDecl;
exports.isVarDecl = isVarDecl;
exports.isVarsDecl = isVarsDecl;
exports.isParamDecl = isParamDecl;
exports.isParamDecls = isParamDecls;
exports.isSetterDecl = isSetterDecl;
exports.isFuncDeclHead = isFuncDeclHead;
exports.isFuncDecl = isFuncDecl;
exports.isNativeDecl = isNativeDecl;
exports.isIfWait = isIfWait;
exports.isEmpty = isEmpty;
exports.isFuncExprHead = isFuncExprHead;
exports.isFuncExprOrDecl = isFuncExprOrDecl;
exports.isNonArrowFuncExpr = isNonArrowFuncExpr;
exports.isArrowFuncExpr = isArrowFuncExpr;
exports.isFuncExpr = isFuncExpr;
exports.isJsonElem = isJsonElem;
exports.isObjlit = isObjlit;
exports.isArylit = isArylit;
exports.isExtends = isExtends;
exports.isIncludes = isIncludes;
exports.isProgram = isProgram;
exports.isBackquoteText = isBackquoteText;
exports.isBackquoteLiteral = isBackquoteLiteral;
function isPrefix(n) {
    return n.type == "prefix";
}
function isPostfix(n) {
    return n.type == "postfix";
}
function isInfix(n) {
    return n.type == "infix";
}
function isTrifix(n) {
    return n.type == "trifix";
}
function isArrayElem(n) {
    return n && n.type === "arrayElem";
}
function isArgList(n) {
    return n && n.type === "argList";
}
function isMember(n) {
    return n && n.type === "member";
}
function isParenExpr(n) {
    return n && n.type === "parenExpr";
}
function isVarAccess(n) {
    return n && n.type === "varAccess";
}
function isFuncExprArg(n) {
    return n && n.type === "funcExprArg";
}
function isObjlitArg(n) {
    return n && n.type === "objlitArg";
}
function isCall(n) {
    return n && n.type === "call";
}
function isScall(n) {
    return n && n.type === "scall";
}
function isNewExpr(n) {
    return n && n.type === "newExpr";
}
function isSuperExpr(n) {
    return n && n.type === "superExpr";
}
function isExprstmt(n) {
    return n && n.type === "exprstmt";
}
function isCompound(n) {
    return n && n.type === "compound";
}
function isReturn(n) {
    return n && n.type === "return";
}
function isIf(n) {
    return n && n.type === "if";
}
function isForin(n) {
    return n && n.type === "forin";
}
function isNormalFor(n) {
    return n && n.type === "normalFor";
}
function isFor(n) {
    return n && n.type === "for";
}
function isWhile(n) {
    return n && n.type === "while";
}
function isDo(n) {
    return n && n.type === "do";
}
function isCase(n) {
    return n && n.type === "case";
}
function isDefault(n) {
    return n && n.type === "default";
}
function isSwitch(n) {
    return n && n.type === "switch";
}
function isBreak(n) {
    return n && n.type === "break";
}
function isContinue(n) {
    return n && n.type === "continue";
}
function isFinally(n) {
    return n && n.type === "finally";
}
function isCatch(n) {
    return n && n.type === "catch";
}
function isTry(n) {
    return n && n.type === "try";
}
function isThrow(n) {
    return n && n.type === "throw";
}
function isArrayTypeExpr(n) {
    return n && n.type === "arrayTypeExpr";
}
function isNamedTypeExpr(n) {
    return n && n.type === "namedTypeExpr";
}
function isUnionTypeExpr(n) {
    return n && n.type === "unionTypeExpr";
}
function isTypeDecl(n) {
    return n && n.type === "typeDecl";
}
function isVarDecl(n) {
    return n && n.type === "varDecl";
}
function isVarsDecl(n) {
    return n && n.type === "varsDecl";
}
function isParamDecl(n) {
    return n && n.type === "paramDecl";
}
function isParamDecls(n) {
    return n && n.type === "paramDecls";
}
function isSetterDecl(n) {
    return n && n.type === "setterDecl";
}
function isFuncDeclHead(n) {
    return n && n.type === "funcDeclHead";
}
function isFuncDecl(n) {
    return n && n.type === "funcDecl";
}
function isNativeDecl(n) {
    return n && n.type === "nativeDecl";
}
function isIfWait(n) {
    return n && n.type === "ifWait";
}
function isEmpty(n) {
    return n && n.type === "empty";
}
function isFuncExprHead(n) {
    return n && n.type === "funcExprHead";
}
function isFuncExprOrDecl(n) {
    return isFuncExpr(n) || isFuncDecl(n);
}
function isNonArrowFuncExpr(n) {
    return n && (n.type === "nonArrowFuncExpr");
}
function isArrowFuncExpr(n) {
    return n && (n.type === "arrowFuncExpr");
}
function isFuncExpr(n) {
    return isNonArrowFuncExpr(n) || isArrowFuncExpr(n);
}
function isJsonElem(n) {
    return n && n.type === "jsonElem";
}
function isObjlit(n) {
    return n && n.type === "objlit";
}
function isArylit(n) {
    return n && n.type === "arylit";
}
function isExtends(n) {
    return n && n.type === "extends";
}
function isIncludes(n) {
    return n && n.type === "includes";
}
function isProgram(n) {
    return n && n.type === "program";
}
function isBackquoteText(n) {
    return n && n.type === "backquoteText";
}
;
function isBackquoteLiteral(n) {
    return n && n.type === "backquoteLiteral";
}
