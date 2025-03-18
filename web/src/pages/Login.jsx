import React, { useState } from "react";
import Input from "../components/Input";

const Login = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <Input type="email" placeholder="example@example.com" setAuth={setAuth} />
      <Input type="password" placeholder="password" setAuth={setAuth} />
      <button
        className="bg-black text-white rounded-xl py-2 px-8 text-sm"
        onClick={() => {
          console.log(auth);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
