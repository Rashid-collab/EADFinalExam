

const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Get a specific recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a recipe by ID
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) {
