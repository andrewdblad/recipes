const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated'); // Import the middleware
const recipesController = require('../controllers/recipes');

// Apply authentication middleware to all routes in this file
router.use(ensureAuthenticated);

router.get('/', recipesController.getAll);
router.get('/:id', recipesController.getSingle);
router.put('/:id', recipesController.updateRecipe);
router.delete('/:id', recipesController.deleteRecipe);

module.exports = router;
