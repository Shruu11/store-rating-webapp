import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/admin/stores",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStores(response.data.stores);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredStores = stores.filter((store) =>
  store.name.toLowerCase().includes(search.toLowerCase()) ||
  store.email.toLowerCase().includes(search.toLowerCase()) ||
  store.address.toLowerCase().includes(search.toLowerCase()) ||
  store.owner_name.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div>
      <Navbar/>
      <h1>Stores List</h1>
      <input
  type="text"
  placeholder="Search stores..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Owner Name</th>
          </tr>
        </thead>

        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.owner_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stores;