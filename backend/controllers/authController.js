const User = require("../models/user");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  const result = await cloudinary.v2.uploader.upload(
    req.file.path,
    {
      folder: "avatars",
      width: 200,
      crop: "scale",
    },
    (err, res) => {
      console.log(err, res);
    }
  );

  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.url,
    },
    isDeleted: false,
  });

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Failed to create an account",
    });
  }

  sendToken(user, 200, res);
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter email & password" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    if (user.isDeleted) {
      return res.status(401).json({
        message: "Your account has been deactivated. Please contact support.",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    console.log("Login successful");
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(req.body.email);
  if (!user) {
    return res.status(404).json({ error: "User not found with this email" });
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://localhost:3000/newPassword/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "NoWaste Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return res.status(500).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Password reset token is invalid or has been expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password does not match" });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};

exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("password");

  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
};

exports.updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    // Find the user by ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.avatar !== "") {
      console.log("Uploading new avatar...");

      // If the user already has an avatar, delete the old one from Cloudinary
      if (user.avatar && user.avatar.public_id) {
        const image_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id);
        console.log("Old avatar deleted from Cloudinary.");
      }

      // Upload the new avatar to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "avatars",
        width: 200,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };

      console.log("New avatar uploaded to Cloudinary.");
    }

    // Update the user profile in the database
    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(401).json({ message: "User not updated" });
    }

    console.log("User profile updated successfully.");

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res
      .status(400)
      .json({ message: `User does not found with id: ${req.params.id}` });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: `User is not found with id: ${req.params.id}` });
    }

    // Instead of deleting the image from cloudinary, you can keep it as is.

    // Soft delete by updating 'isDeleted' to true
    user.isDeleted = true;
    await user.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
  });
};

exports.getUsersByRole = async (req, res, next) => {
  try {
    // Fetch all users with their _id and role
    const allUsers = await User.find({}, "_id role");

    // Filter users with the role "seller"
    const sellerUsers = allUsers.filter((user) => user.role === "seller");

    // Check if any seller users were found
    if (sellerUsers.length === 0) {
      return res.status(404).json({ message: "No sellers found" });
    }

    // Extract the _id values of seller users
    const sellerUserIds = sellerUsers.map((seller) => seller._id);

    // Fetch seller users by their _id and select only the "name" field
    const sellerDetails = await User.find(
      { _id: { $in: sellerUserIds } },
      "name"
    );

    res.status(200).json({
      success: true,
      sellers: sellerDetails,
    });
  } catch (error) {
    console.error("Error in getSellerUsers:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
