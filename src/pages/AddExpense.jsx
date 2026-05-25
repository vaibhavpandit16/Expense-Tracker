import { useContext, useState } from "react";
import { toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

function AddExpense() {

  const {
    addExpense,
  } = useContext(
    ExpenseContext
  );


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


  // HANDLE INPUT CHANGE
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


  // HANDLE SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await addExpense(
          formData
        );

        toast.success(
          "Expense Added Successfully"
        );


        // RESET FORM
        setFormData({

          title: "",
          amount: "",
          category: "",
          payment: "",
          date: "",

          isRecurring: false,

          recurringType: "",

        });

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add expense"
        );

      }

    };


  return (

    <MainLayout>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm">

        <h1 className="text-3xl font-bold mb-8">

          Add Expense

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


          {/* RECURRING CHECKBOX */}
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-medium"
          >

            Save Expense

          </button>

        </form>

      </div>

    </MainLayout>

  );
}

export default AddExpense;