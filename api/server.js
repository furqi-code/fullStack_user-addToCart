const express = require("express");
const app = express();
const PORT = 1111;
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// Local module
const item_operations = require("./router/productCrud");

app.use("/products", item_operations);


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
