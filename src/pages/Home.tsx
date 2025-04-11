import "../layout.css";
import PanelWithInfo from "../components/PanelWithInfo/PanelWithInfo";
import { RxDashboard } from "react-icons/rx";
import { useEffect, useState } from "react";
import TablePositionComponent from "../components/Table/TablePosition/TablePositionComponent";
import { closePosition } from "../postQueries";
import { getCookie } from "../utils";

type socketMessageType = {
  accountEquity: number;
  unrealizedPL: number;
  today: number;
};

function Home() {
  const [message, setMessage] = useState<socketMessageType | null>(null);

  useEffect(() => {
    const ws = new WebSocket(
      "wss://альпийские-тетерева.рф/ws?uid=844639124690",
    );

    ws.onmessage = (event: MessageEvent) => {
      setMessage(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  return (
    <>
      <div className="flex-column basic-block bottom-border">
        <div className="flex-row gap">
          <div className="rotate icon">
            <RxDashboard size="100%" />
          </div>
          <h1>Dashboard</h1>
        </div>
        <p className="bold">Баланс:</p>
        <div className="flex-row">
          <p className="light">
            {message?.accountEquity.toFixed(2).replace("-", "–") ?? 0} $
          </p>
          <PanelWithInfo
            text={`${message?.today.toFixed(2).replace("-", "–") ?? 0} $ за сегодня`}
            color={
              message?.today && message?.today > 0
                ? "green"
                : message?.today && message?.today < 0
                  ? "coral"
                  : "gray"
            }
          />
          <PanelWithInfo
            text={`${message?.unrealizedPL.toFixed(2).replace("-", "–") ?? 0} $ не реализовано`}
            color={
              message?.unrealizedPL && message?.unrealizedPL > 0
                ? "green"
                : message?.unrealizedPL && message?.unrealizedPL < 0
                  ? "coral"
                  : "gray"
            }
          />
        </div>
      </div>
      <div className="flex-column basic-block bottom-border">
        <h3>АКТИВНЫЕ ПОЗИЦИИ</h3>
        <TablePositionComponent />
      </div>
    </>
  );
}

export default Home;
