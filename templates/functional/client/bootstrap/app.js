'use strict';

global.jQuery = global.$ = require('jquery');

var angular = require('angular');

/** Load Angular.js */

angular.module('app', [
  // 'ngSanitize',
  // 'ngCookies',
  // 'ngBeat',
  // 'ng-sortable',
  // 'ui.router',
  // 'infinite-scroll',
  // 'ngAnalytics',
  // 'ngTrack',
  // 'chart.js',
  // 'ngMessages'
]);

// require('angular-sanitize');
// require('angular-cookies');
// require('angular-ui-router');
// require('@napos/napos-ng-beat');
// require('@napos/napos-ng-analytics');
// require('angular-chart.js');
// require('angular-messages');

// require('../services');
// require('../directives');
// require('../filters');
// require('../states');
require('./bootstrap.js');

global.APP_LOADED = true;
