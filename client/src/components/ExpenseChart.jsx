import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function ExpenseChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] =
      (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const chartData = Object.entries(categoryTotals).map(
    ([category, total]) => ({
      name: category,
      value: total
    })
  );

  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#A855F7",
    "#EF4444"
  ];

  const totalExpense = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 text-gray-800">
      <h2 className="text-2xl font-bold mb-2">
        Expense Distribution
      </h2>

      <p className="mb-4 font-semibold text-blue-600">
        Total: ₹{totalExpense.toLocaleString()}
      </p>

      {chartData.length === 0 ? (
        <p className="text-gray-500">
          No expense data available
        </p>
      ) : (
        <PieChart width={500} height={420}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="45%"
            innerRadius={70}
            outerRadius={130}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString()}`
            }
          />

          <Legend verticalAlign="bottom" />
        </PieChart>
      )}
    </div>
  );
}

export default ExpenseChart;