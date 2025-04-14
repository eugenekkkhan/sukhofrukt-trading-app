import TableSettingsComponent from "../components/Table/TableSettings/TableSettingsComponent";
import AddCoin from "../components/AddCoin/AddCoin";
import SelectorsInSettings from "../components/SelectorsInSettings/SelectorsInSettings";

const Settings = () => {
  return (
    <>
      <SelectorsInSettings />
      <div className="flex-column basic-block bottom-border">
        <TableSettingsComponent />
      </div>
    </>
  );
};

export default Settings;
