'use strict';

class RequestUtil {
  getParamMap() {
    const reqMap = {};

    let url = unescape(encodeURIComponent(location.href));
    url = url.split('#')[0];
    url = decodeURIComponent(url);
    const paramArr = url.substring(url.indexOf('?') + 1, url.length).split('&');

    for (let i = 0; i < paramArr.length; i++) {
      const temp = paramArr[i].split('=');
      reqMap[temp[0]] = temp[1];
    }

    return reqMap;
  }
}

const requestUtil = new RequestUtil();
export default requestUtil;
