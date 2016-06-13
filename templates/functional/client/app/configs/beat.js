/**
 * @file Beat configruation
 */

'use strict';

import _ from 'lodash';

function beatConfig(beatProvider, analyticsProvider, config, ksid, env) {
  'ngInject';
  console.log('config', config);
  console.log('ksid', ksid);

  if (ksid) {
    _.forEach(config.beat, function(endpoint, name) {
      var opts = endpoint.opts;

      if (opts.ncp === '1.0.0' || opts.ncp === undefined) {
        opts.query.ksid = ksid;
      } else if (opts.ncp === '2.0.0') {
        opts.metas.ksid = ksid;
      }
    });
  }

  beatProvider.init(config.beat);
  // analyticsProvider.init(eventTable, env == "development", config.ubtUrl);
}

function beatErrorHandle(beat, analytics, $state, Alert) {
  'ngInject';
  beat.on('error', function(error) {
    analytics.throw('beatError::' + error.type, error.message, $state.current.name);

    switch (error.code) {
      case 'LOGIN_REQUIRED':
      case 'INVALID_SELF_DIST_RESTAURANT_D':
        Alert
          .show(error.message, true, 4000)
          .then(() => {
            beat.browser.invoke('pc.profile.removeCurrentProfile');
            $state.go('login');
          });
        break;
    }
  });
}

export {
  beatConfig,
  beatErrorHandle
};
