import { useState, useEffect } from "react";
import { fetchPositions, getAllCoinValues } from "../../../getQueries";
import { getCookie } from "../../../utils";
import TableSettingsElement from "./TableSettingsElement";
import Loading from "../../Loading/Loading";

type TSCFetchedDataType = {
  Amount: number;
  Equity: number;
  Exchange: string;
  Symbol: string;
  Uid: number;
  fixOn25: number;
  fixOn50: number;
  fixOn75: number;
  fixOn100: number;
  id: number;
};

const deleteElementFromTable = (
  element: TSCFetchedDataType,
  array: TSCFetchedDataType[],
  setArray: React.Dispatch<React.SetStateAction<TSCFetchedDataType[]>>,
) => {
  setArray(array.filter((value) => element.id !== value.id));
};

const TableSettingsComponent = () => {
  const [fetchedData, setFetchedData] = useState<TSCFetchedDataType[]>([]);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    const id = getCookie("id");
    if (id && !isFetched) {
      getAllCoinValues(id).then((res) => {
        setFetchedData(res.data);
        console.log(res.data);
        setIsFetched(true);
      });
    }
  });

  return (
    <div className="table">
      {isFetched ? (
        fetchedData.map((value, index) => (
          <TableSettingsElement
            key={value.id}
            tradePair={value.Symbol}
            initValues={[
              value.Equity,
              value.fixOn25,
              value.fixOn50,
              value.fixOn75,
              value.fixOn100,
            ]}
            coinId={value.id}
            amount={value.Amount}
            delFunc={() =>
              deleteElementFromTable(value, fetchedData, setFetchedData)
            }
            isLast={index === fetchedData.length - 1}
          />
        ))
      ) : (
        <div className="table-element-padding">
          <Loading width="100%" height="100%" />
        </div>
      )}
    </div>
  );
};

export default TableSettingsComponent;
