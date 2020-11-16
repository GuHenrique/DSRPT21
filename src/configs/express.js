const express = require("express");
const app = express();


app.use(express.json());

const routes = require("../shared/routes/routes");
routes(app);

module.exports = app;
