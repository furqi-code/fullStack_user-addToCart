const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const { SALTROUNDS } = require("../constants");
const { executeQuery } = require("../mySqldb/Query");

Router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (email && password && username) {
      const existingUser = await executeQuery(
        `select * from users where Email = ? OR Username = ?`,
        [email, username]
      );
      if (existingUser.length === 0) {
        const insertedUser = await executeQuery(
          `insert into users(username, email, password) values(?,?,?)`,
          [username, email, bcrypt.hashSync(password, SALTROUNDS)]
        );
        if (insertedUser.insertId > 0) res.status(200).send("Signup done");
        else
          throw {
            message: "user not inserted in DB",
          };
      } else {
        throw {
          message: "User already exists with this email / username",
        };
      }
    } else {
      throw {
        message: "provide necessary details",
      };
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err.message? err.message : "Something went wrong",
    });
  }
});

module.exports = Router;
