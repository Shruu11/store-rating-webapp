import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        `/admin/users/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "700px",
          margin: "50px auto",
          padding: "30px",
          border: "1px solid gray",
          borderRadius: "10px",
        }}
      >
        <h1>User Details</h1>

        <p>
          <strong>Name:</strong>
          {" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>
          {" "}
          {user.email}
        </p>

        <p>
          <strong>Address:</strong>
          {" "}
          {user.address}
        </p>

        <p>
          <strong>Role:</strong>
          {" "}
          {user.role}
        </p>

        {user.role ===
          "STORE_OWNER" && (
          <p>
            <strong>
              Average Rating:
            </strong>
            {" "}
            {user.averageRating}
          </p>
        )}
      </div>
    </>
  );
}

export default UserDetails;