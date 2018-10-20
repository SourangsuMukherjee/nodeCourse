const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase()
});

app.use((req,res,next) =>{
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;

  fs.appendFile('server.log',log + '\n', (err) => {
    if(err){
      console.log('Unable to log in server.log');
    }
  });
  console.log(log);
  next();
});

app.use((req,res,next) => {
  res.render('maintainence.hbs')
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to my home page'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Unable to process request'
  });
});

app.listen(3000);
