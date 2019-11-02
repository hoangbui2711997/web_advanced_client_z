import Vue from 'vue';
import _ from 'lodash';
// for package can render on server -- maybe
import SmoothScrollbar from '../components/common/SmoothScrollbar.vue';
import Datatable from "~/components/common/Datatable"
import ElementLoading from "vue-element-loading";

Vue.component(SmoothScrollbar.name, SmoothScrollbar);
Vue.component(Datatable.name, Datatable);
Vue.component('VueElementLoading', ElementLoading);

// Vue.mixin({
//   computed: {
//     '_' () {
//       return _;
//     }
//   }
// });

export default ({ app }) => {

}
