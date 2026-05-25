import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Link } from "react-router-dom";

function ExpenseTable() {

  const {
    expenses,
    deleteExpense,
    searchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedDate,
  } = useContext(ExpenseContext);

  // FILTER EXPENSES
  const filteredExpenses =
    expenses.filter((expense) => {

      const title =
        expense.title || "";

      const matchesSearch =
        title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category ===
          selectedCategory;

      const matchesDate =
        selectedDate === "" ||

        new Date(expense.date)
         .toISOString()
         .split("T")[0] ===
        selectedDate;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );

    });

  // SAFE SORTING
  filteredExpenses.sort(
    (a, b) =>
      new Date(b.date || 0) -
      new Date(a.date || 0)
  );

  // DOWNLOAD PDF
  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Expense Report",
      14,
      15
    );

    const tableColumn = [
      "Title",
      "Category",
      "Payment",
      "Date",
      "Amount",
      "Recurring",
    ];

    const tableRows =
      filteredExpenses.map(
        (expense) => [

          expense.title,
          expense.category,
          expense.payment,

          expense.date
            ? new Date(
                expense.date
              ).toLocaleDateString()
            : "-",

          `₹${expense.amount || 0}`,

          expense.isRecurring
            ? expense.recurringType
            : "One Time",

        ]
      );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save("expenses.pdf");

  };

  // DOWNLOAD EXCEL
  const downloadExcel = () => {

    const excelData =
      filteredExpenses.map(
        (expense) => ({

          Title: expense.title,

          Category:
            expense.category,

          Payment:
            expense.payment,

          Date: expense.date
            ? new Date(
                expense.date
              ).toLocaleDateString()
            : "-",

          Amount:
            expense.amount || 0,

          Recurring:
            expense.isRecurring
              ? expense.recurringType
              : "One Time",

        })
      );

    const worksheet =
      XLSX.utils.json_to_sheet(
        excelData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Expenses"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const data = new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      }
    );

    saveAs(
      data,
      "expenses.xlsx"
    );

  };

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6 overflow-x-auto">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">

        <div className="flex items-center gap-4 flex-wrap">

          <h2 className="text-2xl font-bold">
            Recent Expenses
          </h2>

          {/* EXPORT PDF */}
          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
          >
            Export PDF
          </button>

          {/* EXPORT EXCEL */}
          <button
            onClick={downloadExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Export Excel
          </button>

        </div>

        {/* CATEGORY FILTER */}
        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value
            )
          }
          className="border border-slate-200 rounded-xl px-4 py-2"
        >

          <option>
            All
          </option>

          <option>
            Food
          </option>

          <option>
            Travel
          </option>

          <option>
            Shopping
          </option>

          <option>
            Bills
          </option>

        </select>

      </div>

      {/* TABLE */}
      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-200 text-slate-500 text-left">

            <th className="py-4">
              Title
            </th>

            <th>
              Category
            </th>

            <th>
              Payment
            </th>

            <th>
              Date
            </th>

            <th>
              Amount
            </th>

            <th>
              Action
            </th>

            <th>
              Recurring
            </th>

          </tr>

        </thead>

        <tbody>

          {
            filteredExpenses.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-10 text-slate-400"
                >
                  No Expenses Found
                </td>

              </tr>

            ) : (

              filteredExpenses.map(
                (expense, index) => (

                  <tr
                    key={
                      expense._id || index
                    }
                    className="border-b border-slate-100"
                  >

                    {/* TITLE */}
                    <td className="py-4">
                      {expense.title}
                    </td>

                    {/* CATEGORY */}
                    <td>
                      {expense.category}
                    </td>

                    {/* PAYMENT */}
                    <td>
                      {expense.payment}
                    </td>

                    {/* DATE */}
                    <td>
                      {
                        expense.date
                          ? new Date(
                              expense.date
                            ).toLocaleDateString()
                          : "-"
                      }
                    </td>

                    {/* AMOUNT */}
                    <td className="font-semibold">
                      ₹
                      {expense.amount || 0}
                    </td>

                    {/* ACTION */}
                    <td className="flex gap-2 py-3">

                      {/* EDIT */}
                      <Link
                        to={`/edit-expense/${expense._id}`}
                      >

                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-xl"
                        >

                          Edit

                        </button>

                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteExpense(
                            expense._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </td>

                    {/* RECURRING */}
                   <td>
  {
    expense.isRecurring === true ||
    expense.isRecurring === "true"
      ? `🔁 ${expense.recurringType || "Recurring"}`
      : "One Time"
  }
</td>

                  </tr>

                )
              )

            )
          }

        </tbody>

      </table>

    </div>

  );
}

export default ExpenseTable;