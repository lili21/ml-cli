'use strict';

var _ = require('lodash');

exports.get = get;
exports.remoteConfig = "http://s-chf.nphost.me:49160/melody/config";

if (__DEV__) {
  require('../mock');
}

function get(env) {
  return _.merge(require('./environment/' + env + '.js'));
}