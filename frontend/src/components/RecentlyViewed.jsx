import React, { useState } from "react";
import { FaList, FaTh } from "react-icons/fa";
import { files } from "../constant/data";

const colHeader = "p-3 text-left text-[16px] font-semibold font-bitter";

const RecentlyViewed = ({ check }) => {
  const [view, setView] = useState("list");
  console.log(check);

  const toggleView = (viewType) => {
    setView(viewType);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        <h3 className="text-[24px] font-semibold font-bitter">
          RECENTLY VIEWED
        </h3>

        {check && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleView("list")}
              className={`p-2 rounded-fulls`}
            >
              <FaList
                className={`text-xl ${
                  view === "list" ? "text-gray-800" : "text-gray-400"
                }`}
              />
            </button>
            <button
              onClick={() => toggleView("grid")}
              className={`p-2 rounded-full `}
            >
              <FaTh
                className={`text-xl ${
                  view === "grid" ? "text-gray-800" : "text-gray-400"
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* File Display: List (Table) or Grid */}
      {view === "list" ? (
        <div className="mt-4">
          <table className="min-w-full table-auto border-spacing-0">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-gray-300 font-bitter">
                {check && (
                  <>
                    <th className={colHeader}>Name</th>
                    <th className={colHeader}>Category</th>
                    <th className={colHeader}>Type</th>
                    <th className={colHeader}>Size</th>
                  </>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td
                    className="p-3 text-[16px] flex items-center gap-10"
                    style={{ color: "rgba(34, 34, 33, 1)" }}
                  >
                    {/* Image First */}
                    <img
                      src={file.image}
                      alt={file.name}
                      className="w-[61px] h-[61px] object-cover rounded-md"
                    />
                    {/* File Name */}
                    {file.name}
                  </td>
                  {check && (
                    <>
                      <td
                        className="p-3 text-[16px]"
                        style={{ color: "rgba(34, 34, 33, 1)" }}
                      >
                        {file.category}
                      </td>
                      <td
                        className="p-3 text-[16px]"
                        style={{ color: "rgba(34, 34, 33, 1)" }}
                      >
                        {file.type}
                      </td>
                      <td
                        className="p-3 text-[16px]"
                        style={{ color: "rgba(34, 34, 33, 1)" }}
                      >
                        {file.size}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Grid View
        <div className="mt-4 grid grid-cols-3 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="border p-2 rounded-xl flex gap-4"
              style={{ background: "rgba(232, 232, 232, 1)" }}
            >
              {/* Image */}
              <img
                src={file.image}
                alt={file.name}
                className="w-[83px] h-[83px] object-cover rounded-md"
              />

              {/* File Details */}
              <div>
                <div className="text-[16px] font-light tracking-wider">
                  {file.name}
                </div>
                <div
                  className="text-[16px]"
                  style={{ color: "rgba(134, 133, 133, 1)" }}
                >
                  {file.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;
