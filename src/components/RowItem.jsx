import React from "react";

const RowItem = ({ reserved, changeReserved, passing, changePassing,mm,no }) => {
  return (
    <div className="row_item">
      <div className="container">
        <div className="sieve">
          <div className="spacer">
            <span>{no}</span>
            <span>{mm}</span>
          </div>
        </div>

        <div className="sieve">
          <input
            type="number"
            value={reserved}
            onChange={(e) => changeReserved(e.target.value)}
          />
        </div>

        <div className="sieve">
          <input
            type="number"
            value={passing}
            onChange={(e) => changePassing(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default RowItem;
