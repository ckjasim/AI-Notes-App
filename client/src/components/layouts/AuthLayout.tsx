import { Outlet } from "react-router-dom";
import Navbar from "../modal/NoteModal";

const AuthLayout = () => {
  return (
    <div>

        <Outlet />
   
    </div>
  );
};

export default AuthLayout;