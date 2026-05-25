import axios from "axios";

const API =
  "https://expense-tracker-wjc2.onrender.com/api/expenses";


// GET EXPENSES
export const getExpenses =
  async () => {

    const response =
      await axios.get(API);

    return response.data;

  };


// ADD EXPENSE
export const addExpense =
  async (expenseData) => {

    const response =
      await axios.post(
        API,
        expenseData
      );

    return response.data;

  };


// DELETE EXPENSE
export const deleteExpense =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`
      );

    return response.data;

  };


// UPDATE EXPENSE
export const updateExpense =
  async (
    id,
    updatedData
  ) => {

    const response =
      await axios.put(
        `${API}/${id}`,
        updatedData
      );

    return response.data;

  };