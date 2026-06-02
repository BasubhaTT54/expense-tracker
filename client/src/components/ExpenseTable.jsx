function ExpenseTable({
  expenses,
  onDelete,
  onEdit
}) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>₹{expense.amount}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
            <td>{expense.note}</td>

            <td>
              <button
                className ="
                bg-green-500
                text-white
                px-3
                py-1
                rounded
                mr-2
                "
                
                onClick={() =>
                  onEdit(expense)
                }
              >
                Edit

              </button>
              <button
              className="
              bg-red-500
              text-white
              px-3
              py-1
              rounded
            "
            onClick={() =>
              onDelete(expense.id)
            }
          >
            Delete
            
            </button>  

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ExpenseTable;