// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Add dependencies
// Add body-parser dependencies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Add cors dependencies
const cors = require('cors');
app.use(cors());

// Initialize the "website" folder
app.use(express.static('website'));

// Indicate port for server to listen to
const port = 8080;
const server = app.listen(port, listening);

function listening(){
    console.log(`Server is up! Server is running on localhost: ${port}`);
}

// Endpoint
const projectData = [];

// GET Route
app.get('/', function(req, res){
    res.send(projectData);
    console.log("HELLO");
})

// POST Route
app.post('/', function(req, res){
    projectData.push(req.body);
});
