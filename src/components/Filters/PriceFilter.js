import React, { useState } from "react";
import PropTypes from "prop-types";

import { Slider, InputNumber } from "antd";

export const PriceFilter = (props) => {
  const { filterPrice } = props;
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(2500);

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
  const onAfterChange = (value) => {
    filterPrice(value);
  };

  return (
    <>
      <div className="price-filter">
        <h2>Price Filter</h2>
        <Slider
          min={0}
          max={2500}
          onChange={onChange}
          range={true}
          defaultValue={[min, max]}
          value={[min, max]}
          onAfterChange={onAfterChange}
        />
        <div>
          <InputNumber
            placeholder="Min: 0"
            min={0}
            max={2500}
            value={min}
            onChange={onChangeMin}
          />
        </div>
        <div className="separator"> | </div>
        <div>
          <InputNumber
            placeholder="Max: 2500"
            min={0}
            max={2500}
            value={max}
            onChange={onChangeMax}
          />
        </div>
      </div>
    </>
  );
};

PriceFilter.propTypes = {
  filterPrice: PropTypes.func.isRequired,
};
