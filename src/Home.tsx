import "./layout.css";
import PanelWithInfo from "./components/PanelWithInfo/PanelWithInfo";
import TableComponent from "./components/Table/TableComponent";
import { RxDashboard } from "react-icons/rx";
// import socket from "./socket";
import { useEffect, useState } from "react";
import { headers } from "next/headers";

type socketMessageType = {
  accountEquity: number;
  unrealizedPL: number;
  today: number;
};

function Home() {
  const [message, setMessage] = useState<socketMessageType | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://альпийские-тетерева.рф/ws?uid=844639124690");

    ws.onmessage = (event: MessageEvent) => {
      setMessage(JSON.parse(event.data));
    };

    return () => ws.close();
  }, []);

  return (
    <>
      <div className="flex-column basic-block bottom-border">
        <div className="flex-row">
          <div className="rotate" style={{ height: "48px", width: "48px" }}>
            <RxDashboard size={48} />
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
        <TableComponent />
      </div>
    </>
  );
}

export default Home;
