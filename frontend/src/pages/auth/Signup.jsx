import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
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
      const data = await signupUser(formData);
      login(data.user, data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-600">
          Start managing attendance with Upsthiti
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-center text-red-600">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
          />

          <button className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700">
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