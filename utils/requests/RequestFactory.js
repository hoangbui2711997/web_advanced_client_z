import AdminBehavior from "~/utils/requests/AdminBehavior";
import UserBehavior from "~/utils/requests/UserBehavior";
import TestBehavior from "~/utils/requests/TestBehavior";
import CommonBehavior from "~/utils/requests/CommonBehavior";

const requestMap = {
  AdminBehavior,
  UserBehavior,
  TestBehavior,
  CommonBehavior
};

export default class RequestFactory {

  static getBehaviors (requestName) {
    if (!requestMap[requestName]) {
      throw new Error(`Invalid delegate name: ${requestName}`);
    }
    return requestMap[requestName];
  }
}