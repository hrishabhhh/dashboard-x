import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authUsers";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const data = await registerUser(formData);
      console.log("Data-----", data);
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Registration failed");
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
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="border"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="border"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="border"
          />
          <button type="submit" disabled={loading} className="bg-green-500 p-5">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
