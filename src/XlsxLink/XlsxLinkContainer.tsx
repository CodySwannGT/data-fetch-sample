import { json2csv } from "json-2-csv";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { CardStats } from "../DataTable/Row/DataTableRowView";

interface Props {
  data: CardStats[];
}

export const convertXlsxToExcelBuffer = (xlsxString: string) => {
  const arrayOfArrayXlsx = xlsxString.split("\n").map((row: string) => {
    return row.split(",");
  });
  const wb = XLSX.utils.book_new();
  const newWs = XLSX.utils.aoa_to_sheet(arrayOfArrayXlsx);

  XLSX.utils.book_append_sheet(wb, newWs);
  return XLSX.write(wb, { type: "base64" });
};

export default function XlsxLinkContainer({ data }: Props) {
  const [xlsx, setXlsx] = useState("");

  useEffect(() => {
    json2csv(data).then(csvString =>
      setXlsx(convertXlsxToExcelBuffer(csvString))
    );
  }, [data]);

  return (
    <a
      download="data.xlsx"
      href={`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${xlsx}`}
    >
      Download XLSX
    </a>
  );
}
