'use strict';

const Config = {
  APPLICATION_PHASE: process.env.APPLICATION_PHASE,
  APPLICATION_VERSION: process.env.APPLICATION_VERSION,
  DOMAIN: process.env.DOMAIN,
  LOGIN_URL: process.env.LOGIN_URL,
  LOGOUT_URL: process.env.LOGOUT_URL,
  API_DOMAIN: process.env.API_DOMAIN,
  // API URL & URI 확정되면 작업
  API: {
    // dAPP api
    NOTICE_LIST: {
      URI: '/api/v1/notice/list',
      METHOD: 'GET',
    },
  },
};

export default Config;
