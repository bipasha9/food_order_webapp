import React from "react";
import { Link } from "react-router-dom";

function ProductInfo({ product,quantity }) {
  return (
    <div className="product_card" style={{height:'21rem'}}>
      
        <img src={product.product.images.url} alt=""  />
     
      <div className="product_box">
        <h5  title={product.product.title} style={{textTransform:'capitalize'}}>{product.product.title}</h5>
        
        {/* <div>
          {product.pricemk ? (
            <del>MRP-{product.product.pricemk}</del>
          ) : (
            <p className="space-hide"></p>
          )}
        </div> */}

        <span>RS-{product.product.price}</span>
        <br/>
        
        <span style={{color:'red'}}>Total RS-{product.product.price * quantity}</span>
        <p>Quantity : <span>{quantity}</span></p>
        {/* <p>{product.product.description}</p> */}
        
      </div>
    </div>
  );
}

export default ProductInfo;
