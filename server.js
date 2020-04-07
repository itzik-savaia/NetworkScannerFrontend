


//Install express server
const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/NetworkScannerFrontend'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://networkscanner-s.herokuapp.com/');
    next();
});

app.get('/*', function (req, res) {
    const fullPath = path.join(__dirname + '/dist/NetworkScannerFrontend/index.html');
    console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);