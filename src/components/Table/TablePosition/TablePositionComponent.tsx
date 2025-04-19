import { useEffect, useState } from "react";
import TablePositionElement from "./TablePositionElement";
import { fetchPositions } from "../../../getQueries";
import { getCookie } from "../../../utils";
import Loading from "../../Loading/Loading";

type Position = {
  amount: number;
  percentage: number;
  side: string;
  symbol: string;
  unrealizedPL: number;
  usdtEquity: number;
  cTimestamp: number;
};

const deleteElementFromTable = (
  element: Position,
  array: Position[],
  setArray: React.Dispatch<React.SetStateAction<Position[]>>,
) => {
  setArray(array.filter((value) => element.symbol !== value.symbol));
};

const TablePositionComponent = () => {

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

  return (
    <div className="table">
      {isFetched ? (
        fetchedData.map((value, index) => (
          <TablePositionElement
            key={index}
            tradePair={value.symbol}
            currentAmountInDollars={value.usdtEquity}
            unrealizedPL={value.unrealizedPL}
            amountOfCoins={value.amount}
            percentage={value.percentage}
            isLast={
              index === fetchedData.length - 1 || fetchedData.length !== 1
            }
            delFunc={() =>
              deleteElementFromTable(value, fetchedData, setFetchedData)
            }
          />
        ))
      ) : (
        <div className="table-element-padding">
          <Loading width="100%" height="100%" />
        </div>
      )}
      {isFetched && fetchedData.length === 0 ? (
        <div
          className="gray"
          style={{ display: "flex", justifyContent: "center", padding: "16px" }}
        >
          Нет открытых позиций
        </div>
      ) : null}
    </div>
  );
};

export default TablePositionComponent;
