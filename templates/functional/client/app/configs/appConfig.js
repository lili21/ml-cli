/**
 * @file Global Angular.js app configruation
 */

'use strict';

var _ = require('lodash');
var debug = {
  route: require('debug')('app:route'),
  attach: require('debug')('app:attach')
};
var nprogress = require('nprogress');
var pageStart = 0;
var lastPage = '';

function appConfig($urlRouterProvider, $locationProvider) {
  'ngInject';
  $urlRouterProvider
    .otherwise('/app');

  /** Enable HTML5 Mode. */
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}

function redirect($rootScope, $state, $stateParams, Alert, analytics) {
  'ngInject';
  $rootScope.$on('$stateChangeStart', function() {
    nprogress.start();
    debug.route('from state: %s', $state.current.name || 'root');
    if (lastPage) {
      analytics.page(lastPage, pageStart, Date.now());
    }
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    debug.route('to state: %s', $state.current.name);
    pageStart = Date.now();
    lastPage = $state.current.data && $state.current.data.pageId;
    /**
     * Redirect functionality for ui-router
     * @param  {[type]} $state.current.redirect [description]
     * @return {[type]}                         [description]
     */
    if ($state.current.redirect) {
      if (_.isFunction($state.current.redirect)) {
        var o = $state.current.redirect(toState, toParams);
        $state.go(o.state, o.params);
        return;
      }

      $state.go($state.current.redirect);
    }

    /**
     * progress bar end
     */
    nprogress.done();
  });

  $rootScope.$on('$stateChangeError', (event, ...args) => {
    console.error(_.last(args), true);
    analytics.throw('stateChangeError', _.last(args));
    nprogress.done();
  });
}

export {
  appConfig,
  redirect
};
