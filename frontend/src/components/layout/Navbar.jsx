import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white px-10 py-5 shadow-md">

      {/* Logo */}
      <Link to="/">
        <h1 className="text-3xl font-bold text-blue-600">
          Upsthiti
        </h1>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-8">

        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
        >
          Get Started
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;