import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/authUsers";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

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
    <>
      <div className="flex flex-row gap-5 m-10">
        {error && <p>{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 justify-center items-center"
        >
          <input
            type="text"
            value={otp}
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="border"
          />
          <button type="submit" disabled={loading} className="bg-green-500 p-5">
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </>
  );
}

export default VerifyOtp;
