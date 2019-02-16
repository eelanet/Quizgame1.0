const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const adminController = require('../controllers/AdminController');

// Rekisteröityminen eli luodaan uudelle adminille tunnarit
router.post('/admin/register', adminController.registerAdmin);
// Kirjautuminen eli autentikaatio tunnareilla
router.post('/admin/login', adminController.authenticateAdmin);


module.exports = router;