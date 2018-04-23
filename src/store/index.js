import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from '../apps/login/store';

Vue.use(Vuex)

const modules = {
  LoginModule
}

const store = new Vuex.Store({
    modules
})

export default store
