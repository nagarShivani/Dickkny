const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UsersModel = require("../Schema/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new UsersModel({
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ loginid: savedUser._id, username: savedUser.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successfull",
      token: token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging in" });
  }
};


exports.ChangePassword = async (req, res) => {
  try {
    const { employeeId, oldPassword, newPassword } = req.body;

    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);

    const user = await UsersModel.findById(employeeId);
    if (!user) {
      return res.status(401).json({ message: "Employee not found!" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    console.log("Is password correct?", isPasswordMatch);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Old password is incorrect!" });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    await UsersModel.findByIdAndUpdate(employeeId, {
      password: hashedNewPassword,
    });

    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user document by userId
    const user = await UsersModel.findById(userId);

    if (!user) {
      // If user with the given userId is not found, return a 404 Not Found error
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Update user details with specific fields from req.body
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.companyName = req.body.companyName || null; // Optional field
    user.country = req.body.country;
    user.streetAddress = req.body.streetAddress;
    user.houseNumber = req.body.houseNumber;
    user.apartment = req.body.apartment || null; // Optional field
    user.city = req.body.city;
    user.state = req.body.state;
    user.postcode = req.body.postcode;
    user.phone = req.body.phone;
    // Save the updated user document
    await user.save();

    // Send success response with updated user details
    res.status(200).json({ success: true, message: 'User details updated successfully', user });
  } catch (err) {
    console.error(err);
    // Send error response with appropriate status code
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.getUserDetailById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UsersModel.findById(userId);
    if(!user){
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

exports.forgot = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("rrrr", email);
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a JWT token with user's ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
    console.log(user._id);

    // Send email with reset password link

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "viddeveloper101@gmail.com",
        pass: "hnmc mhmo kjla czdv",
      },
    });
    // Email options
    const mailOptions = {
      from: "viddeveloper101@gmail.com",
      to: email,
      subject: "Reset Your Password",
      text: `http://localhost:4200/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send reset email" });
      } else {
        console.log("Reset email sent:", info.response);
        return res.json({ message: "Reset email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.reset = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  console.log("token", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          UsersModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
};
