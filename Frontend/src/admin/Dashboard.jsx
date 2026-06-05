import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import "./style/dashboard.css"
function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

    return (
  <div>
    <Navbar />

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Stores</h3>
          <p>{stats.totalStores}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Ratings</h3>
          <p>{stats.totalRatings}</p>
        </div>

      </div>

    </div>
  </div>
);
}

export default Dashboard;