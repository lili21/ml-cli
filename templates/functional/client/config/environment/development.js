'use strict';

module.exports = {
  app: {
    name: 'melody',
    version: '4.4.0',
    server: 'http://app-api.shop.alpha.elenet.me/',
  },
  payment: 'http://vpcb-base-payment-01.vm.elenet.me:9070/payment_webApi/payment/placeOrder',
  beat: {
    default: {
      uri: 'http://app-api.shop.alpha.elenet.me/invoke',
      opts: {
        query: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: false
        }
      }
    },
    activity: {
      uri: 'http://app-api.shop.alpha.elenet.me/marketing/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    },
    shop: {
      uri: 'http://app-api.shop.alpha.elenet.me/shop/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: true,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    },
    rank: {
      uri: 'http://app-api.shop.alpha.elenet.me/alchemy/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    },
    goods: {
      uri: 'http://app-api.shop.alpha.elenet.me/goods/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: true,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    },
    order: {
      uri: 'http://app-api.shop.alpha.elenet.me/order/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: true,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    },
    diagnosis: {
      uri: 'http://app-api.shop.alpha.elenet.me/stats/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    },
    delivery: {
      uri: 'http://app-api.shop.alpha.elenet.me/delivery/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: false
        },
        ncp: '2.0.0'
      }
    }
  },

  ubtUrl: 'http://ubt.shop.alpha.elenet.me/eventlog',

  billUrl: 'http://hydrosweb.alpha.elenet.me/app',
  chainShopBillUrl: 'http://hydroschainstore.alpha.elenet.me/app/balance',
  allcarriersUrl: 'http://minos-buy.alpha.elenet.me/napos/napos-pc/index.html',
  allcarriersBillUrl: 'http://lpd-bill.ele.me/napos-web'
};
