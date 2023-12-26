const express = require("express");
const router = express.Router();

const { getUsers, addUser, deleteUser, updateUser, deleteUsers, searchUser } = require("../../controllers/index.controller")

// ROUTES * /api/user/
router.get("/get-users", getUsers);
router.post("/add-user", addUser);
router.delete("/delete-user", deleteUser);
router.put("/update-user", updateUser);
router.delete("/delete-users", deleteUsers);
router.get("/", searchUser);


module.exports = router;
