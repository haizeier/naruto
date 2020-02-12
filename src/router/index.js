import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    // 访问默认页面是，重定向到登录页
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/home",
    component: Home
  }
];

const router = new VueRouter({
  routes
});

// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问的路径、from：从哪个路径跳转而来、next()：放行、next("/xx")：强制跳转到xx
  if (to.path == "/login" || to.path == "/register") {
    return next();
  }
  const authorization = window.localStorage.getItem("authorization");
  if (!authorization) {
    return next("/login");
  } else {
    return next();
  }
});

export default router;
