import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem("token")
    navigate("/signin")
  }

  // Get first letter of stored username for avatar, fallback to "U"
  const username = localStorage.getItem("username") || "U"

  return (
    <div className="border-b flex justify-between px-10 py-4 sticky top-0 bg-white z-10">
      <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer font-bold text-lg tracking-tight">
        Logverse
      </Link>
      <div className="flex items-center gap-4">
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2"
          >
            + New
          </button>
        </Link>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-500 hover:text-gray-800 font-medium"
        >
          Sign out
        </button>
        <Avatar size={"big"} name={username} />
      </div>
    </div>
  )
}