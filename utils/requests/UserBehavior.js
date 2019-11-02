export default {
  getZipcode (id) {
    return this.get(`/zipcode/${id}`);
  }
}