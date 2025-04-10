import { useState } from "react";
import { RiCloseLargeFill, RiAddLargeFill } from "react-icons/ri";
import "./AddCoin.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { MdOutlineReplay } from "react-icons/md";
import '../../index.css'

const AddCoin = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  return (
    <div className="parent">
      <div className={isAdding ? "window adding-window" : "window"}>
        <p>
          Добавить
        </p>
        <div className="flex-row gap">
          <ButtonWithIcon
            text="Сброс"
            Icon={MdOutlineReplay}
            className="coral-light-bg"
          />
          <ButtonWithIcon text={"Добавить"} Icon={RiAddLargeFill} />
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
