import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";


function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data.users);
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

  const filteredUsers = users
    .filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.address
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.role
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
        <h1 className="text-2xl font-bold">Users List:</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>

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
                handleSort("role")
              }
              style={{ cursor: "pointer" }}
            >
              Role{" "}
              {sortField === "role"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>

              <td>
                <button
                  onClick={() =>
                    navigate(
                      `/admin/users/${user.id}`
                    )
                  }
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Users;