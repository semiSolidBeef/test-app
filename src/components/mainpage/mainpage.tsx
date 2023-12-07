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
  const [files, setfiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log("pis",file)
    setSelectedFile(file);
   // handleFileUpload();
    
  };
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

  const handleFileUpload = async () => {
    console.log("piska", selectedFile)
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        // Replace 'your-upload-endpoint' with the actual endpoint where you want to send the file
        const response = await axios.post('https://localhost:7104/Auth/LoadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + token,
          },
        });

        if (response.status == 200) {
          getuserFiles();
        }
       // setSelectedFile(null)
        //alert (response.status)

        console.log('File uploaded successfully:', response.data);
        // Handle success, update state, etc.
      } catch (error: any) {
        console.error('Error uploading file:', error.message);
        // Handle error
      }
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

  const getuserFiles = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7104/Auth/UserMe`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.filePath) {
        setfiles(response.data.filePath)
      }
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
    getuserFiles();
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
                marginTop: "200px",
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
            <div>
              <label htmlFor="formFileLg" onChange={handleFileChange} className="form-label">Добавьте файл</label>
              <input onChange={handleFileChange} className="form-control form-control-lg" id="formFileLg"  type="file"/>
              <button onClick={handleFileUpload}>
                Загрузить
              </button>
            </div>
            <div className="list-cont">
                <ul style={{ display:"flex",flexWrap: "wrap" ,listStyle: "none"}}>
                  {files.map((file, index) => (
                    <li  key={index}> <img  src={file} alt="не прогрузилось"  style={{maxWidth:"50%", textDecoration: "none",maxHeight:"300px"}}/></li>
                  ))}
                </ul>
              </div>

            {/* <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleFileUpload}>Загрузить файл</button>
            </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
