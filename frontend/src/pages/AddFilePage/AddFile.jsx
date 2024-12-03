import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import PinnedFiles from "../../components/PinnedFiles";
import RecentlyViewed from "../../components/RecentlyViewed";
import FileAdd from "../../components/FileAdd";
import { useDispatch } from "react-redux";
import useUserData from "../../hooks/useUserData";
import { logout } from "../../slices/authSlice";

const AddFile = () => {

  const { data, error } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate,error,data,dispatch]);

  return (
    <div className="flex h-screen overflow-hidden font-poppins">
      {/* Sidebar */}
      <Sidebar activeLink={"Add"} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-6 px-12 overflow-y-auto">
        <SearchBar plus={true} filter={true} />
        <PinnedFiles />
        <FileAdd />
        <RecentlyViewed check={false} />
      </main>
    </div>
  );
};

export default AddFile;
