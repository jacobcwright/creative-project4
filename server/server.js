const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(express.static('../public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');

// // connect to the database
mongoose.connect('mongodb://localhost:27017/lists', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const items = require("./items");
app.use("/api/items", items);

const users = require("./users");
app.use("/api/users", users);

app.listen(3000, () => console.log('Server listening on port 3000!'));