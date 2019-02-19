const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const path = require('path');

const users = require('./routes/api/users');
const test = require('./routes/api/test');
const question = require('./routes/api/question');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//DB Config URI
const db = require('./config/keys').mongoURI;
//Connect to Mongo DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err));

app.use(express.static('client/build'));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/demo', test);
app.use('/api/question', question);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
