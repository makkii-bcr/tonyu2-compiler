const Compiler=require("./src/lang/projectCompiler");
const FS=require("./src/lib/FS");
const prjPath=process.argv[2];
let prj;
if (FS.PathUtil.isAbsolute(prjPath)) {
    prj=FS.get(prjPath);
} else {
    prj=FS.get(process.cwd()).rel(prjPath);
}
prj.recursive(f=>console.log(f.relPath(prj)));

Compiler(prj).compile().then(function () {

},function (e) {
    console.error(e.stack);
});
