const router = require("express").Router();

// import any models you plan to use for this page's routes here
const { Book } = require("../../models");

let bookResults = JSON.parse(localStorage.getItem("bookResults"));

// things that deal with the search functions
//get the search results and render them????? except i wrote that in bookAPI.js
router.get("/search", withGuard, async, (req, res) => {
    try {
      res.render("search", {
        bookResults,
        loggedIn: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //to add the selected searched book ot the database
  router.post("/addBook", async (req, res) => { 
    try {
      const newBookData = await Book.create({
        title: req.body.title,
        authors: req.body.authors,
        thumbnail: req.body.thumbnail,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        pageCount: req.body.pageCount,
        user_id: req.session.user_id,
      });
      res.json(newBookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;