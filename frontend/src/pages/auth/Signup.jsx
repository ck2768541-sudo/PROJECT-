import { Link } from "react-router-dom";

function Signup() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Start managing attendance with Upsthiti
        </p>

        <form className="mt-8 space-y-5">
          <input className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600" type="text" placeholder="Full Name" />

          <input className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600" type="email" placeholder="Email address" />

          <input className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600" type="password" placeholder="Password" />

          <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;