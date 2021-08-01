import React from "react";
import { Form, Checkbox, Row } from "antd";

export const FilterStorage = () => {
  return (
    <Form.Item name="checkbox-group" className="checkbox-group">
      <h2>Storage</h2>
      <div>
        <Checkbox.Group>
          <Row>
            <Checkbox
              value="A"
              style={{
                lineHeight: "32px",
              }}
            >
              32GB
            </Checkbox>

            <Checkbox
              value="B"
              style={{
                lineHeight: "32px",
              }}
            >
              64GB
            </Checkbox>

            <Checkbox
              value="C"
              style={{
                lineHeight: "32px",
              }}
            >
              128GB
            </Checkbox>

            <Checkbox
              value="F"
              style={{
                lineHeight: "32px",
              }}
            >
              256GB
            </Checkbox>
          </Row>
        </Checkbox.Group>
      </div>
    </Form.Item>
  );
};
