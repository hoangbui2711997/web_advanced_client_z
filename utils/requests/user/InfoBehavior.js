export default {
  innerPrefix () {
    return '/user/info'
  },

  getUserInfo () {
    const url = '/user/info';
    return this.get(url);
  },

  updateUserInfo (params) {
    const url = '/user/info/update';
    return this.post(url, params);
  },
}
