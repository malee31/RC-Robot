const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.resolve(__dirname, "static")));

app.listen(process.env.PORT || 3000);