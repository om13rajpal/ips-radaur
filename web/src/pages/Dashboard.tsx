import EmployeeCard from "@/components/EmployeeCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://ips-radaur.onrender.com/api/employee/all"
      );
      const data = response.data;

      if (data.status) {
        setData(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred whilte fetching data");
    }
  }

  return (
    <div className="py-24 flex items-center justify-center">
      {data.length == 0 ? (
        <div className="w-full text-center text-zinc-500 antialiased font-lg">
          No employee data
        </div>
      ) : (
        <div className="w-[75vw] grid grid-cols-3 gap-4">
          {data.map((employee: any, index: number) => {
            return <EmployeeCard key={index} data={employee} />;
          })}
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Dashboard;
