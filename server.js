const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const graphql = require('./graphql');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { ObjectId } = mongoose.Types;
function objectIdToString() {
  return this.toString();
}
ObjectId.prototype.valueOf = objectIdToString;

mongoose.connect(
  config.mongoURI,
  { useCreateIndex: true, useNewUrlParser: true },
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./controllers/auth.controller')(app);
require('./controllers/article.controller')(app);
require('./controllers/comment.controller')(app);

graphql(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Express server listening on port ', PORT));
