export const bugService = {
  query,
  save,
  remove,
};

function query() {
  return axios.get("/api/bug").then((res) => res.data);
}

function save(bug) {
  return axios.post("/api/bug", bug).then((res) => res.data);
}

function remove(id) {
  return axios.delete(`/api/bug/${id}`).then((res) => res.data);
}
