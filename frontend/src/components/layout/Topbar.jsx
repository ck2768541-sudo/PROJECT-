import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white px-8 py-5 shadow">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-500">Welcome, {user?.fullName || "Admin"}</p>
      </div>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}

export default Topbar;