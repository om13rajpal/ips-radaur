import { Button } from "./ui/button";
import { Edit3 } from "lucide-react";
import { BASE_URL } from "@/constants/contants";


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useRef } from "react";
import axios from "axios";
import { toast } from "sonner";

const EditButton = ({ data }: any) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<HTMLInputElement>(null);
  const departmentRef = useRef<HTMLInputElement>(null);

  async function handleUpdate() {
    const body = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      phoneNumber: phoneRef.current?.value,
      salary: salaryRef.current?.value,
      position: positionRef.current?.value,
      department: departmentRef.current?.value,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}/api/employee/${data._id}`,
        body,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const responseData = response.data;

      if (responseData.status) {
        toast.success("Data updated successfully");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating data");
      return;
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Edit3 />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={data.name}
                className="col-span-3"
                ref={nameRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                email
              </Label>
              <Input
                id="email"
                defaultValue={data.email}
                className="col-span-3"
                ref={emailRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                phone
              </Label>
              <Input
                id="phone"
                defaultValue={data.phoneNumber}
                className="col-span-3"
                ref={phoneRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="salary" className="text-right">
                Salary
              </Label>
              <Input
                id="salary"
                defaultValue={data.salary}
                className="col-span-3"
                ref={salaryRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                defaultValue={data.position}
                className="col-span-3"
                ref={positionRef}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input
                id="department"
                defaultValue={data.department}
                className="col-span-3"
                ref={departmentRef}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleUpdate}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditButton;
