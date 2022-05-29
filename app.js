require("dotenv").config();
require("./config/database").connect();
/**
 * almacena funcionalidad de express
 */
const express = require("express");
/**
 * carga modelo a usar de la base de datos
 */
const User = require("./model/user");
/**
 * carga la funcionalidad de express
 */
const app = express();
/**
 * carga la funcionalidad para encriptar contraseña
 */
const bcrypt = require('bcryptjs');
/**
 * carga la funcionalidad para la verificación de token de acceso
 */
const jwt = require('jsonwebtoken');
const auth = require("./middleware/auth");
/**
 * carga funcionlidad del cors
 */
const cors = require("cors");
/**
 * carga funcionalidad de body parser(accesoo alobjeto req)
 * 
 */
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

/**
 * ruta permite guardar un nuevo usuario
 */
app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { name, username, password } = req.body;

    // Validate user input
    if (!(name && password && username)) {
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



/**
 * ruta logerase atravez de tokens de acceso por tal razon se usa 
 */
app.post("/login", async (req, res) => {

  // Nuestra lógica de inicio de sesión comienza aquí
  try {
    // Obtener la entrada del usuario
    const { username, password } = req.body;

    // Validar la entrada del usuario

    // Validar si el usuario existe en nuestra base de datos


    if (!(password && username)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      res.status(200).send(user);

    } else {
      res.send("usuario y/o contraseña invalido");
    }

  } catch (err) {
    console.log(err);
  }
  
});

/**
 * esta ruta permite obtener todos los usuario de la bd
 */
app.get("/players", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
  }

  //res.status(200).send("Welcome 🙌 ");
});


module.exports = app;