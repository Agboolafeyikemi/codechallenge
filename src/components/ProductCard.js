import React from "react";

export const ProductCard = (props) => {
  const { productDetails } = props;
  const {
    productDetails: { _id, name, imgUrl, quantity, category, brand },
  } = props;
  const { lowestAsk } = productDetails;
  return (
    <div key={_id} className="product-card">
      <div>
        <p>{lowestAsk?.grade}</p>
      </div>
      {/* <div> */}
      <img src={imgUrl} alt={name} />
      <h3>{name}</h3>
      <span>
        {" "}
        Unlocked| <p>{lowestAsk?.storageSize}</p>{" "}
      </span>
      <div>
        <p>Unit Price</p>
        <h3>${lowestAsk?.price}</h3>
      </div>
      {/* </div> */}
      <div>
        <button>BUY</button>
      </div>
    </div>
  );
};
