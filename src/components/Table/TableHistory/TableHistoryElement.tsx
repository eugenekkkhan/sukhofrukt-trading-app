
type HistoryDataType = {
	amount: number,
	cost: number,
	fix: number,
	positionCreateTime: number,
	side: string,
	symbol: string,
	userId: number
}

const TableHistoryElement = (
	{ amount, cost, fix, positionCreateTime, side, symbol, isLast = false }: HistoryDataType & { isLast?: boolean }
) => {
  return (
		<div className={isLast ? "flex-row justify-between table-element-padding" :
			"flex-row justify-between table-element-padding table-element-bottom-border"
		}>
			<p>{symbol}</p>
			<div className="flex-row table-element-gap">
				<div className="text-right text-small">
					<p>{cost.toFixed(2)} $ {new Date(positionCreateTime).toLocaleDateString()}</p>
					<p
						className={
							side === "LONG" ? "green-light" : side === "SHORT" ? "coral" : ""
						}
					>
						{side === "LONG" ? "+" : ""}
						{amount.toFixed(2).replace("-", "–")} $ ({fix.toFixed(2).replace("-", "–")} %)
					</p>
				</div>
			</div>
		</div>
  )
}

export type { HistoryDataType }
export default TableHistoryElement