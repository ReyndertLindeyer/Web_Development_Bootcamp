const mongoose = require('mongoose');
 
// MongoDB connection URL
const mongoURL = 'mongodb://0.0.0.0:27017/fruitsDB';
 
// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  
  //First part of the lesson
//--------------------------------------------------------------------------------------------//
  /*
//Create MongoDB schema
const fruitSchema = new mongoose.Schema ({
  name : String,
  rating : Number,
  review : String
})

//Compiling schema into a model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Creating a fruit
const fruit = new Fruit({
  name: "orange",
  rating: 5,
  review: "Tastes good, but have to peal it."
});

//Saving the fruit to the database
fruit.save();
*/

//Second part of the lesson
//--------------------------------------------------------------------------------------------//
/*
//Create MongoDB schema
const personSchema = new mongoose.Schema ({
  name : String,
  age : Number
});

//Compiling schema into a model
const Person = mongoose.model("Person", personSchema);

//Creating a Person
const person = new Person({
  name: "John",
  age: 37,
});

//Saving the fruit to the database
//person.save();

//Create MongoDB schema
const fruitSchema = new mongoose.Schema ({
  name : String,
  rating : Number,
  review : String
})

//Compiling schema into a model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Creating our fruits
const apple = new Fruit({
  name: "Apple",
  rating: 9,
  review: "Tastes good, very crunchy."
});

const orange = new Fruit({
  name: "Orange",
  rating: 8,
  review: "Tastes good, but have to peal it."
});

const banana = new Fruit({
  name: "Banana",
  rating: 4,
  review: "Tastes bad, only good for making Banana bread with."
});

//Saving the fruit to the database
//Fruit.insertMany([apple, orange, banana]);
*/

//Third part of the lesson
//--------------------------------------------------------------------------------------------//
/*
//Create MongoDB schema
const personSchema = new mongoose.Schema ({
  name : String,
  age : Number
});

//Compiling schema into a model
const Person = mongoose.model("Person", personSchema);

//Creating a Person
const person = new Person({
  name: "John",
  age: 37,
});

//Saving the fruit to the database
//person.save();
*/

//Create MongoDB schema
const fruitSchema = new mongoose.Schema ({
  name : {
    type: String,
    required: [true, "Please check your data entry, no name specified."]
  },
  rating : {
    type: Number,
    min: 1,
    max: 10
  },
  review : String
})

//Compiling schema into a model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Creating our fruits
const apple = new Fruit({
  name: "Apple",
  rating: 9,
  review: "Tastes good, very crunchy."
});

const orange = new Fruit({
  name: "Orange",
  rating: 8,
  review: "Tastes good, but have to peal it."
});

const banana = new Fruit({
  name: "Banana",
  rating: 4,
  review: "Tastes bad, only good for making Banana bread with."
});

//Saving the fruit to the database
//Fruit.insertMany([apple, orange, banana]);

//Fifth part of the lesson
//--------------------------------------------------------------------------------------------//
//Create MongoDB schema
const personSchema = new mongoose.Schema ({
  name : String,
  age : Number,
  favouriteFruit: fruitSchema
});

//Compiling schema into a model
const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 8,
  review: "Tastes good, but the outside is prickly."
});

pineapple.save();

//Creating a Person
const person = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

//Saving the fruit to the database
//person.save();

Fruit.find().then((fruits) => {
  //Reading out only the names
  fruits.forEach(fr => {
    console.log(fr.name);
  });
  //console.log(fruits);
 })
 //Adding John's favorite fruit based on their name
 
 Person.updateOne({name: "John"}, {$set: {favouriteFruit: pineapple}}).exec().then( () =>{
  console.log("Fruit updated succesfully")
  mongoose.connection.close();
}).catch((error) => {
  console.error("Error updating fruit: ", error)
});
 
//Fourth part of the lesson
//--------------------------------------------------------------------------------------------//
 //Updating any values based on their ID
 /*
 Fruit.updateOne({_id: "64aee6b42a18e7cd161b6148"}, {$set: {rating: 4}}).exec().then( () =>{
  console.log("Fruit updated succesfully")
  mongoose.connection.close();
}).catch((error) => {
  console.error("Error updating fruit: ", error)
});
*/

//Deleting a fruit values based on their ID
/*
Fruit.deleteOne({_id: "64aee6b42a18e7cd161b6148"}).exec().then( () =>{
  console.log("Fruit deleted succesfully")
  mongoose.connection.close();
}).catch((error) => {
  console.error("Error updating fruit: ", error)
});
*/

//Deleting any person values based on their name
/*
Person.deleteMany({name: "John"}).exec().then( () =>{
  console.log("Person deleted succesfully")
  mongoose.connection.close();
}).catch((error) => {
  console.error("Error updating fruit: ", error)
});
*/