const express = require("express");
const router = express.Router();
const auth_Middleware = require("../controller/Authmiddleware/authmiddleware");
const user_controller = require("../controller/usercontroller");
const product_controller=require("../controller/productController");
const cart_controller=require("../controller/cartController");
const wishlist_controller=require("../controller/wishListController");
const coupon_controller=require("../controller/couponController");
const order_controller=require("../controller/orderController");
const billing_controller=require("../controller/billingController");
const blog_controller=require("../controller/blogcontroller");
const category_controller=require("../controller/categoryController");

//user Routes
router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);
router.post("/forgot",user_controller.forgot);
router.post("/reset/:id/:token",user_controller.reset);
router.post("/ChangePassword",user_controller.ChangePassword);
router.put("/updateUserDetails/:userId",user_controller.updateUserDetails);
router.get("/getUserDetailById/:userId",user_controller.getUserDetailById);
router.get("/getAllUsers",user_controller.getAllUsers);

//Blog Routes
router.post("/addBlog",blog_controller.addBlog);
router.get("/getAllBlog",blog_controller.getAllBlog);
router.put("/updateBlog/:id",blog_controller.updateBlog);
router.delete("/deleteBlog/:id",blog_controller.deleteBlog);
router.get("/getAllBlogById/:id",blog_controller.getAllBlogById);

//Category Routes
router.post("/addCategory",category_controller.addCategory);
router.get("/getAllCategory",category_controller.getAllCategory);
router.put("/updateCategory/:id",category_controller.updateCategory);
router.delete("/deleteCategory/:id",category_controller.deleteCategory);
router.get("/getAllCategoryById/:id",category_controller.getAllCategoryById);

//Product Routes
router.post("/addProduct",product_controller.addProduct);
router.put("/updateProduct/:id",product_controller.updateProduct);
router.get("/getAllProduct",product_controller.getAllProduct);
router.get("/getAllProductsById/:id",product_controller.getAllProductsById);
router.delete("/deleteProduct/:id",product_controller.deleteProduct);

//Product Cart
router.post("/addTocart",cart_controller.addTocart);
router.get("/getCartOfUser/:userId",cart_controller.getCartOfUser);
router.post("/removeFromCart",cart_controller.removeFromCart);
router.post("/updateCart",cart_controller.updateCart);

//wishlist
router.post("/addToWishList",wishlist_controller.addToWishList);
router.get("/getWishListOfUser/:userId",wishlist_controller.getWishListOfUser);
router.post("/removeFromWishList",wishlist_controller.removeFromWishList);


//billing
router.post('/payBill', billing_controller.payBill);
router.get('/getAllBills', billing_controller.getAllBills);

//coupon 
router.post('/createCoupon', coupon_controller.createCoupon);
router.post('/applyCoupon', coupon_controller.applyCoupon);
router.get('/getAllCoupons', coupon_controller.getAllCoupons);
router.get('/getCouponById/:id', coupon_controller.getCouponById);
router.put('/updateCoupon/:id', coupon_controller.updateCoupon);
router.delete('/deleteCoupon/:id', coupon_controller.deleteCoupon);

//orders
router.get('/getMyOrders', order_controller.getMyOrders);
router.get('/getAllOrders', order_controller.getAllOrders);

module.exports = router;