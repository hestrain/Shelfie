
const router = require("express").Router();

// protects routes from unauthorized access
const { withGuard } = require("../../utils/authGuard");

// things that deal with the search functions

const SearchedBook = require("../../models/SearchedBook");

//get the search results and render them????? except i wrote that in bookAPI.js
router.get("/search", withGuard, async, (req, res) => {
    try {
      getBooks(req.body),
      res.render("search", {
        bookResults,
        loggedIn: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  
  //to add the selected searched book ot the database
  router.post("/addBook", withGuard, async (req, res) => { //whys this one greys out
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
      res.status(400).json(err);
    }
  });


    //posts the search results to a new table and then redners them MAYBE LOL
    router.post("/searchResults", async (req, res) => { 
      try {
          const searchResults = await SearchedBook.bulkCreate({
         ...req.body
        });
        res.render('search', {
          searchResults, 
          logged_in: req.session.logged_in 
        })
        res.json(searchResults);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  module.exports = router;