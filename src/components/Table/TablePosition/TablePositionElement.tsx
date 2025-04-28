import "../Table.css";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import { closePosition } from "../../../postQueries";
import { getCookie } from "../../../utils";

type TablePositionElementProps = {
  // entryPrice: number;
  // currentPrice: number;
  // amountInDollars: number;
  tradePair: string;
  side: string;
  unrealizedPL: number;
  currentAmountInDollars: number;
  delFunc: () => void;
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
  side,
  whenOpened,
  delFunc,
  percentage = (unrealizedPL / (currentAmountInDollars - unrealizedPL)) * 100,
  isLast = false,
}: TablePositionElementProps) => {
  const timeOpened = whenOpened ? new Date(whenOpened) : null;
  const id = getCookie("id");

  const closePositionFunction = () => {
    if (id && parseInt(id))
      closePosition(parseInt(id), tradePair).then(() => {
        delFunc();
      });
  };

  return (
    <div
      className={
        !isLast
          ? "flex-row justify-between table-element-padding table-element-bottom-border "
          : "flex-row justify-between table-element-padding"
      }
    >
      <div>
      <p>{tradePair}</p>
      <p className={side === "long" ? "green" : side === "short" ? "red" : ""}>{side}</p>
      </div>
      
      <div className="flex-row table-element-gap">
        <div className="text-right text-small">
          <p>
            {currentAmountInDollars.toFixed(2)} ${" "}
            {timeOpened?.toLocaleDateString()}
          </p>
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
        <ButtonWithIcon
          className="coral-light-bg"
          text="Закрыть"
          onClick={closePositionFunction}
        />
      </div>
    </div>
  );
};

export default TablePositionElement;
