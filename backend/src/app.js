const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const logger = require("morgan");
const { globalErrorHandler } = require("./middlewares/error-handler");
const cors = require("cors");

const app = express();
app.use(express.static('uploads'))
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.use(logger("dev"));
app.use(globalErrorHandler);

module.exports = app;