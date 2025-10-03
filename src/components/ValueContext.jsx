/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import { soilClassification } from "../constant/text";

const ValueContext = createContext();

export const ValueProvider = ({ children }) => {
  let now = new Date();
  const [sampleWeight, setSampleWeight] = useState("");
  const [fineWight, setFineWeight] = useState("");
  const [sampleNumber, setSampleNumber] = useState("");
  const [sourceOfMaterial, setSourceOfMaterial] = useState("");
  const [selectClassification, setSelectClassification] = useState("Fill / SM");
  const [stockpile, setStockpile] = useState("");
  const [textValue, setTextValue] = useState(soilClassification);
  const [date, setDate] = useState(
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
);
  return (
    <ValueContext.Provider
      value={{
        sampleWeight,
        setSampleWeight,
        fineWight,
        setFineWeight,
        sampleNumber,
        setSampleNumber,
        sourceOfMaterial,
        setSourceOfMaterial,
        selectClassification,
        setSelectClassification,
        stockpile,
        setStockpile,
        date,
        setDate,
        textValue, 
        setTextValue
      }}
    >
      {children}
    </ValueContext.Provider>
  );
};

export const useValue = () => useContext(ValueContext);
