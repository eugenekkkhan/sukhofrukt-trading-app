import { useEffect, useState } from "react";
import TableElement from "./TableElement";
import { fetchPositions } from "../../getQueries";
import { getCookie } from "../../utils";

type Position = {
  amount: number;
  percentage: number;
  side: string;
  symbol: string;
  unrealizedPL: number;
  usdtEquity: number;
  cTimestamp: number;
};

const TableComponent = () => {
  const data = {
    BTCUSDT: { entryPrice: 85000, currentPrice: 90000, amountInDollars: 1012 },
    ETHUSDT: { entryPrice: 3000, currentPrice: 3500, amountInDollars: 492 },
    LTCUSDT: { entryPrice: 150, currentPrice: 200, amountInDollars: 230 },
  };

  const [fetchedData, setFetchedData] = useState<Position[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const id = getCookie("id");
    if (id && !isFetched) {
      fetchPositions(id)
        .then((res) => {
          setFetchedData(res.data);
          setIsFetched(true);
        })
        .catch(() => {
          /* error */
        });
    }
  });

  const objKeys = Object.keys(data);
  const objValues = Object.values(data);
  return (
    <div className="table">
      {fetchedData.map((value, index) => (
        <TableElement
          tradePair={value.symbol}
          entryPrice={value.usdtEquity}
          currentPrice={value.unrealizedPL}
          amountInDollars={value.amount}
          isLast={index === objKeys.length - 1 || objKeys.length !== 1}
        />
      ))}
    </div>
  );
};

export default TableComponent;
