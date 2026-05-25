const Transactions = require("../models/Transactions");
const Transaction = require("../models/Transactions");

async function userTransactions(req, res) {
  try {
    console.log("USER:", req.userInfo);
    let { title, amount, category, date, note, type } = req.body;
    if (!title || !amount || !category || !date || !type) {
      return res.status(400).json({
        success: false,
        message: "bad request, please fill out all fields and try again",
      });
    }

    if (type === "expense") {
      amount = -Math.abs(amount);
    } else {
      amount = Math.abs(amount);
    }

    const newlyAddedTransaction = new Transaction({
      title,
      amount,
      category,
      date,
      note,
      type,
      user: req.userInfo.id,
    });

    await newlyAddedTransaction.save();

    return res.status(201).json({
      success: true,
      message: "new transanction added",
      transaction: newlyAddedTransaction,
    });
  } catch (error) {
    console.log(
      "failed to send transactions to the database -> ",
      error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Server error! failed to send transactions to the database",
    });
  }
}

async function getTransactions(req, res) {
  try {
    const transactions = await Transactions.find({ user: req.userInfo.id })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "transactions successfully imported from database",
      data: transactions,
    });
  } catch (error) {
    console.log(
      "failed to get transactions from the database -> ",
      error.message,
    );
    return res.status(500).json({
      success: false,
      message: "Server Error, failed to get transactions from the database",
    });
  }
}

async function getAllTransaction(req, res) {
  try {
    const allTransactions = await Transactions.find({
      user: req.userInfo.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "all transactions has been imported from the database",
      data: allTransactions,
    });
  } catch (error) {
    console.log(
      "failed to get transactions from the database -> ",
      error.message,
    );
    return res.status(500).json({
      success: false,
      message:
        "Server error, failed to get all the transactions from the database, please try again later",
    });
  }
}

module.exports = {
  userTransactions,
  getTransactions,
  getAllTransaction,
};
