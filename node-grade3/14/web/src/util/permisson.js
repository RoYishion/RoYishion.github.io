import router from "@/router";
import {Message} from "element-ui";
import {getToken} from "@/util/auth";
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
  const userId = getToken();

  if (!userId) {
    await store.dispatch("account/resetToken"); // 清空vuex里过期的token
    if (whiteList.indexOf(to.path) >= 0) {
      next();
      return;
    }
    next("/");
  } else {
    try {
      // 通过vuex action 异步获取用户信息
      console.log(userId);
      await store.dispatch("account/getUserInfo", { userId: userId });
      if (whiteList.indexOf(to.path) >= 0) {
        next();
        return;
      } else {
        if (to.matched.length === 0) {
          next({ path: "/404", replace: true });
        } else {
          if (hasPermission(store.state.account.roles, to.meta)) {
            next();
          } else {
            next({ path: "/502", replace: true });
          }
        }
      }
    } catch (error) {
      console.log(error);
      await store.dispatch("account/resetToken");
      Message.error("用户信息异常，请尝试重新登陆");
      next("/");
    }
  }
});