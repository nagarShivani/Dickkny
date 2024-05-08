const express = require("express");
const router = express.Router();
const auth_Middleware = require("../controller/Authmiddleware/authmiddleware");
const user_controller = require("../controller/usercontroller");
const department_controller=require("../controller/Departmentcontroller");
const product_controller=require("../controller/productController");
const cart_controller=require("../controller/cartController");
const wishlist_controller=require("../controller/wishListController");
const coupon_controller=require("../controller/couponController");
const order_controller=require("../controller/orderController");

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
router.get("/getCartOfUser/:userId",cart_controller.getCartOfUser);
router.post("/removeFromCart",cart_controller.removeFromCart);
router.post("/updateCart",cart_controller.updateCart);

//wishlist
router.post("/addToWishList",wishlist_controller.addToWishList);
router.get("/getWishListOfUser/:userId",wishlist_controller.getWishListOfUser);
router.post("/removeFromWishList",wishlist_controller.removeFromWishList);




//coupon 
router.post('/createCoupon', coupon_controller.createCoupon);
router.post('/applyCoupon', coupon_controller.applyCoupon);
router.get('/getAllCoupons', coupon_controller.getAllCoupons);
router.get('/getCouponById/:id', coupon_controller.getCouponById);
router.put('/updateCoupon/:id', coupon_controller.updateCoupon);
router.delete('/deleteCoupon/:id', coupon_controller.deleteCoupon);

//orders
router.get('/getMyOrders', order_controller.getMyOrders);

module.exports = router;