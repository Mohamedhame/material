import React from "react";
import "./saveAs.css";
const SaveAs = ({ title, handleFile }) => {
  return (
    <div className="save-as">
      <p className="title">{title}</p>
      <div className="btns">
        <button onClick={handleFile}>EXCEL</button>
      </div>
    </div>
  );
};

export default SaveAs;
