import "./footer.css";

const Footer = ({ llvalue, changeLL, livalue, changeLi }) => {
  return (
    <div className="footer btm_header">
      <div className="container">
        <div className="input-group">
          <input
            id="ll"
            type="number"
            value={llvalue}
            onChange={(e) => changeLL(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="ll">L.L</label>
        </div>

        <div className="input-group">
          <input
            id="pi"
            type="number"
            value={livalue}
            onChange={(e) => changeLi(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="pi">P.I</label>
        </div>
      </div>
    </div>
  );
};

export default Footer;
