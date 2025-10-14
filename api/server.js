const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./constants");
const { Auth } = require("./Authmiddleware");

// Local modules
const signup = require("./Router/signup");
const login = require("./Router/login");
const forgot = require("./Router/forgotPassword");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(Auth);

// Local module
const item_operations = require("./router/productCrud");

// Route middlewares
app.use("/signup", signup);
app.use("/login", login);
app.use("/forgotPassword", forgot);
app.use("/products", item_operations);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
