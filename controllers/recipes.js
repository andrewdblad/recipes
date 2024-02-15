const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    console.log('getAll function called');
    const result = await mongodb.getDb().db().collection('recipes').find().toArray();

    // Validation: Check if the result is an array
    if (Array.isArray(result)) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(500).json({ error: 'Internal Server Error - Invalid data received' });
    }

  } catch (error) {
    console.error('Error in getAll:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

  
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').findOne({ _id: userId });

    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const updatedRecipe = req.body; // Assuming the updated data is sent in the request body

    const result = await mongodb.getDb().db().collection('recipes').updateOne(
      { _id: userId },
      { $set: updatedRecipe }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Recipe updated successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    // Check if req is defined and has params
    if (!req || !req.params) {
      throw new Error('Invalid request object');
    }

    const userId = new ObjectId(req.params.id);

    // Check if res is defined and has status method
    if (!res || typeof res.status !== 'function') {
      throw new Error('Invalid response object');
    }

    const result = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: userId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ error: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    // If res is not defined or doesn't have status method, log to console
    if (res && typeof res.status === 'function') {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.error('Invalid response object - Unable to send HTTP response');
    }
  }
};

module.exports = {
  getAll,
  getSingle,
  updateRecipe,
  deleteRecipe
};
