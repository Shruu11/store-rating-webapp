import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/style/auth.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const response = await api.post(
      "/auth/login",
      formData
    );

    const { token, role } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    if (role === "ADMIN") {
      navigate("/admin");
    }

    if (role === "USER") {
      navigate("/user");
    }

    if (role === "STORE_OWNER") {
      navigate("/owner");
    }

  } catch (error) {
    console.log(error);
    toast.error("Invalid Credentials");
  }
};

  return (
  <section className="auth-container">
    <div className="auth-card">
      <h1 className="auth-title">
        Welcome Back
      </h1>

      <p className="auth-subtitle">
        Sign in with your email and password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  </section>
);
}

export default Login;