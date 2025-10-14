const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("../constants");
const { executeQuery } = require("../mySqldb/Query");

Router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      let [dbUser] = await executeQuery(`select * from users where email = ?`, [
        email,
      ]);
      let hashpwrd = dbUser.password;
      if (dbUser && bcrypt.compareSync(password, hashpwrd)) {
        const token = jwt.sign(
          {
            username: dbUser.username,
            user_id: dbUser.user_id,
          },
          SECRET
        );
        res.status(200).send({
          message: "User logged in",
          token,
        });
      } else {
        throw {
          message: "Incorrect Password / Email",
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
      message: err.message ? err.message : "Something went wrong",
    });
  }
});

module.exports = Router;
