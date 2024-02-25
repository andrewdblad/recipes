const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // Import the middleware

// Apply authentication middleware to all routes in the /recipes path
router.use('/recipes', ensureAuthenticated, require('./recipes'));

module.exports = router;

