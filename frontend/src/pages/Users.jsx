import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import Loader from "../components/Loader";
import Error from "../components/error";
import UserCard from "../components/UserCard";
import { deleteUser } from "../api/users";
import UserForm from "../components/UserForm";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

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
  // console.log("Users data: ----- ", users);
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

  function handleUserUpdated(updatedUser) {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user,
      ),
    );

    setEditingUser(null);
  }

  function handleUserCreated(createdUser) {
    setUsers((prevUsers) => [...prevUsers, createdUser]);
  }

  function handleEditUser(users) {
    setEditingUser(users);
    console.log(editingUser);
  }

  return (
    <>
      <div>
        <UserForm
          newCreatedUser={handleUserCreated}
          editingUser={editingUser}
          onUserUpdated={handleUserUpdated}
        />
      </div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          deleteUser={() => handleDeleteUser(user.id)}
          deleting={deletingId == user.id}
          onEditUser={() => handleEditUser(user)}
        />
      ))}
    </>
  );
}

export default Users;
