import React from "react";
import { employee } from "../constants/employee";
import EmployeeCard from "../components/EmployeeCard";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-25"></div>
      <div className="flex text-4xl font-bold items-start w-3/4">
        <h1>Employee Data</h1>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4 w-3/4">
        {employee.map((employee, index) => {
          return <EmployeeCard key={index} data={employee}/>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
