import "./Table.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";

type TablePositionElementProps = {
  // entryPrice: number;
  // currentPrice: number;
  // amountInDollars: number;
  tradePair: string;
  unrealizedPL: number;
  currentAmountInDollars: number;
  amountOfCoins: number;
  whenOpened?: number;
  percentage?: number;
  isLast?: boolean;
};

// tradePair={value.symbol}
// entryPrice={value.usdtEquity}
// currentPrice={value.unrealizedPL}
// amountInDollars={value.amount}

const TablePositionElement = ({
  tradePair,
  currentAmountInDollars,
  unrealizedPL,
  amountOfCoins,
  whenOpened,
  percentage = (unrealizedPL / (currentAmountInDollars-unrealizedPL)) * 100,
  isLast = false,
}: TablePositionElementProps) => {
  const timeOpened = whenOpened ? new Date(whenOpened) : null;
  return (
    <div
      className={
        !isLast
          ? "flex-row justify-between table-element-padding table-element-bottom-border "
          : "flex-row justify-between table-element-padding"
      }
    >
      <p>{tradePair}</p>
      <div className="flex-row table-element-gap">
        <div className="text-right text-small">
          <p>{currentAmountInDollars.toFixed(2)} $ {timeOpened?.toLocaleDateString()}</p>
          <p
            className={
              percentage > 0 ? "green-light" : percentage < 0 ? "coral" : ""
            }
          >
            {percentage > 0 ? "+" : ""}
            {unrealizedPL.toFixed(2).replace("-", "–")} $ (
            {percentage.toFixed(2).replace("-", "–")} %)
          </p>
        </div>
        <ButtonWithIcon className="coral-light-bg" text="Закрыть" />
      </div>
    </div>
  );
};

export default TablePositionElement;
