import "./Error.css";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import { MdLogout, MdOutlineReplay, MdErrorOutline } from "react-icons/md";
import { setCookie } from "../../utils";

const ErrorComponent = ({ error }: { error?: string }) => {
  const description = "Попробуйте обновить страницу или выйти";
  return (
    <div className="screen flex-row">
      <div className="flex-column">
        <div>
          <div className="flex-row gap">
            <MdErrorOutline size={24} />
            <p className="bold">{error}</p>
          </div>
          <p>{description}</p>
        </div>
        <div className="flex-row">
          <ButtonWithIcon
            text="Обновить"
            Icon={MdOutlineReplay}
            onClick={() => {
              window.location.reload();
            }}
          />
          <ButtonWithIcon
            text="Выйти"
            Icon={MdLogout}
            className="coral-light-bg"
            onClick={() => {
              setCookie("id", "");
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
