const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
require('dotenv').config();
const Path = require('path');
const processImage = require('express-processimage');

const routes = require('./index.route');
// import env config

const imagesRoot = Path.join(__dirname, './partEventsImages');

app.use(processImage({
    root: imagesRoot
}));
app.use(express.static(imagesRoot));

// express middleware
app.use(express.json());
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);


// mongodb local url
const dbConnectionUrl = "mongodb://localhost/myApp";

// mongodb connection code
mongoose.connect(dbConnectionUrl, { useNewUrlParser: true });

mongoose.connection
    .once('open', () => console.log("mongodb Connected Successfully .... "))
    .on('error', (err) => console.log("err", err))


// listion api port
app.listen(process.env.PORT, () => {
    console.log(`app listening at http://localhost:${process.env.PORT}`);
});

module.exports = app;