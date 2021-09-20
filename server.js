const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require('nodemailer')
const app = express();
const path = require('path');

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kidrontparas@gmail.com',
    pass: 'JESUSLOVESYOU'
  }
});

app.post('/message', (req, res) => {
  let mailOptions = {
    from: req.body.email,
    to: 'kidrontparas@gmail.com',
    subject: req.body.email,
    text: req.body.message + '\n\n-' + req.body.fname + ' ' + req.body.lname
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(req.body.email + 'Email sent: ' + info.response);
    }
  });

  res.render('message');
});

app.get('/message', (req, res) => {

  res.render('message')

})

app.post('/', (req, res) => {
  res.render('content');
})

app.get('/', (req, res) => {
  res.render('content');
});

let PORT = process.env.PORT || 5000;
let http = require('http');
let server = http.Server(app);
server.listen(PORT, function () {
  console.log('Server Running on Port 5000');
});