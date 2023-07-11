import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";
function Home({ data }) {
  const total = data.reduce((sum, i) => sum + parseFloat(i.amount), 0);

  return (
    <div className="index">
      <h1 className="total">Bank Account Total: ${total}</h1>
      <table>
        <tbody>
          {data.map((i) => (
            <tr className="data-box" key={i.id}>
              <td className="data">{i.date}</td>

              <Link to={`/edit/${i.id}`}>
                {" "}
                <td className="data">{i.item_name}</td>
              </Link>
              <td className="data">{`$ ${i.amount}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
