export const storageService = {
  load,
  save,
};

function save(key, val) {
  sessionStorage.setItem(key, JSON.stringify(val));
}

function load(key) {
  var val = sessionStorage.getItem(key);
  return JSON.parse(val);
}
