import Vue from 'vue';
import VueMasonry from '../src/index';
import VueDummy from 'vue-dummy';

Vue.use(VueMasonry);
Vue.use(VueDummy);

new Vue({
  el: '#app'
});
