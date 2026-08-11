import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authUsers";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [formData, setFormData] = useState({
    otp: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <>
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            placeholder="OTP"
            onChange={handleChange}
            className="border"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="password"
            onChange={handleChange}
            className="border"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
