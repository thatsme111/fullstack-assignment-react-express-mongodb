// configuring environment variables before server starts
require("dotenv").config();

const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

// connecting to mongo daemon
mongoose.set('useCreateIndex', true);      // to remove warning: "collection.ensureIndex is deprecated"
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
    console.log("successfully connected to mongodb");
    http.createServer(app)
        .listen(5000);
}).catch(error => {
    console.log("Error connecting mongodb", error.message);
});