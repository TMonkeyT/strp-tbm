import Vue from 'vue';
import Axios from 'Axios';
import Moment from 'moment';
window.axios = Axios;
window.moment = Moment;

import carlist from "./components/car-list.vue"

var app = new Vue({
  el: '#app',
  components: {
    carlist,
  }
})