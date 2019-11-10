import UserBehavior from "~/utils/requests/UserBehavior";
import CommonBehavior from "~/utils/requests/CommonBehavior";
import ProductBehavior from "~/utils/requests/common/ProductBehavior";
import CartBehavior from "~/utils/requests/user/CartBehavior";
import InfoBehavior from "~/utils/requests/user/InfoBehavior";
import PasswordBehavior from "~/utils/requests/user/PasswordBehavior";

const requestMap = {
  UserBehavior,
  CommonBehavior,
  ProductBehavior,
  CartBehavior,
  InfoBehavior,
  PasswordBehavior,
};

export default class RequestFactory {
  static $axios = undefined;

  static getBehaviors (requestName, $axios = undefined) {
    if (!requestMap[requestName]) {
      throw new Error(`Invalid delegate name: ${requestName}`);
    }
    if (!!$axios) {
      console.log($axios, 'app.axios_____');
      RequestFactory.$axios = $axios;

      return {get: RequestFactory.get, put: RequestFactory.put, post: RequestFactory.post, del: RequestFactory.del, ...requestMap[requestName] };
    }

    return requestMap[requestName];
  }

  static async get (url, params = {}, cancelToken) {
    try {
      const config = {
        params: {
          ...params,
          // ...{ debug: true }
        },
        // cancelToken: cancelToken ? cancelToken.token : undefined,
      };
      const response = await RequestFactory.$axios.$get(RequestFactory.getUrlPrefix() + url, config);
      return RequestFactory._responseHandler(response);
    } catch (error) {
      RequestFactory._errorHandler(error);
    }
  }

  static async put (url, data = {}) {
    try {
      const response = await RequestFactory.$axios.$put(RequestFactory.getUrlPrefix() + url, data);
      return RequestFactory._responseHandler(response);
    } catch (error) {
      RequestFactory._errorHandler(error);
    }
  }

  static async post (url, data = {}) {
    try {
      const response = await RequestFactory.$axios.$post(RequestFactory.getUrlPrefix() + url, data);
      return RequestFactory._responseHandler(response);
    } catch (error) {
      RequestFactory._errorHandler(error);
    }
  }

  static async del (url, data = {}) {
    try {
      const response = await RequestFactory.$axios.$delete(RequestFactory.getUrlPrefix() + url, { data });
      return RequestFactory._responseHandler(response);
    } catch (error) {
      RequestFactory._errorHandler(error);
    }
  }

  static async _responseHandler (response) {
    // const data = response.data;
    // await RequestFactory._checkMasterdataVersion(data);
    // console.log(response, "response");
    console.log(`done`);
    return response;
  }

  // async _checkMasterdataVersion (data) {
  //   if (MasterdataUtils.isDataChanged(data.dataVersion)) {
  //     await MasterdataUtils.clearMasterdata();
  //     window.app.$store.dispatch('getMasterdata');
  //   }
  // }
  static _errorHandler (err) {
    // if (err.message === 'Network Error' && err.response && err.response.status === 503) {
    // Vue.prototype.$isMaintenanceMode = true;
    // window.app.$broadcast('MaintenanceSetting', 1);
    // }
    // window.app.$broadcast('EVENT_COMMON_ERROR', err);
    // if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
    //   window.app.$modal.show('warning-login-dialog');
    // }
    // if (err.response && err.response.status === 503) { // maintenance
    //   window.location.reload();
    // }
    console.log(`err`);
    throw err;
  }

  static getUrlPrefix () {
    return '/api';
  }
}
