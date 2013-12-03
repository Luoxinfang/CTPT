/**
 * Created by luoxinfang on 13-12-2.
 */
/*
 [{
 id:1,
 name:xf.radish,
 firstName:radish,
 lastName:xf,
 usedName:['a','b','c','d','e']
 }]*/
define(function (require, exports, module) {
  module.exports = function(num){
    var users = [];
    var names= ['Victor.Lin','Lynn.Lin','xf.Radish','Anne.Chen'];
    var firstNames=['Lin','Lin','Radish','Chen'];
    var lastNames=['Victor','Lynn','xf','Anne'];
    for (var i = 0, l = num; i < l; i++) {
      users.push({
        id:i,
        name:names[i%4],
        firstName:firstNames[i%4],
        lastName:lastNames[i%4],
        usedName:['a_usedName','b_usedName','c_usedName','d_usedName','e_usedName'],
        teem:'Front-End Teem'
      });
    }
    return users;
  };
});