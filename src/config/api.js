// import Config from './Config';
// import axios from 'axios';

export default {
  /*
  noticeList: function(param) {
    const url =
      Config.API_DOMAIN +
      Config.API.NOTICE_LIST.URI +
      '?page=' +
      (param.page - 1) +
      '&size=' +
      param.size +
      '&chain=' +
      param.chain;
    return axios.get(url);
  },
  */
  noticeList: function() {
    return {
      status: 200,
      list: [
        { no: 5, title: 'test5', date: '2020-05-11' },
        { no: 4, title: 'test4', date: '2020-05-11' },
        { no: 3, title: 'test3', date: '2020-05-11' },
        { no: 2, title: 'test2', date: '2020-05-11' },
        { no: 1, title: 'test1', date: '2020-05-11' },
      ],
    };
  },
};
