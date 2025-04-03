import { useEffect, useState } from 'react';
import { getCookie } from '../../../utils';
import '../Table.css'
import { fetchHistory } from '../../../getQueries';

type HistoryDataType = {
  amount: number,
  cost: number,
  fix: number,
  positionCreateTime: number,
  side: string,
  symbol: string,
  userId: number
}

const TableHistoryComponent = () => {
  const hardCodeData: HistoryDataType[] = [
    {
      amount: 100,
      cost: 230,
      fix: 1100,
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
          console.log(res.data)
          setFetchedData(res.data);
          setIsFetched(true);
        })
    }
  })
  return (
    <div>
      <p className='bold'>ИСТОРИЯ ПОЗИЦИЙ</p>
      <div className='table'>

      </div>
      {fetchedData.toString()}
    </div>
  )
}

export default TableHistoryComponent