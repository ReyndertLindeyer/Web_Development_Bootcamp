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
Fruit.insertMany([apple, orange, banana]);

Fruit.find().then((fruits) => {
  //Reading out only the names
  mongoose.connection.close();
  fruits.forEach(fr => {
    console.log(fr.name);
  });
  //console.log(fruits);
 })
