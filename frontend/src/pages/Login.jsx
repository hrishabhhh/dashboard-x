import { useState } from "react";
import { loginUser } from "../api/authUsers";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

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
      const data = await loginUser(formData);
      // console.log("Login data=====", data);
      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Login Failed");
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="bg-green-500 p-5" type="submit" disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
