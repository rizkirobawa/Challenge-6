var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const router = require("./routes/v1")


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router)

app.get('/', (req,res) => res.json({status: true, message: "Use endpoint /api/v1/api-docs to access API documentation", data: null}))

// 500 error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: err.message,
    data: null,
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `are you lost? ${req.method} ${req.url} is not registered!`,
    data: null,
  });
});

module.exports = app;
