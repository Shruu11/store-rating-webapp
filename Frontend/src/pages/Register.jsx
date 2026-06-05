import "../pages/style/auth.css";
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  address: "",
});
const navigate = useNavigate();
 
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  console.log(formData);

  try {
    const response = await api.post(
      "/auth/register",
      formData
    );

    console.log(response.data);

    alert("Registration Successful");

    navigate("/");

  } catch (error) {
    console.log("Backend Error:", error.response?.data);

    alert("Registration Failed");
  }
};
 return (
  <section className="auth-container">
    <div className="auth-card">
      <h1 className="auth-title">
        Create Account
      </h1>

      <p className="auth-subtitle">
        Register to access Application.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
          <label>Address</label>

          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
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
          Register
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/">
          Login
        </Link>
      </p>
    </div>
  </section>
);
}

export default Register;