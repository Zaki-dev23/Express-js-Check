// Import required packages
const express = require('express');
const moment = require('moment');
const ejs = require('ejs');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define middleware to check time
const checkTime = (req, res, next) => {
  const now = moment();
  const dayOfWeek = now.day();
  const hourOfDay = now.hour();
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay <= 17) {
    next();
  } else {
    res.status(403).send('Sorry, the website is only available during working hours (Mon-Fri, 9am-5pm)');
  }
};

// Define routes for the pages
app.get('/', checkTime, (req, res) => {
  res.render('index', { title: 'Home', message: 'Welcome to our website!' });
});

app.get('/services', checkTime, (req, res) => {
  res.render('services', { title: 'Our Services', services: ['Service 1', 'Service 2', 'Service 3'] });
});

app.get('/contact', checkTime, (req, res) => {
  res.render('contact', { title: 'Contact Us', contactInfo: { phone: '123-456-7890', email: 'info@example.com', address: '123 Main St, Anytown USA' } });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
