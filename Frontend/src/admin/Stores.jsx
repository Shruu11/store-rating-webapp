import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(
        sortOrder === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredStores = stores
    .filter(
      (store) =>
        store.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        store.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        store.address
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        store.owner_name
          .toLowerCase()
          .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valueA =
        a[sortField]
          ?.toString()
          .toLowerCase() || "";

      const valueB =
        b[sortField]
          ?.toString()
          .toLowerCase() || "";

      if (sortOrder === "asc") {
        return valueA.localeCompare(valueB);
      }

      return valueB.localeCompare(valueA);
    });

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <h1  className="text-2xl font-bold">Stores List:</h1>

        <input
          type="text"
          placeholder="Search stores..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <table border="1">
          <thead>
            <tr>
              <th
                onClick={() =>
                  handleSort("name")
                }
                style={{ cursor: "pointer" }}
              >
                Name{" "}
                {sortField === "name"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() =>
                  handleSort("email")
                }
                style={{ cursor: "pointer" }}
              >
                Email{" "}
                {sortField === "email"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() =>
                  handleSort("address")
                }
                style={{ cursor: "pointer" }}
              >
                Address{" "}
                {sortField === "address"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>

              <th
                onClick={() =>
                  handleSort("owner_name")
                }
                style={{ cursor: "pointer" }}
              >
                Owner Name{" "}
                {sortField === "owner_name"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
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
    </div>
  );
}

export default Stores;