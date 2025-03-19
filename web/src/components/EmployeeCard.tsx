import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { SelectMonth } from "./Dropdown";
import EditButton from "./EditButton";

interface EmployeeCardProps {
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  phoneNumber: string;
  _id: string;
  attendance: any;
}

const EmployeeCard = ({ data }: { data: EmployeeCardProps }) => {
  const [lateEntry, setLateEntry] = useState(0);
  const [monthlySalaryMade, setMonthlySalaryMade] = useState(0);

  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth());

  useEffect(() => {
    if (data.attendance && data.attendance.length > 0) {
      console.log("inside", date.getFullYear());
      data.attendance.find((year: any) => {
        if (year.year === date.getFullYear()) {
          console.log(year);
          year.months.find((month: any) => {
            if (month.month === selectedMonth) {
              console.log(month);
              setLateEntry(month.late);
              setMonthlySalaryMade(month.monthSalary);
            }
          });
        }
      });
    }

    const newDate = new Date(date);
    newDate.setMonth(selectedMonth);
    setDate(newDate);
  }, [data.attendance, selectedMonth]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          <div className="flex gap-3 text-xs items-center">
            <p>{data.phoneNumber}</p>
            <div className="h-3 w-[1.5px] bg-zinc-500"></div>
            <p>{data.department}</p>
            <div className="h-3 w-[1.5px] bg-zinc-500"></div>
            <p>{data.position}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 items-center text-zinc-300">
          <p className="text-xs">Monthly Salary: </p>
          <p className="text-sm font-semibold">{data.salary}</p>
        </div>
        <div className="flex gap-2 items-center text-zinc-300">
          <p className="text-xs">Late Entry: </p>
          <p className="text-sm font-semibold">{lateEntry}</p>
        </div>
        <div className="flex gap-2 items-center text-zinc-300">
          <p className="text-xs">Net Salary Amount: </p>
          <p className="text-sm font-semibold">{monthlySalaryMade}</p>
          <p className="text-xs ml-5">
            ~{" "}
            {date.toLocaleString("default", {
              month: "short",
            })}
          </p>
        </div>
        <div className="mt-2">
          <SelectMonth setSelectedMonth={setSelectedMonth} />
        </div>
      </CardContent>
      <CardFooter>
        <EditButton data={data} />
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
