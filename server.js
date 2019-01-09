const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3001;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req,res,next) => {
   const now = new Date().toString();
   const log = `${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log' , log + '\n' , (err) => {
       if (err) {
           console.log('cant append new file');
       }
   });
    next();
});

// app.use((req,res,next) => {
//     res.render('spinner.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
});

app.get('/', (req , res) => {
  res.render('home.hbs',{
      pageTitle: 'HOME',
      welcomeMessage: 'kasdlkasldkasld'
  });
});

app.get('/lol', (req , res) => {
    res.render('lol.hbs', {
        pageTitle: 'lol'
    });
});

app.listen(port, () => {
    console.log(`server is running on ${port}`);
});

