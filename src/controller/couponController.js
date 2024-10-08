// controllers/couponController.js

const Coupon = require("../Schema/coupon");


// Controller functions for coupons

exports.createCoupon = async (req, res) => {
  try {
    // Initialize the coupon object
    const couponData = {
      code: req.body.code,
      expiryDate: req.body.expiryDate,
      description: req.body.description,
      isActive: req.body.isActive
    };

    // Check for discount values and set accordingly
    if (req.body.discountValue) {
      couponData.discountValue = req.body.discountValue;
    }

    if (req.body.discountValuePercentage) {
      couponData.discountValuePercentage = req.body.discountValuePercentage;
    }

    // Create the coupon
    const coupon = new Coupon(couponData);
    await coupon.save();

    res.status(201).json(coupon);
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ error: "Failed to create coupon" });
  }
};

exports.applyCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    // Find the coupon in the database
    const coupon = await Coupon.findOne({ code });

    // If coupon not found or inactive, return error
    if (!coupon || !coupon.isActive) {
      return res.status(400).json({ error: "Invalid or inactive coupon" });
    }

    // If coupon is valid, send the discount value in response
    res.status(200).json({ discountValue: coupon.discountValue });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ error: "Failed to apply coupon" });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    res.status(500).json({ error: "Failed to fetch coupons" });
  }
};

exports.getCouponById = async (req, res) => {
  const { id } = req.params;
  try {
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error("Error fetching coupon by ID:", error);
    res.status(500).json({ error: "Failed to fetch coupon by ID" });
  }
};

exports.updateCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error("Error updating coupon:", error);
    res.status(500).json({ error: "Failed to update coupon" });
  }
};

exports.deleteCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    res.status(500).json({ error: "Failed to delete coupon" });
  }
};
