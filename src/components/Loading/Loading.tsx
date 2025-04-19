import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Loading.css";

const Loading = ({
  width = "100vw",
  height = "100vh",
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <div
      className="screen"
      style={{
        width: `calc(${width} - 48px)`,
        height: `calc(${height} - 48px)`,
      }}
    >
      <div className="loading-wrapper">
        <AiOutlineLoading3Quarters className="loading" size={48} />
      </div>
    </div>
  );
};

export default Loading;
