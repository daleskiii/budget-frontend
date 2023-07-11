import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav({ data }) {
  const total = data.reduce((sum, i) => sum + parseFloat(i.amount), 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success">
      <Link className="navbar-brand" to="/">
        <h2>Budget App</h2>
      </Link>
      <p className="total"> Total:{total}</p>
      <button className="btn btn-outline-light my-2 my-sm-0">
        <Link className="nav-link" to="/transaction">
          {" "}
          New Transaction
        </Link>
      </button>
    </nav>
  );
}

export default Nav;
