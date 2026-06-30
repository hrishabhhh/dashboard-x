import NavLinking from "./Navlinking";

function Navbar() {
  return (
    <nav className="flex flex-row gap-10 p-6 bg-red-500 justify-between">
      <div className="flex flex-row items-center gap-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbTV4z1MwxZpohL8arJFNCIQrobK_LH55XXkOxA2y49g&s=10"
          className="w-5 h-5"
        />
        <h1 className="text-xl font-bold">DashBoard - X</h1>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <NavLinking to="/" name="Home" />
        <NavLinking to="/users" name="Users" />
      </div>
    </nav>
  );
}

export default Navbar;
