'use strict';

import angular from 'angular';

import { appConfig, redirect } from './configs/app';
import { beatConfig, beatErrorHandle } from './configs/beat';
import routeConfig from './configs/routes';

angular
  .module('app')

  .config(appConfig)
  .config(beatConfig)
  .config(routeConfig)

  .service('Restaruant', Restaruant)
  .service('RestaruantAction', RestaruantAction)
  .service('RestaurantStore', RestaurantStore)

  .run(redirect)
  .run(beatErrorHandle);
