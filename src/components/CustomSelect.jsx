import React from "react";

const CustomSelect = ({
  setSelectClassification,
  selectClassification,
  numberOfSamples,
  setNumberOfSamples,
}) => {
  return (
    <div className="container">
      <select
        name=""
        id=""
        onChange={(e) => setSelectClassification(e.target.value)}
      >
        <option value={selectClassification}>Fill / SM</option>
        <option value="Fill / SC">Fill / SC</option>
      </select>

      <div className="input-group">
        <input
          id="fakeNum"
          type="number"
          placeholder=""
          value={numberOfSamples}
          onChange={(e) => setNumberOfSamples(e.target.value)}
        />
        <label htmlFor="fakeNum">عدد العينات</label>
      </div>
    </div>
  );
};

export default CustomSelect;
