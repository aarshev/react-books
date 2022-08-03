const router = require('express').Router();
const controller = require('../controllers/book');

router.get('', controller.getBooks);
router.get('/:bookId', controller.getBook);

router.post('', controller.addBook);
router.post('/like/:bookId', controller.likeBook);

router.put('/:bookId', controller.updateBook);
router.delete('/:bookId', controller.deleteBook);

module.exports = router;
