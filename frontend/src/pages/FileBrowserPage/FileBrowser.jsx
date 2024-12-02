import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import PinnedFiles from "../../components/PinnedFiles";
import RecentlyViewed from "../../components/RecentlyViewed";

const FileBrowser = () => {

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
      <Sidebar activeLink={"Home"} />

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 py-6 px-12 overflow-y-auto">
        <SearchBar plus={false} filter={true} />
        <PinnedFiles />
        <RecentlyViewed check={true} />
      </main>
    </div>
  );
};

export default FileBrowser;
