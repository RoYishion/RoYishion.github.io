import {setToken, removeToken} from "@/util/auth";
import {getUserInfo} from "@/services/user";

export default {
  namespaced: true,
  state: {
    user: undefined,
    roles: null,
    books: [
      {
        id: 1,
        name: '《红楼梦》',
        date: '1300-01-01',
        price: 85,
        count: 0
      },
      {
        id: 2,
        name: '《水浒传》',
        date: '1900-01-01',
        price: 65,
        count: 0
      },
      {
        id: 3,
        name: '《三国演义》',
        date: '1700-01-01',
        price: 52,
        count: 0
      },
      {
        id: 4,
        name: '《西游记》',
        date: '1500-01-01',
        price: 55,
        count: 0
      }
    ],
    AllPrice: 0
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      setToken(user.userId);
    },
    setRoles(state, roles) {
      state.roles = roles;
    },
    resetState(state) {
      state.user = undefined;
      state.roles = null;
    },

    add(state, index) {
      state.books[index].count ++;
    },
    sub(state, index) {
      state.books[index].count --;
    },
    getAllPrice(state) {
      state.AllPrice = 0;
      for(var i in state.books) {
        state.AllPrice = state.AllPrice + (state.books[i].price * state.books[i].count);
      }
    }
  },
  actions: {
    // 更新user信息，第一次获取用户信息
    getUserInfo(context, userId) {
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
    resetToken({commit }) {
      return new Promise((resolve) => {
        removeToken();
        commit("resetState");
        resolve();
      });
    },
  },
};