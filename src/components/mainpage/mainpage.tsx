"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setIsAuth, setUser } from "@/redux/reducers/authSlice";
import axios from "axios";

const MainPage = () => {
  const router = useRouter();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.user?.token);
  const [newPassword, setNewPassword] = useState("");
  const handleLogOut = async (e: any) => {
    e.preventDefault();
    dispatch(setUser(undefined));
    dispatch(setIsAuth(false));
    try {
      const response = await axios.get(
        `https://localhost:7104/Auth/GetPassword`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setNewPassword(response.data);
      alert(` новый пароль: ${response.data}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheakNewPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://localhost:7104/Auth/GetPassword`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      setNewPassword(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkToken = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7104/Auth/ValidateToken?token=${token}`
      );
      console.log(response);
    } catch (error) {
      console.log("🚀 ~ file: Form.tsx:34 ~ handleTestToken ~ error:", error);
    }
  };

  useEffect(() => {
    if (isAuth === true) {
      console.log(isAuth);
      checkToken();
    }
  }, [newPassword]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1
          style={{
            userSelect: "none",
          }}
        ></h1>
        {isAuth === false ? (
          <>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                marginTop: "150px",
                display: "flex",
                justifyContent: "center",
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
                <Link
                  href={"brand_auth"}
                  className="text"
                  title="Авторизоваться"
                >
                  Авторизоваться
                </Link>
                <Link
                  href={"register"}
                  className="text"
                  title="Зарегистрироваться"
                >
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <h3>Авторизовались как {user?.login}</h3>
            <button
              onClick={(e) => {
                handleCheakNewPassword(e);
              }}
            >
              Получить пароль
            </button>
            {newPassword === "" ? (
              ""
            ) : (
              <>
                <p>{newPassword}</p>
              </>
            )}
            <button
              onClick={(e) => {
                handleLogOut(e);
              }}
            >
              Выйти
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
