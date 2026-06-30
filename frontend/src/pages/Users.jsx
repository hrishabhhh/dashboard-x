import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import Loader from "../components/Loader";
import Error from "../components/error";
import UserCard from "../components/UserCard";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  if (loading) {
    return <Loader message="Loading in progress" />;
  }

  if (error) {
    return <Error message={error} />;
  }
  return (
    <>
      {/* {users.map((user) => (
        <div key={user.id}>
          <h1> {user.name} </h1>
          <h1> {user.email} </h1>
        </div>
      ))} */}
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </>
  );
}

export default Users;
