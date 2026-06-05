import { useState } from "react";
import { Link } from "react-router-dom";
import "../pages/style/login.css";
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
    <div className="login-container">
      <form className="login-form"  onSubmit={handleSubmit}>
        <h2>Login</h2>

      <input
  type="email"
  name="email"
  placeholder="Enter Email"
  value={formData.email}
  onChange={handleChange}
/>
        

        <input
  type="password"
  name="password"
  placeholder="Enter Password"
  value={formData.password}
  onChange={handleChange}
/>

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;