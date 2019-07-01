import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      Admin:localStorage.getItem('Admin')||""
    },
    mutations: {
      setAdmin(state,token){
          state.Admin=token;
          localStorage.setItem('Admin',token);
      },
      removeAdmin(state){
          state.Admin="";
          localStorage.removeItem('Admin');
      }
    }
  })

export default store;