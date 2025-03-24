import { IconType } from "react-icons";
import Button, { ButtonProps } from "./Button";

type ButtonWithIconProps = {
	Icon?: IconType, 
	text?: string, 
	onClick?: ()=>void, 
	className?: string
}

const ButtonWithIcon = ({ Icon, text = '', onClick = ()=>{}, className }: ButtonWithIconProps) => {
  return (
    <Button
			elementInside={
			<div style={{ display: "flex", alignItems: "center", gap: '6px' }}>
				{text}
				{Icon ? <Icon /> : null}
			</div>
			}
			onClick={onClick}
			className={className}
			/>
		);
};

export default ButtonWithIcon;
