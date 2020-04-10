// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

const gatsbyExpress = require('gatsby-plugin-express');

// serve static files before gatsbyExpress
app.use(express.static('public/'));

// Server port
const HTTP_PORT = process.env.PORT || 8080;

//Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// api endpoint
app.get("/api", (req, res, next) => {
  res.json({"message":"api endpoint"})
});

function generateThreeUniqueNum() {
  let limit = 10,
    amount = 3,
    lower_bound = 0,
    upper_bound = 22,
    unique_random_numbers = [];

  if (amount > limit) limit = amount; //Infinite loop if you want more unique

  // given range
  while (unique_random_numbers.length < limit) {
    let random_number = Math.floor(Math.random()*(upper_bound - lower_bound) + lower_bound);
    if (unique_random_numbers.indexOf(random_number) === -1) {
      unique_random_numbers.push( random_number );
    }
  }

  for (let i = 0; i < 3; ++i) {
    let flipACoin = Math.floor(Math.random() * 2);
    if (flipACoin === 0) {
      unique_random_numbers[i] += 22;
    }
  }

  return unique_random_numbers;
}

// get 3 random stories
app.get("/api/stories", (req, res, next) => {

  let cardNums = generateThreeUniqueNum();

  let cardIndex1 = cardNums[0];
  let cardIndex2 = cardNums[1];
  let cardIndex3 = cardNums[2];

  let sql = "SELECT * FROM " +
    "(SELECT * FROM stories WHERE cardNum=" + cardIndex1 + " ORDER BY RANDOM() LIMIT 1) " +
    "UNION " +
    "SELECT * FROM " +
    "(SELECT * FROM stories WHERE cardNum=" + cardIndex2 + " ORDER BY RANDOM() LIMIT 1) " +
    "UNION " +
    "SELECT * FROM " +
    "(SELECT * FROM stories WHERE cardNum=" + cardIndex3 + " ORDER BY RANDOM() LIMIT 1)"

  let params = []

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":rows
    })
  });
});

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});
