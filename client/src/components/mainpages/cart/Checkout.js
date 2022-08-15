import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import UserAPI from "../../../api/UserAPI";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import ProductInfo from "./ProductInfo";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FireworkSpinner } from "react-spinners-kit";
import Delivery from '../images/delivery.svg'
import DeletedProductCheckout from "../utlis/not_found/DeleteProductCheckout";
import NotFound from "../utlis/not_found/NotFound";





const orderid = require("order-id")("mysecret");
// { order_id
//  cart
//  address
//  total
//  totalPrice
//  shippingPrice
//  status
// } order schema

export default function Checkout({ history }) {
  const state = useContext(GlobalState);
  const contextState = useContext(GlobalState);
  const [token] = contextState.token;
  const userState = UserAPI(token);
  const [cart] = userState.cart;
  const [total, setTotal] = useState(0);
  const id = userState.user_id;

  const address =history.location.state && history.location.state.data ? history.location.state.data : history.location.state;
  // console.log(address) ;
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  
  const [offer, setOffer] = useState(0);
  const [prodWasRemoved, setProdWasRemoved] = useState(false);
  // const [loading] =state.userAPI.loading;


  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, cartItem) => {
        if (cartItem.product) {
          return prev + (cartItem.product.price * cartItem.quantity);

        }
        setProdWasRemoved(true);
        return 0;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const getTotal = () => {
      const shippingPrice = total >= 300 ? 0 : 20;
      setShippingPrice(shippingPrice);
    };
    getTotal();
  });
  useEffect(() => {
    const getTotal = () => {
      const totalPrice = total + shippingPrice;
      setTotalPrice(totalPrice);
    };
    getTotal();
  });


  const handleConfirm = async () => {
    
    const order = {
      order_id: orderid.generate(),
      products: cart,
      address: address, 
      date : new Date().toISOString() ,
      total_amount: total,
      net_paybale: totalPrice,
      shipping_price: shippingPrice,
      offer: offer,
      status: "Placed",

    };
    
    
    axios
      .post(`user/order/${id}`, order, {
        headers: { Authorization: token },
      })

      .then((response) => {
        if (response.status === 200) {
          toast.success("Order was confirmed and placed", { autoClose: 1500 });
          setRedirect(true);
        }
        window.location.reload();

      })

      .catch((error) => {
        toast.error("Order was failed", { autoClose: 1500 });
      });


  };
  // if(loading)
  //   return <LoadingNew />
  if(!address){
    
      return <NotFound/>
   
  }


  return (
    <>
      {/* Selected product   */}

      {redirect && (
        <Redirect 
          to={{
            pathname: `order_history`
          }}
        />
      )}
      <div className="checkout_container">

        <div className="check_amount" style={{ padding: "10px" }}>
          {/* price info section  */}
          <div style={{ fontWeight: "bold" }}>
            Total: <span style={{ fontWeight: "500" }}> Rs {total}</span>{" "}
          </div>
          {shippingPrice ? (
            <div style={{ fontWeight: "bold" }}>
              Shipping Price :{" "}
              <span style={{ fontWeight: "500" }}>Rs {shippingPrice}</span>
            </div>
          ) : <div style={{ fontWeight: "bold" }}>Free Delivery</div>}
          <div style={{ fontWeight: "bold" }}>
            Amount to be paid:{" "}
            <span style={{ fontWeight: "500" }}> Rs {totalPrice}</span>{" "}
          </div>
          


        </div>

        <div className="address_contain_wraper">

          <div className="address_inner_contain_wraper">
            <div style={{ textAlign: "center", marginBottom: '3px', fontWeight: 'bold', fontSize: '14px' }}>
             

              <p style={{ fontWeight: "bold", fontSize: '13px', textAlign: 'center' }}>
                Cash on Delivery available

              </p>
            </div>
           
            <p
              style={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                width: '100%',
                border: "1px solid rgb(240, 240, 240)",
                boxShadow: " 3px 3px 0 grey;",
                marginTop:'10px',
                padding: '10px',



              }}
            >
              Address
            </p>
            <div style={{ fontWeight: "500",padding:'10px',fontSize:'15px'  }}>
              Name-{address.name}
              
              <br />
              Address-{address.address}
              <br />
              Loacality-{address.locality} <br /> City-{address.city}
              &nbsp;&nbsp;
              <span style={{ fontWeight: "500" }}>Pin-{address.pincode}</span>
              <br />
              
              <span style={{fontSize:'18px'}}>Phone-{address.number}</span>
            </div>
           
            {/* checkbox  */}
          </div>

        </div>
        <div className="saman">
          {cart?.map((saman) => (
            !saman.product ?
              <DeletedProductCheckout product={saman} quantity={saman.quantity} key={saman._id} setProdWasRemoved={setProdWasRemoved} />
              :
              <ProductInfo product={saman} quantity={saman.quantity} key={saman._id} />
          ))}
        </div>
        <div className="emn_btn " style={{
          position: "sticky", marginTop: "10px",
          bottom: "10px",
        }}>
          <button className="btn-primary" style={prodWasRemoved ? {
            pointerEvents: "none", opacity: '0.5',
            backgroundColor: "#333333 ",
            padding: "5px",
            borderRadius: "5px",
            color: "#fff",
            fontWeight: "500",
            display: "block",
            margin: "auto",
            width: "50%",
            marginTop: "10px",

          } : {}}
            onClick={handleConfirm}

          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
