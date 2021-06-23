import { storageService } from "./storage-service.js";

export const userService = {
  login,
  logout,
  getLoggedinUser,
  signup,
};

const STORAGE_KEY = "currUser";
// var gNickname = null;

function login(credentials) {
  return axios
    .post("/api/login", credentials)
    .then((res) => res.data)
    .then((user) => {
      console.log("user =", user);
      storageService.save(STORAGE_KEY, user);
      return user;
    })
    .catch((err) => console.log(err));
}

function logout() {
  console.log("Logging you out");
  return axios
    .post("/api/logout")
    .then((res) => res.data)
    .then(() => {
      storageService.save(STORAGE_KEY, null);
      return null;
    });
}

function signup(userInfo) {
  console.log("userInfo =", userInfo);
  return axios
    .post("/api/signup", userInfo)
    .then((res) => res.data)
    .then((user) => {
      storageService.save(STORAGE_KEY, user);
      return user;
    });
}



function getLoggedinUser() {
  return storageService.load(STORAGE_KEY);
}
