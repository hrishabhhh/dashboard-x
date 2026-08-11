import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authUsers";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setMessage] = useState("");

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
      setError(error.response?.data?.message || "Something went wrong ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        {error && <p>{error.message}</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 justify-center items-center"
        >
          <input
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
