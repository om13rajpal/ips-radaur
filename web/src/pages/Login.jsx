import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function onClick() {
    const body = {
      username: auth.email,
      password: auth.password,
    };
    console.log(body);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/login",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.status) {
        console.log("Login successful");
        localStorage.setItem("token", data.token);

        navigate("/");
      } else {
        console.log("Could not login in", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <Input type="email" placeholder="example123" setAuth={setAuth} />
      <Input type="password" placeholder="password" setAuth={setAuth} />
      <button
        className="bg-black text-white rounded-xl py-2 px-8 text-sm"
        onClick={onClick}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
