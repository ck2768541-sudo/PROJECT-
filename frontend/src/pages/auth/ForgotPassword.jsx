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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-8">
        <h1 className="break-words text-center text-2xl font-bold text-blue-600 sm:text-3xl">
          Forgot Password
        </h1>

        <p className="mt-2 break-words text-center text-sm leading-6 text-gray-500 sm:text-base">
          Enter your registered email to receive an OTP.
        </p>

        {message && (
          <p className="mt-5 break-words rounded-lg bg-green-50 p-3 text-sm text-green-700 sm:text-base">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-5 break-words rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:text-base">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 sm:text-base">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter registered email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full min-w-0 rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
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
            className="text-sm font-medium text-blue-600 hover:underline sm:text-base"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;