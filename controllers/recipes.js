const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
  const Recipes = await Recipe.find()
  res.render('recipes/index.ejs', { Recipes })
});

router.get('/new', async (req, res) => {
  res.render('recipes/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    newRecipe.owner = req.session.user._id
    await newRecipe.save();
    res.redirect("/");
  } catch (error) {
    // Handle errors
  }
});

router.get('/:recipeId', async (req, res) => {
  const id = req.params.id
  const Recipes = await Recipe.findById(id)
  res.render('/show.ejs', { Recipes })
});

router.get('/:recipeId/edit', async (req, res) => {
  const id = req.params.id
  const Recipes = await Recipe.findById(id)
  res.render('/edit.ejs', { Recipes })
});

router.put('/:recipeId/edit', async (req, res) => {
  const id = req.params.id
  const Recipes = await Recipe.findById(id)
  Recipes.set(req.body)
  Recipes.save()
  res.render('/show.ejs', { Recipes })
});

router.delete('/:recipeId/edit', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


module.exports = router;
