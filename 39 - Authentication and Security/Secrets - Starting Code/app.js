require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up our session
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
}));

//Setting up passport and setting up our session
app.use(passport.initialize());
app.use(passport.session());
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
//Adding passportLocalMongoose to the User Schema
userSchema.plugin(passportLocalMongoose);

//Compiling schema into a model
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
            const user = new User({
                username: req.body.username,
                password: req.body.password
            });

            req.logIn(user, function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/secrets");
                    })
                }
            })

            /*
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
            */
        });

app.route("/register")
    .get(
        function (req, res) {
            res.render("register");
        })
    .post(
        function (req, res) {
            User.register({ username: req.body.username }, req.body.password, function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("/register");
                }
                else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/secrets");
                    });
                }
            })
            /*
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
            */
        });

app.route("/secrets")
    .get(
        function (req, res) {
            if (req.isAuthenticated()) {
                res.render("secrets");
            }
            else {
                res.redirect("/login");
            }


        });

app.route("/logout")
    .get(
        function (req, res) {
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/');
              });
        });

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
