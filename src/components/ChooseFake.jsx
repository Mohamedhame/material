import React from 'react';

const ChooseFake = ({chooseFile,changeClass}) => {
  return (
      <div className="choose">
          <label htmlFor="fileUpload" className="btn">
            العمل مثل ملف موجود
          </label>
          <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }}
            onChange={(e) => chooseFile(e.target.files[0])}
          />
          <button className="btn" onClick={changeClass}>
            إنشاء جديد
          </button>
        </div>
  );
}

export default ChooseFake;
