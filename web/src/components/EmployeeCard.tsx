import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmployeeCardProps {
  name: string;
  email: string;
  position: string;
  department: string;
  salary: number;
  phoneNumber: string;
}

const EmployeeCard = ({ data }: { data: EmployeeCardProps }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>
          {data.phoneNumber} {data.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{data.salary}</p>
      </CardContent>
      <CardFooter>
        <p>{data.position}</p>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
