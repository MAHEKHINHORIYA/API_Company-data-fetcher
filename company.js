const express = require("express");
const app = express();
const https = require('https');
const company = 'tcs';

const options = {
    method: 'GET',
    hostname: 'crunchbase-crunchbase-v1.p.rapidapi.com',
    port: null,
    path: '/autocompletes?query=' + `${company}`,
    headers: {
        'X-RapidAPI-Key': '25cc013a46mshd28b91bfb0bd3a7p14c6aajsn14784e0e1680',
        'X-RapidAPI-Host': 'crunchbase-crunchbase-v1.p.rapidapi.com'
    }
};

app.get("/", function (req, res) {
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
                res.send(formattedData);

                console.log(formattedData);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }).on('error', function (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    });
});

app.listen(3000, function () {
    console.log("The server is started at port 3000");
});
