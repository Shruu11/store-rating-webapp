import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar"

function OwnerDashboard() {
  const [dashboard, setDashboard] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchRatings();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/store-owner/dashboard"
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

console.log("Dashboard:", response.data);

      setDashboard(response.data.dashboard);
      
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const fetchRatings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/store-owner/ratings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Ratings:", response.data);

      setRatings(response.data.ratings);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div>
      <h1>Store Owner Dashboard</h1>

      <h2>Store Summary</h2>

      <Navbar/>

      <table border="1">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Total Ratings</th>
            <th>Average Rating</th>
          </tr>
        </thead>

        <tbody>
          {dashboard.map((store) => (
            <tr key={store.name}>
              <td>{store.name}</td>
              <td>{store.total_ratings}</td>
              <td>{store.average_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Users Ratings</h2>

      <table border="1">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((rating, index) => (
            <tr key={index}>
              <td>{rating.user_name}</td>
              <td>{rating.user_email}</td>
              <td>{rating.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerDashboard;