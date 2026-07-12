import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 px-6 py-4 shadow-sm backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white shadow-md">
            U
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Upsthiti
            </h1>
            <p className="text-xs text-gray-500">
              Smart Attendance System
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="border-b-2 border-blue-600 pb-1 font-medium text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white shadow-md transition hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;