const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const { SALTROUNDS } = require("../constants");
const { executeQuery } = require("../mySqldb/Query");

Router.patch("/", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (email && newPassword) {
      let [existing_user] = await executeQuery(
        `select * from users where Email = ?`,
        [email]
      );
      console.log(existing_user);
      if (existing_user) {
        let dbUser = existing_user;
        let update_pass = await executeQuery(
          `update users set Password = ? where user_id = ?`,
          [bcrypt.hashSync(newPassword, SALTROUNDS), dbUser.user_id]
        );
        res.status(200).send({
          message: "Reset Password successfully",
        });
      } else {
        throw {
          message: "Email/user not found in DB",
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
