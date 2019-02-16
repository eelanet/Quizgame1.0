const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const authorize = require('../verifytoken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const CategoryController = require('../controllers/CategoryController');

// Etsi kaikki ketgoriat
router.get('/categories/allcategories', CategoryController.findAllCategories);
// Etsi yksi kategoria
router.get('/categories/category/:categoryId', CategoryController.findOneCategory);

// AUTHORIZE reitit
// Luo kategoria
router.post('/categories/create', authorize, CategoryController.create);


// Muokkaa kategorian nimeä
router.post('/categories/update/:categoryId', authorize, CategoryController.update);


// Poista kategoria
router.delete('/categories/delete/:categoryId', authorize, CategoryController.delete);


module.exports = router;
