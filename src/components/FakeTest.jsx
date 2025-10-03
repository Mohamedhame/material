import { initialSieves } from "../initialSieves";
import { useState } from "react";
import "./fake.css";
import RowFake from "./RowFake";
import * as XLSX from "xlsx";
import ChooseFake from "./ChooseFake";
import ShowErrorFake from "./ShowErrorFake";
import { downloadReport } from "../controller/downlodReport";
import { useValue } from "./ValueContext";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";

const FakeTest = () => {
  const [sieves, setSieves] = useState(initialSieves);
  const [showTest, setShowTest] = useState(false);
  const [showError, setShowError] = useState(false);
  const [numberOfSamples, setNumberOfSamples] = useState(1);
  const [llValue, setLL] = useState("");
  const [liValue, setLi] = useState("");
  const [socket, setSocket] = useState("");
  const [source, setSource] = useState("");
  const { date, selectClassification, setSelectClassification, textValue } =
    useValue();

  const changeUpper = (index, newUpper) => {
    setSieves((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const upper = newUpper;
          return { ...item, upper };
        }
        return item;
      })
    );
  };

  const changeLower = (index, newLower) => {
    setSieves((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const lower = newLower;
          return { ...item, lower };
        }
        return item;
      })
    );
  };

  const random = (sampleNumber) => {
    let prev = Infinity;

    let randomLL;
    if (llValue === 0 || !llValue) {
      randomLL = Math.floor(Math.random() * 29);
    } else {
      randomLL = Math.floor(Math.random() * Number(llValue));
    }

    let randomLi;
    if (liValue === 0 || !liValue) {
      randomLi = Math.floor(Math.random() * 9);
    } else {
      randomLi = Math.floor(Math.random() * Number(liValue));
    }

    const newSieves = sieves.map((item) => {
      const upper = Number(item.upper);
      const lower = Number(item.lower);

      if (!isNaN(upper) && !isNaN(lower)) {
        const maxAllowed = Math.min(upper, prev);
        const effectiveLower = Math.min(lower, maxAllowed);

        if (maxAllowed <= effectiveLower) {
          prev = maxAllowed;
          return { ...item, passing: maxAllowed.toFixed(2) };
        }

        let randomValue;
        do {
          randomValue =
            effectiveLower + Math.random() * (maxAllowed - effectiveLower);
        } while (randomValue.toFixed(2) === prev.toFixed(2));

        prev = randomValue;

        return { ...item, passing: randomValue.toFixed(2) };
      }
      return item;
    });

    setSieves(newSieves);
    downloadReport(
      randomLL,
      randomLi,
      newSieves,
      textValue,
      date,
      source,
      sampleNumber,
      selectClassification,
      socket
    );
  };

  const changeClass = () => {
    setShowTest(true);
  };
  const chooseFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames.find((name) => name === "Report");
      if (!sheetName) {
        console.error("Sheet 'Report' not found!");
        setShowError(true);
        return;
      }

      const sheet = workbook.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const searchValue = "Percentage Passing (%)";
      let found = false;

      rows.forEach((row) => {
        row.forEach((cell, colIndex) => {
          if (cell === searchValue) {
            let nextCells = row.slice(colIndex + 1, colIndex + 13);

            if (nextCells.includes(0)) {
              nextCells = nextCells.filter((v) => v !== 0);

              let extraCells = row.slice(
                colIndex + 13,
                colIndex + 13 + (12 - nextCells.length)
              );
              nextCells = nextCells.concat(extraCells);
            }

            if (sieves.length === nextCells.length) {
              sieves.forEach((element, index) => {
                if (Number(nextCells[index]) < 100) {
                  (element.lower = (Number(nextCells[index]) - 2).toFixed(2)),
                    (element.upper = (Number(nextCells[index]) + 2).toFixed(2));
                } else {
                  element.lower = "100";
                  element.upper = "100";
                }
              });
              changeClass();
            }
            found = true;
          }
        });
      });

      if (!found) {
        setShowError(true);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const changeStateError = () => {
    setShowError(false);
  };

  return (
    <div style={{ height: "100%" }}>
      {!showTest && (
        <>
          {!showError && (
            <ChooseFake chooseFile={chooseFile} changeClass={changeClass} />
          )}
          {showError && <ShowErrorFake changeStateError={changeStateError} />}
        </>
      )}

      {showTest && (
        <>
          <div className="fake_test">
            <div className="wraper">
              <p>منخل</p>
              <hr />
              <div className="spacer">
                <span>mm</span>
                <span>no</span>
              </div>
            </div>
            <div className="wraper">
              <p>من</p>
            </div>
            <div className="wraper">
              <p>الي</p>
            </div>
          </div>

          {sieves.map((item, index) => (
            <RowFake
              key={index}
              mm={item.mm}
              no={item.no}
              upperValue={item.upper}
              changeUpper={(val) => changeUpper(index, val)}
              lowerValue={item.lower}
              changeLower={(val) => changeLower(index, val)}
            />
          ))}

          <div className="btm_header">
            <CustomInput
              id1="fakeLL"
              id2="fakeLi"
              val1={llValue}
              val2={liValue}
              fun1={(e) => setLL(e)}
              fun2={(e) => setLi(e)}
              label1={"L.L"}
              label2={"P.I"}
            />

            <CustomInput
              id1="fakeLL"
              id2="fakeLi"
              val1={source}
              val2={socket}
              fun1={(e) => setSource(e)}
              fun2={(e) => setSocket(e)}
              label1={"مصدر العينة"}
              label2={"socketpile"}
            />

            <CustomSelect
              setSelectClassification={setSelectClassification}
              selectClassification={selectClassification}
              numberOfSamples={numberOfSamples}
              setNumberOfSamples={setNumberOfSamples}
            />
          </div>

          <button
            className="fake_btn"
            onClick={() => {
              for (let index = 0; index < numberOfSamples; index++) {
                random(index + 1);
              }
            }}
          >
            حفظ
          </button>
          <div style={{
            height:"20px",
            width:"100%",
            backgroundColor:"transparent"
          }}></div>
        </>
      )}
    </div>
  );
};

export default FakeTest;
