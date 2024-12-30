const express = require('express');
const router = require('./router');
require('express-async-errors');

const app = express();

app.use(express.json());
app.use(router);
app.use((error, request, response, next) => {
  console.log('####error', error);
  response.sendStatus(500);
});

app.listen(3000, () => {
  console.log('Online');
});
