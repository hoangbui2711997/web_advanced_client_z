export default {
  innerPrefix () {
    return '/user'
  },

  login (params) {
    const url = `${this.innerPrefix()}/login`;
    return this.post(url, params);
  },

  signup (params) {
    const url = `${this.innerPrefix()}/signup`;
    return this.post(url, params);
  },

  activateAccount (token) {
    const url = `${this.innerPrefix()}/signup/activate/${token}`;
    return this.post(url);
  },

  logout () {
    const url = `${this.innerPrefix()}/logout`;
    return this.post(url)
  },

  getUser () {
    const url = `${this.innerPrefix()}`;
    return this.get(url);
  },

  updateUser (params) {
    const url = `${this.innerPrefix()}`;
    return this.post(url, params);
  },
}
