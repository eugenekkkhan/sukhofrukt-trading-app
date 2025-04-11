type HistoryDataType = {
  amount: number;
  cost: number;
  fix: number;
  positionCreateTime: number;
  side: string;
  symbol: string;
  userId: number;
};

const TableHistoryElement = ({
  amount,
  cost,
  fix,
  positionCreateTime,
  side,
  symbol,
  isLast = false,
}: HistoryDataType & { isLast?: boolean }) => {
  const timeOpened = positionCreateTime
    ? new Date(positionCreateTime * 1000)
    : null;
  return (
    <div
      className={
        isLast
          ? "flex-row justify-between table-element-padding"
          : "flex-row justify-between table-element-padding table-element-bottom-border"
      }
    >
      <p>{symbol}</p>
      <div className="flex-row table-element-gap">
        <div className="text-right text-small">
          <p>
            {cost.toFixed(2)} $, {amount.toFixed(2)}{" "}
            {symbol.slice(0, symbol.length - 4)} (
            {fix.toFixed(2).replace("-", "–")} %)
          </p>
          <p>{timeOpened?.toLocaleString()}</p>
          <p
            className={
              side === "buy" ? "green-light" : side === "sell" ? "coral" : ""
            }
          >
            {side === "buy" ? "Покупка" : side === "sell" ? "Продажа" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export type { HistoryDataType };
export default TableHistoryElement;
