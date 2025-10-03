import { useValue } from "./ValueContext";

const FineWeight = () => {
  const { fineWight, setFineWeight } = useValue();
  return (
    <div
      className="btm_header fine_weight"
    >
      <div className="container">
        <div className="input-group">
          <input
            id="fine"
            type="number"
            placeholder=""
            value={fineWight}
            onChange={(e) => setFineWeight(e.target.value)}
          />
          <label htmlFor="fine">وزن الناعم</label>
        </div>
      </div>
    </div>
  );
};

export default FineWeight;
