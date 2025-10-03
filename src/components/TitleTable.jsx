import "./table.css";

const TitleTable = () => {
  return (
    <div className="title_table">
      <div className="container">
        <div className="sieve">
          <p>المناخل</p>
          <hr />
          <div className="spacer">
            <span>no</span>
            <span>mm</span>
          </div>
        </div>
        <div className="sieve">
          <p>المحجوز</p>
        </div>
        <div className="sieve">
          <p>المار</p>
        </div>
      </div>
    </div>
  );
};

export default TitleTable;
