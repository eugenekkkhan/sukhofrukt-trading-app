import { ChangeEvent, useState } from "react";
import "./Table.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { RiDeleteBinLine, RiEditLine, RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineReplay, MdSave } from "react-icons/md";
import TextInput from "../TextInput/TextInput";
import { validateStringToNumber } from "../../utils";

const isChoiceInitial = (
  array: [string, React.Dispatch<React.SetStateAction<string>>][],
) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] !== "0") {
      return false;
    }
  }
  return true;
};

const canItBeSaved = (array: string[]) => {
  for (let i = 0; i < array.length; i++) {
    if (validateStringToNumber(array[i]) === false) {
      return false;
    }
  }
  return true;
};

const resetValues = (
  setArray: React.Dispatch<React.SetStateAction<string>>[],
) => {
  for (let i = 0; i < setArray.length; i++) {
    setArray[i]("0");
  }
};

const returnStringWithFirstFloatingPoint = (str: string) => {
  let newStr = "";

  let wasPointMetInStr: boolean = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ".") newStr += str[i];
    else if (!wasPointMetInStr) {
      newStr += ".";
      wasPointMetInStr = true;
    }
  }
  return newStr;
};

type TableSettingsElementProps = {
  tradePair: string;
  isLast: boolean;
};

const TableSettingsElement = ({
  tradePair,
  isLast,
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
    choices[i] = useState<string>("0");
    valuesOfInputs[i] = choices[i][0];
    setValuesOfInputs[i] = choices[i][1];
  }

  return (
    <div
      className={
        !isLast
          ? "table-element-bottom-border table-element-padding"
          : "table-element-padding"
      }
    >
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
          <ButtonWithIcon className="coral-light-bg" Icon={RiDeleteBinLine} />
        </div>
      </div>
      {isEditing ? (
        <div>
          <div className="flex-row gap flex-wrap pt-8">
            <p>На сколько закупать: </p>
            <TextInput
              style={{ width: "180px" }}
              value={valuesOfInputs[0]}
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
          <div className="flex-row pt-8 gap flex-wrap">
            {valuesOfInputs.slice(1).map((value, index) => (
              <div className="flex-row">
                <p>Фикс. {(index + 1) * 25}%</p>
                <TextInput
                  style={{ width: "40px" }}
                  value={value}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setValuesOfInputs[index + 1](
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
                    validateStringToNumber(value) !== false
                      ? ""
                      : "coral coral-border"
                  }
                />
              </div>
            ))}
          </div>
          <p className="gray pt-8">
            Вводимое значение – дробное число от 0 до 1
          </p>
          <div
            className="flex-row justify-end table-element-gap"
            style={{ paddingTop: !isChoiceInitial(choices) ? "8px" : "0px" }}
          >
            {!isChoiceInitial(choices) ? (
              <ButtonWithIcon
                text="Сброс"
                Icon={MdOutlineReplay}
                className="coral-light-bg"
                onClick={() => resetValues(setValuesOfInputs)}
              />
            ) : null}
            {!isChoiceInitial(choices) && canItBeSaved(valuesOfInputs) ? (
              <ButtonWithIcon text="Сохранить" Icon={MdSave} />
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TableSettingsElement;
