const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const user = require('./api/user');

// presets
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// declartions
const app = express();

// parse url && parse content
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

// test route (delete later)
app.get('/', (req, res) => {
  res.json({'message': 'This is a test of the API broadcast system. Please standby.'});
});

MONGO_URI = process.env.MONGO_URI;

app.use('/api/users', user);


mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected Succesfully');
}).catch( (err) => {
  console.log('Error connecting');
  process.exit();
});

// start server on PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

