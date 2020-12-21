// no requerimos el service porque lo pasamos en las rutas como parametros

class UserController {
  //userService viene del router,
  //tenemos que crear una variable dentro de la instancia del objeto con el this.
  constructor(userService) {
    this.userService = userService;
  }

  //async porque tenemos que esperar la llamada del service a la db
  async getUsers(req, res) {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("no users to display");
    }
  }

  async addUser(req, res) {
    const user = req.body;
    const { token } = req.headers;
    if (user.name && token == "r2d2") {
      //respuesta de la base de datos
      try {
        const response = await this.userService.addUser(user);
        res.status(200).send("user added");
      } catch (error) {
        //el parametro que recibe el catch es el error
        console.log(error);
        res.status(500).send("user couldn't be added");
      }
    } else if (!token || token !== "r2d2") {
      res.status(400).send("token needed");
    } else {
      res.status(400).send("no information provided");
    }
  }

  async modifyUser(req, res) {
    const user = req.body;
    if (user.id) {
      try {
        const response = await this.userService.modifyUser(user);
        console.log(response);
        res.status(200).send("user modified");
      } catch (error) {
        console.log(error);
        res.status(500).send("user couldn't be modified");
      }
    } else {
      res.status(400).send("no id provided");
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const response = await this.userService.deleteUser(id);
      console.log(response);
      res.status(200).send("deleted user");
    } catch (error) {
      res.status(500).send("user couldn't be deleted");
    }
  }
}

module.exports = UserController;
