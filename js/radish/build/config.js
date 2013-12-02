/**
 * Created by luoxinfang on 13-10-18.
 */
'use strict';
seajs.config({
  base:'/CTPT/js',
  alias:{
    'text':'radish/build/seajs-text',
    'jquery':'radish/lib/jquery-2.0.3',
    'jquery.cookie':'radish/lib/jquery.cookie',
    'lodash':'radish/lib/lodash',
    'underscore':'radish/lib/underscore',
    'microTpl':'radish/lib/microTpl',
    'doT':'radish/lib/doT.min',
    'soy':'radish/lib/soyutils',
    'highcharts':'radish/lib/highcharts',
    'backbone':'radish/lib/backbone',
    'bootstrap':'radish/lib/bootstrap',
    'runtime':'radish/lib/runtime',
    'Form':'radish/core/form',
    'Date':'radish/core/date',
    'Key':'radish/core/key'
  },
  preload:['text']
});

