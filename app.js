//jshint esversion:6

const express = require("express");
const app = express();
app.use(express.json());


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const ejs = require("ejs");
app.set('view engine', 'ejs');


const dbcall = require(__dirname+"/mongocall.js");

const _ = require("lodash");
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/compose", (req,res)=> {
  res.render("compose");
});
app.get("/:pagename",async (req,res)=> {
  const pagetitle = _.lowerCase(req.params.pagename);
  const mongocall = await dbcall.mongocall();
  
  mongocall.find({title: pagetitle}).toArray().then((blogcontentarray) => {res.render("post",{blogTitle: _.startCase(pagetitle), blogContent: blogcontentarray[0].content});});
  
});
app.post("/compose", async (req,res)=> {
  const mongocall = await dbcall.mongocall();
  const pagetitle = _.lowerCase(req.body.postTitle);
  mongocall.insertOne({
    title: pagetitle,
    content: req.body.postBody
  });
  res.redirect("/");
});
app.post("/like",async (req,res) => {
  console.log(req.body);
});

app.listen(3000);
