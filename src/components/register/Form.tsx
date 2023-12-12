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
    e.preventDefault;
    try {
      let response = await axios.post("https://localhost:7104/Auth/register", {
        login: login,
        password: password,
      });
      console.log("Тест: ", response.data);
      setToken(response.data);
      dispatch(
        setUser({
          login: login,
          password: password,
          token: response.data,
        })
      );
      router.push("/");
      dispatch(setIsAuth(true));
    } catch (error) {
      console.log("пошел нахуй:",error);
      alert("ПОшел нахъуй");
    }
  };
  return (
    <>
      <div
        className="register-authorization-container"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "35%",
          margin: "10px auto",
          marginTop: "150px",
          border: "none",
        }}
      >
        <form>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              type="email"
              id="form2Example1"
              className="form-control"
            />
            <label className="form-label text-gray-50" htmlFor="form2Example1">
              Логин
            </label>
          </div>

          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              id="form2Example2"
              className="form-control"
            />
            <label className="form-label" htmlFor="form2Example2">
              Пароль
            </label>
          </div>

          {/* Submit button */}
          <button
            onClick={(e) => {
              handleLogin(e);
            }}
            type="button"
            className="btn btn-primary btn-block mb-4"
          >
            Регистрация
          </button>

          {/* Register buttons */}
        </form>
      </div>

      
    </>
  );
};
