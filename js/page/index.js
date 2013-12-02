/**
 * Created by luoxinfang on 13-12-2.
 */
define(function (require, exports, module) {
  require('jquery');
  require('underscore');
  require('microTpl');
  require('runtime');
  require('doT');
  require('soy');
  require('highcharts');
  var $con = $('.content tbody');
  var $res = $('.result tbody');
  var tplArray = [];
  var dataNumArr = [10, 100, 1000,2000,3000, 10000/*, 10 * 10000, 20 * 1000*/];
  var getData = require('page/json');
  var underscoreTpl = require('../../tpl/underscoreTpl.tpl');
  var microTpl = underscoreTpl;
  var jadeTpl = require('../../tpl/jadeTpl');
  var doTTpl = require('../../tpl/dot.tpl');
  var closureTpl = require('../../tpl/closureTpl');
  tplArray.push({
    underscoreTpl: underscoreTpl,
    costTime: []
  });
  tplArray.push({
    microTpl: microTpl,
    costTime: []
  });
  tplArray.push({
    jadeTpl: jadeTpl,
    costTime: []
  });
  tplArray.push({
    doTTpl: doTTpl,
    costTime: []
  });
  tplArray.push({
    closureTpl: closureTpl,
    costTime: []
  });

  _.forEach(tplArray, function (tpl) {
    var keys = _.keys(tpl);
    var costTime = tpl.costTime == 0 ? 'wait..' : tpl.costTime;
    $res.append('<tr data-type="' + keys[0] + '">' +
      '<td>' + keys[0] + '</td><td class="costTime">' + costTime + '</td><td>padding...</td>' +
      '</tr>')
  });
  _.each(dataNumArr, function (num) {
    var data = getData(num);
    _.forEach(tplArray, function (tpl, index) {
      var startTime = +new Date,
        costTime = 0;
      var tplType = _.keys(tpl)[0];
      var tplStr = _.values(tpl)[0];
      var compiledTpl = null;
      $con.html('<tr><td colspan="7" class="tip">begin to render' + tplType + '</td></tr>');
      switch (tplType) {
        case 'underscoreTpl':
          compiledTpl = _.template(tplStr);
          $con.html(compiledTpl({
            rows: data
          }));
          costTime = (+new Date) - startTime;
          break;
        case 'microTpl':
          compiledTpl = tmpl(microTpl);
          $con.html(compiledTpl({
            rows: data
          }));
          costTime = (+new Date) - startTime;
          break;
        case 'jadeTpl':
          $con.html(jadeTpl({
            rows: data
          }));
          costTime = (+new Date) - startTime;
          break;
        case 'doTTpl':
          compiledTpl = doT.template(doTTpl);
          $con.html(compiledTpl({
            rows: data
          }));
          costTime = (+new Date) - startTime;
          break;
        case 'closureTpl':
          $con.html(CTPT.test({
            rows: data
          }));
          costTime = (+new Date) - startTime;
          break;
      }
      tpl.costTime.push(costTime);
      $res.children('tr[data-type="' + tplType + '"]').children('td').eq(1).html(costTime);
      $res.children('tr[data-type="' + tplType + '"]').children('td').eq(2).html('ok');
    });
  });

  //$('.info').html(data.length + 'rows has been rendered');
  renderResult(tplArray);
  function renderResult(data) {
    var tplType = [], renderTime = [],series=[];
    _.each(data, function (tpl) {
      var key=_.keys(tpl)[0];
      tplType.push(key);
      renderTime.push(tpl.costTime);
      series.push({
        name:key,
        data:tpl.costTime
      });
    });
    $('#result').highcharts({
      title: {
        text: 'client template performance test',
        x: -20 //center
      },
      subtitle: {
        text: 'author: radish',
        x: -20
      },
      xAxis: {
        categories: dataNumArr
      },
      yAxis: {
        title: {
          text: 'time (ms)'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        valueSuffix: 'ms'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: series
    });
  }
});
