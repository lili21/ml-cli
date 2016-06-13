'use strict';

export default function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app', {
      url: '/{restaurantId:int}',
      resolve: {
        ResourceInit: ResourceInit
      },
      views: {
        '@': main
      },
      redirect: 'app.management'
    });
}

function ResourceInit(Restaurant, ProfileAction, RestaurantAction, ProfileStore, RestaurantStore) {
  'ngInject';
  return ProfileAction
    .loadCurrentProfile()
    .then(() => { return ProfileAction.fetchCurrentKeeper(); })
    .then(() => {
      ProfileStore.setLoginStatus(true);
      if (!ProfileStore.isManager()) {
        return RestaurantAction.loadRestaurants();
      }
    })
    .then(() => {
      var promise;
      if (ProfileStore.isManager()) {
        promise = chainShopResource(RestaurantAction, ProfileStore);
      } else if (RestaurantStore.isMulti()) {
        promise = multiShopResource(RestaurantAction);
      } else {
        promise = singleShopResource(Restaurant, RestaurantAction, RestaurantStore);
      }
      return promise;
    })
    .catch(function(e) {
      console.error(e);

      switch (e.code) {
        case 'UNEXPECTED_EXCEPTION':
        case 'CONNECTION_ERROR':
          setTimeout(function() { window.location.reload(); }, 15 * 1000);
          break;
      }
    });
}

function chainShopResource(RestaurantAction, ProfileStore) {
  const restaurantIds = ProfileStore.getChainKeeper().restaurantIds;
  return RestaurantAction.fetchRestaurantTree(restaurantIds);
}

function multiShopResource(RestaurantAction) {
  return RestaurantAction.setCurrentRestaurant(null);
}

function singleShopResource(Restaurant, RestaurantAction, RestaurantStore) {
  const restaurantId = RestaurantAction.getCurrentRestaurant().id;
  const promises = [
    RestaurantAction.fetchPolling(restaurantId),
    RestaurantAction.fetchRestaurantView(restaurantId)
  ];
  return Promise
    .all(promises)
    .then(() => {
      const restaurantView = RestaurantStore.getRestaurantView();
      return Restaurant.init(restaurantId, restaurantView);
    })
    .catch(e => {
      window.alert(e.message);
    });
}

