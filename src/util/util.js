// import { i18n } from '@/config/i18n';

export function setLocalStorageItem(key, item) {
  window.localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageItem(key) {
  const data = window.localStorage.getItem(key) || null;
  if (data === 'undefined') {
    return null;
  } else {
    return JSON.parse(data);
  }
}

export function removeLocalStorageItem(key) {
  window.localStorage.removeItem(key);
}

export function getOS() {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/Android/i)) {
    return 'Android';
  } else if (userAgent.match(/BlackBerry/i)) {
    return 'BlackBerry';
  } else if (userAgent.match(/iPhone|iPad|iPod/i)) {
    return 'iOS';
  } else {
    return 'Unknown';
  }
}

export function isLocal() {
  return (
    // process.env.NODE_ENV === 'development' &&
    process.env.APPLICATION_PHASE === 'LOCAL'
  );
}

export function numberWithCommas(x) {
  const t = x
    .toString()
    .replace(/,/g, '')
    .split('.');
  return (
    t[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (t[1] ? '.' + t[1] : '')
  );
}

export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function numberWithDecimal(x, decimal) {
  const k = x.toString().replace(/,/g, '');
  let t = '';
  let p = '';
  if (x.length > 6) {
    t = k.substring(0, k.length - decimal);
    p = k.substring(k.length - decimal);
  } else {
    let d = '1';
    if (decimal) {
      for (let i = 0; i < decimal; i++) {
        d += '0';
      }
    }
    t = parseInt(x.toString().replace(/,/g, '')) / parseInt(d);
    p = (parseInt(x.toString().replace(/,/g, '')) % parseInt(d)).toString();
    if (decimal) {
      const looSize = decimal - p.length;
      for (let i = 0; i < looSize; i++) {
        p += '0';
      }
    }
  }

  return t + '.' + p;
}

export function numberTemplateWithDecimalByUnit(x, decimal) {
  const t = numberWithDecimal(x, decimal);
  let val = t.split('.')[0];
  let unit = '';
  const point = '.' + t.split('.')[1];
  if (val / 1000000000 > 0) {
    val = val / 1000000000;
    // unit = ' ' + i18n.t('service_asset_basecoin_TotalSupply_billion');
  } else if (val / 1000000 > 0) {
    val = val / 1000000;
    // unit = ' ' + i18n.t('service_asset_basecoin_TotalSupply_million');
  } else {
    val += point;
  }

  return numberWithCommas(val) + unit;
}

export function numberTemplateWithDecimal(x, decimal) {
  const t = numberWithDecimal(x, decimal);
  let val = t.split('.')[0];
  let point = t.split('.')[1];
  if (decimal) {
    const looSize = decimal - point.length;
    for (let i = 0; i < looSize; i++) {
      point += '0';
    }

    val += '.' + point;
  }

  return numberWithCommas(val);
}

export function numberTemplateWithNotDecimal(x) {
  let val = numberWithCommas(x.split('.')[0]);
  const point = x.split('.')[1];
  if (point) {
    val += '.' + parseInt(point);
  }

  return val;
}

export function numberTemplate(x) {
  const t = x.toString().replace(/,/g, '');
  const val = t.split('.')[0];
  let p = t.split('.')[1] || '0';
  const looSize = 6 - p.length;
  for (let i = 0; i < looSize; i++) {
    p += '0';
  }

  return numberWithCommas(val) + '.' + p;
}
