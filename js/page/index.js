/**
 * Created by luoxinfang on 13-12-2.
 */
define(function (require, exports, module) {
  var $con = $('.content tbody'),
    $info = $('.info'),
    $resChart = $('#resultChart'),
    $resTable = $('#resultTable');
  var Tpl = function () {
    this.id = arguments[0];
    this.render = arguments[1];
    this.renderTime = [];
    this.compileTime = [];
  };
  var tplArr = [];
  var dataNumArr = [10, 100, 300 ];
  var Test = {
    loadModule: function () {
      require('jquery');
      require('underscore');
      require('lodash');
      window.loadsh = _.noConflict();
      require('microTpl');
      require('runtime');
      require('doT');
      require('soy');
      require('ejs');
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
      this.dotTpl = require('../../tpl/dot_tr.tpl');
      this.ejsTpl = '/CTPT/tpl/ejs_tr.tpl';
      require('../../tpl/closure_tr');
      tplArr = [
        new Tpl('ejs', new EJS({url: Test.ejsTpl})),
        new Tpl('doT', doT.template(Test.dotTpl)),
        new Tpl('jade', Test.jadeTpl),
        new Tpl('micro', tmpl(Test.microTpl)),
        new Tpl('lodash', loadsh.template(Test.underscoreTpl)),
        new Tpl('closure', CTPT.test),
        new Tpl('underscore', _.template(Test.underscoreTpl))
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
          }, 25);
        });
      });
    },
    renderTpl: function (tpl, data) {
      var id = tpl.id;
      var htmlStr = '', tipStr = 'render ' + id;
      var compileTime, renderTime;
      $info.html('begin to ' + tipStr);
      var startCompileTime = +new Date;
      try {
        switch (id) {
          case 'ejs':
            htmlStr = tpl.render.render({rows: data});
            break;
          default :
            htmlStr = tpl.render({rows: data});
        }
        compileTime = +new Date - startCompileTime;
        var renderStartTime = +new Date;
        $con.html(htmlStr)
        renderTime = +new Date - renderStartTime;
        tipStr += ' with ' + data.length + 'rows, in' + renderTime + 'ms';
      } catch (e) {
        compileTime = 'error';
        renderTime = 'error'
        tipStr += ' with error!';
      }
      tpl.renderTime.push(renderTime);
      tpl.compileTime.push(compileTime);
      Test.fillResultTable(tpl);
      $info.html(tipStr);
      if (++this.renderedTime == this.renderTime) {
        Test.generateResultChart();
      }
    },
    generateResultChart: function () {
      var renderSeries = [];
      _.each(tplArr, function (tpl) {
        renderSeries.push({
          name: tpl.id,
          data: tpl.renderTime
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
        index = tpl.renderTime.length - 1,
        compileTime = tpl.compileTime[index],
        renderTime = tpl.renderTime[index];
      var $tar = $resTable.find('tr[data-type="' + tplId + '"]');
      var compileTimeStr = typeof compileTime == 'number' ? compileTime : 'error';
      var renderTimeStr = typeof renderTime == 'number' ? renderTime : 'error';
      $tar.children('td').eq(index*2 + 1).html(compileTimeStr);
      $tar.children('td').eq(index*2 + 2).html(renderTimeStr);
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
