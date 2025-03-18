import React from "react";

const Input = ({ type, placeholder, setAuth }) => {

  function onChange(e) {
    setAuth((prev) => ({
      ...prev,
      [type]: e.target.value,
    }));
  }
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-1/4 rounded-2xl py-2 px-4 border-2 border-black my-1"
      onChange={onChange}
    />
  );
};

export default Input;
