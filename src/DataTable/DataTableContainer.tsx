import { useEffect, useState } from "react";
import DataTableView from "./DataTableView";
import { CardStats } from "./Row/DataTableRowView";

interface CardData {
  cardName: string;
  gradingCompany: string;
  grade: string;
  txnDate: string;
  pricingSource: string;
  price: string;
}

const calculateStats = (data: CardData[]): CardStats[] => {
  const groupedData = data.reduce(
    (acc: { [key: string]: CardData[] }, curr: CardData) => {
      const price = parseFloat(curr.price.replace(/[^0-9.-]+/g, ""));
      acc[curr.cardName] = acc[curr.cardName] || [];
      acc[curr.cardName].push({ ...curr, price: price.toString() });
      return acc;
    },
    {}
  );

  return Object.values(groupedData).map((group: CardData[]) => {
    const prices = group.map(item => item.price);
    const averagePrice =
      prices.reduce((a, b) => parseFloat(a.toString()) + parseFloat(b), 0) /
      prices.length;
    const lowerBound = Math.min(
      ...prices.map(item => parseFloat(item.toString()))
    );
    const upperBound = Math.max(
      ...prices.map(item => parseFloat(item.toString()))
    );
    const peakPriceData = group.reduce((a, b) => (a.price > b.price ? a : b));
    const peakPrice = parseFloat(peakPriceData.price);
    const peakPriceDate = peakPriceData.txnDate;
    const variance =
      prices.reduce(
        (a, b) => a + Math.pow(parseFloat(b) - averagePrice, 2),
        0
      ) / prices.length;
    const standardDeviation = Math.sqrt(variance);

    return {
      cardName: group[0].cardName,
      averagePrice,
      lowerBound,
      upperBound,
      standardDeviation,
      peakPrice,
      peakPriceDate,
    };
  });
};

export default function DataTableContainer() {
  const [data, setData] = useState<CardStats[]>([]);

  useEffect(() => {
    fetch("https://mocki.io/v1/70f45519-0232-463b-bd4f-88e9d7213d26")
      .then(response => response.json())
      .then(data => setData(calculateStats(data)));
  }, []);

  return <DataTableView data={data} />;
}
