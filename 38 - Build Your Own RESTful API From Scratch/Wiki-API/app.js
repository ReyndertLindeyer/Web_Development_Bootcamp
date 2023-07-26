require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
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
const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
})

//Compiling schema into a model
const Article = mongoose.model("articles", articlesSchema);

app.route("/articles")
    .get(
        function (req, res) {
            Article.find().then((foundArticles) => {
                res.send(foundArticles);
            }).catch((e) => {
                console.log(e);
            });
        })
    .post(
        function (req, res) {
            const newArticle = new Article({
                title: req.body.title,
                content: req.body.content
            });
            newArticle.save().then(() => {
                console.log("Created article successfully.");
                res.send(newArticle);
            }).catch(err => {
                console.log(err);
            })
        })
    .delete(
        function (req, res) {
            Article.deleteMany({});
            res.send("Successfully deleted all articles!");
        });

app.route("/articles/:articleTitle")
    .get(
        function (req, res) {
            const searchedTitle = req.params.articleTitle;
            Article.findOne({ title: searchedTitle }).then(foundArticle => {
                res.send(foundArticle);
            }).catch((e) => {
                console.log(e);
            });
        })
    .put(function (req, res) {
        Article
          .findOneAndUpdate(
            {
              title: req.params.articleTitle,
            },
            { title: req.body.title, content: req.body.content },
            { overwrite: true }
          )
          .then((updatedArticle) => {
            if (updatedArticle) {
              console.log("Document updated successfully!");
            } else {
              console.log("Can't update!");
            }
            res.redirect("/articles");
          })
          .catch((err) => {
            console.log(err);
          });
      }).patch(async (req, res) => {
        try {
          await Article.updateOne(
            { title: req.params.articleTitle },
            { $set: req.body },
          );
          res.send("Successfully updated article.")
        } catch (error) {
          res.send(error);
        }
      })
      .delete(function (req, res) {
        Article.deleteOne({ title: req.body.title })
          .then(function () {
            res.send("Successfully deleted");
          })
          .catch(function (err) {
            res.send(err);
          });
      });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});