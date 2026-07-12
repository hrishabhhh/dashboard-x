import { useEffect, useState } from "react";
import { createUser, updateUser } from "../api/users";
import { useRef } from "react";

function UserForm({ newCreatedUser, editingUser, onUserUpdated }) {
  const initialUser = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: "",
  };

  const formRef = useRef(null);
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
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
      const editedUser = await updateUser(editingUser._id, user);
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
      <div className="flex items-center justify-center bg-gray-100 px-2 py-4">
        <div className="w-full max-w-lg rounded-xl bg-white p-2 shadow-lg">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
            {editingUser ? "Edit User" : "Create User"}
          </h2>

          <div
            ref={formRef}
            className="
        flex flex-col gap-2 [&_input]:rounded-lg [&_input]:border [&_input]:border-gray-300 [&_input]:px-4 [&_input]:py-2.5 [&_input]:outline-none [&_input]:transition [&_input]:duration-200 [&_input]:focus:border-green-500 [&_input]:focus:ring-2 [&_input]:focus:ring-green-200"
          >
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

          {errors.length > 0 && (
            <div className="mt-5 rounded-lg border border-red-300 bg-red-50 p-4">
              <h3 className="mb-2 font-semibold text-red-700">
                Please fix the following errors:
              </h3>

              <ul className="list-disc space-y-1 pl-5 text-sm text-red-600">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            className="
        mt-6
        w-full
        rounded-lg
        bg-red-600
        py-3
        font-semibold
        text-white
        transition
        duration-300
        hover:bg-red-700
      "
            onClick={handleSubmit}
          >
            {editingUser ? "Update User" : "Add User"}
          </button>
        </div>
      </div>
    </>
  );
}

export default UserForm;
