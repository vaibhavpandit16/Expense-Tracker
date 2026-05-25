const mongoose =
  require("mongoose");

const expenseSchema =
  new mongoose.Schema(

    {

      title: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      payment: {
        type: String,
        required: true,
      },

      date: {
        type: Date,
        required: true,
      },

      isRecurring: {
  type: Boolean,
  default: false,
},

recurringType: {
  type: String,
  default: "",
},

    },

    {
      timestamps: true,
    }

  );

module.exports =
  mongoose.model(
    "Expense",
    expenseSchema
  );