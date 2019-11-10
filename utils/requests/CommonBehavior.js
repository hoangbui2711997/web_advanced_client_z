export default {
  getNavigators () {
    const url = `${this.innerPrefix()}/navigators`;
    return this.get(url);
  },

  innerPrefix() {
    return '';
  }
}
