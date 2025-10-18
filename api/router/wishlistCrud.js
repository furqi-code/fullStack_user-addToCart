const express = require("express");
const Router = express.Router();
const { executeQuery } = require("../mySqldb/Query");

Router.get("/", async (req, res) => {
  try {
    const user_id = req.user_id;
    const products = await executeQuery(
      `SELECT p.product_id, p.name, p.description, p.category, p.MRP, p.discount, p.stock, p.img, w.quantity
      FROM wishlist w INNER JOIN products p
      ON w.product_id = p.product_id WHERE w.user_id = ?`,
      [user_id]
    );
    console.log("wishlist GET req \n", products);

    res.status(200).send(products);
  } catch (err) {
    console.log("Error fetching products", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

Router.post("/", async (req, res) => {
  try {
    const user_id = req.user_id;
    const product_id = req.query.product_id;
    const isProductExist = await executeQuery(
      `select * from wishlist where product_id = ? AND user_id = ?`,
      [product_id, user_id]
    );
    if (isProductExist.length === 0) {
      const inserted_item = await executeQuery(
        `insert into wishlist(user_id, product_id, quantity) values(?,?,?)`,
        [user_id, product_id, 1]
      );
      return res.status(200).send("Product inserted in your cart");
      //   if(inserted_item.insertId > 0)  // else{} executing after every insert idk why
      //     res.status(200).send("Product inserted in your cart");
      //   else
      //     throw{
      //         message: "Error inserting product in DB"
      //     }
    } else {
      return res.status(409).send({
        message: `This product ${isProductExist[0].name} already available in your cart / increase quantity`,
      });
    }
  } catch (err) {
    console.log("Error inserting products", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

Router.patch("/increase", async (req, res) => {
  try {
    const user_id = req.user_id;
    const product_id = req.query.product_id;
    const products = await executeQuery(
      `SELECT p.product_id, p.name, p.stock, w.quantity
      FROM wishlist w INNER JOIN products p
      ON w.product_id = p.product_id WHERE w.product_id = ? AND w.user_id = ?`,
      [product_id, user_id]
    );
    if (products.length === 0) {
      return res.status(404).send({ message: "Product not found in wishlist" });
    }
    const item = products[0];
    if (item.quantity < item.stock) {
      // stock wishlist table me nhi h isliye inner join krna pdega
      await executeQuery(
        `update wishlist set quantity = ? where user_id = ? AND product_id = ?`,
        [item.quantity + 1, user_id, product_id]
      );
      return res
        .status(200)
        .send(`Product quantity increased by 1 of your ${item.name}`);
    } else {
      return res
        .status(409)
        .send({ message: "You are out of Stock for " + item.name + " item" });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

Router.patch("/decrease", async (req, res) => {
  try {
    const user_id = req.user_id; 
    const product_id = req.query.product_id;
    const products = await executeQuery(
      `select * from wishlist where product_id = ? AND user_id = ?`,
      [product_id, user_id]
    );
    if (products.length === 0) {
      return res.status(404).send({ message: "Product not found in wishlist" });
    }
    const item = products[0];
    if (item.quantity <= 1) {
      await executeQuery(
        `delete from wishlist where user_id = ? AND product_id = ?`,
        [user_id, product_id]
      );
      return res.status(200).send(`This Product deleted`);
    } else {
      await executeQuery(
        `update wishlist set quantity = ? where user_id = ? AND product_id = ?`,
        [item.quantity - 1, user_id, product_id]
      );
      return res.status(200).send(`Product quantity decreased by 1`);
    }
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});

Router.delete("/eliminate", async (req, res) => {
  try {
    const user_id = req.user_id;
    const product_id = req.query.product_id;
    await executeQuery(
      `delete from wishlist where user_id = ? AND product_id = ?`,
      [user_id, product_id]
    );
    return res.status(200).send(`This Product deleted`);
  } catch (err) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
});


module.exports = Router;
