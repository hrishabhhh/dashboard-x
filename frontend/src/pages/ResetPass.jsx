import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authUsers";
import { useTheme } from "../hooks/useTheme";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const { theme } = useTheme();

  const email = location.state?.email;

  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await resetPassword({
        email,
        otp: formData.otp,
        newPassword: formData.password,
      });

      console.log("Password reset successful", data);

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-900" : "bg-white"} min-h-full flex items-center justify-center mx-5 my-25 px-4`}
    >
      <div className="w-full max-w-md">
        <div
          className={`${
            theme === "dark" ? "bg-black" : "bg-white"
          } rounded-2xl shadow-xl border border-red-200 p-8`}
        >
          <div className="text-center mb-8">
            <h1
              className={`${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              } text-3xl font-bold`}
            >
              Reset Password
            </h1>

            <p className="text-gray-500 mt-2">
              Enter the OTP sent to your email and create a new password
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } block text-sm font-medium mb-2`}
              >
                OTP
              </label>

              <input
                id="otp"
                type="text"
                name="otp"
                value={formData.otp}
                placeholder="Enter OTP"
                onChange={handleChange}
                required
                maxLength={6}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } block text-sm font-medium mb-2`}
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="Enter new password"
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-500 hover:text-red-700"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
