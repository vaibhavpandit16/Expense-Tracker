import { useContext } from "react";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

function MonthlyReport() {

  const { expenses } =
    useContext(ExpenseContext);


  // MONTHLY TOTALS
  const monthlyData = {};


  expenses.forEach((expense) => {

    const date =
      new Date(
        expense.createdAt
      );

    const month =
      date.toLocaleString(
        "default",
        { month: "long" }
      );

    if (
      !monthlyData[month]
    ) {

      monthlyData[month] = 0;

    }

    monthlyData[month] +=
      Number(expense.amount);

  });


  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Expense Report
      </h2>


      <div className="space-y-4">

        {
          Object.keys(
            monthlyData
          ).length === 0 ? (

            <div className="text-slate-400">

              No Expense Data

            </div>

          ) : (

            Object.entries(
              monthlyData
            ).map(
              (
                [month, total],
                index
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-100 px-4 py-4 rounded-2xl"
                >

                  <h3 className="font-semibold text-lg">

                    {month}

                  </h3>

                  <span className="font-bold text-blue-600">

                    ₹{total}

                  </span>

                </div>

              )
            )

          )
        }

      </div>

    </div>

  );
}

export default MonthlyReport;