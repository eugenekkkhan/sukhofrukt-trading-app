import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import TextInput from "./components/TextInput/TextInput";
import "./index.css";
import ButtonWithIcon from "./components/Buttons/ButtonWithIcon";
import { setCookie, validateStringToNumber } from "./utils";
import axios from "axios";
import { verifyID } from "./getQueries";
import { MdAccessTime, MdCheck, MdLogin } from "react-icons/md";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Loading from "./components/Loading/Loading";

const setLogged = (value: string) => {
  setCookie("id", value);
};

const Login = () => {
  const [id, setId] = useState<string>("");

  const verifyHandler = (_id: string) => {
    setStatus("pending");
    verifyID(_id)
      .then((res) => {
        res.data ? setStatus("success") : setStatus("wrongId");
        res.data ? setTimeout(() => window.location.reload(), 300) : null;
        res.data ? setLogged(id) : null;
      })
      .catch(() => setStatus("serverError"));
  };

  const [status, setStatus] = useState<
    "pending" | "success" | "serverError" | "wrongId" | null
  >(null);

  useEffect(() => {});
  return (
    <div className="screen flex-row">
      <div className="basic-block flex-column">
        <div className="flex-row gap">
          <div className="rotate icon">
            <MdLogin size="100%" />
          </div>
          <h1>Вход</h1>
        </div>
        <p>Введите свой ID</p>
        <div>
          <TextInput
            value={id}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setId(
                validateStringToNumber(event.target.value)
                  ? validateStringToNumber(event.target.value).toString()
                  : "",
              )
            }
          />
        </div>
        <div className="flex-row justify-between gap">
          <div className="flex-row gap">
            <ButtonWithIcon
              text="Войти"
              disabled={id.length !== 0 && status !== "pending" ? false : true}
              onClick={() => {
                verifyHandler(id);
              }}
              Icon={
                status === "pending"
                  ? MdAccessTime
                  : status === "success"
                    ? MdCheck
                    : undefined
              }
            />
            <ThemeSwitcher />
          </div>
          {status === "wrongId" ? (
            <p className="coral text-right">Неправильный ID</p>
          ) : status === "serverError" ? (
            <p className="coral text-right">Ошибка сервера</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
