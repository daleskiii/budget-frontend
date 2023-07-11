import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form, FormControl, Button } from "react-bootstrap";

function Transaction() {
  return (
    <div>
      <h1>Add a new item</h1>

      <Form>
        <Form.Group className="form-group">
          <Form.Label htmlFor="date" className="form-label">
            Date
          </Form.Label>
          <FormControl type="text" name="date" />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="name" className="form-label">
            Name
            <FormControl type="text" name="name" />
          </Form.Label>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="amount" className="form-label">
            Amount
            <FormControl type="number" name="amount" />
          </Form.Label>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label htmlFor="from" className="form-label">
            From
            <FormControl type="text" name="from" />
          </Form.Label>
        </Form.Group>
        <Button type="submit" variant="btn btn">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Transaction;
