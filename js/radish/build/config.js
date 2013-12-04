/**
 * Created by luoxinfang on 13-10-18.
 */
'use strict';
seajs.config({
  base:'/CTPT/js',
  alias:{
    'text':'radish/build/seajs-text',
    'jquery':'radish/lib/jquery-2.0.3',
    'underscore':'radish/lib/underscore',
    'lodash':'radish/lib/lodash',
    'microTpl':'radish/lib/microTpl',
    'doT':'radish/lib/doT.min',
    'soy':'radish/lib/soyutils',
    'highcharts':'radish/lib/highcharts',
    'runtime':'radish/lib/runtime',
    'ejs':'radish/lib/ejs'
  },
  preload:['text']
});

