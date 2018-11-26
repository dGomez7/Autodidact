var express = require('express');
var app = express();
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/TestingBlog")
var bodyParser = require('body-parser')
var path = require('path');
var opn = require('opn');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname, 'public')));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//the database schema
var postSchema = new mongoose.Schema({
   body: String,
   hashtag: String,
   titleHeading: String
    });


var Post = mongoose.model('Post', postSchema);
// Routes
app.get('/go', (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('blog', { posts: posts})
   });
});

app.get('/stack', (req, res) => {
  res.sendFile(__dirname + "/stacksearch.html")
});

app.post('/addPost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('http://localhost:3000/go');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

app.post('/searchStack', (req, res) => {
  opn('https://stackoverflow.com/search?q=python');
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
});
