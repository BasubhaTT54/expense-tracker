import { useEffect, useState } from "react";
import api from "./services/api";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import Summary from "./components/Summary";
import CategorySummary from "./components/CategorySummary";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchExpenses = async () => {
    const response = await api.get("/expenses");
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (expenseData) => {
    await api.post("/expenses", expenseData);
    fetchExpenses();
  };

  const updateExpense = async (id, expenseData) => {
    await api.put(`/expenses/${id}`, expenseData);
    setEditingExpense(null);
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      categoryFilter === "" ||
      expense.category === categoryFilter;

    const expenseDate = new Date(expense.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchesFrom = !from || expenseDate >= from;
    const matchesTo = !to || expenseDate <= to;

    return matchesCategory && matchesFrom && matchesTo;
  });

  const exportCSV = () => {
    if (filteredExpenses.length === 0) {
      alert("No expenses to export");
      return;
    }

    const headers = ["Amount", "Category", "Date", "Note"];

    const rows = filteredExpenses.map((expense) => [
      expense.amount,
      expense.category,
      expense.date,
      expense.note
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expenses.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">
            Expense Tracker
          </h1>

          <button
            onClick={exportCSV}
            className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
              hover:bg-green-700
              transition
            "
          >
            Export CSV
          </button>
        </div>

        <Summary expenses={filteredExpenses} />

        <div className="mt-6 bg-white p-4 rounded-xl shadow">
          <label className="mr-3 font-semibold">
            Filter by Category:
          </label>

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="border rounded-lg p-2"
          >
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">
              Entertainment
            </option>
            <option value="Other">Other</option>
          </select>

          <div className="mt-4 flex gap-4">
            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(e.target.value)
              }
              className="border rounded-lg p-2"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(e.target.value)
              }
              className="border rounded-lg p-2"
            />
          </div>
        </div>

        <div className="mt-6">
          <ExpenseForm
            onAddExpense={addExpense}
            editingExpense={editingExpense}
            onUpdateExpense={updateExpense}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <CategorySummary expenses={filteredExpenses} />
          <ExpenseChart expenses={filteredExpenses} />
        </div>

        <div className="mt-6">
          <ExpenseTable
            expenses={filteredExpenses}
            onDelete={deleteExpense}
            onEdit={setEditingExpense}
          />
        </div>

      </div>
    </div>
  );
}

export default App;