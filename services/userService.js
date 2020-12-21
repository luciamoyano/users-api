const User = require("../models/userModel");

class UserService {
  getUsers() {
    //.find() sin parametro filtra todos los usuarios de la db
    const query = User.find().exec();
    return query;
  }

  addUser(user) {
    //nuevo usuario respetando el modelo de usuario
    const newUser = new User(user);
    return newUser.save();
  }

  modifyUser(user) {
    //el metodo lee las propiedades enviadas y modifica solo las modificadas
    const query = User.findOneAndUpdate(
      {
        _id: user.id,
      },
      user
    ).exec();
    return query;
  }

  deleteUser(id) {
    const query = User.deleteOne({ _id: id }, function (err) {
      err ? console.log(err) : console.log("Successful deletion");
    });
    return query;
  }
}

module.exports = UserService;
