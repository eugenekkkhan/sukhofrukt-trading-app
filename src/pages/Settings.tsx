import TableSettingsComponent from "../components/Table/TableSettings/TableSettingsComponent";
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
