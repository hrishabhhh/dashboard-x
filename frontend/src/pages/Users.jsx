import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import Loader from "../components/Loader";
import Error from "../components/error";
import UserCard from "../components/UserCard";
import { deleteUser } from "../api/users";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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
  console.log("Users data: ----- ", users);
  if (loading) {
    return <Loader message="Loading in progress" />;
  }

  if (error) {
    return <Error message={error} />;
  }

  async function handleDeleteUser(id) {
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      return <Error message={error.message} />;
    } finally {
      setDeletingId(null);
    }
  }
  return (
    <>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          deleteUser={() => handleDeleteUser(user.id)}
          deleting={deletingId == user.id}
        />
      ))}
    </>
  );
}

export default Users;
