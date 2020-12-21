const mongoose = require("mongoose");
//Schema es una funcionalidad de mongoose para crear modelos de data
const userSchema = mongoose.Schema({
  //escribir propiedades y tipo de datos asignados en esa propiedad
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
});

//asignamos un nombre al model (Test) que respetara ese schema de datos
//el modelo debe ser singular, las collections que se general son en plural
module.exports = mongoose.model("User", userSchema);
