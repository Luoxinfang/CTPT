// This file was automatically generated from closureTpl.soy.
// Please don't edit this file by hand.

if (typeof CTPT == 'undefined') { var CTPT = {}; }


CTPT.test = function(opt_data, opt_ignored) {
  var output = '';
  var rowList3 = opt_data.rows;
  var rowListLen3 = rowList3.length;
  for (var rowIndex3 = 0; rowIndex3 < rowListLen3; rowIndex3++) {
    var rowData3 = rowList3[rowIndex3];
    output += '<tr><td><input type="checkbox" name="row" value="' + soy.$$escapeHtml(rowData3.id) + '"/></td><td data-name="' + soy.$$escapeHtml(rowData3.name) + '">' + soy.$$escapeHtml(rowData3.firstName + '.' + rowData3.lastName) + '</td><td data-used-name="' + soy.$$escapeHtml(rowData3.usedName) + '"><select name="usedName">';
    var itemList13 = rowData3.usedName;
    var itemListLen13 = itemList13.length;
    for (var itemIndex13 = 0; itemIndex13 < itemListLen13; itemIndex13++) {
      var itemData13 = itemList13[itemIndex13];
      output += '<option value="' + soy.$$escapeHtml(itemData13) + '">' + soy.$$escapeHtml(itemData13) + '</option>';
    }
    output += '</select></td><td>' + soy.$$escapeHtml(rowData3.teem) + '</td><td>More info...</td><td>More info...</td><td>More info...</td><td class="edit">' + ((rowData3.firstName == 'Lin') ? '<a href="javascript:void(0);">Edit</a>' : 'Edit') + '</td></tr>';
  }
  return output;
};
