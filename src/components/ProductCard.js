import React from "react";
import PropTypes from "prop-types";

import SampleImage from "../images/sampleImage.png";

export const ProductCard = (props) => {
  const { productDetails, currentPrice, currentStorage } = props;
  const {
    productDetails: { _id, name, imgUrl, quantity },
  } = props;
  const { lowestAsk } = productDetails;

  return (
    <div key={_id} className="product-card">
      <div className="clear-fix">
        <p>{lowestAsk?.grade ? lowestAsk.grade : "NEW"}</p>
      </div>

      <div className="image-con">
        <img src={imgUrl ? imgUrl : SampleImage} alt={name} />
      </div>
      <h4 className="product-name">{name}</h4>
      <div className="unlocked">
        {" "}
        <p>
          Unlocked |{" "}
          {lowestAsk?.storageSize ? lowestAsk.storageSize : currentStorage}
        </p>{" "}
      </div>
      <div className="unit-price">
        <p>Unit Price</p>
        <h3>${lowestAsk?.price ? lowestAsk.price : currentPrice}</h3>
      </div>
      <p className="quantity">{quantity ? quantity : 1500} Available</p>
      <div className="btn-con">
        <button className="btn">BUY</button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productDetails: PropTypes.object.isRequired,
  currentPrice: PropTypes.string.isRequired,
  currentStorage: PropTypes.string,
};
