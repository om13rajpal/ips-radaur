import React, { useEffect, useState } from "react";
import EmployeeCard from "../components/EmployeeCard";
import axios from "axios";

const Dashboard = () => {

  const [employee, setEmployee] = useState([])

  useEffect(()=>{
    getEmployee()
  }, [])

  async function getEmployee(){
    const response = await axios.get("http://localhost:3000/api/employee/all")
    const data = response.data

    console.log(data)

    if(data.status){
      console.log(data.data)
      setEmployee(data.data)
    }
    else{
      console.log(data)
    }
  }

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
