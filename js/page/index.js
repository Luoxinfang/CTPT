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
  var $con = $('.content tbody'),
    $info = $('.info');
  var tplArray = [];
  var renderTime = 0, renderedTime = 0;
  var dataNumArr = [10, 100, 300, 500 , 1000 /*, 10 * 10000 20 * 1000*/];
  var getData = require('page/json');
  var underscoreTpl = require('../../tpl/underscoreTpl.tpl');
  var microTpl = require('../../tpl/micro-template.tpl');
  var jadeTpl = require('../../tpl/jadeTpl');
  var doTTpl = require('../../tpl/dotTpl.tpl');
  var closureTpl = require('../../tpl/closureTpl');
  tplArray.push({
    underscoreTpl: _.template(underscoreTpl),
    costTime: []
  });
  tplArray.push({
    microTpl: tmpl(microTpl),
    costTime: []
  });
  tplArray.push({
    jadeTpl: jadeTpl,
    costTime: []
  });
  tplArray.push({
    doTTpl: doT.template(doTTpl),
    costTime: []
  });
  tplArray.push({
    closureTpl: closureTpl,
    costTime: []
  });
  renderTime = dataNumArr.length * tplArray.length;

  _.each(dataNumArr, function (num) {
    var row = $('<tr></tr>');

  })
  _.each(dataNumArr, function (num) {
    var data = getData(num);
    _.forEach(tplArray, function (tpl) {
      setTimeout(function () {
        renderTpl(tpl, data);
      }, 25);
    });
  });
  function renderTpl(tpl, data) {
    var startTime = +new Date, endTime = 0;
    var tplType = _.keys(tpl)[0];
    var compileTpl = tpl[tplType];
    $info.html('begin to render' + tplType);
    switch (tplType) {
      case 'jadeTpl':
        $con.html(jadeTpl({
          rows: data
        }));
        break;
      case 'closureTpl':
        $con.html(CTPT.test({
          rows: data
        }));
        break;
      default :
        $con.html(compileTpl({
          rows: data
        }));
        break;
    }
    endTime = +new Date - startTime;
    tpl.costTime.push(endTime);
    $info.html('render ' + tplType + ' with ' + data.length + 'rows, in' + endTime + 'ms');
    if (++renderedTime == renderTime) {
      renderResult(tplArray);
    }
  }

  //$('.info').html(data.length + 'rows has been rendered');

  function renderResult(data) {
    var renderSeries = [];
    _.each(data, function (tpl) {
      var key = _.keys(tpl)[0];
      renderSeries.push({
        name: key,
        data: tpl.costTime
      });
    });
    $('#resultChart').highcharts({
      title: {
        text: 'client template performance test',
        x: -20 //center
      },
      subtitle: {
        text: 'author: radish',
        x: -20
      },
      xAxis: {
        categories: dataNumArr,
        title: {
          text: 'row number'
        }
      },
      yAxis: {
        title: {
          text: 'used time (ms)'
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: '#808080'
          }
        ]
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
      series: renderSeries
    });
  }
});
