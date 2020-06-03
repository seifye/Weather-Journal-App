// Empty JS object as an endpoint for all routes
const projectData = {};

// Getting express package to run the server and the routes
const express = require('express');

// An instance of express
const app = express();


/* Middleware*/

// Dependencies: body-parser
const bodyParser = require('body-parser');

// using the body-parser as a middleware in the app
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Dependencies: cors
const cors = require('cors');

// using cors for cross origin allowance in the app
app.use(cors());

// Initialize the main project file
app.use(express.static('website'));


// Route for a POST request
app.post('/addData', postData);
function postData(request, response) {
	projectData['date'] = request.body.date;
	projectData['tempreature'] = request.body.temp;
	projectData['userContent'] = request.body.content;
	console.log(projectData);
	response.send(projectData);
}

// Route for a GET request
app.get('/all', getData);
function getData(request, response) {
	response.send(projectData);
}


// Setting up the Server on port: 3000
const localPort = 3000;
const server = app.listen(localPort, listening);
function listening() {
	console.log(` The server is running on the local port: ${localPort}`);
}