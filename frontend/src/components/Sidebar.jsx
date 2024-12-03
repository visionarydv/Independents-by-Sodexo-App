import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { PiFoldersFill } from "react-icons/pi";
import { HiUsers } from "react-icons/hi2";
import { RiUserShared2Fill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";

import { Link } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";
import { toast } from "react-toastify";
import useUserData from "../hooks/useUserData";

const style =
  "flex items-center gap-2 text-sm hover:font-medium font-light cursor-default";

const Sidebar = ({ activeLink }) => {
  const getLinkClass = (linkName) => {
    return linkName === activeLink
      ? "flex items-center gap-4 px-3 py-2 rounded-[6px] bg-white text-[#D9534F] font-medium text-[15px]"
      : "flex items-center gap-4 px-3 py-2 rounded-[6px] text-[15px] hover:bg-white hover:text-[#D9534F] transition font-light hover:font-medium";
  };

  const userInfo = useUserInfo();
  const { data, error } = useUserData();

  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (data) {
      setIsAdmin(data.isAdmin);
    } else if (error) {
      toast.error("Error fetching user data");
    }
  }, [data, error]);

  return (
    <aside className="min-w-64 h-screen text-white flex flex-col py-1 px-6 justify-between items-start space-y-2 bg-[#C95C34]">
      <div>
        <h2 className="text-xl font-semibold mt-3 tracking-widest">
          INDEPENDENTS
        </h2>
        <h4 className="font-light text-sm text-center tracking-widest -mt-1">
          BY SODEXO
        </h4>
      </div>

      <nav className="space-y-[5px] font-bitter">
        <Link
          to={userInfo ? "/filebrowse" : "#"}
          className={getLinkClass("Home")}
        >
          <IoMdHome className="text-xl" />
          Home
        </Link>

        {isAdmin && (
          <Link
            to={userInfo ? "/addfile" : "#"}
            className={getLinkClass("Add")}
          >
            <div className="relative inline-block">
              <PiFoldersFill className="text-xl hover:text-[#D9534F]" />
              <CiCirclePlus className="absolute bottom-0 right-0 text-[12px] bg-white text-[#D9534F] rounded-full" />
            </div>
            Add File
          </Link>
        )}

        <Link
          to={userInfo ? "/allfiles" : "#"}
          className={getLinkClass("All Files")}
        >
          <PiFoldersFill className="text-xl" />
          All Files
        </Link>

        <Link
          to={userInfo ? "/shared" : "#"}
          className={getLinkClass("Shared")}
        >
          <HiUsers className="text-xl" />
          Shared with Me
        </Link>

        <Link
          to={userInfo ? "/favourites" : "#"}
          className={getLinkClass("Favourites")}
        >
          <FaHeart className="text-xl" />
          Favourites
        </Link>

        {isAdmin && (
          <Link
            to={userInfo ? "/delete" : "#"}
            className={getLinkClass("Delete")}
          >
            <RiDeleteBin5Line className="text-xl" />
            Delete
          </Link>
        )}

        {isAdmin && (
          <Link
            to={userInfo ? "/register" : "#"}
            className={getLinkClass("User")}
          >
            <RiUserShared2Fill className="text-xl" />
            Add User
          </Link>
        )}
      </nav>

      <div className="font-bitter">
        <h3 className="text-lg font-semibold mb-[5px]">CATEGORIES</h3>
        <ul className="space-y-2">
          <li className={style}>Introduction</li>
          <li className={style}>Pre-Launch</li>
          <li className={style}>Senior Collateral</li>
          <li className={style}>Prep Collateral</li>
          <li className={style}>Additional Collateral</li>
        </ul>
      </div>

      <footer className="text-xs text-white opacity-70 pt-4">
        © 2024 Independents by Sodexo
      </footer>
    </aside>
  );
};

export default Sidebar;
