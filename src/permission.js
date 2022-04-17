import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start(); //1.显示进度条提示
  document.title = getPageTitle(to.meta.title); //2.设置title标题
  const hasToken = getToken(); //3.本地存储中拿token

  if (hasToken) {
    //已登录过
    if (to.path === "/login") {
      next({ path: "/" }); //1.如果进入login登录页面直接放行
      NProgress.done(); //2.关闭进度条提示
    } else {
      const hasGetUserInfo = store.getters.name; //去VueX中拿用户信息
      if (hasGetUserInfo) {
        next(); //存在用户信息则放行
      } else {
        try {
          await store.dispatch("user/getInfo"); //不存在，去获取一下用户信息
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetToken");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
