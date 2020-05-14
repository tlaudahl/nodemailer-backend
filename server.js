require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const server = express();

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

server.post('/send', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GOOGLE_USER,
            pass: process.env.GOOGLE_KEY
        }
    });

    transporter.sendMail(req.body, (error, info) => {
        if(error) {
            console.error(error)
        } else {
            res.send('200')
            console.log('Email sent: ' + info.response)
        }
    })
})

module.exports = server;
