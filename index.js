var express = require('express');
var cors = require('cors');
require('dotenv').config();
// 1. Import multer
var multer = require('multer');

// 2. Setup multer (memoryStorage is usually easiest for this project)
var upload = multer({ storage: multer.memoryStorage() });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 3. Create the POST route
// 'upfile' must match the 'name' attribute in your HTML form
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file;

  if (!file) {
    return res.json({ error: "No file uploaded" });
  }

  // 4. Return the specific JSON format the test expects
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
