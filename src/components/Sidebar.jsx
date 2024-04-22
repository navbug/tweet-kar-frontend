import React, { useContext, useEffect, useState } from "react";
import { TiMessages } from "react-icons/ti";
import { MdHome, MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Context } from "../context/Context";
import { getUserInfo } from "../api";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [profileUser, setProfileUser] = useState(null);
  const { user, setUser, toggle } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetUserInfo = async (id) => {
    const fetchedUser = await getUserInfo(id);
    setProfileUser(fetchedUser);
  };

  const logout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    handleGetUserInfo(user?._id);
  }, [toggle]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col gap-3 relative h-[100vh] pl-4 pt-2">
      <span className="mb-3 flex items-center gap-2">
        <TiMessages className="text-blue-400" size={32} /><span className="logoName text-blue-400 text-xl">Tweet Kar</span>
      </span>

      <Link
        to="/"
        className={`flex items-center gap-2 ${
          isActive("/") ? "text-blue-500 bg-blue-100" : "text-gray-700"
        } px-4 py-1 rounded-md max-w-[200px]`}
      >
        <MdHome
          className={`${isActive("/") ? "text-blue-500" : "text-gray-800"}`}
          size={25}
        />
        <span className="font-semibold">Home</span>
      </Link>

      <Link
        to={`/profile/${user?._id}`}
        className={`flex items-center gap-2 ${
          isActive(`/profile/${user?._id}`) ? "text-blue-500" : "text-gray-700"
        } hover:bg-blue-100 px-4 py-1 rounded-md max-w-[200px]`}
      >
        <FaUser
          className={`${
            isActive(`/profile/${user?._id}`)
              ? "text-blue-500"
              : "text-gray-800"
          }`}
          size={20}
        />
        <span className="font-semibold">Profile</span>
      </Link>

      <div
        onClick={logout}
        className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 px-4 py-1 rounded-md max-w-[200px]"
      >
        <span>
          <MdLogout className="text-gray-800" size={20} />
        </span>
        <span className="font-semibold text-gray-700">Logout</span>
      </div>

      <div className="absolute bottom-5 left-3 flex gap-1 items-center text-gray-600 font-semibold cursor-pointer">
        <div className="w-12 h-12 rounded-full">
          <img
            src={`${
              profileUser?.profilePicture
                && profileUser.profilePicture
                // : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSajBGaxmLXDuMT23LOv41vdsBiLAZp3UgDKPWfyWnqw&s"
            }`}
            alt=""
            loading="lazy"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-0">
          <span>{user?.name}</span>
          <span>@{user?.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
