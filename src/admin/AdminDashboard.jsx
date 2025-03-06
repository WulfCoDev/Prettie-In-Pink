import Navbar from "../components/Navbar";
import { useAuth } from "wasp/client/auth";
import { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AdminDashboard = ({ children }) => {
  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || !user.isAdmin)) {
      navigate("/not-authorized");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-5">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/admin"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/clients"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/admin/clients"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Clients
            </Link>
            <Link
              to="/admin/reports"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/admin/reports"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Reports
            </Link>
            <Link
              to="/admin/services"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/admin/services"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Services
            </Link>
            <Link
              to="/admin/availability"
              className={`block py-2 px-4 rounded ${
                location.pathname === "/admin/availability"
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              Availability
            </Link>
          </nav>
        </aside>

        {/* Main Content - Children (Passed from Routes) */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
