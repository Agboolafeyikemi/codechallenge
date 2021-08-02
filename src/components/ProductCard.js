import React from "react";
import SampleImage from "../images/sampleImage.png";

export const ProductCard = (props) => {
  const { productDetails } = props;
  const {
    productDetails: { _id, name, imgUrl, quantity, category, brand },
  } = props;
  const { lowestAsk } = productDetails;

  return (
    <div key={_id} className="product-card">
      <div className="clear-fix">
        <p>{lowestAsk?.grade ? lowestAsk.grade : "NEW"}</p>
      </div>
      {/* <div> */}
      <div className="image-con">
        <img src={imgUrl ? imgUrl : SampleImage} alt={name} />
      </div>
      <h3 className="product-name">{name}</h3>
      <div className="unlocked">
        {" "}
        <p>
          Unlocked | {lowestAsk?.storageSize ? lowestAsk.storageSize : "32GB"}
        </p>{" "}
      </div>
      <div className="unit-price">
        <p>Unit Price</p>
        <h3>${lowestAsk?.price ? lowestAsk.price : 165}</h3>
      </div>
      {/* </div> */}
      <p className="quantity">{quantity ? quantity : 1500} Available</p>
      <div className="btn-con">
        <button>BUY</button>
      </div>
    </div>
  );
};
