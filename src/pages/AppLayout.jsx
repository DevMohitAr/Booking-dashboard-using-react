import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

import { Outlet } from "react-router-dom";
export default function AppLayout() {
  return (
    <div className="grid grid-cols-[320px_1fr] grid-rows-[62px_1fr] h-screen ">
      <Sidebar />
      <Header />
      <main >{<Outlet />}</main>
    </div>
  );
}
