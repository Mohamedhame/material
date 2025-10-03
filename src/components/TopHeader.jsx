import { useValue } from "./ValueContext";
const TopHeader = () => {
  const {
    sourceOfMaterial,
    setSourceOfMaterial,
    selectClassification,
    setSelectClassification,
    stockpile,
    setStockpile,
    date,
    setDate,
  } = useValue();
  return (
    <div className="btm_header">
      <div className="container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="input-group">
          <input
            type="text"
            id="source"
            value={sourceOfMaterial}
            placeholder=" "
            required
            onChange={(e) => setSourceOfMaterial(e.target.value)}
          />
          <label htmlFor="source">مصدر العينة</label>
        </div>
      </div>
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
            type="text"
            id="stockpile"
            value={stockpile}
            onChange={(e) => setStockpile(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="stockpile">Stockpile</label>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
