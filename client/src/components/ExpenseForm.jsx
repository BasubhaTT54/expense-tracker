import { useState, useEffect } from "react";

function ExpenseForm({
  onAddExpense,
  editingExpense,
  onUpdateExpense
}) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    note: ""
  });

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: editingExpense.date,
        note: editingExpense.note
      });
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const today =
      new Date().toISOString().split("T")[0];

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    if (!formData.date) {
      alert("Please select a date");
      return;
    }

    if (formData.date > today) {
      alert("Future dates are not allowed");
      return;
    }

    if (editingExpense) {
      onUpdateExpense(
        editingExpense.id,
        formData
      );
    } else {
      onAddExpense(formData);
    }

    setFormData({
      amount: "",
      category: "",
      date: "",
      note: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4"
    >
      <input
        type="number"
        placeholder="Amount"
        value={formData.amount}
        onChange={(e) =>
          setFormData({
            ...formData,
            amount: e.target.value
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <select
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value
          })
        }
        className="w-full border rounded-lg p-3"
      >
        <option value="">Select Category</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Entertainment</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        value={formData.date}
        onChange={(e) =>
          setFormData({
            ...formData,
            date: e.target.value
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        placeholder="Note"
        value={formData.note}
        onChange={(e) =>
          setFormData({
            ...formData,
            note: e.target.value
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <button
        type="submit"
        className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          hover:bg-blue-700
        "
      >
        {editingExpense
          ? "Update Expense"
          : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;