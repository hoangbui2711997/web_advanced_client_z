export default {
  innerPrefix () {
    return '/user/password'
  },

  requestResetPassword (params) {
    const url = '/user/password/create';
    return this.post(url, params);
  },

  activeResetPassword (token) {
    const url = `/user/password/find/${token}`;
    return this.get(url);
  },

  resetPassword (params) {
    const url = '/user/password/reset';
    return this.post(url, params);
  },
}
