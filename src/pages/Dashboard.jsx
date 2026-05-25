import MainLayout from "../layouts/MainLayout";
import DashboardCards from "../components/DashboardCards";
import ExpenseTable from "../components/ExpenseTable";
import Analytics from "../components/Analytics";
import BudgetCard from "../components/BudgetCard";
import AIInsights from "../components/AIInsights";
import MonthlyReport from "../components/MonthlyReport";

function Dashboard() {
  return (
    <MainLayout>

      <div className="space-y-8">

        {/* Cards */}
        <DashboardCards />

        <BudgetCard />

        {/* Table */}
        <ExpenseTable />

        {/* Analytics */}
        <Analytics />

        <AIInsights />

        <MonthlyReport />

      </div>

    </MainLayout>
  );
}

export default Dashboard;