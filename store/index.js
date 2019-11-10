const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  locales: ['vi', 'en'],
  locale: 'vi'
});

export const getters = {
  getTokenIfExist () {

  }
};

export const mutations = {
  setToken () {

  },
  setLang (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
};

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req }) {
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
      } catch (e) {
        console.error(e);
      }
    }
  },
};
