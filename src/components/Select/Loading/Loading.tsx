import React from "react";
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
    <div className="screen" style={{ width: width, height: height }}>
      <div className="loading-wrapper">
        <AiOutlineLoading3Quarters className="loading" size={48} />
      </div>
    </div>
  );
};

export default Loading;
