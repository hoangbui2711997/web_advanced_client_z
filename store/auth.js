// const moment = require('moment');
const { DateTime } = require('luxon');
const Cookie = process.client ? require('js-cookie') : undefined;

export const state = () => ({
  token: ''
});

export const mutations = {
  setToken (state, token) {
    state.token = token;
  },
  setTokenEmpty (state) {
    state.token = '';
  }
};

export const getters = {
  isAuthenticated (state) {
    return !!state.token;
  }
};

export const actions = {
  initAuth ({ dispatch, state, commit }, credential) {
    return new Promise(resolve => {
      const { access_token } = credential;
      commit('setToken', "Bearer " + access_token);
      dispatch('saveToken', credential);
      Cookie.set('token', state.token);
      resolve(state.token || {});
    })
  },
  tryAuthServer ({ commit }, req) {
    const parsed = cookieparser.parse(req.headers.cookie || '');
    try {
      const token = parsed.token;
      const expired_at = parsed.expired_at;
      if (!isNeedToReAuth(token, expired_at) || !!state.token) {
        commit('setToken', token);
        return true;
      }
    } catch (err) {
      // No valid cookie found
    }
    return false;
  },
  tryAuthClient ({ commit }) {
    const token = localStorage.getItem('token');
    const expired_at = localStorage.getItem('expired_at');

    if (!isNeedToReAuth(token, expired_at)) {
      if (!!token) {
        commit('setToken', token);
        return true;
      }
    }

    return false;
  },
  saveToken ({ state }, { expired_at }) {
    localStorage.setItem('token', state.token);
    localStorage.setItem('expired_at', expired_at);
  },
  logout ({ commit }) {
    localStorage.removeItem('token');
    localStorage.removeItem('expired_at');
    Cookie.remove('token');
    commit('setTokenEmpty');
  },
};

function isNeedToReAuth (token, expired_at) {
  return !(!!expired_at || !!token || DateTime.fromSQL(expired_at, { zone: 'utc' }) > DateTime.utc());
}
