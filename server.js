
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(express.static(__dirname + '/dist/NetworkScannerFrontend'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/*', function (req, res) {
    const fullPath = path.join(__dirname + '/dist/NetworkScannerFrontend/index.html');
    console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

app.listen(process.env.PORT || 8080);