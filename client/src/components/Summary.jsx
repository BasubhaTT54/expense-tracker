import {
  FaWallet,
  FaArrowUp,
  FaReceipt
} from "react-icons/fa";

function Summary({ expenses }) {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount);

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  const highestExpense = expenses.length
    ? Math.max(
        ...expenses.map((e) =>
          Number(e.amount)
        )
      )
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-blue-100">
              Total Spent
            </h3>

            <p className="text-3xl font-bold mt-2">
              {formatCurrency(totalSpent)}
            </p>
          </div>

          <FaWallet className="text-4xl opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-red-100">
              Highest Expense
            </h3>

            <p className="text-3xl font-bold mt-2">
              {formatCurrency(highestExpense)}
            </p>
          </div>

          <FaArrowUp className="text-4xl opacity-80" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-green-100">
              Transactions
            </h3>

            <p className="text-3xl font-bold mt-2">
              {expenses.length}
            </p>
          </div>

          <FaReceipt className="text-4xl opacity-80" />
        </div>
      </div>
    </div>
  );
}

export default Summary;