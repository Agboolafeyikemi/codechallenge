import React from "react";
import PropTypes from "prop-types";

import { UploadOutlined } from "@ant-design/icons";

export const CategoryFilter = (props) => {
  const { handleClick, active, loadRequest } = props;

  const categories = [
    {
      id: "0",
      name: "Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus",
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
          key={id}
          className={
            active == name ? "category-list + active" : "category-list"
          }
        >
          <div className="category-name" onClick={() => handleClick(name)}>
            <h3>{id == 0 ? "ALL" : name}</h3>
          </div>
          <div onClick={() => loadRequest()}>
            <UploadOutlined />
          </div>
        </div>
      ))}
    </div>
  );
};
CategoryFilter.propTypes = {
  handleClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  loadRequest: PropTypes.func.isRequired,
};
