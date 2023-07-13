const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// MongoDB connection URL
const mongoURL = 'mongodb://0.0.0.0:27017/todolistDB';

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//Create MongoDB schema
const itemsSchema = new mongoose.Schema ({
  name : String
})

//Compiling schema into a model
const Item = mongoose.model("Item", itemsSchema);

//Creating some basic items
const item1 = new Item({
  name: "Do my work"
});

const item2 = new Item({
  name: "Write some code"
});

const item3 = new Item({
  name: "Ride my bike"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems);

app.get("/", function(req, res) {


  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});