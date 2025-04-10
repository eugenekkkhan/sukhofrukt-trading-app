import { useState, useEffect } from "react";
import { fetchPositions, getAllCoinValues } from "../../../getQueries";
import { getCookie } from "../../../utils";
import TableSettingsElement from "./TableSettingsElement";
import Loading from "../../Loading/Loading";

const TableSettingsComponent = () => {
  const data = {
    BTCUSDT: { entryPrice: 85000, currentPrice: 90000, amountInDollars: 1012 },
    ETHUSDT: { entryPrice: 3000, currentPrice: 3500, amountInDollars: 492 },
    LTCUSDT: { entryPrice: 150, currentPrice: 200, amountInDollars: 230 },
    XMRUSDT: { entryPrice: 200, currentPrice: 250, amountInDollars: 100 },
    XRPUSDT: { entryPrice: 1, currentPrice: 1.2, amountInDollars: 300 },
    ADAUSDT: { entryPrice: 1.5, currentPrice: 2, amountInDollars: 450 },
    DOTUSDT: { entryPrice: 25, currentPrice: 30, amountInDollars: 600 },
    SOLUSDT: { entryPrice: 100, currentPrice: 120, amountInDollars: 720 },
    DOGEUSDT: { entryPrice: 0.3, currentPrice: 0.4, amountInDollars: 800 },
    AVAXUSDT: { entryPrice: 50, currentPrice: 60, amountInDollars: 900 },
    BNBUSDT: { entryPrice: 400, currentPrice: 150, amountInDollars: 1100 },
    UNIUSDT: { entryPrice: 20, currentPrice: 25, amountInDollars: 500 },
    LINKUSDT: { entryPrice: 30, currentPrice: 35, amountInDollars: 700 },
    THETAUSDT: { entryPrice: 6, currentPrice: 7, amountInDollars: 300 },
    TRXUSDT: { entryPrice: 0.08, currentPrice: 0.1, amountInDollars: 400 },
    FTTUSDT: { entryPrice: 50, currentPrice: 55, amountInDollars: 600 },
    ATOMUSDT: { entryPrice: 20, currentPrice: 22, amountInDollars: 450 },
    VETUSDT: { entryPrice: 0.1, currentPrice: 0.12, amountInDollars: 350 },
    ICPUSDT: { entryPrice: 40, currentPrice: 35, amountInDollars: 500 },
    AXSUSDT: { entryPrice: 60, currentPrice: 70, amountInDollars: 550 },
    NEOUSDT: { entryPrice: 50, currentPrice: 55, amountInDollars: 600 },
    KSMUSDT: { entryPrice: 300, currentPrice: 350, amountInDollars: 700 },
    ALGOUSDT: { entryPrice: 1, currentPrice: 1.2, amountInDollars: 400 },
    MATICUSDT: { entryPrice: 1.5, currentPrice: 1.8, amountInDollars: 450 },
    CAKEUSDT: { entryPrice: 15, currentPrice: 18, amountInDollars: 500 },
    XTZUSDT: { entryPrice: 4, currentPrice: 5, amountInDollars: 300 },
    MKRUSDT: { entryPrice: 2000, currentPrice: 2200, amountInDollars: 1000 },
    ENJUSDT: { entryPrice: 1.5, currentPrice: 2, amountInDollars: 450 },
    SUSHIUSDT: { entryPrice: 10, currentPrice: 12, amountInDollars: 500 },
  };

  const objKeys = Object.keys(data);
  const objValues = Object.values(data);

  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const id = getCookie("id");
    if (id && !isFetched) {
      getAllCoinValues(id)
        .then((res) => {
          setFetchedData(res.data);
          console.log(res.data)
          setIsFetched(true);
        })
    }
  });


  return (
    <div className="table">
      {isFetched ? fetchedData.map((value, index) => (
        <TableSettingsElement
          key={value.id}
          tradePair={value.Symbol}
          initValues={[value.Equity, value.fixOn25, value.fixOn50, value.fixOn75, value.fixOn100]}
          uid={value.Uid}
          amount={value.Amount}
          isLast={index === fetchedData.length - 1}
        />
      )) : 
      <div className="table-element-padding">
        <Loading width="100%" height="100%" />
      </div>
      }
    </div>
  )
};

export default TableSettingsComponent;
