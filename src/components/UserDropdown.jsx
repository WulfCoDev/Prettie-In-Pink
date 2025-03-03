import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "wasp/client/auth";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useAuth();

  return (
    <div className="relative z-50">
      {/* Button to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex text-center items-center gap-2 p-1 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none"
      >
        <span>Account</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
          <ul className="py-2 text-gray-800">
            {user?.isAdmin && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/my-appointments"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                My Services
              </Link>
            </li>
            <li>
              <Link
                to="/my-appointments"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Schedule Service
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
            </li>

            <li>
              <button
                onClick={() => console.log("Logging out...")}
                className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
