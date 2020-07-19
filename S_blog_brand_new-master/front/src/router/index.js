import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import store from "../store";
Vue.use(VueRouter);

const rejectNotAuthUser = (to, from, next) => {
  if(store.state.isLoggedIn == false){
    next("/Login");
  }else{
    next();
  }
}
const rejectAuthUser = (to, from, next) => {
  if(store.state.isLoggedIn){
    next("/");
  }else{
    next();
  }
}
const routes = [
  {
    path: "/",
    name: "Home",
    beforeEnter: rejectNotAuthUser,
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: rejectAuthUser,
    component: Login
  },
  {
    path: "/signup",
    name: "Signup",
    beforeEnter: rejectAuthUser,
    component: Signup
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
