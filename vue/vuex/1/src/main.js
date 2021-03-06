import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: function (h) { return h(App) },
}).$mount('#app')