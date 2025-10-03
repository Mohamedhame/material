const ShowErrorFake = ({changeStateError}) => {
  return (
    <div style={{
            display:"flex",
            height:"100%",
            color:"white",
            fontSize:"18px",
            textAlign:"center",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            gap:"30px"
          }}>
            <p>عفوا هذا الملف ليس علي النمط </p>
            <button style={{
              padding:"5px 10px",
              borderRadius:"5px",
              cursor:"pointer",
            }}
            onClick={changeStateError}
            >رجوع</button>
            
          </div>
  );
}

export default ShowErrorFake;
