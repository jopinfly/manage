import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import router from './route'
import store from './store/index'
Vue.use(iView);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
    store,
}).$mount('#app')
