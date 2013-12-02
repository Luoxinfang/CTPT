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
    for (var i = 0, l = num; i < l; i++) {
      users.push({
        id:i,
        name:'xf.radish',
        firstName:'radish',
        lastName:'xf',
        usedName:['a','b','c','d','e']
      });
    }
    return users;
  };
});