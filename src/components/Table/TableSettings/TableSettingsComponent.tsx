import { useState, useEffect } from "react";
import { getAllCoinValues } from "../../../getQueries";
import { getCookie } from "../../../utils";
import TableSettingsElement from "./TableSettingsElement";
import Loading from "../../Loading/Loading";
import AddCoin from "../../AddCoin/AddCoin";

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
  stopLossOn25: boolean;
  stopLossOn50: boolean;
  stopLossOn75: boolean;
  stopLossOn100: boolean;
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
  const [breakEvenValuesArr, setBreakEvenValuesArr] = useState<boolean[][]>([]);
  const id = getCookie("id");

  useEffect(() => {
    if (id && !isFetched) {
      getAllCoinValues(id).then((res) => {
        setFetchedData(res.data);
        setBreakEvenValuesArr(
          res.data.map((coin: TSCFetchedDataType & {
            stopLossOn25: boolean;
            stopLossOn50: boolean;
            stopLossOn75: boolean;
            stopLossOn100: boolean;
          }) => [
            coin.stopLossOn25,
            coin.stopLossOn50,
            coin.stopLossOn75,
            coin.stopLossOn100,
          ])
        );
        setIsFetched(true);
      });
    }
  }, [id, isFetched]);

  return (
    <>
      <div className="flex-row justify-between">
        <h3>МОНЕТЫ</h3>
        <AddCoin
          coinId={Math.max(...fetchedData.map((value) => value.id)) + 1}
          id={id ? id : ""}
        />
      </div>
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
              initialBreakEvenValues={breakEvenValuesArr[index] || [false, false, false, false]}
            />
          ))
        ) : (
          <div className="table-element-padding">
            <Loading width="100%" height="100%" />
          </div>
        )}
      </div>
    </>
  );
};

export default TableSettingsComponent;
