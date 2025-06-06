import { ChangeEvent, useState } from "react";
import "../Table.css";
import ButtonWithIcon from "../../Buttons/ButtonWithIcon";
import { RiDeleteBinLine, RiEditLine, RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineReplay, MdSave } from "react-icons/md";
import TextInput from "../../TextInput/TextInput";
import { getCookie, validateStringToNumber } from "../../../utils";
import {
  canItBeSaved,
  initStrings,
  isChoiceInitial,
  resetValues,
  returnStringWithFirstFloatingPoint,
  saveCoinValue,
  TableSettingsElementProps,
} from "./TSEFuncs";
import { removeCoinValue } from "../../../postQueries";
//
const TableSettingsElement = ({
  tradePair,
  initValues,
  isLast,
  coinId,
  amount,
  delFunc,
}: TableSettingsElementProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const choices = new Array<
    [string, React.Dispatch<React.SetStateAction<string>>]
  >(5);
  const [valuesOfInputs, setValuesOfInputs]: [
    string[],
    React.Dispatch<React.SetStateAction<string>>[],
  ] = [[], []];

  // Add state for checkboxes
  const [breakEvenChecks, setBreakEvenChecks] = useState<boolean[]>([false, false, false, false]);

  for (let i = 0; i < 5; i++) {
    choices[i] = useState<string>(initValues[i].toString());
    valuesOfInputs[i] = choices[i][0];
    setValuesOfInputs[i] = choices[i][1];
  }

  const id = getCookie("id");

  return (
    <div
      className={
        !isLast
          ? "table-element-bottom-border table-element-padding"
          : "table-element-padding"
      }
    >
      <style>
        {`
          .custom-checkbox {
            position: relative;
            padding-left: 25px;
            cursor: pointer;
            user-select: none;
          }
          
          .custom-checkbox input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }
          
          .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 18px;
            width: 18px;
            background-color: #fff;
            border: 2px solid #ccc;
            border-radius: 4px;
            transition: all 0.2s ease;
          }
          
          .custom-checkbox:hover input ~ .checkmark {
            border-color: #666;
          }
          
          .custom-checkbox input:checked ~ .checkmark {
            background-color: #4CAF50;
            border-color: #4CAF50;
          }
          
          .checkmark:after {
            content: "";
            position: absolute;
            display: none;
            left: 5px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
          
          .custom-checkbox input:checked ~ .checkmark:after {
            display: block;
          }
        `}
      </style>
      <div className={"flex-row justify-between"}>
        <p className={isEditing ? "medium" : ""}>{tradePair}</p>
        <div className="flex-row table-element-gap">
          <ButtonWithIcon
            className="green-light-bg"
            Icon={!isEditing ? RiEditLine : RiCloseLargeFill}
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
          />
          <ButtonWithIcon
            className="coral-light-bg"
            Icon={RiDeleteBinLine}
            onClick={() => {
              if (id && parseInt(id)) {
                removeCoinValue(parseInt(id), tradePair).then(() => {
                  delFunc();
                });
              }
            }}
          />
        </div>
      </div>
      {isEditing ? (
        <div>
          <div className="flex-row gap flex-wrap pt-8">
            <p>На сколько закупать: </p>
            <TextInput
              style={{ width: "180px" }}
              value={valuesOfInputs[0]}
              id={""}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValuesOfInputs[0](
                  returnStringWithFirstFloatingPoint(
                    event.target.value
                      .replace(",", ".")
                      .split("")
                      .filter((char) => {
                        return "0123456789.".includes(char) ? char : null;
                      })
                      .join(""),
                  ),
                );
              }}
              color={
                validateStringToNumber(valuesOfInputs[0]) !== false
                  ? ""
                  : "coral coral-border"
              }
            />
          </div>
          <div
            className="fixes-group"
            style={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "16px" }}
          >
            {valuesOfInputs.slice(1).map((value, index) => (
              <div
                className="fixes-item flex-column gap"
                key={index}
                style={{ flex: 1, minWidth: 0, alignItems: "center", display: "flex" }}
              >
                <div className="flex-row gap" style={{ width: "100%", justifyContent: "center" }}>
                  <p>Фикс. {(index + 1) * 25}%</p>
                  <TextInput
                    style={{ width: "60px" }}
                    value={value}
                    id={""}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setValuesOfInputs[index + 1](
                        returnStringWithFirstFloatingPoint(
                          event.target.value
                            .replace(",", ".")
                            .split("")
                            .filter((char) => {
                              return "0123456789.".includes(char) ? true : false;
                            })
                            .join(""),
                        ),
                      );
                    }}
                    color={
                      validateStringToNumber(value) !== false &&
                      parseFloat(value) <= 1
                        ? ""
                        : "coral coral-border"
                    }
                  />
                </div>
                <div className="flex-row gap align-center" style={{ width: "100%", justifyContent: "center" }}>
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={breakEvenChecks[index]}
                      onChange={(e) => {
                        const newChecks = [...breakEvenChecks];
                        newChecks[index] = e.target.checked;
                        setBreakEvenChecks(newChecks);
                      }}
                    />
                    <span className="checkmark"></span>
                    <p>безубыток</p>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <p className="gray pt-8">
            Вводимое значение – дробное число от 0 до 1
          </p>
          <div
            className="flex-row justify-end table-element-gap"
            style={{
              paddingTop: !isChoiceInitial(choices, initValues) ? "8px" : "0px",
            }}
          >
            {!isChoiceInitial(choices, initValues) ? (
              <ButtonWithIcon
                text="Сброс"
                Icon={MdOutlineReplay}
                className="coral-light-bg"
                onClick={() => resetValues(setValuesOfInputs, initValues)}
              />
            ) : null}
            {!isChoiceInitial(choices, initValues) &&
            canItBeSaved(valuesOfInputs) ? (
              <ButtonWithIcon
                text="Сохранить"
                Icon={MdSave}
                onClick={() =>
                  saveCoinValue(
                    valuesOfInputs as initStrings,
                    amount,
                    tradePair,
                    coinId,
                    id ?? undefined,
                  )
                }
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TableSettingsElement;
