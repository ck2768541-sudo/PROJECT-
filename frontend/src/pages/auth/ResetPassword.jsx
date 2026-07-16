import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      setError("");

      await resetPassword(
        email,
        newPassword,
        confirmPassword
      );

      alert("Password reset successfully");

      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to reset password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 sm:px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg sm:p-8">
        <h1 className="break-words text-center text-2xl font-bold text-blue-600 sm:text-3xl">
          Reset Password
        </h1>

        <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
          Create your new password
        </p>

        {email && (
          <p className="mt-2 break-all text-center text-sm font-medium text-gray-600">
            {email}
          </p>
        )}

        {error && (
          <p className="mt-5 break-words rounded bg-red-100 p-3 text-sm text-red-600 sm:text-base">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="mb-4 w-full min-w-0 rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="mb-5 w-full min-w-0 rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
            required
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;