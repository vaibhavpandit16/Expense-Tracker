import { useContext } from "react";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

function Navbar() {

  const {
    searchTerm,
    setSearchTerm,

    darkMode,
    setDarkMode,

    selectedDate,
    setSelectedDate,

  } = useContext(
    ExpenseContext
  );


  // LOGOUT
  const handleLogout =
    () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      window.location.href =
        "/login";

    };


  return (

    <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

      {/* LEFT */}
      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-slate-500 text-sm">
          Track your daily expenses
        </p>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="border border-slate-200 rounded-xl px-4 py-2 outline-none"
        />

        {/*Date*/}
        <input
  type="date"
  value={selectedDate}
  onChange={(e) =>
    setSelectedDate(
      e.target.value
    )
  }
  className="border border-slate-200 rounded-xl px-4 py-2 outline-none"
/>


        {/* DARK MODE */}
        <button
          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }
          className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl"
        >

          {
            darkMode
              ? "Light"
              : "Dark"
          }

        </button>


        {/* USER */}
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

          {
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            )?.name?.charAt(0)
          }

        </div>


        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Navbar;