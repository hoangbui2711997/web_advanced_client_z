export default {
  innerPrefix () {
    return '/common/product'
  },

  getProducts (params) {
    const url = '/common/product/list';
    return this.get(url, params);
  },

  getProduct (slug) {
    const url = `/common/product/${slug}`;
    return this.get(url);
  },

  getZipcode (id) {
    const url = `/common/product/zipcode/${id}`;
    return this.get(url);
  },
}
