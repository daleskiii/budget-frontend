import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

function Edit({ data, setData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const [isEditingFrom, setIsEditingFrom] = useState(false);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const item = data.find((i) => i.id === id);
    if (item) {
      setText(item.item_name);
      setAmount(item.amount);
      setFrom(item.from);
    }
  }, [data, id]);

  // Text

  const handleTextBlur = async () => {
    setIsEditing(false);
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://daleskii-budget.onrender.com/transactions/${id}`
          : `http://localhost:3001/transactions/${id}`;

      await axios.put(url, {
        ...data.find((item) => item.id === id),
        item_name: text,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, item_name: text } : item
        )
      );
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  //Amoount
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleAmountBlur = async () => {
    setIsEditingAmount(false);
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://daleskii-budget.onrender.com/transactions/${id}`
          : `http://localhost:3001/transactions/${id}`;

      await axios.put(url, {
        ...data.find((item) => item.id === id),
        amount: amount,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, amount: amount } : item
        )
      );
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };
  //From

  const handleFromBlur = async () => {
    setIsEditingFrom(false);
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? `https://daleskii-budget.onrender.com/transactions/${id}`
          : `http://localhost:3001/transactions/${id}`;

      await axios.put(url, {
        ...data.find((item) => item.id === id),
        item_name: text,
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, from: from } : item
        )
      );
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const handleFromChange = (e) => {
    setFrom(e.target.value);
  };

  //Forms and Button handlers
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you done editing this item?");

    if (confirm) navigate("/");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        const url =
          process.env.NODE_ENV === "production"
            ? `https://daleskii-budget.onrender.com/transaction/${id}`
            : `http://localhost:3001/transactions/${id}`;

        await axios.delete(url);
        setData((prevData) => prevData.filter((item) => item.id !== id));
        navigate("/");
      } catch (error) {
        console.error("Error deleting item:", error.message);
      }
    }
  };
  const currentDate = format(new Date(), "MMMM dd");

  return (
    <div>
      <h2>Show Page</h2>
      <aside>
        <p>* Click to Edit.</p>
      </aside>
      <form className="form-control" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="item_name" className="form-label">
            {currentDate}
          </label>
        </div>

        <div className="form-group">
          <label
            htmlFor="item_name"
            className="form-label"
            onClick={() => setIsEditing(true)}
          >
            *Name:
            {isEditing ? (
              <input
                className="form-control"
                type="text"
                value={text}
                autoFocus
                onBlur={handleTextBlur}
                onChange={handleTextChange}
              />
            ) : (
              <p onClick={() => setIsEditing(true)}>{text}</p>
            )}
          </label>
        </div>

        <div className="form-group">
          <label
            htmlFor="amount"
            className="form-label"
            onClick={() => setIsEditingAmount(true)}
          >
            *Amount:
            {isEditingAmount ? (
              <input
                className="form-control"
                type="text"
                value={amount}
                autoFocus
                onBlur={handleAmountBlur}
                onChange={handleAmountChange}
              />
            ) : (
              <p onClick={() => setIsEditingAmount(true)}>${amount}</p>
            )}{" "}
          </label>
        </div>
        <div className="form-group">
          <label
            htmlFor="from"
            className="form-label"
            onClick={() => setIsEditingFrom(true)}
          >
            *From:
            {isEditingFrom ? (
              <input
                className="form-control"
                type="text"
                value={from}
                autoFocus
                onBlur={handleFromBlur}
                onChange={handleFromChange}
              />
            ) : (
              <p onClick={() => setIsEditingFrom(true)}>{from}</p>
            )}{" "}
          </label>
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default Edit;
