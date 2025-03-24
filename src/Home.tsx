import "./layout.css";
import PanelWithInfo from "./components/PanelWithInfo/PanelWithInfo";
import TableComponent from "./components/Table/TableComponent";
import { RxDashboard } from "react-icons/rx";

function Home() {
  return (
    <>
      <div className="flex-column basic-block bottom-border">
        <div className="flex-row">
          <div className="rotate" style={{height:'48px', width:'48px'}}>
            <RxDashboard size={48}/>
          </div>
          <h1>Dashboard</h1>
        </div>
        <p className="bold">Баланс:</p>
        <div className="flex-row">
          <p className="light">2000.00 $</p>
          <PanelWithInfo text={"+13.12 $ за сегодня"} color={"green"} />
          <PanelWithInfo text={"–14.88 $ не реализовано"} color={"coral"} />
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
