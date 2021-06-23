const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bugService = require("./services/bug.service.js");
const userService = require("./services/user.service");

// const { allowedNodeEnvironmentFlags } = require("process");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "some secret string",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// List
app.get("/api/bug", (req, res) => {
  bugService.query().then((bugs) => {
    res.send(bugs);
  });
});

// Add/Create
app.post("/api/bug", (req, res) => {
  const bug = req.body;
  console.log("req.session.loggedinUser =", req.session.loggedinUser);
  bug.creator.nickname = req.session.loggedinUser;
  bugService.save(bug).then((savedBug) => {
    res.send(savedBug);
  });
});

// Update
app.put("/api/bug/:bugId", (req, res) => {
  const bug = req.body;
  bugService.save(bug).then((SavedBug) => res.send(SavedBug));
});

// Read
app.get("/api/bug/:bugId", (req, res) => {
  const { bugId } = req.params;
  bugService.getBugById(bugId).then((bug) => res.send(bug));
});

// Delete
app.delete("/api/bug/:bugId", (req, res) => {
  const { bugId } = req.params;
  const { loggedinUser } = req.session;
  if (!loggedinUser) {
    res.status(404).send("User not logged in");
  }
  bugService
    .remove(bugId, loggedinUser)
    .then(() => res.send("Deleted successfully"));
});

// USER

app.post("/api/login", (req, res) => {
  const credentials = req.body;
  console.log("credentials =", credentials);
  userService.checkLogin(credentials).then((user) => {
    if (user) {
      console.log("user =", user);
      req.session.loggedinUser = user;
      res.send(user);
    } else {
      res.status(403).send("Invalid username / password");
    }
  });

  // res.cookie("nickname", nickname);
  // res.send(nickname);
});

app.post("/api/signup", (req, res) => {
  const userInfo = req.body;
  userService.save(userInfo).then((user) => {
    if (user) {
      req.session.loggedinUser = user;
      res.send(user);
    } else {
      res.status(403).send("Invalid info");
    }
  });
});

app.post("/api/logout", (req, res) => {
  req.session.destroy();
  res.send();
});

app.listen(3030, () => console.log("Server listening on port 3030"));
