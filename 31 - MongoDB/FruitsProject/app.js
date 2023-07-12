const { MongoClient } = require("mongodb");//require pakage
 
const uri = "mongodb://0.0.0.0:27017/"; //url
 
const client = new MongoClient(uri);
 
async function run() {
  try {
    console.log("Sever Connected");
    const database = client.db('fruitsDB');//creates database if not exists  
 
    const collection = database.collection('fruits');//creates collection if not exists
    
    //creates the data
    await collection.insertMany([
        {
            id:1,
            name:"mango",
            price:32
        },
        {
            id:2,
            name:"apple",
            price:12,
        },
        {
            id:3,
            name:"coconut",
            price:5
        }
    ]);
    
    //for loop to print the data
    for (let i = 1; i <= 3; i++) {
        field = await collection.findOne({id:i});
        console.log(field);
    } 
 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);