import { useEffect, useState } from "react";
import TablePositionElement from "./TablePositionElement";
import { fetchPositions } from "../../getQueries";
import { getCookie } from "../../utils";
import Loading from "../Loading/Loading";

type Position = {
  amount: number;
  percentage: number;
  side: string;
  symbol: string;
  unrealizedPL: number;
  usdtEquity: number;
  cTimestamp: number;
};

const TablePositionsComponent = () => {
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
      {/* {fetchedData.map((value)=>(<div>{Object.values(value).join('...')} {Object.keys(value).join('...')}</div>))} */}
      {isFetched ? fetchedData.map((value, index) => (
        <TablePositionElement
          key={index}
          tradePair={value.symbol}
          currentAmountInDollars={value.usdtEquity}
          unrealizedPL={value.unrealizedPL}
          amountOfCoins={value.amount}
          percentage={value.percentage}
          isLast={index === objKeys.length - 1 || objKeys.length !== 1}
        />
      )) :
      <div className="table-element-padding">
        <Loading width="100%" height="100%"/>
      </div>
      }
    </div>
  );
};

export default TablePositionsComponent;
