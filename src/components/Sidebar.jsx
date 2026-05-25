import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg p-5 hidden md:block">
      
      <h1 className="text-3xl font-bold text-blue-600 mb-10">
        Expense Tracker
      </h1>

      <nav className="flex flex-col gap-4">
        
        <Link
          to="/"
          className="bg-blue-100 text-blue-600 px-4 py-3 rounded-xl font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/add-expense"
          className="hover:bg-slate-100 px-4 py-3 rounded-xl"
        >
          Add Expense
        </Link>

        <Link
          to="/reports"
          className="hover:bg-slate-100 px-4 py-3 rounded-xl"
        >
          Reports
        </Link>

      </nav>
    </div>
  );
}

export default Sidebar;