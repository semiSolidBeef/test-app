"use client";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Brand = () => {
  const [login_brand, setLogin] = useState("");
  const [password_brand, setPassword] = useState("");
  const [users, setUsers] = useState([
    {
      login: "1",
      pswd: "1",
    },
  ]);
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  if (isAuth === true) {
    router.push("/");
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      let flag = 0;
      users.map((user) => {
        if (login_brand === user.login && password_brand === user.pswd) {
          flag = 1;
          router.push("politic");
          return;
        }
      });
      if (flag === 0) {
        throw "ex";
      }
    } catch (error) {
      console.log(error);
      alert("Ошибка авторизации! Неправильный логин или пароль!");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "45%",
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
          width: "500px",
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
            width: "30vw",
            height: "4vh",
            border: "none",
            borderRadius: "5px",
            textIndent: "10px",
          }}
          value={login_brand}
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
          value={password_brand}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            handleLogin(e);
          }}
          className="btn"
          style={{
            width: "30.4vw",
            height: "4vh",
            fontSize: "20px",
          }}
        >
          Войти в бренд
        </button>
      </div>
    </div>
  );
};
