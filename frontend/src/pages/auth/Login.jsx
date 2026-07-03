import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Login to Upsthiti
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Access your attendance dashboard
        </p>

        <form className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

          <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;