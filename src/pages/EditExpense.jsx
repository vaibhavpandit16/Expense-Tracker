import { useContext, useEffect, useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

import { toast } from "react-toastify";

function EditExpense() {

  const {
    expenses,
    updateExpense,
  } = useContext(
    ExpenseContext
  );

  const navigate =
    useNavigate();

  const { id } =
    useParams();


  const [formData,
    setFormData] =
      useState({

        title: "",
        amount: "",
        category: "",
        payment: "",
        date: "",

        isRecurring: false,

        recurringType: "",

      });


  // LOAD EXPENSE
  useEffect(() => {

    const expense =
      expenses.find(
        (item) =>
          item._id === id
      );

    if (expense) {

      setFormData({

        title:
          expense.title,

        amount:
          expense.amount,

        category:
          expense.category,

        payment:
          expense.payment,

        date:
          expense.date
            ?.split("T")[0],

        isRecurring:
          expense.isRecurring,

        recurringType:
          expense.recurringType,

      });

    }

  }, [id, expenses]);


  // HANDLE CHANGE
  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({

      ...formData,

      [name]:

        type === "checkbox"
          ? checked
          : value,

    });

  };


  // HANDLE UPDATE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateExpense(
          id,
          formData
        );

        toast.success(
          "Expense Updated Successfully"
        );

        navigate("/");

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update expense"
        );

      }

    };


  return (

    <MainLayout>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm">

        <h1 className="text-3xl font-bold mb-8">

          Edit Expense

        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
            required
          />


          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
            required
          />


          {/* CATEGORY */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
            required
          >

            <option value="">
              Select Category
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Travel">
              Travel
            </option>

            <option value="Shopping">
              Shopping
            </option>

            <option value="Bills">
              Bills
            </option>

          </select>


          {/* PAYMENT */}
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
            required
          >

            <option value="">
              Payment Mode
            </option>

            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>

          </select>


          {/* DATE */}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
            required
          />


          {/* RECURRING */}
          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isRecurring"
              checked={
                formData.isRecurring
              }
              onChange={
                handleChange
              }
            />

            <label>
              Recurring Expense
            </label>

          </div>


          {/* RECURRING TYPE */}
          {
            formData.isRecurring && (

              <select
                name="recurringType"
                value={
                  formData.recurringType
                }
                onChange={
                  handleChange
                }
                className="w-full border border-slate-200 rounded-2xl px-4 py-3 outline-none"
                required
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

              </select>

            )
          }


          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-2xl font-medium"
          >

            Update Expense

          </button>

        </form>

      </div>

    </MainLayout>

  );
}

export default EditExpense;