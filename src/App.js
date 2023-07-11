import React, { useState, useEffect } from "react";
import Nav from "./components/Nav/Nav";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Transaction from "./components/Transactions/Transaction";
import Home from "./components/Home/Home";
import Edit from "./components/Transactions/Edit";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://daleskii-budget.onrender.com/transactions`
          : `http://localhost:3001/transactions`;

      const response = await axios.get(url);

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  return (
    <Router>
      <Nav data={data} setData={setData} />
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route
          path="/edit/:id"
          element={<Edit data={data} setData={setData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
