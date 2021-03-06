import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from '../router';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    isLoggedIn: false,
  },
  mutations: {
    login: (state, { userId }) => {
      state.userId = userId;
      state.isLoggedIn = true;
    },
    loginFail: (state) => {
      state.isLoggedIn = false;
    },
  },
  actions: {
    login: (context, { userName, password }) => {
      axios
        .post(process.env.VUE_APP_BASE_API_URL + 'user/login', { userName, password })
        .then(res => {
          if (res.status == 200) {
            // header에서 authorization 가져오기
            const token = res.headers.authorization;
            // 로컬에 저장(token은 굳이 스토어에 저장하지 않는다. 쿠키에 저장할것이기 때문)
            localStorage.setItem('token', token);
            // memberInfo 가져오기
            context.dispatch('getAndSetMemberInfo');
          }
        })
        .catch(error => {
          console.log(error);
          context.commit('loginFail');
          alert("email, password 확인 해주세요!");
        });
    },
    signin: (context, { userName, password }) => {
      axios.post(process.env.VUE_APP_BASE_API_URL + 'user/join', {
        userName, password
      })
        .then(res => {
          if (res.status == 200) {
            router.push("/login");
          } else{
            alert("실패 하였습니다");
          }
        });
    },
    getAndSetMemberInfo: (context) => {
      const token = localStorage.getItem("token").toString();
      axios.post(process.env.VUE_APP_BASE_API_URL + 'user/user_info',
        {},
        {
          headers: { authorization: token }
        })
        .then(res => {
          if (res.status == 200){
            const userId = res.data.data;
            context.commit('login', { userId });
            router.push({name:"Home"});
          } else {
            context.commit('loginFail');
          }
        });
    },
    logout: (context) => {
      context.commit('loginFail');
      localStorage.setItem('token', '');
      router.push({name:'Login'});
    }
  }
});
