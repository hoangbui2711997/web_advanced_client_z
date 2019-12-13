import Vue from 'vue';
// for package can render on server -- maybe
import SmoothScrollbar from '../components/common/SmoothScrollbar.vue';
import Datatable from "~/components/common/Datatable"
import ElementLoading from "vue-element-loading";
import Echo from 'laravel-echo';

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

window.io = require('socket.io-client');

window.Echo = new Echo({
  broadcaster: 'socket.io',
  host: process.env.socket_url,
});



export default ({ app }) => {

}
