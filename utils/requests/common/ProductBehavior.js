export default {
  innerPrefix () {
    return '/common/product'
  },

  getProducts (params) {
    const url = `${this.innerPrefix()}/list`;
    return this.get(url, params);
  },

  getProduct (slug) {
    const url = `${this.innerPrefix()}/${slug}`;
    return this.get(url);
  },

  getZipcode (id) {
    const url = `${this.innerPrefix()}/zipcode/${id}`;
    return this.get(url);
  },
}
