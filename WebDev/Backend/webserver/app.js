var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/maketest");

//schema for the users table in the website
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
});
//JSON object for the blog schema
var blogSchema = new mongoose.Schema({
  blogpostID: String,
  blogpost: String,
  hashtag: String
});

var forumSchema = new mongoose.Schema({
  forumPost: String,
  forumHashtag: String,
  userPostId: String
});

//all the colletions that are in the mongo db
var User = mongoose.model("User", nameSchema);
var collection = mongoose.model("Blogs", blogSchema);
var forumCollection = mongoose.model("Forum", forumSchema);
//all the pages that are hosted on these directories
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

app.get("/blog", (req, res) => {
    res.sendFile(__dirname + "/blog.html");
});

app.get("/forum", (req, res) => {
  res.sendFile(__dirname + "/forum.html");
});
//post requests for adding users to the site
app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
//post requests for the blog page
app.post("/newpage", (req, res) => {
  //giving the data a value to a variable
  var newData = new collection(req.body);
  newData.save()
    .then(item => {
      res.send("blog post saved to database:");
    })
    .catch(err => {
      res.status(400).send("unable to  open blog connection");
    });
});
//where the app listens to the port
app.listen(port, () => {
    console.log("Server listening on port " + port);
});
