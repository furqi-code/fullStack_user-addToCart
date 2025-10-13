const express = require('express');
const Router = express();
const { executeQuery } = require("../mySqldb/Query");

Router.get("/", async (req, res) => {
  try{
    const products = await executeQuery(`select * from products where category = ?`, req.query.category);
    res.status(200).send(products);
  }catch(err){
    console.log("Error fetching products", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong"
    })
  }
});

Router.post("/", async (req, res) => {
  try{
    const {name, MRP, description, img, category, discount, stock, quantity} = req.body.product;
    const isProductExist = await executeQuery(`select * from products where name = ? AND description = ?`, [name, description]);
    if(isProductExist.length === 0){
      const inserted_item = await executeQuery(`insert into products(name, MRP, description, img, category, discount, stock, quantity)
        values(?,?,?,?,?,?,?,?)`, [name, MRP, description, img, category, discount, stock, quantity]);
        if(inserted_item.insertId > 0)
          res.status(200).send("Product inserted in DB");
        else
          throw{
          message: "Error inserting product in DB"
        } 
    }else{
      throw{
        message: `This product ${name} already exist in our DB / increase stock property`
      }
    }
  }catch(err){
    console.log("Error inserting products", err);
    res.status(500).send({
      message: err.message ? err.message : "Something went wrong"
    })
  }
});

module.exports = Router;