import React from "react";

import { UploadOutlined } from "@ant-design/icons";
import { Button, notification, Divider, Space } from "antd";

export const CategoryFilter = (props) => {
  const { handleClick, active, loadRequest } = props;
  console.log(active.toString(), "FilterParam\n\n\n\n\n");
  const categories = [
    {
      id: "0",
      name: "All",
    },
    {
      id: "1",
      name: "iPhone",
    },
    {
      id: "2",
      name: "Samsung",
    },
    {
      id: "3",
      name: "iPad",
    },
    {
      id: "4",
      name: "MacBook",
    },
    {
      id: "5",
      name: "AirPods",
    },
  ];

  return (
    <div className="category-filter">
      <h2>Categories</h2>
      {categories?.map(({ id, name }) => (
        <div
          className="category-list"
          key={id}
          className={
            active.toString() === name
              ? "category-list + active"
              : "category-list"
          }
        >
          <div className="category-name" onClick={() => handleClick(name)}>
            <h3>{name}</h3>
          </div>
          <div onClick={() => loadRequest()}>
            <UploadOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};
