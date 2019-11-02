export default {
  getUrlInternalPrefix () {
    return '/auth'
  },
  getUsers (params) {
    const url = `${this.getUrlInternalPrefix()}/users`;
    return this.get(url, params);
  },
  addUser (params) {
    const url = `${this.getUrlInternalPrefix()}/user`;
    return this.post(url, params);
  },
  delUser (params) {
    const url = `${this.getUrlInternalPrefix()}/user`;
    return this.del(url, params);
  },
  getProducts (params) {
    const url = `${this.getUrlInternalPrefix()}/products`;
    return this.get(url, params);
  },
}