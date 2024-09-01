import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./Main.css"

export default function Main() {
  return (
    <>
    <div className="main">
      <Header />
      <Outlet />
      <Footer />
    </div>
    </>
  );
}
