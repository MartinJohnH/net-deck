// Create express app
let express = require("express")
let app = express()
let db = require("./database.js")

const multer = require('multer');
const upload = multer();
const fs = require('fs');
const archiver = require('archiver');

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

// api endpoint
app.get("/api/download-stories", (req, res, next) => {
  let output = fs.createWriteStream(__dirname + '/public/zipped/stories.zip');
  let archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
    const file = `${__dirname}/public/zipped/stories.zip`;
    res.download(file);
  });

  archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      res.status(400);
      throw err;
    }
  });

  archive.on('error', function(err){
    res.status(400);
    throw err;
  });

  archive.pipe(output);
  archive.directory(__dirname + '/public/uploads/', 'stories');
  archive.finalize();

});

function generateThreeUniqueNum() {
  let limit = 10,
    lower_bound = 0,
    upper_bound = 22,
    unique_random_numbers = [];

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

app.post('/api/upload', upload.single('soundBlob'), function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload file');
    res.status(400);
  } else {
    let newFileName = req.file.originalname.substring(0, req.file.originalname.length - 4) + '.mp3'

    try {
      const Lame = require("node-lame").Lame;
      const encoder = new Lame({
        output:  __dirname + '/public/uploads/' + newFileName,
        bitrate: 192,
      }).setBuffer(Buffer.from(new Uint8Array(req.file.buffer)));

      encoder
        .encode()
        .then(() => {
          console.log('Successfully encoded');
          if (fs.existsSync(__dirname + '/public/uploads/' + newFileName)) {

            let sql = 'INSERT INTO stories (cardNum, storyRec) VALUES (?,?)';
            //let params =[i, 'uploads/' + newFileName]
            let params =[req.body.cardNum, 'uploads/' + newFileName];
            db.run(sql, params, function (err, result) {
              if (err){
                res.status(400).json({"error": err.message})
              }
            });

            res.json({
              "message": "success",
              "data": newFileName
            })
          }
        })
        .catch(error => {
          console.log(error);
        });

    } catch(err) {
      console.log(err)
    }
  }
  //res.sendStatus(200);
})

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});
