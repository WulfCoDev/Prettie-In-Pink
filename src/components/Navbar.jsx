import { logout, useAuth } from "wasp/client/auth";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return null;
  return (
    <nav className="w-full h-12 flex items-center justify-evenly bg-pink-400/50 border-b-2 border-white">
      <div>
        <a href="/">Prettie In Pink</a>
      </div>
      {user ? (
        <div className="space-x-4 flex items-center">
          <span>Welcome, {user.firstName}!</span>
          <a
            href="/schedule-appointment"
            className="bg-gray-800 text-white p-1 rounded-md"
          >
            Schedule Services
          </a>
          <UserDropdown />
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
