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

  var underscoreTpl = require('../../tpl/underscoreTpl.tpl');
  var microTpl = underscoreTpl;
  var jadeTpl = require('../../tpl/jadeTpl');
  var doTTpl = require('../../tpl/dot.tpl');
  var closureTpl = require('../../tpl/closureTpl');
  tplArray.push({
    underscoreTpl: underscoreTpl,
    costTime: 0
  });
  tplArray.push({
    microTpl: microTpl,
    costTime: 0
  });
  tplArray.push({
    jadeTpl: jadeTpl,
    costTime: 0
  });
  tplArray.push({
    doTTpl: doTTpl,
    costTime: 0
  });
  tplArray.push({
    closureTpl:closureTpl,
    costTime: 0
  });

  _.forEach(tplArray, function (tpl) {
    var keys = _.keys(tpl);
    var costTime = tpl.costTime == 0 ? 'wait..' : tpl.costTime;
    $res.append('<tr data-type="' + keys[0] + '">' +
      '<td>' + keys[0] + '</td><td class="costTime">' + costTime + '</td><td>padding...</td>' +
      '</tr>')
  });
  $.ajax({
    url: 'http://localhost:63342/test/users',
    /*    url:'http://localhost:3000/test/users',*/
    method: 'get',
    dataType: 'json',
    success: function (data) {
      _.forEach(tplArray, function (tpl, index) {
        var startTime = +new Date,
          costTime = 0;
        var tplType = _.keys(tpl)[0];
        var tplStr = _.values(tpl)[0];
        var compiledTpl=null;
        $con.html('<tr><td colspan="7" class="tip">begin to render'+tplType+'</td></tr>');
        switch (tplType) {
          case 'underscoreTpl':
            compiledTpl = _.template(tplStr);
            $con.html(compiledTpl({
              rows: data
            }));
            costTime = (+new Date) - startTime;
            tpl.costTime = costTime;
            break;
          case 'microTpl':
            compiledTpl = tmpl(microTpl);
            $con.html(compiledTpl({
              rows: data
            }));
            costTime = (+new Date) - startTime;
            tpl.costTime = costTime;
            break;
          case 'jadeTpl':
            $con.html(jadeTpl({
              rows: data
            }));
            costTime = (+new Date) - startTime;
            break;
          case 'doTTpl':
            compiledTpl=doT.template(doTTpl);
            $con.html(compiledTpl({
              rows: data
            }));
            costTime = (+new Date) - startTime;
            tpl.costTime = costTime;
            break;
          case 'closureTpl':
            $con.html(CTPT.test({
              rows: data
            }));
            costTime = (+new Date) - startTime;
            tpl.costTime = costTime;
            break;
        }
        $res.children('tr[data-type="' + tplType + '"]').children('td').eq(1).html(costTime);
        $res.children('tr[data-type="' + tplType + '"]').children('td').eq(2).html('ok');
        renderResult(tplArray);
      });
    },
    error: function (err) {
      console.log(err);
    }
  });
  function renderResult(data){
    var tplType=[],renderTime=[];
    _.each(data,function(tpl){
      tplType.push(_.keys(tpl)[0]);
      renderTime.push(_.values(tpl)[0]);
    });
    $('#result').highcharts({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'The performance of templates'
      },
      xAxis: {
        categories: tplType,
        labels: {
          rotation: -45,
          align: 'right',
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)'
        }
      },
      subtitle: {
        text: 'author:xf.radish'
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: data
    });
  }

});
