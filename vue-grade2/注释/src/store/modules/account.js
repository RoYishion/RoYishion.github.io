import { setToken, removeToken } from "@/util/auth";
import { getUserInfo } from "@/services/user";

export default {
  namespaced: true,
  state: {  // state 中的数据类似于vue中的data，只不过可以通过引用全局调用
    user: undefined,
    roles: null,
  },
  mutations: { //  只有通过commit 一个mutations中的方法才能改变state中的数据
    // 将当前用户信息写入store中
    setUser(state, user) { 
      state.user = user;
      setToken(user.userId);
    },
    // 将当前角色信息写入store中
    setRoles(state, roles) {
      state.roles = roles;
    },
    // 清除store中存储的用户信息, 角色信息
    resetState(state) {
      state.user = undefined;
      state.roles = null;
    },
  },
  actions: {
    // 获取用户信息
    getUserInfo(context, userId) {  // 更新user信息，第一次获取用户信息
      return new Promise((resolve, reject) => {
        getUserInfo(userId)
          .then((res) => {
            if (res.success) {
              context.commit("setUser", {
                userId: res.data.userId,
                userName: res.data.userName,
                userNo: res.data.userNo,
              });
              context.commit("setRoles", res.data.userRole);
              resolve();
            } else {
              reject;
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 重置登录状态, 清除用户信息, 角色信息
    resetToken({ commit }) {
      return new Promise((resolve) => {
        removeToken();
        commit("resetState");
        resolve();
      });
    },
  },
};