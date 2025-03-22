import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Logout = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => {
      setIsLoggedIn(false);
      navigate("/login");
    }, 1500);
  }

  return (
    <Button variant={"outline"} size={"icon"} onClick={handleLogout}>
      <LogOutIcon />
    </Button>
  );
};

export default Logout;
