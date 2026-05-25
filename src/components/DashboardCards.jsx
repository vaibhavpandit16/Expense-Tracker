import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function DashboardCards() {

  const { expenses } =
    useContext(ExpenseContext);


  // TOTAL EXPENSES
  const totalExpenses =
    expenses.reduce(
      (total, expense) =>
        total + Number(expense.amount),
      0
    );


  // ONLINE PAYMENTS
  const onlinePayments =
    expenses
      .filter(
        (expense) =>
          expense.payment === "Online"
      )
      .reduce(
        (total, expense) =>
          total + Number(expense.amount),
        0
      );


  // OFFLINE PAYMENTS
  const offlinePayments =
    expenses
      .filter(
        (expense) =>
          expense.payment === "Offline"
      )
      .reduce(
        (total, expense) =>
          total + Number(expense.amount),
        0
      );


  // TOTAL RECORDS
  const totalRecords =
    expenses.length;


  const cards = [
    {
      title: "Total Expenses",
      value: `₹${totalExpenses}`,
    },

    {
      title: "Online Payments",
      value: `₹${onlinePayments}`,
    },

    {
      title: "Offline Payments",
      value: `₹${offlinePayments}`,
    },

    {
      title: "Total Records",
      value: totalRecords,
    },
  ];


  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow-sm"
        >

          <h3 className="text-slate-500 mb-4">
            {card.title}
          </h3>

          <h2 className="text-4xl font-bold text-slate-800">
            {card.value}
          </h2>

        </div>

      ))}

    </div>

  );
}

export default DashboardCards;