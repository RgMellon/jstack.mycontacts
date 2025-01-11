const express = require('express');
const router = require('./router');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use((_, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
app.use(router);
app.use((error, request, response, next) => {
  console.log('####error', error);
  response.sendStatus(500);
});

app.listen(3001, () => {
  console.log('Online');
});
