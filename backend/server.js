//  import .env file
require("dotenv").config();
// import express
const express = require("express");
// import database
const Book = require("./modules/book");

const PORT = process.env.PORT;
const app = express();

app.listen(PORT || 3001, () => {
  console.log(`Server start on port ${PORT}`);
});
