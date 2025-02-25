if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"compiler":{"dependingProjects":[{"dir":"../updatable/"}],"outputFile":"js/concat.js","namespace":"user"},"run":{}}, ()=>{
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        var _this=this;
        
        _this.x=3;
        if (_this.x==3) {
          let x = 5;
          
          console.log(x);
          
        }
      },
      fiber$main :function* _trc_Main_f_main(_thread) {
        var _this=this;
        
        _this.x=3;
        if (_this.x==3) {
          let x = 5;
          
          console.log(x);
          
        }
        
      },
      test :function _trc_Main_test(_x) {
        var _this=this;
        
        let x = 3;
        
      },
      fiber$test :function* _trc_Main_f_test(_thread,_x) {
        var _this=this;
        
        let x = 3;
        
        
      },
      dup :function _trc_Main_dup() {
        var _this=this;
        
        let _x = 5;
        
        let a = 3;
        let x = 3;
        
      },
      fiber$dup :function* _trc_Main_f_dup(_thread) {
        var _this=this;
        
        let _x = 5;
        
        let a = 3;
        let x = 3;
        
        
      },
      dupvar :function _trc_Main_dupvar() {
        var _this=this;
        var _x;
        
        _x = 5;
        
        let a = 3;
        let x = 3;
        
      },
      fiber$dupvar :function* _trc_Main_f_dupvar(_thread) {
        var _this=this;
        var _x;
        
        _x = 5;
        
        let a = 3;
        let x = 3;
        
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"test":{"nowait":false,"isMain":false,"vtype":{"params":[null],"returnValue":null}},"dup":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"dupvar":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}}},"fields":{"x":{}}}
});

});

//# sourceMappingURL=concat.js.map