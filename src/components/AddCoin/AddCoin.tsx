import { useState } from "react";
import { RiCloseLargeFill, RiAddLargeFill } from "react-icons/ri";
import "./AddCoin.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { MdOutlineReplay } from "react-icons/md";
import "../../index.css";
import TextInput from "../TextInput/TextInput";
import {
  initStrings,
  returnStringWithFirstFloatingPoint,
  saveCoinValue,
} from "../Table/TableSettings/TSEFuncs";

const AddCoin = ({ coinId, id }: { coinId: number; id: string }) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [valuesOfInputs, setValuesOfInputs] = useState({
    name: "",
    equity: "",
    fixOn25: "",
    fixOn50: "",
    fixOn75: "",
    fixOn100: "",
    stopLossOn25: false,
    stopLossOn50: false,
    stopLossOn75: false,
    stopLossOn100: false,
  });

  const canItBeSaved = () => {
    return (
      Object.values(valuesOfInputs)
        .slice(2, 6) // Only get the fix values, excluding stopLoss booleans
        .every((value) => !value || (typeof value === 'string' && parseFloat(value) < 1)) &&
      valuesOfInputs.equity.length > 0 &&
      valuesOfInputs.name.length > 0
    );
  };

  return (
    <div className="parent">
      <div className={isAdding ? "window adding-window" : "window"}>
        <div className="flex-column gap">
          <p className="bold">Добавление монеты</p>
          <p>Название монеты:</p>
          <TextInput
            value={valuesOfInputs.name}
            onChange={(e) =>
              setValuesOfInputs({
                ...valuesOfInputs,
                name: e.target.value
                  .toUpperCase()
                  .split("")
                  .filter((value) =>
                    "QWERTYUIOPASDFGHJKLZXCVBNM".includes(value),
                  )
                  .join(""),
              })
            }
          />
          <p>На сколько купить:</p>
          <TextInput
            value={valuesOfInputs.equity}
            onChange={(e) =>
              setValuesOfInputs({
                ...valuesOfInputs,
                equity: returnStringWithFirstFloatingPoint(
                  e.target.value
                    .split("")
                    .filter((value) => "0123456789.".includes(value))
                    .join(""),
                ),
              })
            }
          />
          <p>Фиксирование:</p>
          <div className="flex-row gap align-center">
            <p>25%</p>
            <TextInput
              value={valuesOfInputs.fixOn25}
              onChange={(e) =>
                setValuesOfInputs({
                  ...valuesOfInputs,
                  fixOn25: returnStringWithFirstFloatingPoint(
                    e.target.value
                      .split("")
                      .filter((value) => "0123456789.".includes(value))
                      .join(""),
                  ),
                })
              }
            />
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={valuesOfInputs.stopLossOn25}
                onChange={e => setValuesOfInputs(v => ({ ...v, stopLossOn25: e.target.checked }))}
              />
              <span className="checkmark"></span>
            </label>
            <span className="checkbox-label-text">безубыток</span>
          </div>
          <div className="flex-row gap align-center">
            <p>50%</p>
            <TextInput
              value={valuesOfInputs.fixOn50}
              onChange={(e) =>
                setValuesOfInputs({
                  ...valuesOfInputs,
                  fixOn50: returnStringWithFirstFloatingPoint(
                    e.target.value
                      .split("")
                      .filter((value) => "0123456789.".includes(value))
                      .join(""),
                  ),
                })
              }
            />
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={valuesOfInputs.stopLossOn50}
                onChange={e => setValuesOfInputs(v => ({ ...v, stopLossOn50: e.target.checked }))}
              />
              <span className="checkmark"></span>
            </label>
            <span className="checkbox-label-text">безубыток</span>
          </div>
          <div className="flex-row gap align-center">
            <p>75%</p>
            <TextInput
              value={valuesOfInputs.fixOn75}
              onChange={(e) =>
                setValuesOfInputs({
                  ...valuesOfInputs,
                  fixOn75: returnStringWithFirstFloatingPoint(
                    e.target.value
                      .split("")
                      .filter((value) => "0123456789.".includes(value))
                      .join(""),
                  ),
                })
              }
            />
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={valuesOfInputs.stopLossOn75}
                onChange={e => setValuesOfInputs(v => ({ ...v, stopLossOn75: e.target.checked }))}
              />
              <span className="checkmark"></span>
            </label>
            <span className="checkbox-label-text">безубыток</span>
          </div>
          <div className="flex-row gap align-center">
            <p>100%</p>
            <TextInput
              value={valuesOfInputs.fixOn100}
              onChange={(e) =>
                setValuesOfInputs({
                  ...valuesOfInputs,
                  fixOn100: returnStringWithFirstFloatingPoint(
                    e.target.value
                      .split("")
                      .filter((value) => "0123456789.".includes(value))
                      .join(""),
                  ),
                })
              }
            />
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={valuesOfInputs.stopLossOn100}
                onChange={e => setValuesOfInputs(v => ({ ...v, stopLossOn100: e.target.checked }))}
              />
              <span className="checkmark"></span>
            </label>
            <span className="checkbox-label-text">безубыток</span>
          </div>
          <p className="gray">Вводимое значение – дробное число от 0 до 1</p>
          <div className="flex-row gap">
            {Object.values(valuesOfInputs).join("").length > 0 ? (
              <ButtonWithIcon
                text="Сброс"
                Icon={MdOutlineReplay}
                className="coral-light-bg"
                onClick={() => {
                  setValuesOfInputs({
                    name: "",
                    equity: "",
                    fixOn25: "",
                    fixOn50: "",
                    fixOn75: "",
                    fixOn100: "",
                    stopLossOn25: false,
                    stopLossOn50: false,
                    stopLossOn75: false,
                    stopLossOn100: false,
                  });
                }}
              />
            ) : null}
            {canItBeSaved() ? (
              <ButtonWithIcon
                text={"Добавить"}
                Icon={RiAddLargeFill}
                onClick={() => {
                  saveCoinValue(
                    [
                      valuesOfInputs.equity,
                      valuesOfInputs.fixOn25,
                      valuesOfInputs.fixOn50,
                      valuesOfInputs.fixOn75,
                      valuesOfInputs.fixOn100,
                    ] as initStrings,
                    0,
                    valuesOfInputs.name,
                    coinId,
                    id ?? undefined,
                    [
                      valuesOfInputs.stopLossOn25,
                      valuesOfInputs.stopLossOn50,
                      valuesOfInputs.stopLossOn75,
                      valuesOfInputs.stopLossOn100,
                    ]
                  )?.then(() => window.location.reload());
                }}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className="add-coin-wrapper">
        <div
          className={isAdding ? "add-coin adding-coin" : "add-coin"}
          onClick={() => setIsAdding((prev) => !prev)}
        >
          <RiCloseLargeFill />
        </div>
      </div>
    </div>
  );
};

export default AddCoin;
