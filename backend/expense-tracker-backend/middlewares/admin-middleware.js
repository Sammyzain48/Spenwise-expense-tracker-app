async function adminMiddleware(req, res, next) {
  try {
    const { decodedToken } = req.userInfo;

    if (!decodedToken.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "only admin is allowed",
      });
    }

    next();
  } catch (error) {
    console.log("failed to authenticate user as an admin -> ", error.message);
    return res.status(500).json({
      success: false,
      message:
        "Server Error! failed to authenticate user as an admin, please try again later",
    });
  }
}

module.exports = adminMiddleware;
