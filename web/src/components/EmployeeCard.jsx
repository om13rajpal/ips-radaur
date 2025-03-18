import React from "react";

const EmployeeCard = ({ data }) => {
  return (
    <div className=" bg-white h-70 flex flex-col shadow-lg rounded-4xl p-5 justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">{data.name}</h1>
        <div className="flex gap-3 text-[12.5px] text-zinc-400">
          <h1>{data.phoneNumber}</h1>
          <h1>{data.email}</h1>
        </div>
        <h1 className="text-[18px] antialiased">{data.position}</h1>
        <h1 className="font-semibold text-3xl antialiased">{data.salary}</h1>
      </div>
    </div>
  );
};

export default EmployeeCard;
