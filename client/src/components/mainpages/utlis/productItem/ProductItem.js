import React from "react";
import { useEffect, useState } from "react";
import BtnRender from "./BtnRender";
import { Link } from "react-router-dom";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  const [discountmrp, setDiscountmrp] = useState(0);
  const [offer, setOffer] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const discountmrp = product.pricemk ? product.pricemk - product.price : 0;
      setDiscountmrp(discountmrp);
    };
    getTotal();
  });
  useEffect(() => {
    const getTotal = () => {
      const offer = (discountmrp * 100) / product.pricemk;
      setOffer(offer);
    };
    getTotal();
  });

  return (
    <div className="product_card">
      <span
        className="offer"
        style={{ display: "flex", position: "absolute", left: "15px" }}
      >
        {offer ? (
          <span
            style={{
              position: "absolute",
              color: "white",
              letterSpacing: "1px",
              backgroundColor: "#404040",
              padding: "2px 5px 2px 5px",
            }}
          >
            {offer.toFixed(0)}% off
          </span>
        ) : null}
      </span>

      {isAdmin && (
        <input
          style={{ float: "right" }}
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <Link to={`/detail/${product._id}/${product.category}`}>
        <img src={product.images.url} alt="" />
      </Link>
      <div className="product_box">
        <h5 title={product.title}>{product.title}</h5>
        <span
          style={{
            backgroundColor: "grey",
            padding: "4px",  
            borderRadius:'2px'
          }}
        >
          {product?.foodtype === "veg"
            ? "Vegeterian"
            : product?.foodtype === "non-veg"
            ? "Non Vegeterian"
            : ""}
        </span>

        <div style={{ fontSize: "12px", marginTop: "5px" }}>
          {product.pricemk ? (
            <del style={{ color: "red" }}>MRP-{product.pricemk}</del>
          ) : (
            <p className="space-hide"></p>
          )}
        </div>

        <span>RS-{product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
      {/* <div className="offer" style={{ display: 'flex', position: 'relative',left:'5px' }}>{offer ? <span style={{color:'white',letterSpacing:'1px'}}>{offer.toFixed(0)}% off</span> :null}</div> */}
    </div>
  );
}

export default ProductItem;
