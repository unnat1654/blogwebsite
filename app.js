//calling env for security
require("dotenv").config();

//calling express and creating app, resources are stored inn public folder
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

//calling body-parser and using it in program
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


//calling template engine ejs
const ejs = require("ejs");
app.set('view engine', 'ejs');

//calling bcrypt for password encryption
const bcrypt = require('bcrypt');
const saltRounds = 10;

//calling mongodb database, dbcall.mongocall(collection_name) returns collection
const dbcall = require(__dirname + "/mongocall.js");

//calling lodash for string manipulation
const _ = require("lodash");

//calling cookie-parser and jwt for sessioning
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser());
const verification = require(__dirname + "/authsess.js");

app.get("/", (req, res) => {

  res.redirect("/home");

});
app.get("/home", (req, res) => {
  res.render("home", { username: verification(req.cookies.token) });
});
app.get("/compose", (req, res) => {
  res.render("compose", { username: verification(req.cookies.token) });
});
app.get("/signup", (req, res) => {
  if(verification(req.cookies.token)) {
    res.redirect('back');
  }
  else {
    res.render("signup", { username_taken: "userEmailNotTaken" });
  }

});
app.get("/login", (req, res) => {
  if(verification(req.cookies.token)) {
    res.redirect('back');
  }
  else {
    res.render("login", { username_check: "user-exists", password_check: "password-right" });
  }
});
app.get("/:pagename", async (req, res) => {
  const pagetitle = _.lowerCase(req.params.pagename);
  const mongocall = await dbcall.mongocall(process.env.collection1);
  const users_and_their_data = await dbcall.mongocall(process.env.collection2);
  const liked_Status = await users_and_their_data.findOne({liked: {$all: [pagetitle]}});
  if(!liked_Status){
    var liked_btn = "unliked";
  }
  else{
    var liked_btn = "liked";
  }
  mongocall.find({ title: pagetitle }).toArray().then((blogcontentarray) => {
    res.render("post", { username: verification(req.cookies.token),liked_btn: liked_btn, blogTitle: blogcontentarray[0]?.title, blogContent: blogcontentarray[0]?.content });
  });
});
app.post("/signup", async (req, res) => {

  const users_and_their_data = await dbcall.mongocall(process.env.collection2);
  const user_table = await users_and_their_data.findOne({ username: req.body.username });
  const mail_table = await users_and_their_data.findOne({ email: req.body.email });
  if (user_table || mail_table) {
    res.render("signup", { username_taken: "userEmailTaken" });
  }
  else {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) { console.log(err); }
      users_and_their_data.insertOne({
        "username": req.body.username,
        "email": req.body.email,
        "password": hash
      });
    });
    const jwt_content = { username: req.body.username, email: req.body.email };
    const jwttoken = jwt.sign(jwt_content, process.env.key, { expiresIn: '30d' });
    res.cookie('token', jwttoken, { maxAge: 2592000000 });

    res.redirect("/home");
  }
});
app.post("/login", async (req, res) => {
  const users_and_their_data = await dbcall.mongocall(process.env.collection2);
  const user_table = await users_and_their_data.findOne({ username: req.body.username });

  if (user_table) {
    bcrypt.compare(req.body.password, user_table.password, (err, result) => {
      if (err) {
        console.log(err);
      }
      //in case password is true
      else if (result == true) {
        const jwt_content = { username: req.body.username, email: user_table.email };
        const jwttoken = jwt.sign(jwt_content, process.env.key, { expiresIn: '30d' });
        res.cookie('token', jwttoken, { maxAge: 2592000000 });
        res.redirect("/home");
      }
      //in case password is false
      else if (result == false) {
        res.render("login", { username_check: "user-exists", password_check: "password-wrong" });
      }

    });
  }
  else {
    res.render("login", { username_check: "user-not-exists", password_check: "password-right" });
  }
});
app.post("/compose", async (req, res) => {
  const mongocall = await dbcall.mongocall(process.env.collection1);
  const pagetitle = _.lowerCase(req.body.postTitle);
  mongocall.insertOne({
    title: pagetitle,
    content: req.body.postBody
  });
  res.redirect("/");
});
app.post("/logout", async (req,res)=> {
  res.clearCookie('token');
  res.redirect(req.get('referer'));
})
app.put("/like", async (req, res) => {
  const users_and_their_data = await dbcall.mongocall(process.env.collection2);
  const query = { username: verification(req.cookies.token) };
  const updateDocument = {
    $push: {"liked": req.body.like_this_blog}
  }
  const result = await users_and_their_data.updateOne(query, updateDocument);
});
app.put("/unlike", async (req, res) => {
  const users_and_their_data = await dbcall.mongocall(process.env.collection2);
  const query = { username: verification(req.cookies.token) };
  const updateDocument = {
    $pull: {"liked": req.body.unlike_this_blog}
  }
  const result = await users_and_their_data.updateOne(query, updateDocument);
});



app.listen(3000);
