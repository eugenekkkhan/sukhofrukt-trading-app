import { useState } from "react";
import "./Table.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { RiDeleteBinLine, RiEditLine, RiCloseLargeFill } from "react-icons/ri";
import { MdOutlineReplay, MdSave } from "react-icons/md";

type TableSettingsElementProps = {
  tradePair: string;
  isLast: boolean;
};

const TableSettingsElement = ({
  tradePair,
  isLast,
}: TableSettingsElementProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
	const [choice, setChoice] = useState<number[]>([0,0,0,0,0])
	
	const isChoiceInitial = (array: number[]) => {
		for (let i = 0; i < array.length; i++) {
			if (array[i] !== 0) {
				return false;
			}
		}
		return true;
	}
	

  return (
    <div className={!isLast ? "table-element-bottom-border table-element-padding" : "table-element-padding"}>
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
          <p>На сколько закупать: </p>
					<input type="number" value={choice[0]} onChange={(e)=>setChoice([parseInt(e.target.value), ...choice.slice(1)])}/>
					<p>Фикс. 25%</p>
					<input type="text"/>
					<p>Фикс. 50%</p>
					<input type="text"/>
					<p>Фикс. 75%</p>
					<input type="text"/>
					<p>Фикс. 100%</p>
					<input type="text"/>
					<p>Вводимое значение – дробное число от 0 до 1</p>
					{ !isChoiceInitial(choice) ?
					<ButtonWithIcon
						text="Сброс"
						Icon={MdOutlineReplay}
						className="coral-light-bg"
						onClick={()=>setChoice([0,0,0,0,0])}
					/> :
					null }
					{ !isChoiceInitial(choice) ?
          <ButtonWithIcon
						text="Сохранить"
						Icon={MdSave}
					/> :
					null }
        </div>
      ) : null}
    </div>
  );
};

export default TableSettingsElement;
