import { useState } from "react";
import { SlSettings } from "react-icons/sl";
import SelectComponent from "./components/Select/SelectComponent";
import ButtonWithIcon from "./components/Buttons/ButtonWithIcon";
import { MdOutlineReplay, MdSave } from "react-icons/md";
import TableSettingsComponent from "./components/Table/TableSettingsComponent";
import AddCoin from "./components/AddCoin/AddCoin";

const Settings = () => {
  const opts = ["Only Long", "Only Short", "All"];
  const [choice, setChoice] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="flex-column basic-block bottom-border">
        <div className="flex-row">
          <div className="rotate" style={{ height: "48px", width: "48px" }}>
            <SlSettings size={48} />
          </div>
          <h1>Настройки</h1>
        </div>
        <p>Сторона, в которую работает бот:</p>
        <div className="flex-row" style={{ height: "30px" }}>
          <div style={{ width: "360px" }}>
            <SelectComponent
              options={opts}
              value={choice}
              setValue={setChoice}
            />
          </div>
          {choice !== undefined ? (
            <ButtonWithIcon
              text="Сброс"
              Icon={MdOutlineReplay}
              className="coral-light-bg"
              onClick={() => setChoice(undefined)}
            />
          ) : null}
          {choice !== undefined ? (
            <ButtonWithIcon text="Сохранить" Icon={MdSave} />
          ) : null}
        </div>
      </div>
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
