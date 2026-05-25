const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Transaction = require("../models/Transactions");

const blacklistedToken = new Set();

async function registerUser(req, res) {
  const { username, email, password, confirmPassword, role } = req.body;
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Bad request, please fill out all fields and try again",
    });
  }
  try {
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(404).json({
        success: false,
        message:
          "User already exists, please try again with a different username or email",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password doesn't match, please check and try again ",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const hashConfirmPassword = await bcrypt.hash(confirmPassword, salt);

    const newlyRegisteredUser = new User({
      username,
      email,
      password: hashPassword,
      confirmPassword: hashConfirmPassword,
      role: req.body.role || "user",
    });

    await newlyRegisteredUser.save();

    return res.status(200).json({
      success: true,
      message: "User registeration successful",
      newlyRegisteredUser,
    });
  } catch (error) {
    console.log("failed to register user -> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error, failed to register user",
    });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Error!, please fill all fields and try again",
    });
  }
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registed, please register and try again",
      });
    }

    const confirmPassword = await bcrypt.compare(password, user.password);

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect, please try again",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      path: "/", // same site as frontend
      maxAge: 7 * 24 * 60 * 60 * 1000, // expires in 7 days
      sameSite: "Lax", // shouldn't be strict since the site are not the same
      httpOnly: true, // should be stored in http only and not in the browswer(client side)
      secure: false,
    });

    req.userInfo = user;

    return res.status(200).json({
      success: true,
      message: "User log in successful",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("failed to login user -> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error, failed to login user",
    });
  }
}

async function refresh(req, res) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, no token detected",
      });
    }

    if (blacklistedToken.has(token)) {
      return res.status(401).json({
        success: false,
        message: "token has been invalidated, please try again ",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken.id);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid/Expired token, please try again",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "no user found, please try again",
      });
    }

    const newAccessToken = jwt.sign(
      {
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" },
    );

    return res.status(200).json({
      success: true,
      message: "accesstoken was refreshed",
      accessToken: newAccessToken,
      user: {
        id: decodedToken.id,
        username: decodedToken.username,
        email: decodedToken.email,
        role: decodedToken.role,
      },
    });
  } catch (error) {
    console.log("failed to refresh accestokens -> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error! failed to refresh accesstokens",
    });
  }
}

async function deleteUser(req, res) {
  const deletedUserId = req.userInfo.id;
  console.log(deletedUserId);
  console.log("delete endpoint is running");
  try {
    const user = await User.findOneAndDelete({ _id: deletedUserId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found, please login and try again",
      });
    }

    const userTransaction = await Transaction.deleteMany({
      user: deletedUserId,
    });

    return res.status(200).json({
      success: true,
      message: "user account has been successfully deleted",
    });
  } catch (error) {
    console.log("failed to delete user account -> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error!, failed to delete user account",
    });
  }
}

async function logout(req, res) {
  console.log("logout function running");

  const token = req.cookies.refreshToken;

  if (token) {
    blacklistedToken.add(token);
  }
  try {
    res.cookie("refreshToken", "", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
      maxAge: 0, // 👈 this tells the browser: "delete this cookie right now"
    });

    return res.status(200).json({
      success: true,
      message: "user has been logged out successfully",
    });
  } catch (error) {
    console.log("failed to log user out -> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error, failed to log user out",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  refresh,
  deleteUser,
  logout,
};
