import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Flights from "./pages/flights/Flights";
import SingleCardPage from "./pages/singleCardPage/SingleCardPage";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { pathname } = useLocation();

  return (
    <div
      className={`${
        pathname === "/"
          ? " from-purple-300 via-purple-400 to-purple-500"
          : " from-purple-200 via-purple-100 to-blue-200"
      } bg-gradient-to-br pt-2`}
    >
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/flights" element={<Flights></Flights>}></Route>
        <Route
          path="/flights/:id"
          element={<SingleCardPage></SingleCardPage>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
