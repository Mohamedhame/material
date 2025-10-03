const BottomBar = ({ isActive, onClick }) => {
  return (
    <div className="bottom_bar">
      <button className={!isActive ? "active" : ""}>الرئيسية</button>
      <button onClick={onClick} className={isActive ? "active" : ""}>
        ضرب صلاحيات
      </button>
    </div>
  );
};

export default BottomBar;
