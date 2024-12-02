import React from "react";

const FileAdd = () => {
  return (
    <div className="mt-10">
      {/* Header */}
      <h2 className="text-[24px] font-semibold mb-4 font-bitter">ADD FILES</h2>

      {/* File Upload Input */}
      <label
        htmlFor="fileUpload"
        className="flex flex-col items-center justify-center w-full h-24 border-2 border-dotted border-gray-300 rounded-lg bg-gray-50 cursor-pointer text-gray-400 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-300"
      >
        <span className="text-sm">Click or drag files here to upload</span>
        <input type="file" id="fileUpload" className="hidden" />
      </label>
    </div>
  );
};

export default FileAdd;
