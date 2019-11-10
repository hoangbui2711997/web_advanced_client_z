export default {
  addToCart (params) {
    const url = '/products/add-to-cart';
    return this.post(url, params);
  },
  getCartsInfo () {
    const url = '/products/cart-info';
    return this.get(url);
  },
  removeProductInCart (params) {
    const url = '/products/cart';
    return this.del(url, params);
  },
}