/**
 * Created by luoxinfang on 13-12-2.
 */
define(function (require, exports, module) {
  var $con = $('.content tbody'),
    $info = $('.info'),
    $resChart = $('#resultChart'),
    $resTable = $('#resultTable');
  var Tpl = function (id, tplFunc) {
    this.id = id;
    this.tplFunc = tplFunc;
    this.costTime = [];
  };
  var tplArr = [];
  var dataNumArr = [10, 100, 300, 500, 1000 ];
  var Test = {
    loadModule: function () {
      require('jquery');
      require('underscore');
      require('microTpl');
      require('runtime');
      require('doT');
      require('soy');
      require('highcharts');
    },
    renderTime: 0,
    renderedTime: 0,
    getData: function (num) {
      return require('page/json')(num);
    },
    loadAndSetTpl: function () {
      this.underscoreTpl = require('../../tpl/underscore_tr.tpl');
      this.microTpl = require('../../tpl/micro_tr.tpl');
      this.jadeTpl = require('../../tpl/jade_tr');
      this.dotTpl = require('../../tpl/doT.tpl');
      require('../../tpl/closure_tr');
      tplArr = [
        new Tpl('underscore', _.template(this.underscoreTpl)),
        new Tpl('micro', tmpl(this.microTpl)),
        new Tpl('jade', this.jadeTpl),
        new Tpl('doT', doT.template(this.dotTpl)),
        new Tpl('closure', CTPT.test)
      ]
    },
    prepare: function () {
      this.generateResultTable();
      this.renderTime = dataNumArr.length * tplArr.length;
    },
    goTest: function () {
      _.each(dataNumArr, function (num) {
        var data = Test.getData(num);
        _.forEach(tplArr, function (tpl) {
          setTimeout(function () {
            Test.renderTpl(tpl, data);
          }, 30);
        });
      });
    },
    renderTpl: function (tpl, data) {
      var id = tpl.id;
      $info.html('begin to render' + id);
      var endTime = 0,
        startTime = +new Date;
      $con.html(tpl.tplFunc({
        rows: data
      }));
      endTime = +new Date - startTime;
      tpl.costTime.push(endTime);
      var htmlStr = 'render ' + id + ' with ' + data.length + 'rows, in' + endTime + 'ms';
      $info.html(htmlStr);
      Test.fillResultTable(tpl);
      if (++this.renderedTime == this.renderTime) {
        Test.generateResultChart();
      }
    },
    generateResultChart: function () {
      var renderSeries = [];
      _.each(tplArr, function (tpl) {
        renderSeries.push({
          name: tpl.id,
          data: tpl.costTime
        });
      });
      $resChart.highcharts({
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
    },
    generateResultTable: function () {
      var tableTpl = require('../../tpl/result_table.tpl');
      var htmlStr = _.template(tableTpl, {
        dataNumArr: dataNumArr,
        tplArr: tplArr
      });
      $resTable.html(htmlStr);
    },
    fillResultTable: function (tpl) {
      var tplId = tpl.id,
        costTimeLen = tpl.costTime.length,
        time = tpl.costTime[costTimeLen - 1];
      var $tar = $resTable.find('tr[data-type="' + tplId + '"]');
      if ($tar.length > 0) {
        $tar.children('td').eq(costTimeLen).html(typeof time == 'number' ? time : 'error');
      }
    },
    init: function () {
      this.loadModule();
      this.loadAndSetTpl();
      this.prepare();
      this.goTest();
    }
  };
  Test.init();
});
