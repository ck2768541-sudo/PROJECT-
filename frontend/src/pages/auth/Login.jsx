import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData);
      login(data.user, data.token);

      if (data.user.role === "institute-admin") {
        navigate("/admin");
      } else if (data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (data.user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 py-8 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-200/50 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 px-5 py-7 text-center text-white sm:px-8 sm:py-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-2xl font-bold shadow-lg backdrop-blur">
            U
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
            Upsthiti Portal
          </p>

          <h1 className="mt-2 break-words text-2xl font-extrabold tracking-tight sm:text-3xl">
            Login to Upsthiti
          </h1>

          <p className="mt-2 text-sm text-blue-100">
            Access your attendance dashboard securely.
          </p>
        </div>

        <div className="p-5 sm:p-8">
          {error && (
            <p className="break-words rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm font-medium text-red-600 sm:text-base">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className={`${error ? "mt-5" : ""} space-y-4 sm:space-y-5`}
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Secure access for Admin, Teacher and Student
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;