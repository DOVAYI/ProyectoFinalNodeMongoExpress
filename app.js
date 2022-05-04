require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/user");
const app = express();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const auth = require("./middleware/auth");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { name, username, password } = req.body;
  
      // Validate user input
      if (!(name && password && username )) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ username });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        name,
        username: username.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  app.get("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { username, password } = req.body;
  
      // Validate user input
      if (!(username && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ username });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).json;
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

  app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });
  

module.exports = app;