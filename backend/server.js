//  import .env file
require("dotenv").config();
// import express
const express = require("express");
// import book router
const bookRouter = require("./routes/bookRouter");

const PORT = process.env.PORT;
const app = express();

app.use("/api/books", bookRouter);

app.listen(PORT || 3001, () => {
  console.log(`Server start on port ${PORT}`);
});
