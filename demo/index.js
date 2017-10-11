import Vue from 'vue';
import VueMasonry from '../src/index';

Vue.use(VueMasonry);

new Vue({
  template: `<div id="app">
    <div>hey</div>
    <masonry>
      <div v-for="i in 5">{{i}}</div>
    </masonry>
  </div>`
}).$mount('#app');
