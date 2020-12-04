import axios from 'axios';

export default {
  getNewsfeed(fsym) {
    return axios.get('https://min-api.cryptocompare.com/data/v2/news/', {
      params: {
        lang: 'EN',
        fsym,
      },
    });
  },
  getHisto(type, fsym, tsym, limit) {
    return axios.get(`https://min-api.cryptocompare.com/data/v2/histo${type}`, {
      params: {
        fsym,
        tsym,
        limit,
      },
    })
      .then((result) => result.data.Data.Data);
  },
};
