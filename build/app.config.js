const APPLICATION_PHASE = process.env.APPLICATION_PHASE || 'LOCAL';

const APPLICATION_VERSION = process.env.npm_package_version;
const APPLICATION_QA_VERSION = process.env.npm_package_qaVersion;

// 서버별 어플리케이션 환경 변수
const VERSION = {
  LOCAL: {
    APP_VERSION: JSON.stringify(`${APPLICATION_VERSION}.${APPLICATION_QA_VERSION}`)
  },
  ALPHA: {
    APP_VERSION: JSON.stringify(`${APPLICATION_VERSION}.${APPLICATION_QA_VERSION}`)
  },
  BETA: {
    APP_VERSION: JSON.stringify(`${APPLICATION_VERSION}.${APPLICATION_QA_VERSION}`)
  },
  RC: {
    APP_VERSION: JSON.stringify(`${APPLICATION_VERSION}.${APPLICATION_QA_VERSION}`)
  },
  REAL: {
    APP_VERSION: JSON.stringify(APPLICATION_VERSION)
  }
};

// API 호출하는 도메인
// LOCAL의 경우 proxy를 사용해야 할 수도 있기때문에 샘플로 넣어둠
const DOMAIN = {
  LOCAL: "http://blockchain-alpha.line-beta.biz:3000",
  ALPHA: "https://blockchain-alpha.line-beta.biz",
  BETA: "https://blockchain.line-beta.biz",
  RC: "https://blockchain.line.biz",
  REAL: "https://blockchain.line.biz"
}

const LOGIN_URL = {
  LOCAL: "https://api-blockchain-alpha.line-beta.biz/login?redirectUri=",
  ALPHA: "https://api-blockchain-alpha.line-beta.biz/login?redirectUri=",
  BETA: "https://api-blockchain.line-beta.biz/login?redirectUri=",
  RC: "https://api-blockchain.line.biz/login?redirectUri=",
  REAL: "https://api-blockchain.line.biz/login?redirectUri="
}

const LOGOUT_URL = {
  LOCAL: "https://api-blockchain-alpha.line-beta.biz/logout?redirectUri=",
  ALPHA: "https://api-blockchain-alpha.line-beta.biz/logout?redirectUri=",
  BETA: "https://api-blockchain.line-beta.biz/logout?redirectUri=",
  RC: "https://api-blockchain.line.biz/logout?redirectUri=",
  REAL: "https://api-blockchain.line.biz/logout?redirectUri="
}

const API_DOMAIN = {
  LOCAL: "http://blockchain-alpha.line-beta.biz:3000",
  ALPHA: "https://api-blockchain-alpha.line-beta.biz",
  BETA: "https://api-blockchain.line-beta.biz",
  RC: "https://api-blockchain.line.biz",
  REAL: "https://api-blockchain.line.biz"
}

module.exports = {
  APPLICATION_PHASE: APPLICATION_PHASE,
  VERSION: VERSION[APPLICATION_PHASE],
  DOMAIN: DOMAIN[APPLICATION_PHASE],
  LOGIN_URL: LOGIN_URL[APPLICATION_PHASE],
  LOGOUT_URL: LOGOUT_URL[APPLICATION_PHASE],
  API_DOMAIN: API_DOMAIN[APPLICATION_PHASE],
};
