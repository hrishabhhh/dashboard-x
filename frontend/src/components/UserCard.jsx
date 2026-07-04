function UserCard({ user, deleteUser, deleting, onEditUser }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

        <p className="text-gray-500">@{user.username}</p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">📧 Email:</span> {user.email}
        </p>

        <p>
          <span className="font-semibold">📞 Phone:</span> {user.phone}
        </p>

        <p>
          <span className="font-semibold">🌐 Website:</span> {user.website}
        </p>

        <p>
          <span className="font-semibold">🏢 Company:</span> {user.company.name}
        </p>
        <button
          onClick={deleteUser}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 mt-2"
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete User"}
        </button>
        <button
          onClick={onEditUser}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mt-2 ml-2"
        >
          Edit User
        </button>
      </div>
    </div>
  );
}

export default UserCard;
