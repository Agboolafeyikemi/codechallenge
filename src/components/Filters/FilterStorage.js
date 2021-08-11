import React from "react";

export const FilterStorage = (props) => {
  const { handleStorageValue, active } = props;

  const storageSizes = [
    { id: 1, size: "32GB" },
    { id: 2, size: "64GB" },
    { id: 3, size: "120GB" },
    { id: 4, size: "256GB" },
  ];

  return (
    <div className="checkbox-group">
      <h2>Storage</h2>
      <div className="options storageA">
        {storageSizes?.map(({ id, size }) => (
          <label
            title={size}
            key={id}
            className={size == active ? "activeS" : "hide"}
          >
            <input
              type="radio"
              name="size"
              value={size}
              key={id}
              onChange={(e) => handleStorageValue(e.target.value)}
            />
            <img />
            {size}
          </label>
        ))}
      </div>
    </div>
  );
};
