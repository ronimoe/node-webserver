const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 7000; // env
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Writing to file error!');
    };
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

// Routes handler
// app.get('/', (req, res) => {
//   //res.send('<h1>hello world!</h1>');
//   res.send({
//     name: 'si anu',
//     age: 1200,
//     likes: [
//     'buah',
//     'buih'
//     ]
//   });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Homepage of Website',
    welcomeMessage: 'Welcome to our site...'
  });
});

app.get('/about', (req, res) => {
  //res.send('About page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
    });
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio.hbs', {
    pageTitle: 'Portfolio Page'
    });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error 404!'
  })
})

// Listener
app.listen(7000, () => {
  console.log(`Server up on port ${port}!`);
});