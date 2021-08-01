import React, { useState } from "react";

import { Slider, InputNumber } from "antd";

export const PriceFilter = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5000);

  const onChange = (value) => {
    if (value[0] < value[1]) {
      setMin(value[0]);
      setMax(value[1]);
    }
  };
  const onChangeMin = (value) => {
    if (max > value) {
      setMin(value);
    }
  };

  const onChangeMax = (value) => {
    if (min < value) {
      setMax(value);
    }
  };

  return (
    <>
      <div className="price-filter">
        <h2>Price Filter</h2>
        <Slider
          //   className="slider-main-div"
          min={0}
          max={5000}
          onChange={onChange}
          range={true}
          defaultValue={[min, max]}
          value={[min, max]}
        />
        <div>
          <InputNumber
            placeholder="Min: 0"
            // className="min-input"
            min={0}
            max={5000}
            // value={min}
            onChange={onChangeMin}
          />
        </div>
        <div className="separator"> | </div>
        <div>
          <InputNumber
            placeholder="Max: 5000"
            // className="min-input"
            min={0}
            max={5000}
            // value={max}
            onChange={onChangeMax}
          />
        </div>
      </div>
    </>
  );
};
