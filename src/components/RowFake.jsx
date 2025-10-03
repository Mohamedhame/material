import React from "react";

const RowFake = ({
  mm,
  no,
  upperValue,
  changeUpper,
  lowerValue,
  changeLower,
}) => {
  return (
    <div className="fake_test">
      <div className="wraper">
        <div className="spacer">
          <span>{mm}</span>
          <span>{no}</span>
        </div>
      </div>
      <div className="wraper">
        <input
          type="number"
          value={lowerValue}
          onChange={(e) => changeLower(e.target.value)}
        />
      </div>
      <div className="wraper">
        <input
          type="number"
          value={upperValue}
          onChange={(e) => changeUpper(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RowFake;
