const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const authController = require('./controllers/auth.js')
const isSignedIn = require("./middleware/is-signed-in");

const recipesController = require('./controllers/recipes.js');
const ingredientsController = require('./controllers/ingredients.js');

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";
const passUserToView = require("./middleware/pass-user-to-view.js");
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passUserToView);

app.use("/auth", authController)
app.use('/recipes', recipesController);
app.use('/ingredients', ingredientsController);

app.use(isSignedIn)

app.get('/', async (req, res) => {
  res.redirect('/recipes');
});
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});


