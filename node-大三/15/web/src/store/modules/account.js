import { setToken, removeToken } from "@/util/auth";
import { getUserInfoById } from "@/services/user";

export default {
  namespaced: true,
  state: {
    user: undefined,
    roles: null,
    token: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    resetState(state) {
      state.user = undefined;
      state.token = null;
    },
    setToken(state, token) {
      console.log(token);
      state.token = token;
    },
    setRoles(state, roles) {
      state.roles = roles.rolename;
    }
  },

  actions: {
    // 更新user信息，第一次获取用户信息
    getUserInfo(context, params) {
      return new Promise((resolve, reject) => {
        getUserInfoById(params)
          .then((res) => {
            if (res.success) {
              context.commit("setUser", res.data);
              context.commit("setRoles", res.data.role);
              resolve();
            } else {
              reject();
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