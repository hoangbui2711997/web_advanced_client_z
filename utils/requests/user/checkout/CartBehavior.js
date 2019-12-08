export default {
  innerPrefix () {
    return '/user/checkout'
  },

  addToCart (params) {
    const url = '/user/checkout/cart/add';
    return this.post(url, params);
  },
  getCartInfo () {
    const url = '/user/checkout/cart/info';
    console.log(url, '123123123');
    return this.get(url);
  },
  removeProductInCart (params) {
    const url = '/user/checkout/cart/product';
    return this.del(url, params);
  },
}
