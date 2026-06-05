import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar"
import "../admin/style/createstore.css"
function CreateStore() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
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

      const response = await api.post(
        "/admin/stores",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setFormData({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to create store"
      );
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Create Store</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Store Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Store Address"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="number"
          name="owner_id"
          placeholder="Store Owner ID"
          value={formData.owner_id}
          onChange={handleChange}
        />

        <button type="submit">
          Create Store
        </button>
      </form>
    </div>
  );
}

export default CreateStore;