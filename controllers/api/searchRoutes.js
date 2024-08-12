
const router = require("express").Router();

// protects routes from unauthorized access
const { withGuard } = require("../../utils/authGuard");

// things that deal with the search functions

const {Book, SearchedBook} = require("../../models");
const { logger } = require("sequelize/lib/utils/logger");

//get the search results and render them????? except i wrote that in bookAPI.js
router.get("/searchResults", withGuard, async (req, res) => {
    try {
      getBooks(req.body),
      res.render("searchResults", {
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
      console.log('addBook running');
      
      console.log(req.body);
      
      const newBookData = await Book.create(
req.body
      );
      res.json(newBookData);
    } catch (err) {
      console.log(err);
      
      res.status(400).json(err);
    }
  });


    //posts the search results to a new table and then redners them MAYBE LOL
    router.post("/searchResults", async (req, res) => { 
      try {
        const searchResults = req.body;
        
        await SearchedBook.truncate();

        const results = await SearchedBook.bulkCreate(
          searchResults
                );
        
        // res.render('search', {
        //   searchResults, 
        //   logged_in: req.session.logged_in 
        // })
        res.json(searchResults);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  
  module.exports = router;