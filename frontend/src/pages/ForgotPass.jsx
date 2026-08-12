import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authUsers";
import { useTheme } from "../hooks/useTheme";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setMessage] = useState("");

  const { theme } = useTheme();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await forgotPassword({ email });

      setMessage(data.message);

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
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
              Forgot Password?
            </h1>

            <p className="text-gray-500 mt-2">
              Enter your email and we'll send you an OTP
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
                htmlFor="email"
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                } block text-sm font-medium mb-2`}
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPassword;
