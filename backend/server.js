//  import .env file
require("dotenv").config();
// import express
const express = require("express");

const PORT = process.env.PORT;
const app = express();

app.listen(PORT || 3001, () => {
  console.log(`Server start on port ${PORT}`);
});
