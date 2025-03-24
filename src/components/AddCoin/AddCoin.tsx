import { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import "./AddCoin.css";

const AddCoin = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  return (
    <div className="parent">
      <div className={isAdding ? "window adding-window" : "window"}></div>
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
