export default {
  innerPrefix () {
    return '/common/program'
  },

  getCollectionProducts () {
    const url = `/common/program/collection-products`;
    return this.get(url);
  },
}
