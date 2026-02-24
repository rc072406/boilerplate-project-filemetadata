const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' }); // Simplified storage for better compatibility

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Root route - serves the HTML page
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// The API endpoint FCC hits
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  // Exact keys required by freeCodeCamp: name, type, size
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
