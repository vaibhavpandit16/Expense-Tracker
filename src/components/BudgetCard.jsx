import {
  useContext,
  useEffect,
  useState,
} from "react";

import { ExpenseContext }
  from "../context/ExpenseContext";

function BudgetCard() {

  const { expenses } =
    useContext(ExpenseContext);

  const [budget,
    setBudget] =
      useState(
        localStorage.getItem(
          "budget"
        ) || 0
      );


  // TOTAL EXPENSES
  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total +
        Number(expense.amount),
      0
    );


  // REMAINING
  const remaining =
    budget - totalExpenses;


  // SAVE BUDGET
  useEffect(() => {

    localStorage.setItem(
      "budget",
      budget
    );

  }, [budget]);


  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold mb-2">
            Monthly Budget
          </h2>

          <p className="text-slate-500">

            Remaining:

            <span
              className={`ml-2 font-semibold ${
                remaining < 0
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              ₹{remaining}
            </span>

          </p>

        </div>


        {/* INPUT */}
        <input
          type="number"
          placeholder="Set Budget"
          value={budget}
          onChange={(e) =>
            setBudget(
              e.target.value
            )
          }
          className="border border-slate-200 rounded-2xl px-4 py-3 outline-none"
        />

      </div>


      {/* PROGRESS BAR */}
      <div className="mt-6">

        <div className="w-full bg-slate-200 rounded-full h-5 overflow-hidden">

          <div
            className={`h-full ${
              remaining < 0
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                (totalExpenses /
                  budget) *
                  100,
                100
              )}%`,
            }}
          />

        </div>

      </div>


      {/* ALERT */}
      {
        remaining < 0 && (

          <div className="mt-4 bg-red-100 text-red-600 px-4 py-3 rounded-2xl">

            ⚠ Budget exceeded!

          </div>

        )
      }

    </div>

  );
}

export default BudgetCard;