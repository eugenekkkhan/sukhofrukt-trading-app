import { updateCoinValue } from "../../../postQueries";
import { validateStringToNumber } from "../../../utils";

const isChoiceInitial = (
  array: [string, React.Dispatch<React.SetStateAction<string>>][],
  initArray: [number, number, number, number, number],
) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] !== initArray[i].toString()) {
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
    if (i !== 0 && parseFloat(array[i]) > 1) {
      return false;
    }
  }
  return true;
};

const resetValues = (
  setArray: React.Dispatch<React.SetStateAction<string>>[],
  initArray: [number, number, number, number, number],
) => {
  for (let i = 0; i < setArray.length; i++) {
    setArray[i](initArray[i].toString());
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

const saveCoinValue = (
  values: [string, string, string, string, string],
  amount: number,
  symbol: string,
  coinId: number,
  id?: string,
  breakEvenValues?: boolean[],
) => {
  const valuesInt: TableSettingsElementProps["initValues"] = values.map(
    (values) => parseFloat(values),
  ) as TableSettingsElementProps["initValues"];
  if (id && parseInt(id)) {
    return updateCoinValue(
      ...valuesInt,
      amount,
      symbol,
      coinId,
      parseInt(id),
      breakEvenValues?.[0] ?? false,
      breakEvenValues?.[1] ?? false,
      breakEvenValues?.[2] ?? false,
      breakEvenValues?.[3] ?? false,
    );
  }
};

type initStrings = [string, string, string, string, string];

type TableSettingsElementProps = {
  tradePair: string;
  isLast: boolean;
  initValues: [number, number, number, number, number];
  coinId: number;
  amount: number;
  delFunc: () => void;
  initialBreakEvenValues: boolean[];
};

export type { TableSettingsElementProps, initStrings };
export {
  isChoiceInitial,
  canItBeSaved,
  resetValues,
  returnStringWithFirstFloatingPoint,
  saveCoinValue,
};
