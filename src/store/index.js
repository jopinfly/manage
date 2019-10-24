import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import baseSetting from './module/baseSetting'
import saveInLocal from './piugin/saveInLocal'


Vue.use(Vuex)

export default new Vuex.Store({
  // 开启严格模式
  strict: true,
  modules: {
      baseSetting
  },
  getters,
  plugins: [ saveInLocal ]
})
