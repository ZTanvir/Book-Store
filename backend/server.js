//  import .env file
require("dotenv").config();
// import express
const express = require("express");
// import database
const Book = require("./modules/book");

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());

// get all the books
app.get("/api/books", (request, response) => {
  // get all the books from database
  Book.find({}).then((allBooks) => response.json(allBooks));
});

// add new book
app.post("/api/books", (request, response, next) => {
  const body = request.body;
  if (!body.title || !body.author || !body.publishYear) {
    return response.status(404).json({
      error: "Title or author or publishYear missing",
    });
  }
  // create new book object
  const book = new Book({
    title: body.title,
    author: body.author,
    publishYear: body.publishYear,
  });
  // save book to mongodb
  book
    .save()
    .then((saveBook) => {
      response.json(saveBook);
    })
    .catch((error) => next(error));
});

// get a single book
app.get("/api/books/:id", (request, response, next) => {
  const id = request.params.id;
  Book.findById(id)
    .then((book) => {
      if (book) {
        response.json(book);
      } else {
        response.status(404).send({ error: "Book id not found" });
      }
    })
    .catch((error) => next(error));
});

// handle all the error related to route
const handleRouteError = (error, request, response, next) => {
  console.log("Error name", error.name);
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(handleRouteError);
app.listen(PORT || 3001, () => {
  console.log(`Server start on port ${PORT}`);
});
