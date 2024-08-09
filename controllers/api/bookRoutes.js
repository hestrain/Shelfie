const router = require("express").Router();

// import any models you plan to use for this data's routes here
const { Book } = require("../../models");

// Route: create a new book
router.post("/", async (req, res) => {
  try {
    const bookData = await Book.create(req.body);

    req.session.save(() => {
      req.session.book_id = bookData.id;
      req.session.title = bookData.title;
      req.session.authors = bookData.authors;
      req.session.thumbnail = bookData.thumbnail;
      req.session.publishedDate = bookData.publishedDate;
      req.session.description = bookData.description;
      req.session.pageCount = bookData.pageCount;
      req.session.user_id = bookData.user_id;

      res.status(200).json(bookData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
