import { useState, useRef, useEffect } from "react";
import BottomHeader from "./BottomHeader";
import TopHeader from "./TopHeader";
import RowItem from "./RowItem";
import TitleTable from "./TitleTable";
import { useValue } from "./ValueContext";
import FineWeight from "./FineWeight";

import { initialSieves } from "../initialSieves";
import Footer from "./Footer";
import TextArea from "./TextArea";
import Dialog from "./Dialog";
import BottomBar from "./BottomBar";
import FakeTest from "./FakeTest";
import SaveAs from "./SaveAs";
import { downloadReport } from "../controller/downlodReport";

const Root = () => {
  const {
    sampleWeight,
    fineWight,
    sampleNumber,
    sourceOfMaterial,
    selectClassification,
    stockpile,
    date,
    textValue, 
    setTextValue
  } = useValue();
  const [sieves, setSieves] = useState(initialSieves);
  const [llValue, setLL] = useState("");
  const [liValue, setLi] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isActive, setActiv] = useState(false);
  const topElementRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        setShowDialog(false);
        setActiv(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const changeTextArea = (e) => {
    setTextValue(e);
  };

  const changeLL = (e) => {
    setLL(e);
  };
  const changeLi = (e) => {
    setLi(e);
  };

  const changeReserved = (index, newReserved) => {
    setSieves((prev) => {
      const sieve475Index = prev.findIndex((s) => s.mm === "4.75");
      const sieve475Passing =
        sieve475Index !== -1 ? Number(prev[sieve475Index].passing || 0) : 0;

      return prev.map((item, i) => {
        if (i === index) {
          const reserved = newReserved;
          let passing = "";

          if (reserved) {
            if (i < sieve475Index) {
              if (sampleWeight) {
                passing = (
                  100 -
                  (Number(reserved) / Number(sampleWeight)) * 100
                ).toFixed(2);
              }
            } else if (i === sieve475Index) {
              if (sampleWeight) {
                passing = (
                  100 -
                  (Number(reserved) / Number(sampleWeight)) * 100
                ).toFixed(2);
              }
            } else {
              if (fineWight && sieve475Passing) {
                const finePassing =
                  100 - (Number(reserved) / Number(fineWight)) * 100;
                passing = ((finePassing * sieve475Passing) / 100).toFixed(2);
              }
            }
          }

          return { ...item, reserved, passing };
        }
        return item;
      });
    });
  };

  const changePassing = (index, newPassing) => {
    setSieves((prev) =>
      prev.map((item, i) => {
        // get index sieve no 4;
        const sieve475Index = prev.findIndex((s) => s.mm === "4.75");

        // get passing value sieve no 4;
        const sieve475Passing =
          sieve475Index !== -1 ? Number(prev[sieve475Index].passing || 0) : 0;

        if (i === index) {
          const passing = newPassing;
          let reserved = "";

          if (passing) {
            if (i < sieve475Index) {
              if (sampleWeight) {
                reserved = (
                  Number(sampleWeight) -
                  (Number(passing) / 100) * Number(sampleWeight)
                ).toFixed(2);
              }
            } else if (i === sieve475Index) {
              reserved = (
                Number(sampleWeight) -
                (Number(passing) / 100) * Number(sampleWeight)
              ).toFixed(2);
            } else {
              if (fineWight && sieve475Passing) {
                const pf = Number(newPassing) / Number(sieve475Passing);
                reserved = ((1 - Number(pf)) * Number(fineWight)).toFixed(2);
              }
            }
          }

          return { ...item, reserved, passing };
        }
        return item;
      })
    );
  };

  const randomValues = () => {
    setShowDialog(true);
    setActiv(true);
  };

  function returnBool() {
    if (showDialog && isActive) {
      return "random";
    } else if (showDialog && !isActive) {
      return "show";
    } else {
      return "";
    }
  }

  return (
    <div>
      <header>
        <TopHeader />
        <BottomHeader ref={topElementRef} />
      </header>
      <main>
        <TitleTable />
        {sieves.map((item, index) => (
          <div key={index}>
            <RowItem
              reserved={item.reserved}
              passing={item.passing}
              changeReserved={(val) => changeReserved(index, val)}
              changePassing={(val) => changePassing(index, val)}
              mm={item.mm}
              no={item.no}
            />

            {item.mm === "4.75" && <FineWeight />}
          </div>
        ))}

        <Footer
          liValue={liValue}
          llvalue={llValue}
          changeLL={changeLL}
          changeLi={changeLi}
        />

        <TextArea value={textValue} changeTextArea={changeTextArea} />
      </main>
      <Dialog className={returnBool()} ref={dialogRef}>
        {isActive ? (
          <FakeTest />
        ) : (
          <SaveAs
            title={sampleNumber ? sampleNumber : "null"}
            handleFile={
              ()=>
              downloadReport(
                llValue,
                liValue,
                sieves,
                textValue,
                date,
                sourceOfMaterial,
                sampleNumber,
                selectClassification,
                stockpile
              )
            }
          />
        )}
      </Dialog>
      <BottomBar isActive={showDialog && isActive} onClick={randomValues} />
      <footer>
        <div className="container f-b">
          <button onClick={()=>setShowDialog(true)}>حفظ</button>
        </div>
      </footer>
    </div>
  );
};

export default Root;
