const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const port = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res)=>{
    res.sendFile(process.cwd()+'/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=>{
    if(!req.file){
        return res.status(400).json({error: 'No file uploaded'});
    }
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size
    });
});

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});
