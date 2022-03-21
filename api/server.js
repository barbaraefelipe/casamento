require('dotenv').config();
const cool = require('cool-ascii-faces');
const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

global.__basedir = __dirname;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch(err => {
    console.log("Cannot connect to MongoDB database!", err);
    process.exit();
  });
  db.mongoose.set('debug', true);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get('/cool', (req, res) => res.send(cool()));
require("./app/routes/families.routes")(app);
require("./app/routes/gifts.routes")(app);

// config image public folder
var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

// set port, listen for requests
const PORT = process.env.PORT || 80;
console.log("starting app....", PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Cool :::` + cool());
});
