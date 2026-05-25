import { useContext } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  ExpenseContext,
} from "../context/ExpenseContext";

function MainLayout({
  children,
}) {

  const { darkMode } =
    useContext(ExpenseContext);

  return (

    <div
      className={`flex min-h-screen transition-all ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-slate-100 text-black"
      }`}
    >

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  );
}

export default MainLayout;