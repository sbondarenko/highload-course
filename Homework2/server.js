'use strict';

const express = require('express');
const http = require('http');
const appmetrics = require('appmetrics');
const monitoring = appmetrics.monitor();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World');
});

monitoring.on('cpu', (cpu) => {
    const postData = `cpu_percentage,host=AmazonBay process=${cpu.process},system=${cpu.system} ${cpu.time}`;

    const options = {
        port: 8186,
        host: 'telegraf',
        path: '/write?precision=ms',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.write(postData);
    req.end();
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);