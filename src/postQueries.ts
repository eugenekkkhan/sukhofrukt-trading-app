import axios from "axios";

const apiUrl = "api/v1/";

type WorkingSideType = "OL" | "OS" | "ALL";
type TimeFrameType = "H" | "M";

const changeOptions = async (
  id: number,
  workingSide: WorkingSideType,
  timeFrame: TimeFrameType,
) => {
  return await axios.post(
    import.meta.env.VITE_BASE_URL + apiUrl + "private/changeOptions",
    {
      id: id,
      timeFrame: timeFrame.toString(),
      workingSide: workingSide.toString(),
    },

    {
      params: {
        id: id,
      },
    },
  );
};

const closePosition = async (id: number, symbol: string) => {
  return await axios.post(
    import.meta.env.VITE_BASE_URL + apiUrl + "private/closePosition",
    {
      id: id,
      symbol: symbol,
    },

    {
      params: {
        id: id,
      },
    },
  );
};

const updateCoinValue = async (
  equity: number,
  fixOn25: number,
  fixOn50: number,
  fixOn75: number,
  fixOn100: number,
  amount: number,
  symbol: string,
  coinId: number,
  id: number,
  stopLossOn25: boolean,
  stopLossOn50: boolean,
  stopLossOn75: boolean,
  stopLossOn100: boolean,
) => {
  const body = {
    amount: amount,
    equity: equity,
    exchange: "",
    fixOn100: fixOn100,
    fixOn25: fixOn25,
    fixOn50: fixOn50,
    fixOn75: fixOn75,
    id: coinId,
    uid: id,
    symbol: symbol,
    stopLossOn25: stopLossOn25,
    stopLossOn50: stopLossOn50,
    stopLossOn75: stopLossOn75,
    stopLossOn100: stopLossOn100,
  };

  return await axios.post(
    import.meta.env.VITE_BASE_URL + apiUrl + "private/updateCoinValue",
    body,
    {
      params: {
        id: id,
      },
    },
  );
};

const removeCoinValue = async (id: number, symbol: string) => {
  return await axios.post(
    import.meta.env.VITE_BASE_URL + apiUrl + "private/removeCoinValue",
    {
      id: id,
      symbol: symbol,
    },
    {
      params: {
        id: id,
      },
    },
  );
};

export type { WorkingSideType, TimeFrameType };
export { changeOptions, closePosition, updateCoinValue, removeCoinValue };
