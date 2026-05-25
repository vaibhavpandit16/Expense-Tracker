import axios from "axios";

const API = "https://expense-tracker-wjc2.onrender.com";

export const getExpenses = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const addExpense = async (expenseData) => {

  console.log(expenseData);

  const response = await axios.post(
    API,
    expenseData
  );

  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
};

export const updateExpense = async (
  id,
  expenseData
) => {

  const response = await axios.put(
    `${API}/${id}`,
    expenseData
  );

  return response.data;
};