import { useEffect, useState } from "react";
import { createUser, updateUser } from "../api/users";

function UserForm({ newCreatedUser, editingUser, onUserUpdated }) {
  const initialUser = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  };

  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (editingUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({
        name: editingUser.name || "",
        username: editingUser.username || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        website: editingUser.website || "",
        company: editingUser.company?.name || editingUser.company || "",
      });
    } else {
      setUser(initialUser);
    }
  }, [editingUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingUser) {
      const editedUser = await updateUser(editingUser.id, user);
      onUserUpdated(editedUser);
    } else {
      try {
        const createdUser = await createUser(user);
        // console.log("Created user:------------", createdUser);
        newCreatedUser(createdUser);
        setUser(initialUser);
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <>
      <div className="m-5 flex flex-col max-w-md gap-2 [&_input]:border [&_input]:border-[#000] [&_input]:rounded [&_input]:px-2 [&_input]:py-1">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={user.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
        />
        <input
          type="url"
          name="website"
          placeholder="Website"
          value={user.website}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={user.company}
          onChange={handleChange}
        />
      </div>
      {errors.map((error, index) => (
        <p className="text-red-500 ml-5" key={index}>
          {error}
        </p>
      ))}
      <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 m-5"
          onClick={handleSubmit}
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </div>
    </>
  );
}

export default UserForm;
