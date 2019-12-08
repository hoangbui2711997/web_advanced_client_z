import Vue from 'vue';
import _ from 'lodash';
import BigNumber from 'bignumber.js';
import { mapGetters } from 'vuex';
import vClickOutside from 'v-click-outside';
import Dropdown from "~/components/dropdown/Dropdown";
import DropdownMenu from "~/components/dropdown/DropdownMenu";
import DropdownItem from "~/components/dropdown/DropdownItem";
import InfiniteLoading from 'vue-infinite-loading';
import VeeValidate, { Validator } from 'vee-validate';
import qs from 'qs';

Vue.component('dropdown', Dropdown);
Vue.component('dropdown-menu', DropdownMenu);
Vue.component('dropdown-item', DropdownItem);
Vue.use(vClickOutside);
Vue.use(VeeValidate);
Vue.use(InfiniteLoading, {
  props: {
    spinner: 'default',
    /* other props need to configure */
  },
  system: {
    throttleLimit: 1000,
    /* other settings need to configure */
  },
  slots: {
    noMore: 'No more data',
  }
});

const instances = {};


export default function ({ $axios, store, app, route, redirect }) {
	$axios.onRequest((config) => {
		config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		config.headers.common['Content-Type'] = 'application/json';
		config.headers.common['Accept'] = 'application/json';
		if (!!store.state.auth.token) {
			config.headers.common['Authorization'] = store.state.auth.token;
		} else {
			delete config.headers.common['Authorization'];
			// redirect('/auth/login');
		}
	})
}

Vue.directive('resetError', {
	// When the bound element is inserted into the DOM...
	inserted (el) {

	},
	// Called only once, when the directive is first bound to the element. This is where you can do one-time setup work.
	bind (el, binding, vnode) {
		el.addEventListener('focus', (event) => {
			_.set(vnode.context.$data, 'warning', []);
		});
	},
	// Called after the containing component’s VNode has updated, but possibly before its children have updated.
	// The directive’s value may or may not have changed, but you can skip unnecessary updates by comparing the binding’s current and old values (see below on hook arguments).called after the containing component’s VNode has updated, but possibly before its children have updated. The directive’s value may or may not have changed, but you can skip unnecessary updates by comparing the binding’s current and old values (see below on hook arguments).
	update () {

	},
	// called after the containing component’s VNode and the VNodes of its children have updated.
	componentUpdated () {

	},
	// called only once, when the directive is unbound from the element.
	unbind () {

	}
});

Vue.mixin({
	data () {
		return {
			mapControls: {},
		};
	},
	computed: {
    ...mapGetters({ isAuthenticated: 'auth/isAuthenticated' }),
		'_' () {
			return _;
		},
		'BigNumber' () {
			return BigNumber;
		},
	},
	methods: {
	  showError (message) {
      this.$message({
        type: 'error',
        message
      });
    },
    success (message) {
      this.$message({
        type: 'success',
        message
      });
    },
    resetErrors () {
      this.errors.clear();
    },
		async get (url, params = {}, cancelToken) {
		  console.log(`get from client`);
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


				const response = await this.$axios.$get(this.getUrlPrefix() + url, config);
				return this._responseHandler(response);
			} catch (error) {
				this._errorHandler(error);
			}
		},
		async put (url, data = {}) {
			try {
				const response = await this.$axios.$put(this.getUrlPrefix() + url, data);
				return this._responseHandler(response);
			} catch (error) {
				this._errorHandler(error);
			}
		},
		async post (url, data = {}) {
			try {
				const response = await this.$axios.$post(this.getUrlPrefix() + url, data);
				return this._responseHandler(response);
			} catch (error) {
				this._errorHandler(error);
			}
		},
		async del (url, data = {}) {
			try {
				const response = await this.$axios.$delete(this.getUrlPrefix() + url, { data });
				return this._responseHandler(response);
			} catch (error) {
				this._errorHandler(error);
			}
		},
		async _responseHandler (response) {
			// const data = response.data;
			// await this._checkMasterdataVersion(data);
			// console.log(response, "response");
      if (!!response.data && !!response.data.original) {
        return response.data.original;
      }
      return response;
		},
		// async _checkMasterdataVersion (data) {
		//   if (MasterdataUtils.isDataChanged(data.dataVersion)) {
		//     await MasterdataUtils.clearMasterdata();
		//     window.app.$store.dispatch('getMasterdata');
		//   }
		// }
		_errorHandler (err) {
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
      if (!!err.data && !!err.data.original) {
        return err.data.original.message;
      }
			throw err;
		},
		getUrlPrefix () {
			return '/api';
		},
	},
  filters: {
	  div (a, b) {
	    return new BigNumber(a).div(new BigNumber(b)).toString();
    },
    mul (a, b) {
      return new BigNumber(a).times(new BigNumber(b)).toString();
    },
    minus (a, b) {
      return new BigNumber(a).minus(new BigNumber(b)).toString();
    },
    plus (a, b) {
      return new BigNumber(a).plus(new BigNumber(b)).toString();
    },
  }
});
