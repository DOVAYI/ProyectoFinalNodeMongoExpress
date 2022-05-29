/** 
 * Este archivo crea el esquema "el diseño o estructura"
 * de la bd
 */

/**
 * esta variable carga la funcionalidad de mongoose
 */
const mongoose = require("mongoose");

/**
 * Esta funcion crea el objeto de tipo esquema
 * 
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre del jugador es Requerido']
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'El nombre de Usuario es Requerido']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'El Password del jugador es Requerido']
    },
    token: { type: String },
});

module.exports = mongoose.model("user", userSchema);