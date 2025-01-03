const { Router } = require('express');
const router = Router();
const ContactController = require('./app/controller/ContactController');
const CategoryController = require('./app/controller/CategoryController');

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts/', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.create);
module.exports = router;
