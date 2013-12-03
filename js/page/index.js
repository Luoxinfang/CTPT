/**
 * Created by luoxinfang on 13-12-2.
 */
define(function (require, exports, module) {
  var $con = $('.content tbody'),
    $info = $('.info'),
    $resChart=$('#resultChart'),
    $resTable=$('#resultTable');
  var Test;
  var tplArr=[];
  var dataNumArr = [10, 100, 300, 500 ];
  Test = {
    loadModule: function () {
      require('jquery');
      require('underscore');
      require('microTpl');
      require('runtime');
      require('doT');
      require('soy');
      require('highcharts');
    },
    renderTime :0,
    renderedTime : 0,
    getData :function(num){
      return require('page/json')(num);
    },
    loadAndSetTpl: function () {
      this.underscoreStr = require('../../tpl/underscoreTpl.tpl');
      this.microStr = require('../../tpl/micro-template.tpl');
      this.jadeStr = require('../../tpl/jadeTpl');
      this.doTStr = require('../../tpl/dotTpl.tpl');
      this.closureStr = require('../../tpl/closureTpl');
      tplArr.push({
        underscoreTpl: _.template(Test.underscoreStr),
        costTime: []
      });
      tplArr.push({
        microTpl: tmpl(this.microStr),
        costTime: []
      });
      tplArr.push({
        jadeTpl: this.jadeStr,
        costTime: []
      });
      tplArr.push({
        doTTpl: doT.template(this.doTStr),
        costTime: []
      });
      tplArr.push({
        closureTpl: this.closureStr,
        costTime: []
      });
    },
    prepare: function () {
      this.generateTableHeader();
      this.renderTime=dataNumArr.length * tplArr.length;
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
    renderTpl: function (tpl,data) {
      var startTime = +new Date, endTime = 0;
      var tplType = _.keys(tpl)[0];
      var compileTpl = tpl[tplType];
      $info.html('begin to render' + tplType);
      switch (tplType) {
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
      /*var htmlStr='render ' + tplType + ' with ' + data.length + 'rows, in' + endTime + 'ms';
       $info.html(htmlStr);*/
      Test.generateResultTable(tpl);
      if (++this.renderedTime == this.renderTime) {
        Test.generateResultChart();
        Test.generateResultTable();
      }
    },
    generateResultChart: function () {
      var renderSeries = [];
      _.each(tplArr, function (tpl) {
        var key = _.keys(tpl)[0];
        renderSeries.push({
          name: key,
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
    generateTableHeader: function () {
      var row = $('<tr><td>rows</td></tr>');
      _.each(dataNumArr, function (num) {
        row.append('<td>' + num + '</td>');
      });
      $resTable.append(row);
    },
    generateResultTable: function (tpl) {
      var type=_.keys(tpl)[0];
      var len=dataNumArr.length;
      var time=tpl.costTime.pop();
      var $tar=$resTable.find('tr[data-type="'+type+'"]');
      if($tar.length>0){
        //$tar.children('td').eq(tpl.costTime.length).html(time);
      }else{
        var row = $('<tr data-type="'+type+'"><td>'+type+'</td></tr>');
        for(var i= 0;i<len;i++){
          row.append('<td></td>')
        }
        $resTable.append(row);
      }

    },
    init: function () {
      this.loadModule();//装载需要的模块
      this.loadAndSetTpl();//装载并设置模板
      this.prepare();//做好准备
      this.goTest();//测试
    }
  };
  Test.init();
});
