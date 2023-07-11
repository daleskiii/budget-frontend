import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function Transaction() {
  const [formData, setFormData] = useState({
    date: format(new Date(), "MMMM dd yyyy"),
    item_name: "",
    amount: 0,
    type: "deposit",
    from: "",
  });
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://daleskii-budget.onrender.com/transactions`
          : `http://localhost:3001/transactions`;

      await axios.post(url, formData);

      setFormData({
        date: format(new Date(), "MMMM dd"),
        item_name: "",
        amount: 0,
        type: "deposit",
        from: "",
      });

      navigate("/");
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Add a new item</h1>

      <form className="form-control" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="date" className="form-label">
            Date:
          </label>

          <p> {formData.date}</p>
        </div>
        <div className="form-group">
          <label htmlFor="item_name" className="form-label">
            Name*
            <input
              className="form-control"
              type="text"
              name="item_name"
              value={formData.item_name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="type"
            value="deposit"
            checked={formData.type === "deposit"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="deposit">
            Deposit
          </label>
        </div>{" "}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="type"
            value="withdrawal"
            checked={formData.type === "withdrawal"}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="withdrawal">
            Withdrawal
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="form-label">
            Amount* $
            <input
              className="form-control"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="from" className="form-label">
            From*
            <input
              className="form-control"
              type="text"
              name="from"
              value={formData.from}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn">
          Submit
        </button>
      </form>

      <aside>
        <p>* Required Input field for submission.</p>
      </aside>
    </div>
  );
}

export default Transaction;
