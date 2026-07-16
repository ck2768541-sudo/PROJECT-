import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl sm:px-6 sm:py-4 md:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-200 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg shadow-blue-200/60 transition group-hover:-translate-y-0.5 group-hover:shadow-xl sm:h-11 sm:w-11 sm:text-xl">
            U
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Upsthiti
            </h1>

            <p className="hidden text-xs font-medium text-slate-500 sm:block">
              Smart Attendance System
            </p>
          </div>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">
          <Link
            to="/"
            className="hidden border-b-2 border-blue-600 pb-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:inline-block sm:text-base"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-5 sm:py-2.5 sm:text-base"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;