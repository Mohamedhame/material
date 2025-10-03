import React from "react";

const TextArea = ({ value, changeTextArea }) => {
  return (
    <textarea
      name=""
      id=""
      className="container"
      placeholder="Soil Classification"
      value={value}
      onChange={(e) => changeTextArea(e.target.value)}
    />
  );
};

export default TextArea;
