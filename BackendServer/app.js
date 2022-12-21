const express = require("express");
const app = express();
const index = require('./routes/index');

app.use(express.json());

app.use('/api', index);
app.use();

module.exports = app;
