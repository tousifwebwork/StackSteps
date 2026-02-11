const express = require('express');
const Router = express.Router();
const {addQuestion,updateQuestion,deleteQuestion,getAllUsers} = require('../controller/adminController')
const  { JWT_Verify } = require('../middleware/jwt/jwt');

Router.get("/users", JWT_Verify, getAllUsers);
Router.post("/add", JWT_Verify, addQuestion);
Router.patch("/update/:id", JWT_Verify, updateQuestion);
Router.delete("/delete/:id", JWT_Verify, deleteQuestion);

module.exports = Router;