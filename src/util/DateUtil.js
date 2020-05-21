'use strict';

class DateUtil {
  dateFormatter(format, timeStamp) {
    if (timeStamp && Math.floor(timeStamp).toString().length == 10)
      timeStamp = timeStamp * 1000;

    const date = new Date(timeStamp);
    const hours = date.getHours();

    const dateFormat = {
      yyyy: date.getFullYear(),
      mm: this.convert2Digit(date.getMonth() + 1),
      m: date.getMonth() + 1,
      dd: this.convert2Digit(date.getDate()),
      d: date.getDate(),
      mi: this.convert2Digit(date.getMinutes()),
      // m: date.getMinutes(),
      ss: this.convert2Digit(date.getSeconds()),
    };

    if (hours < 10) {
      dateFormat.hh = '0' + hours;
      dateFormat.HH = '0' + hours;
      dateFormat.h = hours === 0 ? 12 : hours;
      dateFormat.H = hours;
    } else {
      dateFormat.hh = hours;
      dateFormat.HH = hours;
      dateFormat.h = hours;
      dateFormat.H = hours;

      /*
      if (hours > 12) {
        dateFormat.hh = hours - 12 === 0 ? 12 : hours - 12;
        dateFormat.h = hours - 12 === 0 ? 12 : hours - 12;
      }
      */
    }

    return format.replace(/{\w+}/g, (match) => {
      const key = match.replace('{', '').replace('}', '');
      return typeof dateFormat[key] !== 'undefined' ? dateFormat[key] : match;
    });
  }

  getDateString(timeStamp) {
    if (timeStamp) {
      if (Math.floor(timeStamp).toString().length == 10)
        timeStamp = timeStamp * 1000;
      const date = new Date(timeStamp);
      const year = date.getFullYear();
      const month = this.convert2Digit(date.getMonth() + 1);
      const day = this.convert2Digit(date.getDate());

      return year + '.' + month + '.' + day;
    } else {
      return null;
    }
  }

  getDiffDate(timeStamp) {
    if (timeStamp) {
      if (Math.floor(timeStamp).toString().length == 10)
        timeStamp = timeStamp * 1000;

      const today = new Date();
      const inputDate = new Date(timeStamp);
      const currDay = 24 * 60 * 60 * 1000; // 일 (시*분*초*밀리세컨)
      // const currMonth = currDay * 30; // 월

      // 시간 초기화
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      // return parseInt((today-inputDate) / currDay);
      return Math.floor((today - inputDate) / currDay);
    } else {
      return null;
    }
  }

  convert2Digit(val) {
    if (String(val).length === 1 && parseInt(val) < 10) {
      return '0' + val;
    } else {
      return val;
    }
  }

  getGapTime(d, type) {
    const old = new Date(d).getTime();
    const now = new Date().getTime();
    const gap = now - old;
    if (type === 'H') {
      return gap / 1000 / 60 / 60;
    } else if (type === 'M') {
      return gap / 1000 / 60;
    } else if (type === 'S') {
      return gap / 1000;
    } else {
      return gap;
    }
  }

  getGapTimeWithTimeStamp(d, type) {
    const old = d;
    const now = new Date().getTime();
    const gap = now - old;
    if (type === 'H') {
      return gap / 1000 / 60 / 60;
    } else if (type === 'M') {
      return gap / 1000 / 60;
    } else if (type === 'S') {
      return gap / 1000;
    } else {
      return gap;
    }
  }

  convertGapTime(gap) {
    const hour = parseInt(gap / 3600);
    const min = parseInt((gap % 3600) / 60);
    const sec = parseInt((gap % 3600) % 60);

    let t = '';

    if (hour < 10) t = '0' + hour + ':';
    else t = hour + ':';

    if (min < 10) t += '0' + min + ':';
    else t += min + ':';

    if (sec < 10) t += '0' + sec;
    else t += sec;

    return t;
  }

  convertGapTime2(gap) {
    const min = parseInt((gap % 3600) / 60);
    const sec = parseInt((gap % 3600) % 60);

    let t = '';

    if (min < 10) t += '0' + min + ':';
    else t += min + ':';

    if (sec < 10) t += '0' + sec;
    else t += sec;

    return t;
  }

  convertGapTimeStr(gap) {
    const hour = parseInt(gap / 3600);
    const min = parseInt((gap % 3600) / 60);
    const sec = parseInt((gap % 3600) % 60);
    const days = parseInt(hour / 24);

    let t = '';

    if (days > 0) t = days + 'day';

    if (hour > 0 && t === '') t = hour + 'hr';
    else t += ' ' + hour + 'hr';

    if (min > 0 && t === '') t = min + 'mins';
    else t += ' ' + min + 'mins';

    if (sec > 0 && t === '') t = sec + 'secs';
    else t += ' ' + sec + 'secs';

    return t;
  }

  getGapTimeStr(d) {
    const old = new Date(d).getTime();
    const now = new Date().getTime();
    let gap = now - old;

    let hour = Math.floor(gap / 1000 / 60 / 60);
    gap -= hour * 1000 * 60 * 60;
    const min = Math.floor(gap / 1000 / 60);
    gap -= min * 1000 * 60;
    const sec = Math.floor(gap / 1000);
    const days = parseInt(hour / 24);
    hour = parseInt(hour % 24);

    let t = '';

    if (days > 1) t = days + 'days';
    else if (days > 0) t = days + 'day';

    if (hour > 1) {
      if (t === '') t = hour + 'hrs';
      else t += ' ' + hour + 'hrs';
    } else if (hour > 0) {
      if (t === '') t = hour + 'hr';
      else t += ' ' + hour + 'hr';
    }

    if (min > 1) {
      if (t === '') t = min + 'mins';
      else t += ' ' + min + 'mins';
    } else if (min > 0) {
      if (t === '') t = min + 'min';
      else t += ' ' + min + 'min';
    }

    if (sec > 1) {
      if (t === '') t = sec + 'secs';
      else t += ' ' + sec + 'secs';
    } else if (sec > 0) {
      if (t === '') t = sec + 'sec';
      else t += ' ' + sec + 'sec';
    }

    t += ' ago';

    return t;
  }

  getGapTimeStr2(gap) {
    let hour = Math.floor(gap / 1000 / 60 / 60);
    gap -= hour * 1000 * 60 * 60;
    const min = Math.floor(gap / 1000 / 60);
    gap -= min * 1000 * 60;
    const sec = Math.floor(gap / 1000);
    const days = parseInt(hour / 24);
    hour = parseInt(hour % 24);

    let t = '';

    if (days > 1) t = days + 'days';
    else if (days > 0) t = days + 'day';

    if (hour > 1) {
      if (t === '') t = hour + 'hrs';
      else t += ' ' + hour + 'hrs';
    } else if (hour > 0) {
      if (t === '') t = hour + 'hr';
      else t += ' ' + hour + 'hr';
    }

    if (min > 1) {
      if (t === '') t = min + 'mins';
      else t += ' ' + min + 'mins';
    } else if (min > 0) {
      if (t === '') t = min + 'min';
      else t += ' ' + min + 'min';
    }

    if (sec > 1) {
      if (t === '') t = sec + 'secs';
      else t += ' ' + sec + 'secs';
    } else if (sec > 0) {
      if (t === '') t = sec + 'sec';
      else t += ' ' + sec + 'sec';
    }

    t += ' ago';

    return t;
  }
}

const dateUtil = new DateUtil();
export default dateUtil;
