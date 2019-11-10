export default {
  innerPrefix () {
    return '/user/info'
  },

  getUserInfo () {
    const url = `${this.innerPrefix()}`;
    return this.get(url);
  },

  updateUserInfo (params) {
    const url = `${this.innerPrefix()}/update`;
    return this.post(url, params);
  },
}
