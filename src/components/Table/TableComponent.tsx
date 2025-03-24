import TableElement from './TableElement'

const TableComponent = () => {
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
		SUSHIUSDT: { entryPrice: 10, currentPrice: 12, amountInDollars: 500 }
	}

	const objKeys = Object.keys(data);
	const objValues = Object.values(data);

  return (
    <div className='table'>
			{objKeys.map((value, index)=><TableElement tradePair={value} entryPrice={objValues[index].entryPrice} currentPrice={objValues[index].currentPrice} amountInDollars={objValues[index].amountInDollars} isLast={index === objKeys.length-1}/>)}
		</div>
  )
}

export default TableComponent