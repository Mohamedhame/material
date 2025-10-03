import { useValue } from "./ValueContext";
import { forwardRef } from "react";
import "./header.css";
const BottomHeader = forwardRef((props, ref) => {
  const { sampleWeight, setSampleWeight, sampleNumber, setSampleNumber } =
    useValue();
  return (
    <div className="btm_header">
      <div className="container" style={{ flexGrow: "1" }}>
        <div className="input-group">
          <input
            ref={ref}
            style={{ flexGrow: "1", marginLeft: "10px" }}
            type="number"
            id="wheightNumber"
            value={sampleWeight}
            onChange={(e) => setSampleWeight(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="wheightNumber">وزن العينة</label>
        </div>
        <div className="input-group">
          <input
            type="number"
            id="sampleNumber"
            value={sampleNumber}
            onChange={(e) => setSampleNumber(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="sampleNumber">رقم العينة</label>
        </div>
      </div>
    </div>
  );
});

export default BottomHeader;
