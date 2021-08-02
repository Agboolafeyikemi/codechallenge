import React from "react";
import { Form, Checkbox, Row } from "antd";

export const FilterStorage = (props) => {
  const { handleClick, active } = props;
  return (
    <Form.Item name="checkbox-group" className="checkbox-group">
      <h2>Storage</h2>
      <div>
        <Checkbox.Group>
          <Row>
            <Checkbox
              value="32GB"
              style={{
                lineHeight: "32px",
              }}
              onClick={(e) => handleClick(e.target.value)}
            >
              32GB
            </Checkbox>

            <Checkbox
              value="64GB"
              style={{
                lineHeight: "32px",
              }}
              onClick={(e) => handleClick(e.target.value)}
            >
              64GB
            </Checkbox>

            <Checkbox
              value="128GB"
              style={{
                lineHeight: "32px",
              }}
              onClick={(e) => handleClick(e.target.value)}
            >
              128GB
            </Checkbox>

            <Checkbox
              value=" 256GB"
              style={{
                lineHeight: "32px",
              }}
              onClick={(e) => handleClick(e.target.value)}
            >
              256GB
            </Checkbox>
          </Row>
        </Checkbox.Group>
      </div>
    </Form.Item>
  );
};
