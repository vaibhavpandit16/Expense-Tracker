import { useContext } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

function Analytics() {

  const { expenses } =
    useContext(
      ExpenseContext
    );

  // CATEGORY DATA
  const categoryData = {};

  expenses.forEach(
    (expense) => {

      if (
        !categoryData[
          expense.category
        ]
      ) {

        categoryData[
          expense.category
        ] = 0;

      }

      categoryData[
        expense.category
      ] += Number(
        expense.amount || 0
      );

    }
  );

  // FORMAT DATA
  const chartData =
    Object.keys(
      categoryData
    ).map((category) => ({

      name: category,

      value:
        categoryData[
          category
        ],

    }));


  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];


  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-8">

        Expense Analytics

      </h2>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* PIE CHART */}
        <div>

          <h3 className="text-xl font-semibold mb-5">

            Category Distribution

          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {
                  chartData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                            COLORS.length
                          ]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* BAR CHART */}
        <div>

          <h3 className="text-xl font-semibold mb-5">

            Expense Overview

          </h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={chartData}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#3B82F6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );
}

export default Analytics;