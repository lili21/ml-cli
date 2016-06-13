'use strict';

module.exports = {
  app: {
    name: 'melody',
    version: '0.1.0',
    server: 'http://app-api.shop.ele.me/',
  },
  payment: 'http://payapi.ele.me/payment_webApi/payment/placeOrder',
  beat: {
    default: {
      uri: 'http://app-api.shop.ele.me/invoke',
      opts: {
        query: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: true
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
          disablePolling: true
        },
        ncp: '2.0.0'
      }
    },
    shop: {
      uri: 'http://app-api.shop.ele.me/shop/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: true
        },
        ncp: '2.0.0'
      }
    },
    rank: {
      uri: 'http://app-api.shop.ele.me/alchemy/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: true
        },
        ncp: '2.0.0'
      }
    },
    goods: {
      uri: 'http://app-api.shop.ele.me/goods/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: true
        },
        ncp: '2.0.0'
      }
    },
    order: {
      uri: 'http://app-api.shop.ele.me/order/invoke/',
      opts: {
        metas: {
          appName: 'melody',
          appVersion: '4.4.0'
        },
        debug: {
          mock: false,
          disablePolling: true
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
          disablePolling: true
        },
        ncp: '2.0.0'
      }
    },
    delivery: {
      uri: 'http://app-api.shop.ele.me/delivery/invoke/',
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
    }
  },

  ubtUrl: 'http://ubt.shop.ele.me/eventlog',

  billUrl: 'http://hydrosweb.ele.me/app',
  chainShopBillUrl: 'http://hydroschainstore.ele.me/app/balance',
  allcarriersUrl: 'http://minos-buy.ele.me/napos/napos-pc/index.html',
  allcarriersBillUrl: 'http://lpd-bill.ele.me/napos-web'
};
