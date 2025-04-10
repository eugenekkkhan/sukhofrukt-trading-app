import { useEffect, useState } from 'react';
import { getCookie } from '../../../utils';
import '../Table.css'
import { fetchHistory } from '../../../getQueries';
import TableHistoryElement, { HistoryDataType } from './TableHistoryElement';


const TableHistoryComponent = () => {
  const hardCodeData: HistoryDataType[] = [
    {
      amount: -103,
      cost: 230,
      fix: 10,
      positionCreateTime: 0,
      side: 'SHORT',
      symbol: 'BTCUSDT',
      userId: 0
    },
    {
      amount: 0,
      cost: 0,
      fix: 0,
      positionCreateTime: 0,
      side: 'LONG',
      symbol: 'ETHUSDT',
      userId: 0
    }
  ]
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [fetchedData, setFetchedData] = useState<any[]>([])
  const id = getCookie('id');

  useEffect(() => {
    if (id && !isFetched) {
      fetchHistory(id)
        .then((res) => {
          setFetchedData(res.data);
          setIsFetched(true);
        })
    }
  })
  return (
    <div>
      <div className='table'>
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
          )
        )}
        {fetchedData.length === 0 ?
          "Нет ничего" :
          null
        }
      </div>
    </div>
  )
}

export default TableHistoryComponent