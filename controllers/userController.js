// no requerimos el service porque lo pasamos en las rutas como parametros

class UserController {
  //userService viene del router,
  //tenemos que crear una variable dentro de la instancia del objeto con el this.
  constructor(userService) {
    this.userService = userService;
  }

  //async porque tenemos que esperar la llamada del service a la db
  async getUsers(req, res) {
    const users = await this.userService.getUsers();
    users
      ? res.status(200).json(users)
      : res.status(400).send("no users to display");
  }

  async addUser(req, res) {
    const user = req.body;
    const { token } = req.headers;
    if (user && user.name && token == "r2d2") {
      const response = await this.userService.addUser(user);
      //respuesta de la base de datos
      response
        ? res.status(200).send("user added")
        : res.status(400).send("user couldn't be added");
    } else if (!token || token !== "r2d2") {
      res.status(400).send("token needed");
    } else {
      res.status(400).send("no information provided");
    }
  }

  async modifyUser(req, res) {
    const user = req.body;
    if (user.id) {
      const response = await this.userService.modifyUser(user);
      console.log(response);
      res.status(200).send("user modified");
    } else {
      res.status(400).send("no id provided");
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const response = await this.userService.deleteUser(id);
    console.log(response);
    res.status(200).send("usuario borrado");
  }
}

module.exports = UserController;
