import { AddEmployee } from "./AddEmployee";
import Logout from "./Logout";

const Navbar = ({
  isLoggedIn,
  setIsLoggedIn,
}: {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-screen h-16 border-b-2 flex text-xl items-center px-10 font-semibold justify-between absolute">
      <h1>IPS Radaur</h1>
      {isLoggedIn ? (
        <div className="flex gap-2 items-center">
          <AddEmployee />
          <Logout setIsLoggedIn={setIsLoggedIn} />
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
