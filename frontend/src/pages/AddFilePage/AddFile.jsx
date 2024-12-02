import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import PinnedFiles from "../../components/PinnedFiles";
import RecentlyViewed from "../../components/RecentlyViewed";
import FileAdd from "../../components/FileAdd";

const AddFile = () => {

  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = localStorage.getItem("userInfo");
    return !!token;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

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
