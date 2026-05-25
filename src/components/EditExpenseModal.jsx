import { useState } from "react";

const EditExpenseModal = ({
  expense,
  updateExpense,
  onClose,
}) => {
  const [title, setTitle] = useState(
    expense.title || ""
  );

  const [amount, setAmount] = useState(
    expense.amount || ""
  );

  const [category, setCategory] = useState(
    expense.category || ""
  );

  const [payment, setPayment] = useState(
    expense.payment || ""
  );

  const [date, setDate] = useState(
    expense.date
      ? new Date(expense.date)
          .toISOString()
          .split("T")[0]
      : ""
  );

  const [isRecurring, setIsRecurring] =
    useState(
      expense.isRecurring || false
    );

  const [recurringType, setRecurringType] =
    useState(
      expense.recurringType || ""
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      title,
      amount: Number(amount),
      category,
      payment,
      date,
      isRecurring,
      recurringType: isRecurring
        ? recurringType
        : "",
    };

    await updateExpense(
      expense._id,
      updatedExpense
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">
            Edit Expense
          </h2>

          <button
            onClick={onClose}
            className="text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Expense Title"
            value={title || ""}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount || ""}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            value={category || ""}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Bills">
              Bills
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Entertainment">
              Entertainment
            </option>
          </select>

          <select
            value={payment || ""}
            onChange={(e) =>
              setPayment(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">
              Select Payment
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>
          </select>

          <input
            type="date"
            value={date || ""}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) =>
                setIsRecurring(
                  e.target.checked
                )
              }
            />

            <label>
              Recurring Expense
            </label>
          </div>

          {isRecurring && (
            <select
              value={recurringType || ""}
              onChange={(e) =>
                setRecurringType(
                  e.target.value
                )
              }
              className="w-full border p-3 rounded-lg"
            >
              <option value="">
                Select Recurring Type
              </option>

              <option value="Daily">
                Daily
              </option>

              <option value="Weekly">
                Weekly
              </option>

              <option value="Monthly">
                Monthly
              </option>

              <option value="Yearly">
                Yearly
              </option>
            </select>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;