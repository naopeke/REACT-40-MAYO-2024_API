const { Router } = require ('express');
const router = Router();
const userCtrl = require('../controller/user.controller');
const bookCtrl = require('../controller/book.controller');

router.post('/register', userCtrl.registerUser);

router.post('/login', userCtrl.authenticateUser);

router.put('/profile', userCtrl.editUser);

router.get('/books', bookCtrl.getBooks);
router.post('/books', bookCtrl.addBooks);
router.put('/books/:id_book', bookCtrl.updateBooks);
router.delete('/books/:id_book', bookCtrl.deleteBooks);


module.exports = router;