import Vue from 'vue'
// import VueRx from 'vue-rx'
// import Rx from 'rxjs'
import App from './App.vue'

// Vue.use(VueRx, Rx)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
