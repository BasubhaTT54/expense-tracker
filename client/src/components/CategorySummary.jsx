function CategorySummary({ expenses }) {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);

    return acc;
  }, {});

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Total Per Category
      </h2>

      {Object.keys(categoryTotals).length === 0 ? (
        <p className="text-gray-500">
          No category data available.
        </p>
      ) : (
        Object.entries(categoryTotals).map(([category, total]) => (
          <div
            key={category}
            className="flex justify-between border-b py-2"
          >
            <span>{category}</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        ))
      )}
    </div>
  );
}

export default CategorySummary;