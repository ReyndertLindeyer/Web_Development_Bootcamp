require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _= require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB connection URL
const mongoURL = process.env.mongoURL;

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//Create MongoDB schema
const postsSchema = new mongoose.Schema ({
  name : String,
  content : String
})

//Compiling schema into a model
const Post = mongoose.model("Post", postsSchema);

//Creating some basic items
const post1 = new Post({
  name: "Do my work",
  content: "Had a good day"
});


post1.save();

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "I can be reached though email: rlindeyer@gmail.com or through my cell: 226-229-9339";

app.get("/", function(req, res){
  res.render("home", {startingContent: homeStartingContent, postsArray: posts});
});
app.get("/", function(req, res) {

  Post.find().then((foundPosts) => {

    //If there are no items then add some default items
    if(foundPosts.length === 0){
      Post.insertMany(defaultItems).then(()=>{
        console.log("Succesfully saved defaultItems to DB.")
      }).catch((error) =>{
        console.error("There was an error inserting into DB: ", error)
      });

      //Redirecting to reload the page so that the user will see the new items
      res.redirect('/');
    }
    else{
      //If there are items then show them
      res.render("home", {startingContent: homeStartingContent, postsArray: foundPosts});
    }
   })

});

app.post("/", function(req, res){
  res.redirect("home", {startingContent: posts});
});

app.get("/about", function(req, res){
  res.render("about", {startingContent: aboutContent});
});

app.post("/about", function(req, res){
  res.redirect("about", {startingContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {startingContent: contactContent});
});

app.post("/contact", function(req, res){
  res.redirect("/contact", {startingContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  //res.render("post");
  posts.forEach(function(post){
    if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
      res.render("post", {
        title: post.title,
        content: post.body
      });
    }
  });
});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});
