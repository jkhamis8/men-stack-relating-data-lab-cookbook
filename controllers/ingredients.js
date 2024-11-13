const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const ingredients = require('../models/ingredients.js');

router.get('/', async (req, res) => {
  const ingredientsObj = await ingredients.find()
  res.render('ingredients/index.ejs', { ingredientsObj })
});

router.get('/new', async (req, res) => {
  res.render('ingredients/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const newIngredients = new ingredients(req.body);
    await newIngredients.save();
    res.redirect("/");
  } catch (error) {
    // Handle errors
  }
});

router.get('/:ingredientsId', async (req, res) => {
  const id = req.params.id
  const ingredientsObj = await ingredients.findById(id)
  res.render('/show.ejs', { ingredientsObj })
});

router.get('/:ingredientsId/edit', async (req, res) => {
  const id = req.params.id
  const ingredientsObj = await ingredients.findById(id)
  res.render('/edit.ejs', { ingredientsObj })
});

router.put('/:ingredientsId/edit', async (req, res) => {
  const id = req.params.id
  const ingredientsObj = await ingredients.findById(id)
  ingredientsObj.set(req.body)
  ingredientsObj.save()
  res.render('/show.ejs', { ingredientsObj })
});

router.delete('/:ingredientsId/edit', async (req, res) => {
  await ingredients.findByIdAndDelete(req.params.id);
  res.redirect("/");
});


module.exports = router;
