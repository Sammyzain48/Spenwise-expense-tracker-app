const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const {
  userTransactions,
  getTransactions,
  getAllTransaction,
} = require("../controllers/transaction-controller");
const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "user is welcomed to the dashboard",
    user: req.userInfo,
  });
});

router.get("/account-info", authMiddleware, (req, res) => {
  const { user } = req.userInfo;
  return res.status(200).json({
    success: true,
    message: "user information retrival is successful",
    user,
  });
});

router.post("/transaction", authMiddleware, userTransactions);

router.get("/get-transactions", authMiddleware, getTransactions);

router.get("/all-transactions", authMiddleware, getAllTransaction);

module.exports = router;
