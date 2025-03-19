import EmployeeCard from "@/components/EmployeeCard";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchedData, setSeaerchedData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((employee: any) => {
    if (employee.name.toLowerCase().includes(searchedData.toLowerCase())) {
      return employee;
    }
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
        <div>
          <Input
            placeholder="Type here to search ..."
            type="text"
            className="w-1/3"
            onChange={(e) => {
              setSeaerchedData(e.target.value);
            }}
          />
          <div className="w-[75vw] grid grid-cols-3 gap-4 mt-5">
            {filteredData.map((employee: any, index: number) => {
              return <EmployeeCard key={index} data={employee} />;
            })}
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Dashboard;
