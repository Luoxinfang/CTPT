define(function(require,exports,module){
  module.exports=function(locals){
    var buf = [];var locals_ = (locals || {}),rows = locals_.rows,userName = locals_.userName;jade.indent = [];
    buf.push("\n<!--\n<Created>by luoxinfang on 13-12-2.</Created>\n-->");
// iterate rows
    ;(function(){
      var $$obj = rows;
      if ('number' == typeof $$obj.length) {

        for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
          var row = $$obj[$index];

          var usedName=row.usedName;
          buf.push("\n<tr>\n  <td>\n    <input" + (jade.attrs({ 'type':('checkbox'), 'name':('row'), 'value':('' + (row.id) + '') }, {"type":true,"name":true,"value":true})) + "/>\n  </td>\n  <td" + (jade.attrs({ 'data-name':('' + (row.name) + '') }, {"data-name":true})) + ">" + (jade.escape(null == (jade.interp = row.firstName+row.lastName) ? "" : jade.interp)) + "</td>\n  <td" + (jade.attrs({ 'data-used-name':('' + (userName) + '') }, {"data-used-name":true})) + ">\n    <select>");
// iterate usedName
          ;(function(){
            var $$obj = usedName;
            if ('number' == typeof $$obj.length) {

              for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                var item = $$obj[$index];

                buf.push("\n      <option" + (jade.attrs({ 'value':('' + (item) + '') }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = item) ? "" : jade.interp)) + "</option>");
              }

            } else {
              var $$l = 0;
              for (var $index in $$obj) {
                $$l++;      var item = $$obj[$index];

                buf.push("\n      <option" + (jade.attrs({ 'value':('' + (item) + '') }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = item) ? "" : jade.interp)) + "</option>");
              }

            }
          }).call(this);

          buf.push("\n    </select>\n  </td>\n  <td>" + (jade.escape(null == (jade.interp = 'More info...') ? "" : jade.interp)) + "</td>\n  <td>" + (jade.escape(null == (jade.interp = 'More info...') ? "" : jade.interp)) + "</td>\n  <td>" + (jade.escape(null == (jade.interp = 'More info...') ? "" : jade.interp)) + "</td>\n  <td class=\"edit\"><a href=\"javascript:void(0);\">" + (jade.escape(null == (jade.interp = 'Edit') ? "" : jade.interp)) + "</a></td>\n</tr>");
        }

      } else {
        var $$l = 0;
        for (var $index in $$obj) {
          $$l++;      var row = $$obj[$index];

          var usedName=row.usedName;
          buf.push("\n<tr>\n  <td>\n    <input" + (jade.attrs({ 'type':('checkbox'), 'name':('row'), 'value':('' + (row.id) + '') }, {"type":true,"name":true,"value":true})) + "/>\n  </td>\n  <td" + (jade.attrs({ 'data-name':('' + (row.name) + '') }, {"data-name":true})) + ">" + (jade.escape(null == (jade.interp = row.firstName+row.lastName) ? "" : jade.interp)) + "</td>\n  <td" + (jade.attrs({ 'data-used-name':('' + (userName) + '') }, {"data-used-name":true})) + ">\n    <select>");
// iterate usedName
          ;(function(){
            var $$obj = usedName;
            if ('number' == typeof $$obj.length) {

              for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                var item = $$obj[$index];

                buf.push("\n      <option" + (jade.attrs({ 'value':('' + (item) + '') }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = item) ? "" : jade.interp)) + "</option>");
              }

            } else {
              var $$l = 0;
              for (var $index in $$obj) {
                $$l++;      var item = $$obj[$index];

                buf.push("\n      <option" + (jade.attrs({ 'value':('' + (item) + '') }, {"value":true})) + ">" + (jade.escape(null == (jade.interp = item) ? "" : jade.interp)) + "</option>");
              }

            }
          }).call(this);

          buf.push("\n    </select>\n  </td>\n  <td>" + (jade.escape(null == (jade.interp = 'More info...') ? "" : jade.interp)) + "</td>\n  <td>" + (jade.escape(null == (jade.interp = 'More info...') ? "" : jade.interp)) + "</td>\n  <td>" + (jade.escape(null == (jade.interp = 'More info...') ? "" : jade.interp)) + "</td>\n  <td class=\"edit\"><a href=\"javascript:void(0);\">" + (jade.escape(null == (jade.interp = 'Edit') ? "" : jade.interp)) + "</a></td>\n</tr>");
        }

      }
    }).call(this);
    return buf.join("");
  }
});