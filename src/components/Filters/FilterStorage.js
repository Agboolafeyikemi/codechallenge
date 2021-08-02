import React, { useState } from "react";

export const FilterStorage = (props) => {
  const { handleStorageValue, active } = props;

  console.log();

  const storageSizes = [
    { id: 1, size: "32GB" },
    { id: 2, size: "64GB" },
    { id: 3, size: "120GB" },
    { id: 4, size: "256GB" },
  ];
  const G = (value) => console.log(`value`, value);

  return (
    <div className="checkbox-group">
      <h2>Storage</h2>
      <div class="options">
        {storageSizes?.map(({ id, size }) => (
          <label title={size} key={id}>
            <input
              type="radio"
              name="size"
              value={size}
              key={id}
              onChange={(e) => handleStorageValue(e.target.value)}
              //   onChange={(e) => G(e.target.value)}
            />
            <img />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
};
