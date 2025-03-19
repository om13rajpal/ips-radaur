import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Button variant={"outline"} size={"icon"} onClick={handleLogout}>
      <LogOutIcon />
    </Button>
  );
};

export default Logout;
