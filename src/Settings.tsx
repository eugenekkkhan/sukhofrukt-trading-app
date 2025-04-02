import TableSettingsComponent from "./components/Table/TableSettingsComponent";
import AddCoin from "./components/AddCoin/AddCoin";
import { WorkingSideType } from "./postQueries";
import SelectorsInSettings from "./components/SelectorsInSettings/SelectorsInSettings";

const Settings = () => {

  return (
    <>
      <SelectorsInSettings />
      <div className="flex-column basic-block bottom-border">
        <div className="flex-row justify-between">
          <h3>МОНЕТЫ</h3>
          <AddCoin />
        </div>
        <TableSettingsComponent />
      </div>
    </>
  );
};

export default Settings;
