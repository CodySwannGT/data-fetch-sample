import CsvLink from "../CsvLink";
import XlsxLink from "../XlsxLink";
import DataTableRow from "./Row";
import { CardStats } from "./Row/DataTableRowView";

interface Props {
  data: CardStats[];
}

export default function DataTableView({ data }: Props) {
  return (
    <div>
      <a
        download="data.json"
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
        )}`}
      >
        JSON
      </a>
      &nbsp;|&nbsp;
      <CsvLink data={data} />
      &nbsp;|&nbsp;
      <XlsxLink data={data} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Average Price</th>
            <th>Lower Bound</th>
            <th>Upper Bound</th>
            <th>Standard Deviation</th>
            <th>Peak Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <DataTableRow key={item.cardName} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
