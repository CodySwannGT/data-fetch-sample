import { json2csv } from "json-2-csv";
import { useEffect, useState } from "react";
import { CardStats } from "../DataTable/Row/DataTableRowView";

interface Props {
  data: CardStats[];
}

export default function CsvLinkContainer({ data }: Props) {
  const [csv, setCsv] = useState("");

  useEffect(() => {
    json2csv(data).then(setCsv);
  }, [data]);

  return (
    <a
      download="data.csv"
      href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`}
    >
      Download CSV
    </a>
  );
}
