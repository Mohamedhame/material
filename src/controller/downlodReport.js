export function downloadReport(
  llValue,
  liValue,
  sieves,
  textValue,
  date,
  sourceOfMaterial,
  sampleNumber,
  selectClassification,
  stockpile
) {
  let liquidLimit = llValue;
  if (!llValue) {
    liquidLimit = "N.P";
  }

  let plasticLimit = liValue;
  if (!liValue) {
    plasticLimit = "N.P";
  }
  let indexLimt = "N.P";
  if (liValue && llValue) {
    indexLimt = Number(llValue) - Number(liValue);
  }

  fetch("/api/report",{
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cells: [
        { address: "E18", value: Number(sieves[0].passing) },
        { address: "F18", value: Number(sieves[1].passing) },
        { address: "G18", value: Number(sieves[2].passing) },
        { address: "H18", value: Number(sieves[3].passing) },
        { address: "I18", value: Number(sieves[4].passing) },
        { address: "J18", value: Number(sieves[5].passing) },
        { address: "K18", value: Number(sieves[6].passing) },
        { address: "L18", value: Number(sieves[7].passing) },
        { address: "M18", value: Number(sieves[8].passing) },
        { address: "N18", value: Number(sieves[9].passing) },
        { address: "O18", value: Number(sieves[10].passing) },
        { address: "P18", value: Number(sieves[11].passing) },
        { address: "B36", value: textValue },
        { address: "P13", value: liquidLimit },
        { address: "P14", value: indexLimt },
        { address: "P15", value: plasticLimit },
        { address: "F12", value: date },
        { address: "F12", value: sourceOfMaterial },
        { address: "E15", value: Number(sampleNumber) },
        { address: "I13", value: selectClassification },
        { address: "E14", value: Number(stockpile) },
      ],
      filename: `${sampleNumber ? sampleNumber : "null"}`,
    }),
  })
    .then((res) => res.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${sampleNumber ? `${sampleNumber}.xlsx` : "null.xlsx"}`;
      link.click();
    });
}
