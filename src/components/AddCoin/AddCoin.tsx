import { useState } from "react";
import { RiCloseLargeFill, RiAddLargeFill } from "react-icons/ri";
import "./AddCoin.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { MdOutlineReplay } from "react-icons/md";
import "../../index.css";
import TextInput from "../TextInput/TextInput";
import { initStrings, returnStringWithFirstFloatingPoint, saveCoinValue } from "../Table/TableSettings/TSEFuncs";

const AddCoin = ({coinId, id} : {coinId: number, id: string}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [valuesOfInputs, setValuesOfInputs] = useState({
    name: "",
    equity: "",
    fixOn25: "",
    fixOn50: "",
    fixOn75: "",
    fixOn100: "",
  })

  const canItBeSaved = () => {
    return Object.values(valuesOfInputs).slice(2).every((value) => parseFloat(value) < 1) && 
    valuesOfInputs.equity.length > 0 && 
    valuesOfInputs.name.length > 0;
  }

  return (
    <div className="parent">
      <div className={isAdding ? "window adding-window" : "window"}>
        <div className="flex-column gap">
          <p className="bold">Добавление монеты</p>
          <p>Название монеты:</p>
          <TextInput
            value={valuesOfInputs.name}
            onChange={(e) => setValuesOfInputs({ 
              ...valuesOfInputs, 
              name: e.target.value.
              toUpperCase().
              split('').
              filter(
                (value)=>'QWERTYUIOPASDFGHJKLZXCVBNM'
                .includes(value))
                .join('')
              })
            }
          />
          <p>На сколько купить:</p>
          <TextInput 
            value={valuesOfInputs.equity}
            onChange={(e) => setValuesOfInputs({ ...valuesOfInputs, equity: 
              returnStringWithFirstFloatingPoint(
                e.target.value
                .split('')
                .filter(
                  (value)=>'0123456789.'
                  .includes(value)
                ).join('')) 
              })}
          />
          <p>Фиксирование:</p>
          <div className="flex-row gap">
            <p>25%</p>
            <TextInput 
              value={valuesOfInputs.fixOn25}
              onChange={(e) => setValuesOfInputs({ ...valuesOfInputs, fixOn25: 
                returnStringWithFirstFloatingPoint(
                  e.target.value
                  .split('')
                  .filter(
                    (value)=>'0123456789.'
                    .includes(value)
                  ).join('')) 
                })}
            />
          </div>
          <div className="flex-row gap">
            <p>50%</p>
            <TextInput 
              value={valuesOfInputs.fixOn50}
              onChange={(e) => setValuesOfInputs({ ...valuesOfInputs, fixOn50: 
                returnStringWithFirstFloatingPoint(
                  e.target.value
                  .split('')
                  .filter(
                    (value)=>'0123456789.'
                    .includes(value)
                  ).join(''))
                })}
            />
          </div>
          <div className="flex-row gap">
            <p>75%</p>
            <TextInput 
              value={valuesOfInputs.fixOn75}
              onChange={(e) => setValuesOfInputs({ ...valuesOfInputs, fixOn75: 
                returnStringWithFirstFloatingPoint(
                  e.target.value
                  .split('')
                  .filter(
                    (value)=>'0123456789.'
                    .includes(value)
                  ).join('')) 
                })}
            />
          </div>
          <div className="flex-row gap">
            <p>100%</p>
            <TextInput 
              value={valuesOfInputs.fixOn100}
              onChange={(e) => setValuesOfInputs({ ...valuesOfInputs, fixOn100: 
                returnStringWithFirstFloatingPoint(
                  e.target.value
                  .split('')
                  .filter(
                    (value)=>'0123456789.'
                    .includes(value)
                  ).join('')) 
                })}
            />
          </div>
          <p className="gray">
            Вводимое значение – дробное число от 0 до 1
          </p>
          <div className="flex-row gap">
          {Object.values(valuesOfInputs).join('').length > 0 ?
          <ButtonWithIcon
            text="Сброс"
            Icon={MdOutlineReplay}
            className="coral-light-bg"
            onClick={() => {setValuesOfInputs({
              name: "",
              equity: "",
              fixOn25: "",
              fixOn50: "",
              fixOn75: "",
              fixOn100: "",}
            )}}
          /> : null}
          {canItBeSaved() ? 
          <ButtonWithIcon 
            text={"Добавить"} 
            Icon={RiAddLargeFill}
            onClick={() => {
              saveCoinValue(
                Object.values(valuesOfInputs).slice(1) as initStrings,
                0,
                valuesOfInputs.name,
                coinId,
                id ?? undefined,
              )?.then(()=>window.location.reload());
            }} 
          /> : null}
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
