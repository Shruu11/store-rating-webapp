import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
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
      <Navbar/>
      <h1>Admin Dashboard</h1>

      <h2>Total Users: {stats.totalUsers}</h2>

      <h2>Total Stores: {stats.totalStores}</h2>

      <h2>Total Ratings: {stats.totalRatings}</h2>
    </div>
  );
}

export default Dashboard;