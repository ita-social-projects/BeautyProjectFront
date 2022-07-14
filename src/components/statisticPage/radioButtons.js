import React from "react";
import { Form } from "react-bootstrap";

export default function RadioButtons({ handleChange }) {
  return (
    <Form className="m-3 text-center">
      <div key={"inline-radio"} className="mb-3">
        <Form.Check
          inline
          defaultChecked
          label="Current Week"
          name="group1"
          type={"radio"}
          id={"lastSevenDays"}
          value="lastSevenDays"
          onChange={(e) => handleChange(e.target.value)}
        />
        <Form.Check
          inline
          label="Current Month"
          name="group1"
          type={"radio"}
          id={"inline-radio-2"}
          value="currentMonth"
          onChange={(e) => handleChange(e.target.value)}
        />
        <Form.Check
          inline
          label="Monthes"
          name="group1"
          type={"radio"}
          id={"inline-radio-3"}
          value="lastThreeMonthes"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </Form>
  );
}
