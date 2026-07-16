import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../services/authService";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      setError("Email not found. Please request OTP again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await verifyOtp(email, otp);

      navigate("/reset-password", {
        state: { email },
        replace: true,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg sm:p-8">
        <h1 className="break-words text-center text-2xl font-bold text-blue-600 sm:text-3xl">
          Verify OTP
        </h1>

        <p className="mt-2 text-center text-sm leading-6 text-gray-500 sm:text-base">
          Enter the 6-digit OTP sent to
        </p>

        <p className="mt-1 break-all text-center text-sm font-semibold text-gray-700 sm:text-base">
          {email || "your registered email"}
        </p>

        {error && (
          <p className="mt-5 break-words rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:text-base">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 sm:text-base">
            OTP
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(event) =>
              setOtp(event.target.value.replace(/\D/g, ""))
            }
            className="w-full min-w-0 rounded-lg border px-3 py-3 text-center text-xl tracking-[0.3em] outline-none focus:border-blue-600 sm:px-4 sm:text-2xl sm:tracking-[0.5em]"
            required
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline sm:text-base"
          >
            Request New OTP
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;