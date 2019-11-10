export default {
  innerPrefix () {
    return '/user/cart'
  },

  addToCart (params) {
    const url = `${this.innerPrefix()}/add`;
    return this.post(url, params);
  },
  getCartInfo () {
    const url = `${this.innerPrefix()}/info`;
    return this.get(url);
  },
  removeProductInCart (params) {
    const url = `${this.innerPrefix()}/product`;
    return this.del(url, params);
  },
}
