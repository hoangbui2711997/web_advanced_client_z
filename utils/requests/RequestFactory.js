import UserBehavior from "~/utils/requests/UserBehavior";
import CommonBehavior from "~/utils/requests/CommonBehavior";
import ProductBehavior from "~/utils/requests/common/ProductBehavior";
import ProgramBehavior from "~/utils/requests/common/ProgramBehavior";
import CartBehavior from "~/utils/requests/user/checkout/CartBehavior";
import InfoBehavior from "~/utils/requests/user/InfoBehavior";
import PasswordBehavior from "~/utils/requests/user/PasswordBehavior";
import ChatBehavior from "~/utils/requests/user/ChatBehavior";
import qs from 'qs';

const requestMap = {
  UserBehavior,
  CommonBehavior,
  ProductBehavior,
  CartBehavior,
  InfoBehavior,
  PasswordBehavior,
  ProgramBehavior,
  ChatBehavior,
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
    console.log($axios, 'client_____');
    return requestMap[requestName];
  }

  static async get (url, params = {}, cancelToken) {
    console.log(`get from server`);
    try {
      const config = {
        params: {
          ...params,
          // ...{ debug: true }
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        },
        // cancelToken: cancelToken ? cancelToken.token : undefined,
      };
      console.log(config, "config");
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
    console.log(response);
    console.log(response);
    if (!!response.data && !!response.data.original) {
      return response.data.original;
    }
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
    if (!err.original) {
      return err.original.message;
    }
    throw err;
  }

  static getUrlPrefix () {
    return '/api';
  }
}
