const fs = require("fs");
const gUsers = require("../data/users.json");


function save(userInfo) {
  console.log("User being saved by BE", userInfo);
  var savedUser;
  if (userInfo._id) {
    // UPDATE
  } else {
    const { fullname, username, password } = userInfo;
    savedUser = {
      _id: _makeId(),
      fullname,
      username,
      password,
    };
    savedUser.createdAt = savedUser.updatedAt = Date.now();
    gUsers.unshift(savedUser);
  }
  return _saveUsersToFile().then(() => {
    savedUser = { ...savedUser };
    delete savedUser.password;
    return savedUser;
  });
}

function getById() {
  console.log("Get user by ID by BE");
}

function checkLogin(credentials) {
  var user = gUsers.find(
    (user) =>
      user.username === credentials.nickname &&
      user.password === credentials.password
  );

  if (user) {
    user = { ...user };
    delete user.password;
  }
  return Promise.resolve(user);
}

module.exports = {
  save,
  getById,
  checkLogin,
};

function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveUsersToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile("data/users.json", JSON.stringify(gUsers, null, 2), (err) => {
      if (err) {
        console.log(err);
        reject("Cannot write to file");
      } else {
        console.log("Wrote Successfully!");
        resolve();
      }
    });
  });
}
