const fs = require("fs");
const gBugs = require("../data/bugs.json");

function query() {
  return Promise.resolve(gBugs);
}

function save(bug) {
  if (bug._id) {
    console.log("Updating =", bug);
  } else {
    bug._id = _makeId();
    gBugs.unshift(bug);
  }
  return _saveDataToFile().then(() => {
    return bug;
  });
}

function getBugById(id) {
  const bug = gBugs.find((bug) => bug._id === id);
  return Promise.resolve(bug);
}

function remove(id, nickname) {
  const idx = gBugs.findIndex(
    (bug) => bug._id === id && bug.creator.nickname === nickname
  );
  if (idx >= 0) {
    gBugs.splice(idx, 1);
    return _saveDataToFile();
  }
  return Promise.reject("Cannot remove car");
}

module.exports = {
  query,
  save,
  getBugById,
  remove,
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

function _saveDataToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile("data/bugs.json", JSON.stringify(gBugs, null, 2), (err) => {
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
