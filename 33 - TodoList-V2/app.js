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

const listSchema = new mongoose.Schema ({
  name : String,
  items: [itemsSchema]
})

const List = mongoose.model("List", listSchema);

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

app.get('/:customListName', function(req , res){
  //To make sure the first letter is always capitalized
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}).exec().then((foundList) =>{
    //console.log(foundList);
    //if not found a document with that name then we want to create this document only once! 
    if(!foundList){ 
      const list = new List({
        name: customListName,
        items: defaultItems
      });
      //save into the database
      list.save();
      //Redirecting to reload the page so that the user will see the new items
      res.redirect("/"+customListName);
    }
    else{ //if found a document in the List collection with the specified name
      res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
    }
  }).catch((error)=>{
    console.log(error);
  });

});

app.post("/", function(req, res){
 
  const itemName = req.body.newItem;
  const listName = req.body.list;//list declared in the list.ejs file
  const newItem = new Item({
    name: itemName
  });
  if(listName==="Today"){
    //will save our item into the collection of Item
    newItem.save(); 
    //Redirecting to reload the page so that the user will see the new items
    res.redirect("/");
  }
  else{
    List.findOne({name: listName}).exec().then((foundList) =>{
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/"+ listName);
    });
  }
});

app.post("/delete", function(req, res){
  
  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;
  
  if(listName==="Today"){
    Item.findByIdAndRemove({_id: checkedItemID}).exec().then((foundItem)=>{
      console.log("Succesfully removed the item from Items collection");
    }).catch((error)=>{
      console.error(error);
    });
    //Redirecting to reload the page so that the user will see the new items
    res.redirect("/");
  }
  else{
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemID}}}).exec().then((foundList)=>{
      res.redirect("/"+ listName);
    }).catch((error)=>{
      console.error(error);
    });
  }
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
