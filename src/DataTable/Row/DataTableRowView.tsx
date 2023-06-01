import * as currencyFormatter from "currency-formatter";

export interface CardStats {
  cardName: string;
  averagePrice: number;
  lowerBound: number;
  upperBound: number;
  standardDeviation: number;
  peakPrice: number;
  peakPriceDate: string;
}

interface Props {
  item: CardStats;
}

export default function DataTableRowView({ item }: Props) {
  return (
    <tr>
      <td>{item.cardName}</td>
      <td>{currencyFormatter.format(item.averagePrice, { code: "USD" })}</td>
      <td>{currencyFormatter.format(item.lowerBound, { code: "USD" })}</td>
      <td>{currencyFormatter.format(item.upperBound, { code: "USD" })}</td>
      <td>{item.standardDeviation}</td>
      <td>
        {currencyFormatter.format(item.peakPrice, { code: "USD" })} (Day{" "}
        {item.peakPriceDate})
      </td>
    </tr>
  );
}
