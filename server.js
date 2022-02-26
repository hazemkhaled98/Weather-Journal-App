// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 2211;
const server = app.listen(port, () => console.log(`Server is running on port: ${port}`))


//GET route
app.get('/get', (req, res) => {
    
    //send data to the client
    res.send(projectData);
    
});

//POST route
app.post('/send', (req, res) => {

    //update the endpoint of the project based on the data sent by the client
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    console.log(projectData);
})



