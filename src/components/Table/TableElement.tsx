import "./Table.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";

type TableElementProps = {
  tradePair: string;
  entryPrice: number;
  currentPrice: number;
  amountInDollars: number;
  isLast?: boolean;
};

const TableElement = ({
  tradePair,
  entryPrice,
  currentPrice,
  amountInDollars,
  isLast = false,
}: TableElementProps) => {
  const percentage: number = ((currentPrice - entryPrice) / entryPrice) * 100;
  const profitOrLossInDollars: number = (percentage * amountInDollars) / 100;
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
          <p>{amountInDollars} $</p>
          <p
            className={
              percentage > 0 ? "green-light" : percentage < 0 ? "coral" : ""
            }
          >
            {percentage > 0 ? "+" : ""}
            {profitOrLossInDollars.toFixed(2).replace("-", "–")} $ (
            {percentage.toFixed(2).replace("-", "–")} %)
          </p>
        </div>
				<ButtonWithIcon className="coral-light-bg" text="Закрыть"/>
      </div>
    </div>
  );
};

export default TableElement;
