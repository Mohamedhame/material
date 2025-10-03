import XlsxPopulate from "xlsx-populate";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  
  try {
    const { cells, filename } = req.body;

    const workbook = await XlsxPopulate.fromFileAsync(
      path.join(__dirname, "..", "public", "assets", "sieve.xlsx")
    );

    const sheet = workbook.sheet(0);
    cells.forEach(c => sheet.cell(c.address).value(c.value));

    const buffer = await workbook.outputAsync();
    res.setHeader("Content-Disposition", `attachment; filename=${filename || "report"}.xlsx`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate report" });
  }
}
