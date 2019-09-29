export default {
  getTestUsers (params) {
    const url = '/test-users';
    return this.get(url, params);
  }
}