const dotenv = require("dotenv");
dotenv.config();
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
    res.status(201).json({ loginid: savedUser._id, username: savedUser.email,message:'Registered Successfully' });
  } catch (error) {
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
      loginid: user._id,
      user,
    });
  } catch (err) {
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
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UsersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.companyName = req.body.companyName || null; // Optional field
    user.country = req.body.country;
    user.streetAddress = req.body.streetAddress;
    user.houseNumber = req.body.houseNumber;
    user.apartment = req.body.apartment || null; 
    user.city = req.body.city;
    user.state = req.body.state;
    user.postcode = req.body.postcode;
    user.phone = req.body.phone;
    await user.save();
    res.status(200).json({ success: true, message: 'User details updated successfully', user });
  } catch (err) {
    console.error(err);
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
exports.getAllUsers = async (req, res) => {
  try {
    const user = await UsersModel.find();
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
      text: `https://dickkny.com/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send reset email" });
      } else {
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


exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UsersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    if(!req.body.streetAddress || !req.body.city || !req.body.state || !req.body.postcode){

      return res.status(400).json({success: false, error:'streetAddress,city,state,postcode is required'})
    }

    const newAddress = {
      streetAddress: req.body.streetAddress,
      houseNumber: req.body.houseNumber,
      apartment: req.body.apartment || null,
      city: req.body.city,
      state: req.body.state,
      postcode: req.body.postcode,
      country: req.body.country,
    };

    user.multipleAddressArray.push(newAddress);

    await user.save();
    res.status(200).json({ success: true, message: 'Address added successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};



exports.getAddressById = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await UsersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the address
    const address = user.multipleAddressArray.find(
      (address) => address._id.toString() === addressId
    );

    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ address });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.updateAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const user = await UsersModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const addressIndex = user.multipleAddressArray.findIndex(address => address._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ success: false, error: 'Address not found' });
    }

    const updatedAddress = {
      streetAddress: req.body.streetAddress,
      houseNumber: req.body.houseNumber,
      apartment: req.body.apartment || null,
      city: req.body.city,
      state: req.body.state,
      postcode: req.body.postcode,
      country: req.body.country,
    };

    user.multipleAddressArray[addressIndex] = { ...user.multipleAddressArray[addressIndex]._doc, ...updatedAddress };

    await user.save();
    res.status(200).json({ success: true, message: 'Address updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


exports.deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;

  try {
    const user = await UsersModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressIndex = user.multipleAddressArray.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.multipleAddressArray.splice(addressIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "viddeveloper101@gmail.com",
    pass: "hnmc mhmo kjla czdv",
  },
});

exports.sendEmail = async (req,res)=>{
  const { email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email
    to: email,
    subject: 'Test Email',
    text: 'Hello, You have been subscribed to Dickkny',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({error:'Some error occured'})
    }
    res.status(200).json({message:'Email Sent Successfully!'})
  });

}

