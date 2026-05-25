import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getExpenses,
  addExpense as addExpenseAPI,
  deleteExpense as deleteExpenseAPI,
  updateExpense as updateExpenseAPI,
} from "../services/expenseService";

import { toast } from "react-toastify";

export const ExpenseContext =
  createContext();

function ExpenseProvider({
  children,
}) {

  // EXPENSES
 const [expenses, setExpenses] = useState([]);

  // SEARCH
  const [searchTerm,
    setSearchTerm] =
      useState("");


  // CATEGORY FILTER
  const [selectedCategory,
    setSelectedCategory] =
      useState("All");


  // DARK MODE
  const [darkMode,
    setDarkMode] =
      useState(
        localStorage.getItem(
          "darkMode"
        ) === "true"
      );


  // SAVE DARK MODE
  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      darkMode
    );

  }, [darkMode]);


  // FETCH EXPENSES
  const fetchExpenses = async () => {
  try {

    const data = await getExpenses();

    if (Array.isArray(data)) {
      setExpenses(data);
    } else {
      console.log("Invalid expenses response:", data);
      setExpenses([]);
    }

  } catch (error) {

    console.log(error);

    setExpenses([]);
  }
};

  // ADD EXPENSE
  const addExpense =
    async (expense) => {

      try {

        const newExpense =
          await addExpenseAPI(
            expense
          );

        setExpenses((prev) => [
          newExpense,
          ...prev,
        ]);

      } catch (error) {

        console.log(error);

      }

    };


  // DELETE EXPENSE
  const deleteExpense =
  async (id) => {

    try {

      await deleteExpenseAPI(id);

      // REMOVE FROM STATE
      setExpenses(

        expenses.filter(
          (expense) =>
            expense._id !== id
        )

      );

      toast.success(
        "Expense Deleted"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete expense"
      );

    }

  };


 // UPDATE EXPENSE
const updateExpense =
  async (
    id,
    updatedData
  ) => {

    try {

      const updatedExpense =
        await updateExpenseAPI(
          id,
          updatedData
        );

      setExpenses((prev) =>
        prev.map((expense) =>
          expense._id === id
            ? updatedExpense
            : expense
        )
      );

      toast.success(
        "Expense Updated"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );

    }

  };


  // INITIAL FETCH
  useEffect(() => {

    fetchExpenses();

  }, []);

  const [selectedDate,
  setSelectedDate] =
    useState("");


  return (

    <ExpenseContext.Provider
      value={{

        expenses,
        addExpense,
        deleteExpense,
        updateExpense,

        searchTerm,
        setSearchTerm,

        selectedCategory,
        setSelectedCategory,

        darkMode,
        setDarkMode,

        selectedDate,
        setSelectedDate,

      }}
    >

      {children}

    </ExpenseContext.Provider>

  );
}

export default ExpenseProvider;