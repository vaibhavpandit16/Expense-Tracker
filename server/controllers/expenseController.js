const Expense =
  require("../models/Expense");


// ADD EXPENSE
const addExpense =
  async (req, res) => {

    try {

      console.log(req.body);

      const {
        title,
        amount,
        category,
        payment,
        date,
        isRecurring,
        recurringType,
      } = req.body;

      const expense =
        await Expense.create({

          title,
          amount,
          category,
          payment,
          date,
          isRecurring,
          recurringType,

        });

      res.status(201).json(
        expense
      );

    } catch (error) {

      console.log(
        error.message
      );

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// GET EXPENSES
const getExpenses =
  async (req, res) => {

    try {

      const expenses =
        await Expense.find()
          .sort({
            date: -1,
          });

      res.json(expenses);

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// DELETE EXPENSE
const deleteExpense =
  async (req, res) => {

    try {

      await Expense.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Expense Deleted",
      });

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// UPDATE EXPENSE
const updateExpense =
  async (req, res) => {

    try {

      const updatedExpense =
        await Expense.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }

        );

      res.json(
        updatedExpense
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


module.exports = {

  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,

};