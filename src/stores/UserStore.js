// stores/UserStore.js
import { makeAutoObservable } from "mobx";

class UserStore {
  myUser = null;
  isAuthenticated = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.myUser = user;
    console.log("UserStore setUser", user);
  }

  setAuth(auth) {
    this.isAuthenticated = auth;
  }

  setLoading(loading) {
    this.isLoading = loading;
  }

}

const userStore = new UserStore();
export default userStore;
