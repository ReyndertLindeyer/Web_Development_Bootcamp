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

//Item.insertMany(defaultItems);

app.get("/", function(req, res) {

  Item.find().then((foundItems) => {

    //If there are no items then add some default items
    if(foundItems.length === 0){
      Item.insertMany(defaultItems).then(()=>{
        console.log("Succesfully saved defaultItems to DB.")
      }).catch((error) =>{
        console.error("There was an error inserting into DB: ", error)
      });

      //Redirecting to reload the page so that the user will see the new items
      res.redirect('/');
    }
    else{
      //If there are items then show them
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
   })

});

app.post("/", function(req, res){

  //Saving the item passed
  const newItem = req.body.newItem;
  const item = new Item({
    name: newItem
  });

  item.save().then(()=>{
    console.log("Succesfully saved new Item to DB.")
  }).catch((error) =>{
    console.error("There was an error inserting into DB: ", error)
  });;
  //Redirecting to reload the page so that the user will see the new items
  res.redirect('/');
});

app.post("/delete", function(req, res){
  
  const checkedItemID = req.body.checkbox;
  
  //Removing the item with this id
  Item.findByIdAndRemove({_id: checkedItemID}).exec().then((foundItem)=>{
    console.log("Succesfully removed the item from Items collection");
  }).catch((error)=>{
    console.error(error);
  });

  //Redirecting to reload the page so that the user will see the new items
  res.redirect('/');
});

app.get("/work", function(req,res){
  //res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
