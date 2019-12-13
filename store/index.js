const cookieparser = process.server ? require('cookieparser') : undefined;
import rf from "~/utils/requests/RequestFactory";

export const state = () => ({
  locales: ['vi', 'en'],
  locale: 'vi',
  user: {},
});

export const getters = {
  getTokenIfExist () {

  },
  getBalance (state) {
    return state.user.balance;
  },
  getUser (state) {
    return state.user;
  },
  getConversationId (state) {
    return state.user.conversation.id;
  },
};

export const mutations = {
  setToken () {

  },
  setLang (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  fetchUser (state, data) {
    state.user = data;
  },
};

export const actions = {
  async nuxtServerInit ({ dispatch, commit }, { $axios, req }) {
    // console.log(Object.keys(context), "Object.keys(context)");
    // console.log(Object.keys(context.req), "Object.keys(context.req)");
    // console.log(Object.keys(context.req.headers), "Object.keys(context.req.headers)");
    // console.log(cookieparser.parse(context.req.headers.cookie), "parsed cookie");

    // let token = null;
    // console.log(req.headers.cookie, "req.headers.cookie");
    if (req.headers.cookie) {
      let parsed = cookieparser.parse(req.headers.cookie);
      try {
        const token = parsed.token;
        commit('auth/setToken', token);
        const { data } = await rf.getBehaviors('UserBehavior', $axios).getCurrentUser();
        console.log(data, "data_________-");
        commit('fetchUser', data);
      } catch (e) {
        console.error(e);
      }
    }
  },
};
