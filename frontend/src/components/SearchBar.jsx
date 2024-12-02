import { FaCog, FaImage, FaVideo, FaUser, FaPlus } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { BiSolidVideos } from "react-icons/bi";

import { Link } from "react-router-dom";

const filterBoundryIcon = "text-3xl p-1 rounded";
const filterBoundry =
  "flex items-center gap-3 pl-[0.29rem] pr-5 py-1 bg-white rounded shadow-sm hover:shadow-md transition";

const SearchBar = ({ plus, filter }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-evenly gap-5">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search anything here"
          className="flex-grow p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* Add Icon */}
        {plus && (
          <div className="p-2 cursor-pointer bg-[#D9534F] rounded">
            <FaPlus className="text-xl text-white" />
          </div>
        )}

        {/* Settings Icon */}
        <div className="p-2 cursor-pointer bg-white rounded">
          <FaCog className="text-xl text-gray-600" />
        </div>

        {/* User Icon */}
        <Link to="/info" className="p-2 cursor-pointer bg-white rounded">
          <FaUser className="text-xl text-gray-600" />
        </Link>
      </div>

      {/* Filter Buttons Section */}
      {filter && (
        <div className="flex gap-4 font-bitter">
          <button className={filterBoundry}>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="flex items-center justify-center w-full h-full bg-[#FFE0D5] rounded-md">
                <FaFile className="text-[#C95C34] text-sm rounded" />
              </div>
            </div>
            <span className="text-[16px] text-center">Documents</span>
          </button>

          <button className={filterBoundry}>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="relative flex items-center justify-center w-full h-full bg-[#E0EEF8] rounded-md z-10">
                <FaImage className="text-[#6C8EA4] text-sm" />
              </div>
            </div>
            <span className="text-[16px] text-center">Images</span>
          </button>

          <button className={filterBoundry}>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="relative flex items-center justify-center w-full h-full bg-[#E8D4E8] rounded-md z-10">
                <BiSolidVideos className="text-[#755476] text-sm" />
              </div>
            </div>
            <span className="text-[16px] text-center">Videos</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
