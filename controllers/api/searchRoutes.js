const router = require("express").Router();

// import any models you plan to use for this page's routes here
const { Book } = require("../models");

// things that deal with the search functions
//get the search results and render them????? except i wrote that in bookAPI.js
router.get("/search", withGuard, async, (req, res) => {
    try {
      res.render("search");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //to add the selected searched book ot the database
  router.post("/", async (req, res) => { //i need to figure out what the route is... is this an API? help
    try {
      const newBookData = await Book.create({
        //either of...
        ...req.body, 
        //or the below code:
        // title: req.body.title,
        // authors: req.body.authors,
        // thumbnail: req.body.thumbnail,
        // publishedDate: req.body.publishedDate,
        // description: req.body.description,
        // pageCount: req.body.pageCount,
        user_id: req.session.user_id,
      });
      res.json(newBookData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;