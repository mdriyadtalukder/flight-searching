import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Flights from "./pages/flights/Flights";
import SingleCardPage from "./pages/singleCardPage/SingleCardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/flights" element={<Flights></Flights>}></Route>
        <Route
          path="/flights/:id"
          element={<SingleCardPage></SingleCardPage>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
