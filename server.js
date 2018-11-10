const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true },
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./controllers/ArticleController')(app);
require('./controllers/CommentController')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Express server listening on port ', PORT));
