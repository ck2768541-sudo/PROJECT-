import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await forgotPassword(email);

      setMessage(response.message || "OTP sent successfully");

      navigate("/verify-otp", {
        state: { email },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold text-blue-600">
          Forgot Password
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Enter your registered email to receive an OTP.
        </p>

        {message && (
          <p className="mt-5 rounded-lg bg-green-50 p-3 text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="mb-2 block font-medium text-gray-700">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;