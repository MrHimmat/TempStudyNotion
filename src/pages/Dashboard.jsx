import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/DashboardPage/Sidebar";

function Dashboard() {
  // Destructure loading states from Redux state
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  // Check if either profile or auth is loading
  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative lg:visible  flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar className="hidden" />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
