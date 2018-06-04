import Vue from 'vue';
import VueMasonry from '../src/index';
import VueDummy from 'vue-dummy';
import DummyJS from 'dummyjs';

Vue.use(VueMasonry);
Vue.use(VueDummy);

const randomColsOptions = [
  { default: 4, 1000: 3, 700: 2, 400: 1 },
  { default: 3, 900: 2, 600: 1 },
  { default: 5, 1000: 4, 800: 3, 500: 2, 400: 1 }
];

// Define a new component called button-counter
Vue.component('dynamically-generated-masonry', {
  methods: {
    onResetClick() {
      this.$forceUpdate();
    }
  },
  render: function (createElement) {
    const childElements = Array(10).fill().map((v, i) => createElement(
      'div',
      {class: 'item'},
      `Item: #${i}: ` + DummyJS.text()
    ));

    const resetButton = createElement('button', {
      style: {
        marginBottom: '10px'
      },
      on: {
        click: this.onResetClick
      }
    }, 'Rebuild Dynamic Layout');

    const colOptions = randomColsOptions[Math.floor(Math.random()*randomColsOptions.length)];

    const masonry = createElement(
      'masonry',
      {
        props: {
          cols: colOptions,
          gutter: { default: '30px', 700: '20px' }
        }
      },
      childElements
    );

    return createElement('div', {}, [resetButton, masonry]);
  },
})

new Vue({
  el: '#app'
});
