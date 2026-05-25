const express = require("express");

const router = express.Router();

const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");


// Add Expense
router.post("/", addExpense);


// Get Expenses
router.get("/", getExpenses);


// Delete Expense
router.delete("/:id", deleteExpense);

//Update Expense
router.put("/:id", updateExpense);

module.exports = router;