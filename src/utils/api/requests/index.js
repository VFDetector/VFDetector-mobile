import NetInfo from '@react-native-community/netinfo';
import Emitter from '../../Emitter';
import config from './config';
import axios from 'axios';

/**
 * showError
 */
const showError = {
  lostConnection: () => {
    Emitter.emit('show-toast', {
      data: {
        type: 'error',
        title: 'Lost connection with provider',
      },
    });
  },
  unknowError: () => {
    Emitter.emit('show-toast', {
      data: {
        type: 'error',
        title: 'Unknow error occurred',
      },
    });
  },
  noInternet: () => {
    Emitter.emit('show-toast', {
      data: {
        type: 'error',
        title: 'No network connection',
      },
    });
  },
};

/**
 * GET
 * @param {*} url
 * @return {Promise}
 */
const get = async url => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      return axios
        .get(url, {
          headers: config.Header,
        })
        .then(resp => {
          return resp?.data;
        })
        .catch(e => {
          console.log(e);
          showError.lostConnection();
        });
    } else {
      showError.noInternet();
    }
  } catch (error) {
    showError.unknowError();
  }
};

/**
 * POST
 * @param {*} url
 * @param {*} body
 * @return {Promise}
 */
const post = async (url, body) => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      return fetch(url, {
        method: 'POST',
        headers: config.Header,
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(resp => {
          return resp;
        })
        .catch(e => {
          console.log(e);
          showError.lostConnection();
        });
    } else {
      showError.noInternet();
    }
  } catch (error) {
    showError.unknowError();
  }
};

/**
 * DELETE
 * @param {*} url
 * @param {*} body
 * @return {Promise}
 */
const _delete = async (url, body) => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      return axios
        .delete(url, {
          headers: config.Header,
          data: JSON.stringify(body),
        })
        .then(resp => {
          return resp?.data;
        })
        .catch(e => {
          console.log(e);
          showError.lostConnection();
        });
    } else {
      showError.noInternet();
    }
  } catch (error) {
    showError.unknowError();
  }
};

/**
 * PUT
 * @param {*} url
 * @param {*} body
 * @return {Promise}
 */
const put = async (url, body) => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      return fetch(url, {
        method: 'PUT',
        headers: config.Header,
        body: JSON.stringify(body),
      })
        .then(response => response.json())
        .then(resp => {
          return resp;
        })
        .catch(e => {
          console.log(e);
          showError.lostConnection();
        });
    } else {
      showError.noInternet();
    }
  } catch (error) {
    showError.unknowError();
  }
};

/**
 * SREAM
 * @param {*} url
 * @return {Promise}
 */
const stream = async url => {
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      return {
        uri: url,
        method: 'GET',
        headers: config.streamHeader,
      };
    } else {
      showError.noInternet();
    }
  } catch (error) {
    showError.unknowError();
  }
};

export default {post, get, put, stream, _delete};
