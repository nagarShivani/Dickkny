const express = require("express");
const router = express.Router();
const auth_Middleware = require("../controller/Authmiddleware/authmiddleware");
const user_controller = require("../controller/usercontroller");
const department_controller=require("../controller/Departmentcontroller");
const product_controller=require("../controller/productController");
const cart_controller=require("../controller/cartController");

//user Routes
router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);
router.post("/forgot",user_controller.forgot);
router.post("/reset/:id/:token",user_controller.reset);
router.post("/ChangePassword",user_controller.ChangePassword)

//Department Routes
router.post("/addDepartment",department_controller.addDepartment);
router.get("/getAllDepartment",department_controller.getAllDepartment);
router.put("/updateDepartment/:id",department_controller.updateDepartment);
router.delete("/deleteDepartment/:id",department_controller.deleteDepartment);
router.get("/getAllDepartmentById/:id",department_controller.getAllDepartmentById);

//Product Routes
router.post("/addProduct",product_controller.addProduct);
router.get("/getAllProduct",product_controller.getAllProduct);
router.get("/getAllProductsById/:id",product_controller.getAllProductsById);

//Product Cart
router.post("/addTocart",cart_controller.addTocart);
router.post("/removeFromCart",cart_controller.removeFromCart);
router.post("/updateCart",cart_controller.updateCart);

module.exports = router;