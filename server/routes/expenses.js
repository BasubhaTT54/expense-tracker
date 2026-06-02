const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(
  __dirname,
  "../data/expenses.json"
);

/*
  Read expenses from JSON file
*/
function getExpenses() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

/*
  Save expenses to JSON file
*/
function saveExpenses(expenses) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(expenses, null, 2)
  );
}

/*
  GET ALL EXPENSES
*/
router.get("/", (req, res) => {
  const expenses = getExpenses();

  expenses.sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  );

  res.json(expenses);
});

/*
  ADD NEW EXPENSE
*/
router.post("/", (req, res) => {
  console.log("Received:",req.body);
  const {
    amount,
    category,
    date,
    note
  } = req.body;

  if (
    !amount ||
    amount <= 0 ||
    !category ||
    !date
  ) {
    return res.status(400).json({
      message: "Invalid expense data"
    });
  }

  const expenses = getExpenses();

  const newExpense = {
    id: Date.now(),
    amount: Number(amount),
    category,
    date,
    note: note || ""
  };

  expenses.push(newExpense);

  saveExpenses(expenses);

  res.status(201).json(newExpense);
});

/*
  UPDATE EXPENSE
*/
router.put("/:id", (req, res) => {
  const expenses = getExpenses();

  const index = expenses.findIndex(
    expense =>
      expense.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Expense not found"
    });
  }

  expenses[index] = {
    ...expenses[index],
    ...req.body
  };

  saveExpenses(expenses);

  res.json(expenses[index]);
});

/*
  DELETE EXPENSE
*/
router.delete("/:id", (req, res) => {
  const expenses = getExpenses();

  const filteredExpenses =
    expenses.filter(
      expense =>
        expense.id !== Number(req.params.id)
    );

  saveExpenses(filteredExpenses);

  res.json({
    message: "Expense deleted successfully"
  });
});

module.exports = router;