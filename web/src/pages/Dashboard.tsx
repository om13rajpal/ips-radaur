import EmployeeCard from "@/components/EmployeeCard";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://ips-radaur.onrender.com/api/employee/all"
      );
      const data = response.data;

      if (data.status) {
        setData(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="w-[75vw] mx-auto grid grid-cols-3 gap-4 my-5">
        {data.map((employee: any, index: number) => {
          return <EmployeeCard key={index} data={employee} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
