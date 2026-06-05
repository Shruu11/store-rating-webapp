import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import "../pages/style/auth.css"

function UpdatePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
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
      const token =
        localStorage.getItem("token");

      const response = await api.put(
        "/auth/update-password",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message
      );

      setFormData({
        oldPassword: "",
        newPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">

          <h1 className="auth-title">
            Update Password
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>
                Old Password
              </label>

              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Update Password
            </button>

          </form>

        </div>
      </div>
    </>
  );
}

export default UpdatePassword;