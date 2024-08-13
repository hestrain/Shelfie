const router = require('express').Router();
const Book = require('../models/Book');

// ? route to get one Book
router.get('/:id', async (req, res) => {
    try {
      const bookData = await Book.findByPk(req.params.id);
      if (!bookData) {
        res.status(404).json({ message: 'A book with this id was not found' });
        return;
      }
      const book = bookData.get({ plain: true });
      res.render('book', book);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;