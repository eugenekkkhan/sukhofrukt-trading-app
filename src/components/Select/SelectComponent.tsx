import  {
  Dispatch,
  Ref,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Select.css";
import { GoArrowDown } from "react-icons/go";

type Props = {
  options: string[];
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
};

const SelectComponent = ({
  options,
  value = "Не выбрано",
  setValue,
}: Props) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const optionsRefs: RefObject<Ref<HTMLDivElement> | undefined>[] = new Array(
    options.length
  ).fill(useRef<HTMLDivElement>(null));
  const [choice, setChoice] = [value, setValue];
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      if (selectRef.current)
        selectRef.current.style.transition =
          "box-shadow 300ms ease-out, background-color 300ms ease-out";
      if (arrowRef.current)
        arrowRef.current.style.transition =
          "transform 300ms ease-out, color 300ms ease-out";
    }, 300);
  });

  return (
    <>
      <div className="select">
        <div
          className="select under"
          style={{ height: isActive ? `${options.length * 22 + 18}px` : "4px" }}
        ></div>
        {options.map((value, index) => {
          return (
            <div
              className={isActive ? "option" : "option transparent"}
              key={index}
              ref={optionsRefs[index].current}
              style={{
                height: "15px",
                top: `${isActive ? (index + 1) * 22 + 16 : 0}px`,
              }}
              onClick={() => {
                setChoice(value);
                setIsActive(false);
              }}
            >
              {value}
            </div>
          );
        })}
        <div
          ref={selectRef}
          className={isActive ? "select over active-window" : "select over"}
          onClick={() => setIsActive((prev) => !prev)}
        ></div>
        <div ref={arrowRef} className={isActive ? "active-arrow arrow" : "arrow"}>
          <GoArrowDown
            size={20}
            onClick={() => setIsActive((prev) => !prev)}
          />
        </div>
        <div
          className={choice === "Не выбрано" ? "choice gray" : "choice"}
          onClick={() => setIsActive((prev) => !prev)}
        >
          {choice}
        </div>
      </div>
    </>
  );
};

export default SelectComponent;
