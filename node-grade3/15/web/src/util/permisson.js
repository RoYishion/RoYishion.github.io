import router from "@/router";
import { Message } from "element-ui";
import { getToken } from "@/util/auth";
import store from "@/store";

function hasPermission(roles, permissionRoles) {
  if (roles == "admin") return true;
  if (!permissionRoles) return true;
  if (permissionRoles.indexOf(roles) >= 0) return true;
  return false;
}

// 路由白名单
const whiteList = ["/", "/404", "/502"];

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  if (whiteList.indexOf(to.path) >= 0) {
    next();
    return;
  } else {
    if (!store.state.account.token) {
      if (getToken()) {
        store.commit('account/setToken', getToken());
      } else {
        Message.error("用户认证丢失");
        next("/");
      }
    }
    let tokenString = store.state.account.token;
    let getTokenInfo = JSON.parse(decodeURIComponent(escape(window.atob(tokenString.split('.')[1]))));

    try {
      // 通过vuex异步获取用户信息
      await store.dispatch('account/getUserInfo', { userId: getTokenInfo.userid });
      console.log(store.state.account.user);
      next();
    } catch (error) {
      await store.dispatch('account/resetToken');
      Message.error('用户信息异常，请重新登录');
      next('/');
    }
  }
});