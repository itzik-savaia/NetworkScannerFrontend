


//Install express server
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/NetworkScannerFrontend'));
app.use(cors())

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://networkscanner-s.herokuapp.com/');
//     next();
// });
app.options('https://networkscanner-s.herokuapp.com', cors())


app.get('/*', function (req, res) {
    const fullPath = path.join(__dirname + '/dist/NetworkScannerFrontend/index.html');
    console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);