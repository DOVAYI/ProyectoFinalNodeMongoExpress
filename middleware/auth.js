/**
 * este archivo permite verificar el token de acceso al momento de logearse
 */

/**
 * esta variable permite cargar la funcionalidad de jsonwebtoken
 */
const jwt = require("jsonwebtoken");
/**
 * cargar token personalizado guardada en la variable global TOKEN_KEY(archivo .env)
 */
const config = process.env;

/**
 * Este función permite verificar el token de acceso
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns cuando el totken null retorna error,requierindo el toquen,
 * cuando no puede verificar token retorna invalid token,
 * si todo sale bien, retorna next() siguiente.
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;