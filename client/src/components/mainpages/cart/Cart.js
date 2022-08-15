import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
// import PaypalButton from './PayPalButton'
import { Link } from "react-router-dom";
import Empty from "../images/emaptycart.png";
import "./cart.css";
import Delivery from "../images/delivery.svg";
import DeletedProductCart from "../utlis/not_found/DeletedProductCart";
import reduce from 'immer';  
import LoadingNew from "../utlis/loading/LoadingNew";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;

  const [total, setTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [prodWasRemoved,setProdWasRemoved]= useState(false) ;
  const [offer, setOffer] = useState(0);
  const [loading] =state.userAPI.loading;
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, cartItem) => {
        if(cartItem.product) {
          return prev + (cartItem.product.price * cartItem.quantity);
          
        }
      setProdWasRemoved(true);
       return 0 ;
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
  useEffect(() => {
    const getTotal = () => {
        const discount = cart.reduce((prev, cartItem) => {
          if(cartItem.product){
            return prev + (cartItem.product.pricemk ? cartItem.product.pricemk : cartItem.product.price) * cartItem.quantity
          }
        }, 0)
        setDiscount(discount)
    };
    getTotal();
},[cart]);

  useEffect(() => {
    const getTotal = () => {
      const discountPrice = discount - total;
      setDiscountPrice(discountPrice);
    };
    getTotal();
  });

  const addToCart = async (cart) => {
    const updatedCart = [] ;
    cart.forEach(cartItems=>{ 
      if(cartItems.product){
        const updatedCartElements = {
          product: cartItems.product._id,
          quantity : cartItems.quantity,
          _id:cartItems._id
        }
        updatedCart.push(updatedCartElements) ;
      }
    })
    await axios.post(
      "/user/cart",

      { cart: updatedCart },
      {
        headers: { Authorization: token },
      },
      
      
    );
    // toast.success('Added to cart')
  };

  const increment = (id) => {
    let copyCart = [...cart] ; 
    copyCart = copyCart.map((cartItem,index) => {
        const copyItem = {...cartItem} ; 
         if(cartItem.product && cartItem.product._id === id) copyItem.quantity+=1 
         return copyItem ;  
    }) 
    setCart(copyCart);
     addToCart(copyCart);
  };
  

  const decrement = (id) => {
    let copyCart = [...cart]; 
    const needAPICall = copyCart.find(item => item.product && item.product._id === id && item.quantity ===1 ) ; 
    if(needAPICall) return ; 
    copyCart = copyCart.map(cartItem => {
      const copyItem = {...cartItem} ; 
      if(cartItem.product && cartItem.product._id === id) copyItem.quantity-=1 
      return copyItem ; 
    })
    setCart(copyCart);
    addToCart(copyCart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this ?")) { 
      
      // console.log('clicked')
      let flag = false ;
      let copyCart = reduce(cart,draft=> {
        let index = 0 ;
        

         draft.forEach((item,ind) => {
          if(item._id === id) index = ind ; 
          if(item.product ===null && item._id === id) flag = true ;
         
          
          
        }) 
        draft.splice(index,1) ;
        
        
      })
      
      if (flag===true) {
        setProdWasRemoved(false)
      }
      // console.log(copyCart)
      addToCart(copyCart);
      setCart(copyCart);
      
    }
  };
  if(loading)
    return <LoadingNew />
  
  if  (!loading && cart?.length === 0)
    return (
      <div className="empty">
        <img src={Empty} alt="empty" />
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "2rem",
          }}
        >
          {" "}
        </div>
        <Link to="/">
        <button 
          className="btn btn-primary"
          style={{
            width: "60%",
            marginBottom: "10px",
            backgroundColor: "#008000",
            position: "relative",
            textAlign: "center",
            borderRadius: "5px",
            color:'white',
            fontWeight:'bold'
          }}
        >
           
            Continue Shopping
          
        </button>
        </Link>
      </div>
      
      
       
  
   
    )
 
  return (
    <div className="cart-full" style={{ display: "flex" }}>
      <div
        className="cart-order"
        style={{
          display: "flex",
          flexFlow: "column",
          width: "100%",
          border: "1px solid rgb(216, 216, 216)",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <h3 className="header"> My Cart</h3>
        {cart.map((cartItem) => (
          !cartItem.product? 
          <DeletedProductCart removeProduct={removeProduct} id = {cartItem._id} setProdWasRemoved={setProdWasRemoved} key={cartItem._id}/>
          :
          <div className="detail_cart" key={cartItem._id}>
            <div className="box_detail" style={{ marginLeft: "20px" }}>
            <Link to={`/detail/${cartItem.product._id}/${cartItem.product.category}`}>
              <img
                src={cartItem.product.images.url}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  marginTop: "10px",
                  marginRight: "1rem",
                  float: "left",
                }}
              />
              </Link>
              <div className="kela">
                <h3
                  style={{
                    textOverflow: "ellipsis",
                    textTransform: "capitalize",
                  }}
                >
                  {cartItem.product.title}
                </h3>
                {/* <p>{cartItem.product.description}</p> */}
                <p style={{ fontSize: "12px", fontWeight: "500" }}>
                  Rs-{cartItem.product.price}&nbsp;&nbsp;
                  {cartItem.product.pricemk ? (
                    <del style={{ fontSize: "12px", fontWeight: "normal" }}>
                      Mrp-{cartItem.product.pricemk}
                    </del>
                  ) : null}
                </p>

                <p
                  style={{
                    color: "seagreen",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Rs-{cartItem.product.price * cartItem.quantity}
                </p>
              </div>
              <br />
              <div
                className="amount"
                style={{ marginTop: "5px", float: "right" }}
              >
                <button
                  style={{ borderRadius: "5px" }}
                  onClick={() => decrement(cartItem.product._id)}
                >
                  {" "}
                  -{" "}
                </button>
                <span>{cartItem.quantity}</span>
                <button
                  style={{ borderRadius: "5px" }}
                  onClick={() => increment(cartItem.product._id)}
                >
                  {" "}
                  +{" "}
                </button>

                <span
                  id="remove"
                  style={{
                    cursor: "pointer",
                    fontSize: "15px",
                    marginLeft: "30px",
                    
                    
                    padding: "5px",
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    
                   
                  }}
                  onClick={() => removeProduct(cartItem._id)}
                >
                  {" "}
                 <i className="fa fa-trash trash-bucket" aria-hidden="true"></i>
                
                </span>
              </div>
            </div>
            
          </div>
        ))}
        <div
          style={{
            width: "100%",
            display: "block",
            position: "sticky",
            bottom: "0",
            alignSelf: "flex-start",
            borderTop: "1px solid #f0f0f0",
            backgroundColor: "#fff",
            padding: "16px 22px",
            boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
          }}
        >
          <form>
            <span
              style={{
                fontWeight: "700",
                position: "absolute",
                fontSize: "20px",
              }}
            >
              {" "}
             {!prodWasRemoved &&  <span>Rs {totalPrice}</span>}
            </span>{" "}
            <Link to="/address"  >
            
              <button className="check" style={prodWasRemoved? {pointerEvents:"none",opacity:'0.5'} :{} }
               >
              
                <span style={{ color: "white" }}>Checkout</span>
               
              </button>
              </Link>
          </form>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          paddingLeft: "16px",
          flexFlow: "column",
          position: " sticky",
          top: "75px",
          bottom: "0",
          zIndex: "2",
          width: "100%",
          alignSelf: "flex-start",
        }}
        className="cart-container"
      >
        <div
          className="cart-header"
          style={{ display: "block", boxSizing: "border-box" }}
        >
          <h3 style={{ textAlign: "center", opacity: "0.5" }}>
            {" "}
            Price Details
          </h3>

          <h4 style={{margin:'1px'}}>Total: Rs-: {total}</h4>
           {shippingPrice ? (
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              {" "}
              Shipping Price :{" "}
              <span style={{ fontWeight: "500", textAlign: "center" }}>
                Rs {shippingPrice}
              </span>
            </p>
          ) : (
            <p style={{ fontWeight: "bold", textAlign: "center" }}>
              Free Delivery
            </p>
          )}
          
        
          <br />
          <div style={{ borderTop: "1px solid grey" }}>
            <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
              Amount to be paid:{" "}
              <span style={{ fontWeight: "bold", textAlign: "center" }}>
                {" "}
                Rs {!prodWasRemoved ? <span>{totalPrice}</span>:0}
              </span>{" "}
            </h3>
          </div>
          <div style={{ color: "#00b33c", textAlign: "center" }}>
            {discountPrice ? (
              <span>You will Total save: Rs-:{discountPrice}</span>
            ) : null}
          </div>
          
         
        </div>
      </div>
     
    </div>
  );
    
}
export default Cart;