export default {
  innerPrefix () {
    return '/user';
  },

  login (params) {
    const url = '/user/login';
    return this.post(url, params);
  },

  signup (params) {
    const url = '/user/signup';
    return this.post(url, params);
  },

  activateAccount (token) {
    const url = `/user/signup/activate/${token}`;
    return this.post(url);
  },

  logout () {
    const url = '/user/logout';
    return this.post(url)
  },

  getCurrentUser () {
    const url = '/user/current';
    return this.get(url);
  },

  updateUser (params) {
    const url = '/user';
    return this.post(url, params);
  },

  insertOrUpdateBookAddress (params) {
    const url = '/user/add-address-book';
    return this.get(url, params);
  },

  getAddressBooks () {
    const url = '/user/address-books';
    return this.get(url);
  },

  getPayment () {
    const url = '/user/payment';
    return this.get(url);
  }
}
