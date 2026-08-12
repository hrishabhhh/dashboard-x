import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/authUsers";
import { useTheme } from "../hooks/useTheme";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await verifyOtp({ email, otp });

      console.log(data);

      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "OTP Verification Failed");
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
              Verify your email
            </h1>

            <p className="text-gray-500 mt-2">
              Enter the OTP sent to your email
            </p>

            {email && (
              <p className="text-sm text-gray-400 mt-2 break-all">{email}</p>
            )}
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
                Verification OTP
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center tracking-[0.4em] text-lg outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Already verified?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-500 hover:text-red-700"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;
