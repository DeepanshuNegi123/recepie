import { Outlet } from "react-router-dom";
import Navbar from "../Common/navbar";

function PrivateLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-20">
        <Outlet />
      </main>
    </>
  );
}

export default PrivateLayout;