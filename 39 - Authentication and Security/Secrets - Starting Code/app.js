require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

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
const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

//Compiling schema into a model
const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render("home");
});

app.route("/login")
    .get(
        function (req, res) {
            res.render("login");
        })
    .post(
        function (req, res) {
            const username = req.body.username;
            const password = req.body.password;
            //const password = md5(req.body.password);

            User.findOne({ email: username }).then(foundUser => {
                if (foundUser) {
                    bcrypt.compare(password, foundUser.password, function(err, result) {
                        res.render("secrets");
                    });
                }
            }).catch((e) => {
                console.log(e);
            });
        });

app.route("/register")
    .get(
        function (req, res) {
            res.render("register");
        })
    .post(
        function (req, res) {
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    const newUser = User({
                        email: req.body.username,
                        password: hash
                    })
        
                    newUser.save().then(() => {
                        console.log("Created user successfully.");
                        res.render("secrets");
                    }).catch(err => {
                        console.log(err);
                    })
                });
            });
        });


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
