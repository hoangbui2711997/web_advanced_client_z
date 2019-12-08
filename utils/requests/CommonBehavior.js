export default {
  innerPrefix () {
    return '/common';
  },

  getNavigators () {
    const url = '/common/navigators';
    return this.get(url);
  },

  getLocations () {
    const url = '/common/locations';
    return this.get(url);
  },

  getZipcodes(params) {
    const url = '/common/zipcodes';
    return this.get(url, params);
  },

  getNodeTypes(params) {
    const url = '/common/note-types';
    return this.get(url, params);
  },
}
