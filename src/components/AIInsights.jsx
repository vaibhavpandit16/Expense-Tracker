import { useContext } from "react";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

function AIInsights() {

  const { expenses } =
    useContext(ExpenseContext);


  // TOTAL EXPENSES
  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total +
        Number(expense.amount),
      0
    );


  // CATEGORY ANALYSIS
  const categoryTotals = {};

  expenses.forEach((expense) => {

    if (
      !categoryTotals[
        expense.category
      ]
    ) {

      categoryTotals[
        expense.category
      ] = 0;

    }

    categoryTotals[
      expense.category
    ] += Number(
      expense.amount
    );

  });


  // HIGHEST CATEGORY
  let highestCategory =
    "None";

  let highestAmount = 0;

  for (const category
    in categoryTotals
  ) {

    if (
      categoryTotals[
        category
      ] > highestAmount
    ) {

      highestAmount =
        categoryTotals[
          category
        ];

      highestCategory =
        category;

    }

  }


  // INSIGHTS
  const insights = [];


  if (totalExpenses > 5000) {

    insights.push(
      "⚠ Your expenses are higher than ₹5000."
    );

  }


  if (
    highestCategory !== "None"
  ) {

    insights.push(

      `📊 Highest spending category is ${highestCategory} with ₹${highestAmount}.`

    );

  }


  const onlineExpenses =
    expenses
      .filter(
        (expense) =>
          expense.payment ===
          "Online"
      )
      .reduce(
        (total, expense) =>
          total +
          Number(
            expense.amount
          ),
        0
      );


  const offlineExpenses =
    expenses
      .filter(
        (expense) =>
          expense.payment ===
          "Offline"
      )
      .reduce(
        (total, expense) =>
          total +
          Number(
            expense.amount
          ),
        0
      );


  if (
    onlineExpenses >
    offlineExpenses
  ) {

    insights.push(
      "💳 You spend more using Online payments."
    );

  } else {

    insights.push(
      "💵 Offline expenses are higher than Online payments."
    );

  }


  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Spending Insights
      </h2>


      <div className="space-y-4">

        {
          insights.map(
            (
              insight,
              index
            ) => (

              <div
                key={index}
                className="bg-slate-100 px-4 py-3 rounded-2xl"
              >

                {insight}

              </div>

            )
          )
        }

      </div>

    </div>

  );
}

export default AIInsights;