// API Endpoint
const projectData = [];

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
    console.log(`Server is up and running on localhost port ${port}!`);
}

// GET Route
app.get('/all', returnData);

// Return API endpoint data, all journal entries to the client
function returnData(req, res){
    console.log(projectData);
    res.send(projectData);
}


// POST Route
app.post('/addData', addTemperature);

// Receive POST data and add it into the API endpoint
function addTemperature(req,res){

    //console.log(req.body);
    newEntry = {
        temperature: req.body.temperature,
        entryDate: req.body.date,
        feelings: req.body.feeling
    }

    projectData.push(newEntry);
    //console.log(projectData);
}