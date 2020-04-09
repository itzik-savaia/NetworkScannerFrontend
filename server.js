


const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(express.static(__dirname + '/dist/NetworkScannerFrontend'));

var corsOptions = {
    origin: 'https://networkscanner-s.herokuapp.com',
    optionsSuccessStatus: 200
}

app.get(cors(corsOptions), function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled for only example.com.' })
})

app.get('/*', function (req, res) {
    const fullPath = path.join(__dirname + '/dist/NetworkScannerFrontend/index.html');
    console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

app.listen(process.env.PORT || 8080);