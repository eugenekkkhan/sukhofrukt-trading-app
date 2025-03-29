import { IconType } from "react-icons";
import Button, { ButtonProps } from "./Button";

type ButtonWithIconProps = {
  Icon?: IconType;
  text?: string;
  alignText?: "left" | "center" | "right";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const ButtonWithIcon = ({
  Icon,
  text = "",
  alignText = "center",
  onClick = () => {},
  disabled = false,
  className,
}: ButtonWithIconProps) => {
  return (
    <Button
      elementInside={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            justifyContent: alignText,
          }}
        >
          {text}
          {Icon ? <Icon /> : null}
        </div>
      }
      onClick={onClick}
      className={className}
      disabled={disabled}
    />
  );
};

export default ButtonWithIcon;
