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
const banner_controller=require("../controller/bannerController");
const brand_controller=require("../controller/brandController");
const size_controller=require("../controller/sizeController");
const color_controller=require("../controller/colorController");
const enquiry_controller=require("../controller/enquiryController");
const Rating_controller=require("../controller/ratingController");
const getInTouch_controller=require("../controller/getintouchController");
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
router.post("/addAddress/:userId",user_controller.addAddress);
router.put("/updateAddress/:userId/:addressId",user_controller.updateAddress);
router.post("/sendEmail",user_controller.sendEmail);


//Blog Routes
router.post("/addBlog",blog_controller.addBlog);
router.get("/getAllBlog",blog_controller.getAllBlog);
router.put("/updateBlog/:id",blog_controller.updateBlog);
router.delete("/deleteBlog/:id",blog_controller.deleteBlog);
router.get("/getAllBlogById/:id",blog_controller.getAllBlogById);

//Banner Routes
router.post("/addBanner",banner_controller.addBanner);
router.get("/getAllBanner",banner_controller.getAllBanner);
router.put("/updateBanner/:id",banner_controller.updateBanner);
router.delete("/deleteBanner/:id",banner_controller.deleteBanner);
router.get("/getAllBannerById/:id",banner_controller.getAllBannerById);

//Brand Routes
router.post("/addBrand",brand_controller.addBrand);
router.get("/getAllBrand",brand_controller.getAllBrand);
router.put("/updateBrand/:id",brand_controller.updateBrand);
router.delete("/deleteBrand/:id",brand_controller.deleteBrand);
router.get("/getAllBrandById/:id",brand_controller.getAllBrandById);

//color Routes
router.post("/addcolor",color_controller.addcolor);
router.get("/getAllcolor",color_controller.getAllcolor);
router.put("/updatecolor/:id",color_controller.updatecolor);
router.delete("/deletecolor/:id",color_controller.deletecolor);
router.get("/getAllcolorById/:id",color_controller.getAllcolorById);

//size Routes
router.post("/addsize",size_controller.addsize);
router.get("/getAllsize",size_controller.getAllsize);
router.put("/updatesize/:id",size_controller.updatesize);
router.delete("/deletesize/:id",size_controller.deletesize);
router.get("/getAllsizeById/:id",size_controller.getAllsizeById);


//Enquiry Routes
router.post("/addEnquiry",enquiry_controller.addEnquiry);
router.get("/getAllEnquiry",enquiry_controller.getAllEnquiry);
router.put("/updateEnquiry/:id",enquiry_controller.updateEnquiry);
router.delete("/deleteEnquiry/:id",enquiry_controller.deleteEnquiry);
router.get("/getAllEnquiryById/:id",enquiry_controller.getAllEnquiryById);

//Rating Routes
router.post("/addRating",Rating_controller.addRating);
router.get("/getAllRating",Rating_controller.getAllRating);
router.put("/updateRating/:id",Rating_controller.updateRating);
router.delete("/deleteRating/:id",Rating_controller.deleteRating);
router.get("/getAllRatingById/:id",Rating_controller.getAllRatingById);

//getinTouch Routes
router.post("/addgetInTouch",getInTouch_controller.addgetInTouch);
router.get("/getAllgetInTouch",getInTouch_controller.getAllgetInTouch);
router.put("/updategetInTouch/:id",getInTouch_controller.updategetInTouch);
router.delete("/deletegetInTouch/:id",getInTouch_controller.deletegetInTouch);
router.get("/getAllgetInTouchById/:id",getInTouch_controller.getAllgetInTouchById);

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
router.get("/getAllProductApiforFilter",product_controller.getAllProductApiforFilter);
router.get("/searchProduct",product_controller.searchProduct);
router.get("/getProductByCategoryId/:categoryId",product_controller.getProductByCategoryId);
router.get("/getAllProductsById/:id",product_controller.getAllProductsById);
router.delete("/deleteProduct/:id",product_controller.deleteProduct);
router.get("/getCatProdBrand",product_controller.getCatProdBrand);
router.get("/sortProductByPrice",product_controller.sortProductByPrice);

//Product Cart
router.post("/addTocart",cart_controller.addTocart);
router.get("/getCartOfUser/:userId",cart_controller.getCartOfUser);
router.get("/getCountOfCartAndWishListOfUser/:userId",cart_controller.getCountOfCartAndWishListOfUser);
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
router.get('/getMyOrders/:userId', order_controller.getMyOrders);
router.get('/getAllOrders', order_controller.getAllOrders);

module.exports = router;