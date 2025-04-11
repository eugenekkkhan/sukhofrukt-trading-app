import { useEffect, useState } from "react";
import { getCookie } from "../../../utils";
import "../Table.css";
import { fetchHistory } from "../../../getQueries";
import TableHistoryElement, { HistoryDataType } from "./TableHistoryElement";

type THCFetchedDataType = {
  amount: number;
  cost: number;
  fix: number;
  positionCreateTime: number;
  side: string;
  symbol: string;
  userId: number;
};

const TableHistoryComponent = () => {
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<THCFetchedDataType[]>([]);
  const id = getCookie("id");

  useEffect(() => {
    if (id && !isFetched) {
      fetchHistory(id).then((res) => {
        setFetchedData(res.data);
        console.log(res.data);
        setIsFetched(true);
      });
    }
  });
  return (
    <div>
      <div className="table">
        {fetchedData.map((value, index) => (
          <TableHistoryElement
            key={index}
            amount={value.amount}
            cost={value.cost}
            fix={value.fix}
            positionCreateTime={value.positionCreateTime}
            side={value.side}
            symbol={value.symbol}
            userId={value.userId}
            isLast={index === fetchedData.length - 1}
          />
        ))}
        {fetchedData.length === 0 ? "Нет ничего" : null}
      </div>
    </div>
  );
};

export default TableHistoryComponent;
