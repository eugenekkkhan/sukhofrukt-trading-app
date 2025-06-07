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
  resetValues,
  returnStringWithFirstFloatingPoint,
  saveCoinValue,
} from "./TSEFuncs";
import { removeCoinValue } from "../../../postQueries";
import "./TableSettingsElement.css";
//
type TableSettingsElementProps = {
  tradePair: string;
  isLast: boolean;
  initValues: [number, number, number, number, number];
  coinId: number;
  amount: number;
  delFunc: () => void;
  initialBreakEvenValues: boolean[];
};

const TableSettingsElement = ({
  tradePair,
  initValues,
  isLast,
  coinId,
  amount,
  delFunc,
  initialBreakEvenValues,
}: TableSettingsElementProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const choices = new Array<
    [string, React.Dispatch<React.SetStateAction<string>>]
  >(5);
  const [valuesOfInputs, setValuesOfInputs]: [
    string[],
    React.Dispatch<React.SetStateAction<string>>[],
  ] = [[], []];

  for (let i = 0; i < 5; i++) {
    choices[i] = useState<string>(initValues[i].toString());
    valuesOfInputs[i] = choices[i][0];
    setValuesOfInputs[i] = choices[i][1];
  }

  const [breakEvenValues, setBreakEvenValues] = useState<boolean[]>(initialBreakEvenValues);

  const id = getCookie("id");

  // Проверка изменений хотя бы в одной из групп
  const isAllInitial = () => {
    const fixChanged = valuesOfInputs.some((v, i) => v !== initValues[i].toString());
    const stopChanged = breakEvenValues.some((v, i) => v !== initialBreakEvenValues[i]);
    return !(fixChanged || stopChanged);
  };

  // Сброс обеих групп
  const handleReset = () => {
    resetValues(setValuesOfInputs, initValues);
    setBreakEvenValues(initialBreakEvenValues);
  };

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
          >
            {valuesOfInputs.slice(1).map((value, index) => (
              <div
                className="fixes-item"
                key={index}
              >
                <div className="fixes-label-input">
                  <p>Фикс. {(index + 1) * 25}%</p>
                  <TextInput
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
                <div className="fixes-checkbox-row">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={breakEvenValues[index]}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setBreakEvenValues(prev => {
                          const updated = [...prev];
                          updated[index] = checked;
                          if (checked) {
                            for (let i = index + 1; i < updated.length; i++) {
                              updated[i] = true;
                            }
                          }
                          return updated;
                        });
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p className="checkbox-label-text">stop-loss</p>
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
              paddingTop: !isAllInitial() ? "8px" : "0px",
            }}
          >
            {!isAllInitial() ? (
              <ButtonWithIcon
                text="Сброс"
                Icon={MdOutlineReplay}
                className="coral-light-bg"
                onClick={handleReset}
              />
            ) : null}
            {!isAllInitial() && canItBeSaved(valuesOfInputs) ? (
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
                    breakEvenValues,
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
