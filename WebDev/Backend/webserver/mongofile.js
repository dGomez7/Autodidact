var express = require('express');
var app = express();
var secondapp = express();
var thirdapp = express();
var fourthapp = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//rquring the mongoose modyle
var mongoose = require('mongoose');
//mongoose promise
mongoose.Promise = global.Promise;
//connecting to the databsae hosting on the localhost for now
mongoose.connect("mongodb://localhost:27017/Autodidact");
//json object that stores all data in object orientation
var dataSchema = new mongoose.Schema({
  Usernames: String,
  Passwords: String
});
//object for the blog post data schema
var blogSchema = new mongoose.Schema({
  blogpost: String,
  hashtag: String
});
//object orientation for the login shema
var loginSchema = new mongoose.Schema({
  username: String,
  password: String
});
//object oritned data model for the feed schema
var feedSchema = new mongoose.Schema({
  post: String,
  hashtag: String
});
//the name for the new user collection that we are creating
var userCollection = mongoose.model("Users", dataSchema);
//collection for the blog schema
var blogCollection = mongoose.model("Blogs", blogSchema);
//collection to handle all the data for the login collection
var loginCollection = mongoose.model("login", loginSchema);
//collection made for the feed page on the website
var feedCollection = mongoose.model("Feeds", feedSchema);

//page for registering tha  is hosted with register.html
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});
//directory that blog.html is hosted on
secondapp.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/blog.html");
});
//third login page
thirdapp.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});
//the hosted page for the feed page
fourthapp.get("/newfeed", (req, res) => {
  res.sendFile(__dirname + "/feed.html");
})

//post data handler to send info to the onject structer we creatred
app.post("/adduser", (req, res) => {
  var userData = new userCollection(req.body);
  userData.save()
    .then(item => {
      res.send("user input sent to user collection:");
    })
    .catch(err => {
    res.status(400).send("error sending data to the database: ");
  });
});
//second post request  for the blog
secondapp.post("/blogpost" , (req, res) => {
  var blogData = new blogCollection(req.body);
  blogData.save()
  .then( item => {
    res.send("data has been sent to the blog collection: ");
  })
  .catch(err => {
    res.status(400).send("error sending data to database:");
  });
});
//the post request for the logins
thirdapp.post("/login" , (req, res) => {
  var loginData = new loginCollection(req.body);
  blogData.save()
  .then( item => {
    res.send("data has been sent to the blog collection: ");
  })
  .catch(err => {
    res.status(400).send("error sending data to database:");
  });
});

//the post handler for the feedd data on the feed page
fourthapp.post("/feed", (req, res) => {
  var feedData = new feedCollection(req.body);
  feedData.save()
  .then(item => {
    res.send("sent post to feed database: ");
  })
  .catch(err => {
    res.status(400).send("error sending post to feed database: ");
  });
});


//the post request for the forum

//the ports that this app is listening  on
app.listen(8000);
secondapp.listen(8081);
thirdapp.listen(8082);
console.log("Register page running on port 8000");
console.log("Blog post page running on port 8081");
console.log("Login running at port 8082");
