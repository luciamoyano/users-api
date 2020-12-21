const express = require("express");
const router = express.Router();

//require controller
const UserController = require("../controllers/userController");
//require service
const UserService = require("../services/userService");
//instanciar controller con service instanciado como parametro
const UserInstance = new UserController(new UserService());

router.post("/add", (req, res, next) => {
  UserInstance.addUser(req, res);
});

router.put("/modify", (req, res, next) => {
  UserInstance.modifyUser(req, res);
});

router.delete("/delete/:id", (req, res) => {
  UserInstance.deleteUser(req, res);
});

/* GET home page. */
router.get("/", (req, res, next) => {
  UserInstance.getUsers(req, res);
});

module.exports = router;
