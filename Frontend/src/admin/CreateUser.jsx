import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import toast from "react-hot-toast";
import "./style/createstore.css"
function CreateUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/admin/users",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User Created Successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    } catch (error) {
      toast.error("Failed to Create User");
    }
  };
  return (
  <div>
    <Navbar />

    <div className="store-page">

      <h1 className="store-title">
        Create User
      </h1>

      <div className="store-card">

        <form
          className="store-form"
          onSubmit={handleSubmit}
        >

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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="USER">
              USER
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>

            <option value="ADMIN">
              ADMIN
            </option>
          </select>

          <button
            type="submit"
            className="store-btn"
          >
            Create User
          </button>

        </form>

      </div>

    </div>

  </div>
);
}


export default CreateUser;