const express = require('express')
const app = express()
//const port = 3000

app.get('/', function(req, res) {
  res.send("Hello");
})

app.get('/contact', function(req, res) {
  res.send("Contact me at: rlindeyer@gmail.com");
})

app.get('/about', function(req, res) {
  res.send("I'm Reyndert, I like video games, coding, and hard apple cider.");
})

app.get('/hobbies', function(req, res) {
  res.send("<ul><li>Playing War Thunder</li> <li>Walking and Cycling</li> <li>Experimenting with cooking</li></ul>");
})

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

/*

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
*/
