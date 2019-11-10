export default {
  innerPrefix () {
    return '/user/password'
  },

  requestResetPassword (params) {
    const url = `${this.innerPrefix()}/create`;
    return this.post(url, params);
  },

  activeResetPassword (token) {
    const url = `${this.innerPrefix()}/find/${token}`;
    return this.get(url);
  },

  resetPassword (params) {
    const url = `${this.innerPrefix()}/reset`;
    return this.post(url, params);
  },
}
