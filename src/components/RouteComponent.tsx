import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import { getCookie } from "../utils";
import Navbar from "./Navbar/Navbar";
import { verifyID } from "../getQueries";
import Loading from "./Loading/Loading";
import { AxiosError, AxiosResponse } from "axios";
import ErrorComponent from "./Error/ErrorComponent";
import History from "../pages/History";

const RouteComponent = () => {
  const id = getCookie("id");
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isError, setIsError] = useState<false | string>(false);

  useEffect(() => {
    if (id) {
      verifyID(id).then((res: AxiosResponse<boolean>) => {
        setIsVerified(res.data);
        setIsFetched(true);
      }).catch((err: AxiosError)=>{
        setIsError(err.code ?? false);
      });
    }
  });

  return (
    <>
      {id == null || !isVerified ? null : <Navbar />}
      <Routes>
        {!isFetched && id ? (
          !isError ? <Route path="/*" element={<Loading />} /> : 
          <Route path="/*" element={<ErrorComponent error={isError}/>} />
        ) : id == null || !isVerified ? (
          <Route path="/*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default RouteComponent;
