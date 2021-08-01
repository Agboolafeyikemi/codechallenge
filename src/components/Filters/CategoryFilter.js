import React from "react";

import { UploadOutlined } from "@ant-design/icons";

export const CategoryFilter = () => {
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
        <div className="category-list" key={id}>
          <div className="category-name">
            <h3>{name}</h3>
          </div>
          <div>
            <UploadOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};
