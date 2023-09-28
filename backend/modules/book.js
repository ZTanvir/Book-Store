const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
mongoose.set("strictQuery", false);

// connect to mongodb database and display appropriate message
mongoose
  .connect(url)
  .then((connected) => {
    console.log(`Connected to the database`);
  })
  .catch((error) => {
    console.log(`Error on connecting to mongodb`, error);
  });

// create a book schema
const bookScheme = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publishYear: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
// formate document and set to JSON

//  export the book model
module.exports = mongoose.model("Book", bookScheme);
