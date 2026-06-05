import { useEffect, useState } from "react";
import api from "../services/api";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/stores",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStores(response.data.stores);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleRatingChange = (storeId, value) => {
    setRatings({
      ...ratings,
      [storeId]: value,
    });
  };

  const submitRating = async (storeId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/ratings",
        {
          store_id: storeId,
          rating: Number(ratings[storeId]),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchStores();

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Failed to submit rating"
      );
    }
  };
  const updateRating = async (storeId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `/ratings/${storeId}`,
      {
        rating: Number(ratings[storeId]),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    fetchStores();

  } catch (error) {
    console.log(error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to update rating"
    );
  }
};

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>User Dashboard</h1>

      <input
        type="text"
        placeholder="Search Stores"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Average Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.average_rating}</td>

              <td>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={ratings[store.id] || ""}
                  onChange={(e) =>
                    handleRatingChange(
                      store.id,
                      e.target.value
                    )
                  }
                />
              </td>

              <td>
               <>
  <button
    onClick={() => submitRating(store.id)}
  >
    Submit
  </button>

  <button
    onClick={() => updateRating(store.id)}
  >
    Update
  </button>
</>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;