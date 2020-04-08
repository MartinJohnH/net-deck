// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")

// Server port
const HTTP_PORT = process.env.PORT || 5000;

// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

// api endpoint
app.get("/api", (req, res, next) => {
  res.json({"message":"api endpoint"})
});

// get 3 random stories
app.get("/api/stories", (req, res, next) => {

  let sql = "SELECT * FROM stories ORDER BY RANDOM() LIMIT 3"
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

// Get a random story
app.get("/api/stories/:card_num", (req, res, next) => {

  let sql = "SELECT * FROM stories WHERE card_num = ? ORDER BY RANDOM() LIMIT 1"
  let params = [req.params.card_num]

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
