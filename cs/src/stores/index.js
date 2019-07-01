import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
      token:localStorage.getItem('token')||"",
      username:localStorage.getItem('username')||""
    },
    mutations: {
      setToken(state,token){
          state.token=token;
          localStorage.setItem('token',token);
      },
      removeToken(state){
          state.token="";
          localStorage.removeItem('token');
      },
      setName(state,newsname){
        state.username=newsname;
        localStorage.setItem('username',newsname);
      },
      removeName(state){
        state.username="";
        localStorage.removeItem('username');
      }
      // setMoney(state,newmoney){
      //   state.money=newmoney
      // }
    }
  })

export default store;