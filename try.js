const express = require("express");
const app = express();
const prompt = require('prompt-sync')();
const bodyp = require("body-parser");
// Get user input for the company name

app.use(bodyp.urlencoded({extended: true}));

const https = require('https');
const bodyParser = require("body-parser");
// const company = 'tcs';

// const options = {
//     method: 'GET',
//     hostname: 'crunchbase-crunchbase-v1.p.rapidapi.com',
//     port: null,
//     path: '/autocompletes?query=' + `${company}`,
//     headers: {
//         'X-RapidAPI-Key': '25cc013a46mshd28b91bfb0bd3a7p14c6aajsn14784e0e1680',
//         'X-RapidAPI-Host': 'crunchbase-crunchbase-v1.p.rapidapi.com'
//     }
// };

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html") ;
    
});

app.post("/" , (req,res) =>{
    console.log("request recieved");
    console.log(req.body.companyName);
    companyName = req.body.companyName ; 
    console.log('You entered:', companyName);
    const options = {
        method: 'GET',
        hostname: 'crunchbase-crunchbase-v1.p.rapidapi.com',
        port: null,
        path: '/autocompletes?query=' + `${companyName}`,
        headers: {
            'X-RapidAPI-Key': '25cc013a46mshd28b91bfb0bd3a7p14c6aajsn14784e0e1680',
            'X-RapidAPI-Host': 'crunchbase-crunchbase-v1.p.rapidapi.com'
        }
    };
    https.get(options, function (response) {
        let data = '';

        // A chunk of data has been received.
        response.on('data', function (chunk) {
            data += chunk;
        });

        // The whole response has been received.
        response.on('end', function () {
            try {
                // Parse the received data as JSON and format it
                const jsonData = JSON.parse(data);
                const formattedData = JSON.stringify(jsonData, null, 2); // 2 spaces for indentation

                // Send the formatted data as the response.
                res.setHeader('Content-Type', 'application/json');
                res.send(jsonData);
                // const companydesc = jsonData.entities[1].short_description;
                // res.send(companydesc);
                // console.log(formattedData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }).on('error', function (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    });
})
const port = 2000;
app.listen(port, function () {
    console.log(`The server is started at port ${port}`);
});

// const companyName = prompt('Enter the company name: ');

