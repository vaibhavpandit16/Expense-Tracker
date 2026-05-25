import axios from "axios";

const API =
  "https://expense-tracker-wjc2.onrender.com";

// GET
export const getExpenses =
  async () => {

    const response =
      await axios.get(API);

    return response.data;

  };

// ADD
export const addExpense =
  async (expenseData) => {

    const response =
      await axios.post(
        API,
        expenseData
      );

    return response.data;

  };

// DELETE
export const deleteExpense =
  async (id) => {

    const response =
      await axios.delete(
        `${API}/${id}`
      );

    return response.data;

  };

// UPDATE
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