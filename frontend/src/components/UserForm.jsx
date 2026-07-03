import { useState } from "react";
import { createUser } from "../api/users";

function UserForm({ newCreatedUser }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  });

  const initialUser = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const createdUser = await createUser(user);
      // console.log("Created user:------------", createdUser);
      newCreatedUser(createdUser);
      setUser(initialUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <>
      <div className="m-5 flex flex-col max-w-md gap-2 [input]:p-2 [input]:m-2">
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
      <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 m-5"
          onClick={handleSubmit}
        >
          Add User
        </button>
      </div>
    </>
  );
}

export default UserForm;
