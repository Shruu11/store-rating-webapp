import "../pages/style/register.css";
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
    <div className="register-container">

      <form className="register-form" onSubmit={handleSubmit}>

        <h2>Register</h2>

        <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={formData.name}
  onChange={handleChange}
/>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
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
          Register
        </button>
        <p>
  Already have an account?
  <Link to="/">
    Login
  </Link>
</p>

      </form>

    </div>
  );
}

export default Register;