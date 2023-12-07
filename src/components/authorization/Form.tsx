"use client";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Form = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  if (isAuth === true) {
    router.push("/");
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      let response = await axios.post("https://localhost:7104/Auth/login", {
        login: login,
        password: password,
      });
      console.log(response.data);
      setToken(response.data);
      dispatch(setIsAuth(true));
      dispatch(
        setUser({
          login: login,
          password: password,
          token: response.data,
        })
      );
      router.push("/");
    } catch (error) {
      console.log(error);
      alert("Ошибка авторизации! Неправильный логин или пароль!");
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "35%",
          margin: "10px auto",
          marginTop: "150px",
          border: "none",
        }}
      >
        <div
          style={{
            background: "#ede7f0",
            borderRadius: "10px",
            border: "1px solid #333",
            width: "550px",
            height: "200px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <input
            type="text"
            style={{
              textIndent: "10px",
              width: "30vw",
              height: "4vh",
              border: "none",
              borderRadius: "5px",
            }}
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <input
            type="text"
            style={{
              textIndent: "10px",
              width: "30vw",
              height: "4vh",
              border: "none",
              borderRadius: "5px",
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="btn"
            style={{
              width: "30.4vw",
              height: "4vh",
              fontSize: "20px",
            }}
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Войти
          </button>
        </div>
      </div>
    </>
  );
};
