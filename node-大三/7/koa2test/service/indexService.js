const users = new Map([['tom', '123456'], ['jack', '654321']]);
module.exports = {
  checkLogin: async(username, password) => {
    let userDataPs = users.get(username);
    if(userDataPs) {
      if(userDataPs == password) {
        return true;
      }
    }
    return false;
  }
}