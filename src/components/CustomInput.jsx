const CustomInput = ({id1, id2, val1, val2, fun1, fun2,label1,label2}) => {
  return (
    <div className="container">
      <div className="input-group">
        <input
          id={id1}
          type="number"
          placeholder=""
          value={val1}
          onChange={(e) => fun1(e.target.value)}
        />
        <label htmlFor="fakeLL">{label1}</label>
      </div>

      <div className="input-group">
        <input
          id={id2}
          type="number"
          placeholder=""
          value={val2}
          onChange={(e) => fun2(e.target.value)}
        />
        <label htmlFor="fakeLi">{label2}</label>
      </div>
    </div>
  );
};

export default CustomInput;
