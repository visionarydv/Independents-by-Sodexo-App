import React from "react";
import image1 from "../assets/0.png";
import image2 from "../assets/1.png";
import image3 from "../assets/2.png";

const style =
  "px-4 py-3 bg-white rounded flex items-center gap-3 text-[16px] transition shadow-md cursor-default";

const imageStyle = "w-[35px] h-[35px] object-cover rounded-md cursor-default";

const PinnedFiles = () => {
  return (
    <div className="mt-10 font-bitter">
      <h3 className="text-[24px] font-semibold">PINED FILES</h3>
      <div className="flex gap-4 mt-4 flex-wrap">
        <div className={style} style={{ color: "rgba(34, 34, 33, 1)" }}>
          <img src={image1} alt="Menu templates" className={imageStyle} />
          Menu templates
        </div>
        <div className={style} style={{ color: "rgba(34, 34, 33, 1)" }}>
          <img
            src={image2}
            alt="Editable theme day menus"
            className={imageStyle}
          />
          Editable theme day menus
        </div>
        <div className={style} style={{ color: "rgba(34, 34, 33, 1)" }}>
          <img
            src={image3}
            alt="Portrait screen templates"
            className={imageStyle}
          />
          Portrait screen templates
        </div>
      </div>
    </div>
  );
};

export default PinnedFiles;
