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
    <header className="flex min-h-20 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-4 pl-20 shadow-sm backdrop-blur sm:px-6 sm:pl-20 md:px-8 md:py-5 md:pl-8">
      <div className="min-w-0">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600 sm:text-xs">
          Admin Portal
        </p>

        <h2 className="truncate text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
          Admin Dashboard
        </h2>

        <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm md:text-base">
          Welcome,{" "}
          <span className="font-semibold text-slate-700">
            {user?.fullName || "Admin"}
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="shrink-0 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:px-4 md:px-5"
      >
        Logout
      </button>
    </header>
  );
}

export default Topbar;