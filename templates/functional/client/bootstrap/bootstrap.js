'use strict';

var angular = require('angular');
var config = require('config');
var $ = require('jquery');
var beat = require('@napos/napos-ng-beat/beat.js')({ debug: { disablePolling: true } });
var version;

/** Bootstrap */

var env = localStorage.env || 'development';
var debug = localStorage.debug || 'beat.req, beat.res, beat.error, app.*';
var ksid = localStorage.ksid || '';

var config = global.CONFIG || config.get(env);

angular.module('app').constant('env', env);
angular.module('app').constant('config', config);
angular.module('app').constant('ksid', ksid);
require('debug').enable(debug);
angular.bootstrap(document, ['app']);
