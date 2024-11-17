const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredients = require('../models/ingredients.js');

router.get('/', async (req, res) => {
  const Recipes = await Recipe.find()
  res.render('recipes/index.ejs', { Recipes })
});

router.get('/new', async (req, res) => {
  const ingredients = await Ingredients.find()
  res.render('recipes/new.ejs', { ingredients })
});

router.post('/new', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id
    await newRecipe.save();
    res.redirect("/");
  } catch (error) {
    console.log('error');
  }
});

router.get('/:recipeId', async (req, res) => {
  const id = req.params.recipeId
  const Recipes = await Recipe.findById(id)
  res.render('recipes/show.ejs', { Recipes })
});

router.get('/:recipeId/edit', async (req, res) => {
  const id = req.params.recipeId
  const Recipes = await Recipe.findById(id)
  res.render('recipes/edit.ejs', { Recipes })
});

router.put('/:recipeId', async (req, res) => {
  const id = req.params.recipeId
  const Recipes = await Recipe.findById(id)
  Recipes.set(req.body)
  Recipes.save()
  res.render('recipes/show.ejs', { Recipes })
});

router.delete('/:recipeId', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.recipeId);
  res.redirect("/");
});


module.exports = router;
