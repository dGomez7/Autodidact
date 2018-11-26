var express = require('express');
var app = express();
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/Autodidact")
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


var postSchema = new mongoose.Schema({
  body: String,
  hashtag: String
});

var Post = mongoose.model('Post', postSchema);
// Routes
app.get("/", (req, res) => {
   Post.find({}, (err, posts) => {
      res.render('blog', { posts: posts})
   });
});

app.post('/addPost', (req, res) => {
    var postData = new Post(req.body);
    postData.save().then( result => {
        res.redirect('http://localhost:3000/');
    }).catch(err => {
        res.status(400).send("Unable to save data");
    });
});

// Listen
app.listen(3000, () => {
    console.log('Server listing on 3000');
});
