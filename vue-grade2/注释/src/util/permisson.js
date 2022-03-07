import router from "@/router";  // 引入路由
import { Message } from "element-ui";
import { getToken } from "@/util/auth";
import store from "@/store";  // 引入store全局

// 权限判断方法
function hasPermission(roles, permissionRoles) {  // 通过角色判断权限
  if (roles == "admin") return true;  // 如果角色是管理员
  if (!permissionRoles) return true;  // 如果要去的路由没有权限限制
  if (permissionRoles.indexOf(roles) >= 0) return true;  // 如果当前登录人的身份在路由的身份限制列表能找到
  return false;
}

// 路由白名单
const whiteList = ["/", "/404", "/502"];

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // 获取令牌判断用户是否登陆
  const userId = getToken();  // 获取当前登录用户
  if (!userId) {  // 如果当前并没有用户，调用store中的函数清空全局state信息
    await store.dispatch("account/resetToken"); // 清空vuex里过期的token
    if (whiteList.indexOf(to.path) >= 0) {  // 如果去的路由正在白名单
      next();  // 跳出钩子函数
      return; // 以下代码不执行
    }
    next("/");
  } else {  // 已登录
    try {
      // 通过vuex action 异步获取用户信息
      console.log(userId);
      await store.dispatch("account/getUserInfo", { userId: userId });  // 获取用户信息
      if (whiteList.indexOf(to.path) >= 0) {  // 如果去的路由在白名单
        next();  // 跳出钩子函数
        return; // 以下代码不执行
      } else {  // 如果去的路由不在白名单
        if (to.matched.length === 0) {  // 把你要去的路由的路径跟路由文件里的路由的路径相匹配，匹配不到返回0
          next({ path: "/404", replace: true });  // 进入404
        } else {
          if (hasPermission(store.state.account.roles, to.meta)) {  // 对比路由和Vuex里面的meta身份限制
            next();  // 有权限
          } else {
            next({ path: "/502", replace: true });  // 无权限
          }
        }
      }
    } catch (error) {
      console.log(error);
      await store.dispatch("account/resetToken");  // 清空vuex里过期的token
      Message.error("用户信息异常，请尝试重新登陆");
      next("/");
    }
  }
});