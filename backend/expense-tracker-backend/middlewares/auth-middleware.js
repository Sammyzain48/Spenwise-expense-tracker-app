const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token found, please input token and try again",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized/Invalid token, please try again later ",
      });
    }

    req.userInfo = decodedToken;

    next();
  } catch (error) {
    console.log("failed to authenticate user -> ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error!, failed to authenticate user, please try again",
    });
  }
}

module.exports = authMiddleware;
