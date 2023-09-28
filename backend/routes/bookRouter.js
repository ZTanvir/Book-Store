// import express
const express = require("express");
const router = express.Router();

// import database
const Book = require("../modules/book");

// middleware
router.use(express.json());

// middleware functions
// handle all the error related to route
const handleRouteError = (error, request, response, next) => {
  console.log("Error name", error.name);
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
// when user request a route that not created
const unknownRoute = (request, response) => {
  response.status(404).send({ error: "Unknown route" });
};

// get all the books
router.get("/", (request, response) => {
  // get all the books from database
  Book.find({}).then((allBooks) => response.json(allBooks));
});

// add new book
router.post("/", (request, response, next) => {
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
router.get("/:id", (request, response, next) => {
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

// delete a single book
router.delete("/:id", (request, response, next) => {
  const id = request.params.id;

  Book.findByIdAndRemove(id)
    .then((successful) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// update a single book
router.put("/:id", (request, response, next) => {
  const id = request.params.id;
  const body = request.body;
  if (!body.title || !body.author || !body.publishYear) {
    return response.status(404).json({
      error: "Title or author or publishYear missing",
    });
  }

  Book.findByIdAndUpdate(id, body, { new: true })
    .then((newBook) => response.json(newBook))
    .catch((error) => next(error));
});

router.use(handleRouteError);
router.use(unknownRoute);

module.exports = router;
