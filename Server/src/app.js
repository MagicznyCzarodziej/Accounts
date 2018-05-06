const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

require('./routes.js')(app);

mongoose.connect(config.database.uri);

app.listen(config.port, () => {
  console.log(`Server listening at ${config.port}`);
});
